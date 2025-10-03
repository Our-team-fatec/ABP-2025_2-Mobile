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
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/user";
import { LoginForm as Form, loginSchema as Schema } from "../../schemas/login";
import { loginStyles as styles } from "../../styles/login";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
    mode: "onBlur",
  });

  const handleLogin = async (data: Form) => {
    try {
      const response = await loginUser(data);

      Alert.alert("Sucesso!", `Bem-vindo de volta, ${response.data.usuario.nome}!`, [
        {
          text: "OK",
          onPress: () => console.log("Usuário logado:", response),
        },
      ]);
    } catch (error) {
      const mensagemErro =
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Tente novamente.";
      Alert.alert("Erro", mensagemErro);
    }
  };

  const handleLoginError = (errors: FieldErrors<Form>) => {
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
              <Text style={styles.title}>DaVinciPets</Text>
              <Text style={styles.subtitle}>Entre na sua conta</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.text}>Fazer Login</Text>

              {/* <TouchableOpacity style={styles.buttonGoogle}>
                <Text style={styles.buttonGoogleText}>
                  Continuar com Google
                </Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
              </View> */}

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
                    autoCapitalize="none"
                    selectionColor="#89b490"
                  />
                )}
              />

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
                        testID="toggle-password"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.linkText}>Esqueci a senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit(handleLogin, handleLoginError)}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.text}>Não tenho uma conta? </Text>
         
                  <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={styles.linkText}>Criar conta</Text>
                  </TouchableOpacity>

              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
