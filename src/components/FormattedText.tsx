import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

interface FormattedTextProps {
  text: string;
  style?: TextStyle;
}

export default function FormattedText({ text, style }: FormattedTextProps) {
  const formatText = (rawText: string) => {
    const lines = rawText.split('\n');
    const elements: React.ReactElement[] = [];
    
    lines.forEach((line, lineIndex) => {
      // Lista numerada (ex: "1. Item", "2. Item")
      const numberedMatch = line.match(/^(\d+)\.\s+\*\*(.*?)\*\*(.*)/);
      if (numberedMatch) {
        elements.push(
          <View key={lineIndex} style={styles.listItem}>
            <Text style={[style, styles.listNumber]}>{numberedMatch[1]}. </Text>
            <View style={styles.listContent}>
              <Text style={[style, styles.bold]}>{numberedMatch[2]}</Text>
              <Text style={style}>{formatInlineText(numberedMatch[3])}</Text>
            </View>
          </View>
        );
        return;
      }

      // Bullet point (ex: "* Item" ou "• Item")
      const bulletMatch = line.match(/^[*•]\s+(.*)/);
      if (bulletMatch) {
        elements.push(
          <View key={lineIndex} style={styles.listItem}>
            <Text style={[style, styles.bullet]}>• </Text>
            <Text style={[style, styles.listText]}>{formatInlineText(bulletMatch[1])}</Text>
          </View>
        );
        return;
      }

      // Linha vazia
      if (line.trim() === '') {
        elements.push(<View key={lineIndex} style={styles.emptyLine} />);
        return;
      }

      // Texto normal com possível formatação inline
      elements.push(
        <Text key={lineIndex} style={style}>
          {formatInlineText(line)}
          {'\n'}
        </Text>
      );
    });
    
    return elements;
  };

  const formatInlineText = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let currentIndex = 0;
    
    // Regex para encontrar **texto em negrito**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Adiciona texto antes do negrito
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      
      // Adiciona texto em negrito
      parts.push(
        <Text key={match.index} style={styles.bold}>
          {match[1]}
        </Text>
      );
      
      currentIndex = match.index + match[0].length;
    }
    
    // Adiciona texto restante
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  return <View style={styles.container}>{formatText(text)}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  listNumber: {
    fontWeight: 'bold',
    minWidth: 24,
  },
  listContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bullet: {
    fontWeight: 'bold',
    minWidth: 16,
  },
  listText: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  emptyLine: {
    height: 8,
  },
});
