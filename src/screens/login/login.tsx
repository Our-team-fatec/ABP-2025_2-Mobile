import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Pressable} from "react-native";
import { Link } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // Aqui futuramente você chama sua API
    Alert.alert("Login", `Email: ${email}\nSenha: ${senha}`);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    

  return (
    <View style={styles.container}>
        <View style={styles.image}>
            <Image
                source={require("../../../assets/favicon.png")}
                style={{width: 65, height: 65}}
            />
            <Text style={styles.title}>DaVinciPets</Text>
            <Text style={styles.text}>Entre na sua conta</Text>
        </View>
        <View style={styles.containerLogin}>
            <Text style={styles.text}>Fazer Login</Text>

            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.buttonTextGoogle}>Continuar com Google</Text>
            </TouchableOpacity>
          <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine}/>
                    <Text style={styles.separatorText}>ou</Text>
                    <View style={styles.separatorLine}/>
                </View>

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
            <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!showPassword}
                        selectionColor="#89b490"
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}> 
                        <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#666"/>
                    </TouchableOpacity>
                </View>
            <Link href="/other" asChild>
                <Pressable>
                    <Text style={styles.links}>Esqueci a senha?</Text>
                </Pressable>
            </Link>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine}/>
            </View>
            <Text>Não tenho uma conta? <Link href={"/other"}><Pressable><Text style={styles.links}>Criar conta</Text></Pressable></Link></Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

  containerLogin:{
    flex: 1,
    width: "100%",
    shadowRadius: 5,
    shadowColor: "#c9c9c9ff",
    shadowOpacity: 0.1,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: "#ffffffff" ,
    padding: 8,
    marginVertical: 0,
},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fafcfa",
  },
  title: {
    fontSize: 23,
    fontFamily: "arial",
    fontWeight: "bold",
    marginBottom: 5,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#9fb9a4ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#74a57f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    width: "100%",
    height: 35,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontFamily: "arial",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonTextGoogle: {
    fontFamily: "arial",
    color: "#000000",
    fontSize: 14,
  },
  image: {
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: "arial",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  links: {
    color: "green",
    fontFamily: "arial",
    fontSize: 14,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "right",
  },
  separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd'
    },
    separatorText: {
        marginHorizontal: 15,
        fontSize: 14,
        color: '#666',
        fontWeight: "200"
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#9fb9a4ff",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 12,
    },

})
