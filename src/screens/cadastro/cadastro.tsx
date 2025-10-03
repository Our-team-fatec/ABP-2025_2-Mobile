import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../services/user";
import { cadastroStyles as styles } from "../../styles/cadastro";
import {
  CadastroForm as Form,
  cadastroSchema as Schema,
} from "../../schemas/cadastro";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function Cadastro({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
    mode: "onBlur",
  });

  const handleCadastro = async (data: Form) => {
    try {
      const { confirmarSenha, ...userData } = data;
      const response = await registerUser({ ...userData });

      Alert.alert(
        "Sucesso!",
        `Conta criada com sucesso!\nBem-vindo, ${response?.nome ?? "usuário"}!`,
        [
          {
            text: "OK",
            onPress: () => console.log("Usuário cadastrado:", response),
          },
        ]
      );
    } catch (error) {
      const mensagemErro =
        error instanceof Error
          ? error.message
          : "Erro ao criar conta. Tente novamente.";
      Alert.alert("Erro", mensagemErro);
    }
  };

  const handleCadastroError = (errors: FieldErrors<Form>) => {
    const mensagens = Object.values(errors)
      .map((err) => err?.message)
      .filter(Boolean);

    Alert.alert(
      "Erro",
      mensagens.length > 0
        ? mensagens.join("\n")
        : "Preencha todos os campos corretamente."
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("../../../assets/favicon.png")}
                style={styles.icon}
              />
              <Text style={styles.title}>Da Vinci Pets</Text>
              <Text style={styles.subtitle}>Crie sua conta</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.text}>Criar Conta</Text>
              {/* <TouchableOpacity style={styles.buttonGoogle}>
                <Text style={styles.buttonGoogleText}>
                  Continuar com o Google
                </Text>
              </TouchableOpacity>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
              </View> */}
              <View style={styles.labelContainer}>
                <MaterialIcons name="perm-identity" size={16} color="#666" />
                <Text style={styles.labelText}>Nome completo</Text>
              </View>
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.nome && styles.inputError]}
                    placeholder="Digite seu nome completo"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.nome && (
                <Text style={styles.errorText}>{errors.nome.message}</Text>
              )}
              <View style={styles.labelContainer}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={styles.labelText}>E-mail</Text>
              </View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Digite seu e-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    selectionColor="#89b490"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
              <View style={styles.labelContainer}>
                <MaterialIcons name="lock" size={16} color="#666" />
                <Text style={styles.labelText}>Senha</Text>
              </View>
              <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.passwordContainer,
                      errors.senha && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Digite sua senha"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      selectionColor="#89b490"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={togglePasswordVisibility}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.senha && (
                <Text style={styles.errorText}>{errors.senha.message}</Text>
              )}
              <View style={styles.labelContainer}>
                <MaterialIcons name="lock" size={16} color="#666" />
                <Text style={styles.labelText}>Confirme sua senha</Text>
              </View>
              <Controller
                control={control}
                name="confirmarSenha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.passwordContainer,
                      errors.confirmarSenha && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Confirme sua senha"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showConfirmPassword}
                      selectionColor="#89b490"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <MaterialIcons
                        name={
                          showConfirmPassword ? "visibility" : "visibility-off"
                        }
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmarSenha && (
                <Text style={styles.errorText}>
                  {errors.confirmarSenha.message}
                </Text>
              )}
              <View style={styles.labelContainer}>
                <MaterialIcons name="home" size={16} color="#666" />
                <Text style={styles.labelText}>Endereço</Text>
              </View>
              <Controller
                control={control}
                name="endereco"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.endereco && styles.inputError]}
                    placeholder="Digite seu endereço"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    selectionColor="#89b490"
                  />
                )}
              />
              {errors.endereco && (
                <Text style={styles.errorText}>{errors.endereco.message}</Text>
              )}
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit(handleCadastro, handleCadastroError)}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Criando..." : "➜   Criar conta"}
                </Text>
              </TouchableOpacity>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
              </View>
              <View style={styles.loginContainer}>
                <Text style={styles.subtitle}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.linkText}>Fazer Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
