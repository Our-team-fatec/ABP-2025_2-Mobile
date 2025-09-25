import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import AuthHeader from "../components/auth/AuthHeader";
import CustomInput from "../components/auth/customInput";
import PasswordInput from "../components/auth/PasswordInput";
import CustomButton from "../components/auth/customButton";
import SocialButton from "../components/auth/SocialButton";
import Separator from "../components/auth/Separator";
import AuthLink from "../components/auth/AuthLink";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    Alert.alert("Login", `Email: ${email}\nSenha: ${senha}`);
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        logo={require("../../assets/favicon.png")}
        title="DaVinciPets"
        subtitle="Entre na sua conta"
      />

      <SocialButton title="Continuar com Google" icon="account-circle" onPress={() => Alert.alert("Google Login")} />

      <Separator />

      <CustomInput label="Email" placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} />
      <PasswordInput label="Senha" value={senha} onChangeText={setSenha} />

      <AuthLink label="Esqueci a senha?" href="/forgot" />
      <CustomButton title="Entrar" onPress={handleLogin} />

      <Separator text="" />
      <AuthLink label="Criar conta" href="/register" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fafcfa" },
});
