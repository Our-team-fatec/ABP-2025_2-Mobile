import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Image,
  Pressable,
} from "react-native";
import { Link } from 'expo-router';


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // Aqui futuramente você chama sua API
    Alert.alert("Login", `Email: ${email}\nSenha: ${senha}`);
  };

  return (
    <View style={styles.container}>
        <View style={styles.image}>
            <Image
                source={require("../../../assets/favicon.png")}
                style={{width: 100, height: 100}}
            />
            <Text style={styles.title}>Da Vinci Pets</Text>
            <Text style={styles.text}>Entre na sua conta</Text>
        </View>
        <View style={styles.containerLogin}>
            <Text style={styles.text}>Fazer Login</Text>

            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.buttonTextGoogle}>Continuar com Google</Text>
            </TouchableOpacity>
            <Text style={styles.text}>ou</Text>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Link href="/other" asChild>
                <Pressable>
                    <Text style={styles.links}>Esqueci a senha?</Text>
                </Pressable>
            </Link>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text>Não tenho uma conta? <Link href={"/other"}><Pressable><Text style={styles.links}>Criar conta</Text></Pressable></Link></Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

  containerLogin:{
    flex: 1,
    width: "100%",
},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextGoogle: {
    color: "#000000",
    fontSize: 16,
  },
  image: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  links: {
    color: "green"
  }
})
