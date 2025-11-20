import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ScrollView, 
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FormattedText from "../../components/FormattedText";
import { sendChatMessageStream, clearConversation } from "../../services/chatbot";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
};

// Componente de indicador de digitação animado
const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  const dotStyle = (animValue: Animated.Value) => ({
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -4],
        }),
      },
    ],
  });

  return (
    <View style={styles.typingIndicator}>
      <Animated.View style={[styles.typingDot, dotStyle(dot1)]} />
      <Animated.View style={[styles.typingDot, dotStyle(dot2)]} />
      <Animated.View style={[styles.typingDot, dotStyle(dot3)]} />
    </View>
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente virtual da DaVinci Pets. Estou aqui para ajudar com dúvidas sobre cuidados com seu pet! 🐶🐱',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickQuestions = [
    'Qual a melhor ração para filhotes?',
    'Como ensinar comandos básicos?',
    'Raças de gatos tranquilas',
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessageToAPI = async (message: string): Promise<void> => {
    try {
      // Cria mensagem temporária do bot para receber o streaming
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();

      let textBuffer = '';
      let updateTimeout: NodeJS.Timeout;

      await sendChatMessageStream(
        message, 
        conversationId || undefined,
        (event) => {
          switch (event.type) {
            case 'start':
              setConversationId(event.conversationId);
              break;
            
            case 'chunk':
              // Acumula texto no buffer para update mais fluido
              textBuffer += event.text;
              
              // Cancela timeout anterior
              if (updateTimeout) clearTimeout(updateTimeout);
              
              // Atualiza a UI com debounce de 50ms
              updateTimeout = setTimeout(() => {
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === botMessageId 
                      ? { ...msg, text: textBuffer }
                      : msg
                  )
                );
                scrollToBottom();
              }, 50);
              break;
            
            case 'done':
              // Força update final com todo o texto
              if (updateTimeout) clearTimeout(updateTimeout);
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: textBuffer, isStreaming: false }
                    : msg
                )
              );
              break;
            
            case 'error':
              if (updateTimeout) clearTimeout(updateTimeout);
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === botMessageId 
                    ? { 
                        ...msg, 
                        text: `Desculpe, ocorreu um erro: ${event.error}. Por favor, tente novamente.`,
                        isStreaming: false 
                      }
                    : msg
                )
              );
              break;
          }
        }
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      // Adiciona mensagem de erro
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        text: `Desculpe, ocorreu um erro ao processar sua mensagem: ${errorMessage}. Por favor, tente novamente mais tarde.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    scrollToBottom();

    await sendMessageToAPI(messageText);
    
    setIsLoading(false);
  };

  const handleClearConversation = async () => {
    setMessages([{
      id: '1',
      text: 'Olá! Sou o assistente virtual da DaVinci Pets. Estou aqui para ajudar com dúvidas sobre cuidados com seu pet! 🐶🐱',
      sender: 'bot',
      timestamp: new Date(),
    }]);
    setInputText('');
    
    if (conversationId) {
      try {
        await clearConversation(conversationId);
      } catch (error) {
        console.error('Erro ao limpar conversa no backend:', error);
      }
    }
    
    setConversationId(null);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <View style={styles.screenContainer}>
      <Header />
      
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="pets" size={24} color="#667eea" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>DaVinci Pets</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>Assistente Virtual de Pets</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={scrollToBottom}
        >
          {messages.length === 1 && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>👋 Olá! Seja bem-vindo!</Text>
              <Text style={styles.welcomeText}>
                Como posso ajudar você hoje?
              </Text>
              
              <View style={styles.quickQuestionsContainer}>
                {quickQuestions.map((question, index) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      styles.quickQuestionButton,
                      pressed && styles.quickQuestionButtonPressed
                    ]}
                    onPress={() => handleSend(question)}
                  >
                    <Text style={styles.quickQuestionText}>
                      {index === 0 && '🍖 '}
                      {index === 1 && '🎓 '}
                      {index === 2 && '😺 '}
                      {question}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageContainer,
                msg.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer
              ]}
            >
              {msg.sender === 'bot' && (
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>🤖</Text>
                </View>
              )}
              
              <View style={[
                styles.messageBubble, 
                msg.sender === 'user' ? styles.userBubble : styles.botBubble
              ]}>
                {msg.sender === 'user' ? (
                  <Text style={styles.userMessageText}>
                    {msg.text}
                  </Text>
                ) : (
                  <>
                    {msg.text ? (
                      <FormattedText 
                        text={msg.text} 
                        style={styles.botMessageText}
                      />
                    ) : null}
                    {msg.isStreaming && (
                      <TypingIndicator />
                    )}
                  </>
                )}
                {!msg.isStreaming && (
                  <Text style={[
                    styles.timestamp,
                    msg.sender === 'user' ? styles.userTimestamp : styles.botTimestamp
                  ]}>
                    {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.clearButtonPressed
            ]}
            onPress={handleClearConversation}
          >
            <MaterialIcons name="delete-outline" size={20} color="white" />
          </Pressable>
          
          <TextInput
            style={styles.input}
            placeholder="Digite sua pergunta..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          
          <Pressable 
            style={({ pressed }) => [
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
              pressed && inputText.trim() && !isLoading && styles.sendButtonPressed
            ]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  messagesContent: {
    padding: 15,
    paddingBottom: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  quickQuestionsContainer: {
    width: '100%',
    gap: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
  },
  quickQuestionButtonPressed: {
    backgroundColor: '#f7fafc',
    borderColor: '#667eea',
    transform: [{ translateX: 5 }],
  },
  quickQuestionText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'left',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  botAvatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  botTimestamp: {
    color: '#999',
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 10,
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    zIndex: 1,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  sendButtonPressed: {
    transform: [{ scale: 1.05 }],
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  clearButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  clearButtonPressed: {
    transform: [{ scale: 1.05 }],
    elevation: 4,
  },
});
