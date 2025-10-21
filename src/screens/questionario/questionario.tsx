import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Questionario() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    telefone: "",
    moradia: "",
    residencia: "",
    permissao: "",
    acesso: "",
    protecao: "",
    outrosAnimais: "",
    cuidados: "",
    responsavel: "",
    despesas: "",
    viagem: "",
    cuidadosFinais: "",
    motivacao: "",
    experiencia: "",
    responsabilidade: "",
    concordo: false,
  });

  const handleChange = (campo: keyof typeof form, valor: string) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleSelect = (campo: keyof typeof form, valor: string) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleSubmit = () => {
    if (!form.concordo) {
      Alert.alert("Atenção", "Você deve concordar e autorizar o uso das informações.");
      return;
    }
    Alert.alert("Enviado!", "Formulário enviado com sucesso 🐾");
  };

  const renderSimNao = (campo: keyof typeof form) => (
    <View style={styles.simNaoContainer}>
      {["Sim", "Não"].map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={[
            styles.simNaoBox,
            form[campo] === opcao && styles.simNaoSelecionado,
          ]}
          onPress={() => handleSelect(campo, opcao)}
        >
          <Text style={styles.simNaoTexto}>{opcao}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🐾 Questionário para Adoção de Pet</Text>

      {/* Informações básicas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={22} color="#8ab591" />
          <Text style={styles.sectionTitle}>Informações básicas</Text>
        </View>

        <Text style={styles.label}>Nome completo do adotante:</Text>
        <TextInput style={styles.input} value={form.nome} onChangeText={(v) => handleChange("nome", v)} />

        <Text style={styles.label}>Idade:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={form.idade} onChangeText={(v) => handleChange("idade", v)} />

        <Text style={styles.label}>Telefone / WhatsApp:</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" value={form.telefone} onChangeText={(v) => handleChange("telefone", v)} />

        <Text style={styles.label}>Você mora em:</Text>
        <View style={styles.optionRow}>
          {["Casa", "Apartamento", "Sítio / Chácara"].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.optionBox,
                form.moradia === opcao && styles.optionSelected,
              ]}
              onPress={() => handleSelect("moradia", opcao)}
            >
              <Text style={styles.optionText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ambiente e estrutura */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="home-outline" size={22} color="#8ab591" />
          <Text style={styles.sectionTitle}>Ambiente e estrutura</Text>
        </View>

        <Text style={styles.label}>Sua residência é:</Text>
        <View style={styles.optionRow}>
          {["Própria", "Alugada", "De familiares"].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.optionBox,
                form.residencia === opcao && styles.optionSelected,
              ]}
              onPress={() => handleSelect("residencia", opcao)}
            >
              <Text style={styles.optionText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Caso seja alugada, o proprietário permite animais?</Text>
        {renderSimNao("permissao")}

        <Text style={styles.label}>O animal terá acesso a quais áreas da casa?</Text>
        <View style={styles.optionRow}>
          {["Dentro de casa", "Quintal", "Ambos"].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.optionBox,
                form.acesso === opcao && styles.optionSelected,
              ]}
              onPress={() => handleSelect("acesso", opcao)}
            >
              <Text style={styles.optionText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Há telas de proteção em janelas e varandas (no caso de gatos ou animais pequenos)?
        </Text>
        {renderSimNao("protecao")}

        <Text style={styles.label}>
          Existem outros animais em casa? Quais e quantos? Eles são vacinados e castrados?
        </Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.outrosAnimais}
          onChangeText={(v) => handleChange("outrosAnimais", v)}
        />
      </View>

      {/* Rotina e cuidados */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time-outline" size={22} color="#8ab591" />
          <Text style={styles.sectionTitle}>Rotina e cuidados</Text>
        </View>

        <Text style={styles.label}>Quantas horas por dia o pet ficará sozinho?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.cuidados}
          onChangeText={(v) => handleChange("cuidados", v)}
        />

        <Text style={styles.label}>Quem será o responsável principal pelos cuidados?</Text>
        <TextInput style={styles.input} value={form.responsavel} onChangeText={(v) => handleChange("responsavel", v)} />

        <Text style={styles.label}>
          Você tem condições financeiras de arcar com despesas veterinárias, vacinas, ração e eventuais emergências?
        </Text>
        {renderSimNao("despesas")}

        <Text style={styles.label}>O que pretende fazer com o pet em caso de viagem ou mudança de cidade?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.viagem}
          onChangeText={(v) => handleChange("viagem", v)}
        />

        <Text style={styles.label}>Se o pet adoecer ou envelhecer, você está disposto(a) a cuidar dele até o fim da vida?</Text>
        {renderSimNao("cuidadosFinais")}
      </View>

      {/* Perfil e motivação */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="heart-outline" size={22} color="#8ab591" />
          <Text style={styles.sectionTitle}>Perfil e motivação</Text>
        </View>

        <Text style={styles.label}>Por que você deseja adotar um pet?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.motivacao}
          onChangeText={(v) => handleChange("motivacao", v)}
        />

        <Text style={styles.label}>Você já teve animais anteriormente? Se sim, o que aconteceu com eles?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.experiencia}
          onChangeText={(v) => handleChange("experiencia", v)}
        />

        <Text style={styles.label}>O que você entende sobre responsabilidade e compromisso ao adotar um animal?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.responsabilidade}
          onChangeText={(v) => handleChange("responsabilidade", v)}
        />
      </View>

      {/* Concordância */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleChange("concordo", (!form.concordo).toString())}
        >
          <View style={[styles.checkbox, form.concordo && styles.checkboxAtivo]} />
          <Text style={styles.checkboxLabel}>
            Concordo e autorizo o uso das informações fornecidas para análise de adoção.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.botaoTexto}>Enviar Candidatura</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F8F8F8", padding: 20 },
  header: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: "600", color: "#333", marginLeft: 8 },
  label: { fontSize: 15, color: "#333", marginTop: 10, marginBottom: 5 },
  input: {
    backgroundColor: "#f9f9fa",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionBox: {
    backgroundColor: "#D3E0DE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  optionSelected: { backgroundColor: "#8ab591" },
  optionText: { color: "#333" },
  simNaoContainer: { flexDirection: "row", gap: 10 },
  simNaoBox: {
    backgroundColor: "#D3E0DE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  simNaoSelecionado: { backgroundColor: "#8ab591" },
  simNaoTexto: { color: "#333" },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#8ab591",
    marginRight: 10,
  },
  checkboxAtivo: { backgroundColor: "#a6cfadff" },
  checkboxLabel: { flex: 1, color: "#333", fontSize: 14 },
  botao: { backgroundColor: "#8ab591", borderRadius: 12, padding: 14, alignItems: "center", marginBottom: 40 },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
