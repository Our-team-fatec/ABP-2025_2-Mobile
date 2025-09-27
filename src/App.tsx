import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
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
          
          {/* Área para conteúdo futuro */}
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Serviços</Text>
            <Text style={styles.sectionText}>
              Em breve você poderá agendar consultas, acompanhar a saúde do seu pet e muito mais!
            </Text>
          </View>
          
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.sectionText}>
              Encontre a clínica mais próxima de você
            </Text>
          </View>
          
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