import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToPets = () => {
    navigation.navigate('CadastroPet');
  };

  const handleNavigateToAdoptionPets = () => {
    navigation.navigate('AdocaoPet');
  };

  return (
    <View style={styles.container}>
      {/* Header fixo no topo */}
      <Header />
      
      {/* Área de conteúdo principal */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao DaVinciPets!</Text>
          <Text style={styles.welcomeSubtitle}>
            Cuidando do seu pet com carinho e dedicação
          </Text>
          
          <Pressable 
            style={({ pressed }) => [
              styles.petButton,
              pressed && styles.petButtonPressed
            ]}
            onPress={handleNavigateToPets}
          >
            <Text style={styles.petButtonTitle}>🐾 Meus Pets</Text>
            <Text style={styles.petButtonSubtitle}>
              Gerencie o RG Digital dos seus pets
            </Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.adoptionButton,
              pressed && styles.adoptionButtonPressed
            ]}
            onPress={handleNavigateToAdoptionPets}
          >
            <Text style={styles.adoptionButtonTitle}>❤️ Adoção</Text>
            <Text style={styles.adoptionButtonSubtitle}>
              Encontre seu novo companheiro
            </Text>
          </Pressable>
          
          {/* <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Serviços</Text>
            <Text style={styles.sectionText}>
              Em breve você poderá agendar consultas, acompanhar a saúde do seu pet e muito mais!
            </Text>
          </View> */}
          
          {/* <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.sectionText}>
              Encontre a clínica mais próxima de você
            </Text>
          </View> */}


          
          {/* Espaço para não sobrepor o footer */}
          <View style={styles.footerSpacer} />
        </View>
      </ScrollView>
      
      {/* Footer fixo na parte inferior */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  mainContent: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#83af8a',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  petButton: {
    backgroundColor: '#83af8a',
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  petButtonPressed: {
    backgroundColor: '#74a57e',
    transform: [{ scale: 0.98 }],
  },
  petButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  petButtonSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.95,
  },
  adoptionButton: {
    backgroundColor: '#e07b7b',
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  adoptionButtonPressed: {
    backgroundColor: '#d66b6b',
    transform: [{ scale: 0.98 }],
  },
  adoptionButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  adoptionButtonSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.95,
  },
  contentSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerSpacer: {
    height: 80, // Altura do footer + espaço extra
  },
});