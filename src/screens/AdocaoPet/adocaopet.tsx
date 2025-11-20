import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ActionButton } from "../../components/ActionButton";
import ViewAdocaoModal from "../../components/ViewAdocaoModal";
import { AddAdocaoModal } from "../../components/AddAdocaoModal";
import { EditAdocaoModal } from "../../components/EditAdocaoModal";
import type { PetData } from "../../types/pet";
import AdocaoCard from "../../components/AdocaoCard";
import { getPublicPets, listPets, type Pet } from "../../services/pet";
import { createAdocao, getAdocaoById, getMyAdocoes, updateAdocao, deleteAdocao, type Adocao, type CreateAdocaoRequest, type UpdateAdocaoRequest } from "../../services/adocao";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";

export default function AdocaoPet() {
  const [search, setSearch] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const [selectedAdocaoDescricao, setSelectedAdocaoDescricao] = useState("");
  const [selectedAdocaoEndereco, setSelectedAdocaoEndereco] = useState("");
  const [selectedAdocaoContato, setSelectedAdocaoContato] = useState("");
  const [selectedAdocaoCriadoEm, setSelectedAdocaoCriadoEm] = useState("");
  
  // Estados para os modais de adoção
  const [isAddAdocaoModalVisible, setIsAddAdocaoModalVisible] = useState(false);
  const [isEditAdocaoModalVisible, setIsEditAdocaoModalVisible] = useState(false);
  const [editingAdocao, setEditingAdocao] = useState<Adocao | null>(null);
  
  // Estados para pets do usuário (para o select do modal)
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [isLoadingMyPets, setIsLoadingMyPets] = useState(false);
  
  // Estado para filtrar apenas minhas adoções
  const [showOnlyMyAdocoes, setShowOnlyMyAdocoes] = useState(false);
  
  // Estado para pull to refresh
  const [isRefreshing, setIsRefreshing] = useState(false);

  const convertPetToPetData = (pet: Pet): PetData => ({
    name: pet.nome,
    species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
    breed: pet.raca,
    gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
    age: pet.idade ? `${pet.idade} anos` : 'Não informada',
    color: pet.cor,
    image: pet.imagens?.[0],
    images: pet.imagens,
    status: pet.status?.map(s => ({
      label: s.label,
      type: (s.type === 'PENDENTE' ? 'pendente' : 
            s.type === 'EM_DIA' ? 'aviso' : 
            s.type === 'ALERTA' ? 'consulta' : 'vacinacao') 
    })) || []
  });

  // sem dropdown de espécie nesta tela (apenas listagem pública)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    loadPets(1);
    loadMyPets();
  }, []);

  useEffect(() => {
    console.log("Estado do modal de edição mudou:", isEditAdocaoModalVisible);
    console.log("Adoção sendo editada:", editingAdocao);
  }, [isEditAdocaoModalVisible, editingAdocao]);
  
  useEffect(() => {
    if (showOnlyMyAdocoes) {
      loadMyAdocoes();
    } else {
      loadPets(1);
    }
  }, [showOnlyMyAdocoes]);

  const loadPets = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const response = await getPublicPets({ page, limit: 10 });
      
      if (append) {
        setPets(prev => [...prev, ...response.data.pets]);
      } else {
        setPets(response.data.pets);
      }
      
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a lista de pets");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadPets(currentPage + 1, true);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      handleLoadMore();
    }
  };
  
  // Função de refresh (pull to refresh)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (showOnlyMyAdocoes) {
        await loadMyAdocoes();
      } else {
        await loadPets(1);
      }
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Carrega os pets do usuário para o select do modal
  const loadMyPets = async () => {
    try {
      setIsLoadingMyPets(true);
      const response = await listPets({ onlyMine: true, limit: 100 });
      setMyPets(response.data.pets);
    } catch (err) {
      console.error("Erro ao carregar meus pets:", err);
    } finally {
      setIsLoadingMyPets(false);
    }
  };
  
  // Carrega apenas as adoções do usuário
  const loadMyAdocoes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getMyAdocoes();
      const petsWithAdocao = response.data.adocoes
        .filter(adocao => adocao.pet !== undefined)
        .map(adocao => ({
          ...adocao.pet!,
          adocao: {
            id: adocao.id,
            descricao: adocao.descricao,
            endereco: adocao.endereco,
            contato: adocao.contato,
            criado_em: adocao.criado_em,
          }
        }));
      
      setPets(petsWithAdocao);
      setHasMore(false); // Não há paginação para minhas adoções
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar suas adoções");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cria um novo anúncio de adoção
  const handleCreateAdocao = async (data: CreateAdocaoRequest) => {
    try {
      await createAdocao(data);
      Alert.alert("Sucesso", "Anúncio de adoção criado com sucesso!");
      
      // Recarrega a lista
      if (showOnlyMyAdocoes) {
        loadMyAdocoes();
      } else {
        loadPets(1);
      }
    } catch (error) {
      throw error;
    }
  };
  
  // Abre o modal de edição buscando os detalhes completos da adoção
  const handleEditAdocao = async (adocaoId: string) => {
    try {
      console.log("Editando adoção ID:", adocaoId);
      
      // Primeiro carrega os dados
      const response = await getAdocaoById(adocaoId);
      console.log("Resposta da API getAdocaoById:", JSON.stringify(response, null, 2));
      
      // Verifica se recebeu os dados
      if (!response || !response.adocao) {
        throw new Error("Dados da adoção não encontrados na resposta");
      }
      
      console.log("Dados da adoção carregados:", response.adocao);
      
      // Só então define o estado e abre o modal
      setEditingAdocao(response.adocao);
      
      // Aguarda um pouco para garantir que o estado foi atualizado
      setTimeout(() => {
        setIsEditAdocaoModalVisible(true);
      }, 100);
      
    } catch (error) {
      console.error("Erro ao carregar adoção:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados da adoção");
    }
  };
  
  // Atualiza uma adoção existente
  const handleUpdateAdocao = async (adocaoId: string, data: UpdateAdocaoRequest) => {
    try {
      console.log("Atualizando adoção:", adocaoId, "com dados:", data);
      await updateAdocao(adocaoId, data);
      console.log("Adoção atualizada com sucesso!");
      
      // Fecha o modal e limpa o estado
      setIsEditAdocaoModalVisible(false);
      setEditingAdocao(null);
      
      Alert.alert("Sucesso", "Anúncio atualizado com sucesso!");
      
      // Recarrega a lista
      if (showOnlyMyAdocoes) {
        loadMyAdocoes();
      } else {
        loadPets(1);
      }
    } catch (error) {
      console.error("Erro ao atualizar adoção:", error);
      throw error;
    }
  };
  
  // Exclui uma adoção
  const handleDeleteAdocao = async (adocaoId: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja remover este anúncio de adoção?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAdocao(adocaoId);
              Alert.alert("Sucesso", "Anúncio removido com sucesso!");
              
              // Recarrega a lista
              if (showOnlyMyAdocoes) {
                loadMyAdocoes();
              } else {
                loadPets(1);
              }
            } catch (error) {
              Alert.alert("Erro", "Não foi possível remover o anúncio");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 120 }}
          onScroll={handleScroll}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#74a57e"]}
              tintColor="#74a57e"
              title="Atualizando..."
              titleColor="#6b7280"
            />
          }
        >
          <Text style={styles.sectionTitle}>
            Pets Disponíveis para Adoção
          </Text>
          <Text style={styles.sectionSubtitle}>
            Encontre seu novo companheiro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar pet..."
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.actionsRow}>
            <ActionButton
              label="Criar Anúncio"
              icon="add"
              variant="add"
              onPress={() => setIsAddAdocaoModalVisible(true)}
            />
            <ActionButton
              label="Minhas Adoções"
              icon="favorite"
              variant={showOnlyMyAdocoes ? "adoption" : "default"}
              onPress={() => setShowOnlyMyAdocoes(!showOnlyMyAdocoes)}
            />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando pets disponíveis...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={24} color="#ff6b6b" />
              <Text style={styles.errorText}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={() => loadPets(1)}>
                <Text style={styles.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
            </View>
          ) : pets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="pets" size={48} color="#74a57e" />
              <Text style={styles.emptyText}>Nenhum pet disponível para adoção</Text>
              <Text style={styles.emptySubtext}>No momento não há pets cadastrados</Text>
            </View>
          ) : (
            pets
            .filter((pet) =>
              pet.nome.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((pet) => (
              <AdocaoCard
                key={pet.id}
                adocaoId={pet.adocao?.id}
                pet={{
                  name: pet.nome,
                  breed: pet.raca,
                  species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
                  gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
                  age: pet.idade ? `${pet.idade} anos` : 'Não informada',
                  image: pet.imagens?.[0],
                  size: pet.porte === 'PEQUENO' ? 'Pequeno porte' : 
                         pet.porte === 'MEDIO' ? 'Médio porte' : 'Grande porte',
                  color: pet.cor,
                  status: [],
                  images: pet.imagens
                }}
                descricao={pet.adocao?.descricao}
                endereco={pet.adocao?.endereco}
                onView={() => {
                  setSelectedPet(convertPetToPetData(pet));
                  setSelectedAdocaoDescricao(pet.adocao?.descricao || "");
                  setSelectedAdocaoEndereco(pet.adocao?.endereco || "");
                  setSelectedAdocaoContato(pet.adocao?.contato || "");
                  setSelectedAdocaoCriadoEm(pet.adocao?.criado_em || "");
                  setIsViewModalVisible(true);
                }}
                onEdit={() => {
                  console.log("Clicou em editar. Pet:", pet.nome, "Adocao:", pet.adocao);
                  if (pet.adocao) {
                    handleEditAdocao(pet.adocao.id);
                  } else {
                    Alert.alert("Erro", "Dados da adoção não encontrados");
                  }
                }}
                onDelete={() => pet.adocao && handleDeleteAdocao(pet.adocao.id)}
                showActions={showOnlyMyAdocoes}
              />
            ))
          )}
          
          {isLoadingMore && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando mais pets...</Text>
            </View>
          )}
        </ScrollView>

        <ViewAdocaoModal
          visible={isViewModalVisible}
          onClose={() => setIsViewModalVisible(false)}
          pet={selectedPet}
          descricao={selectedAdocaoDescricao}
          endereco={selectedAdocaoEndereco}
          contato={selectedAdocaoContato}
          criado_em={selectedAdocaoCriadoEm}
        />
        
        <AddAdocaoModal
          visible={isAddAdocaoModalVisible}
          onClose={() => setIsAddAdocaoModalVisible(false)}
          onSubmit={handleCreateAdocao}
          pets={myPets}
        />
        
        <EditAdocaoModal
          visible={isEditAdocaoModalVisible}
          onClose={() => {
            setIsEditAdocaoModalVisible(false);
            setEditingAdocao(null);
          }}
          onSubmit={handleUpdateAdocao}
          adocao={editingAdocao}
        />
      </View>
      <Footer />
    </View>
  );
}
