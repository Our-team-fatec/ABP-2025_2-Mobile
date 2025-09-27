import React, { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,ScrollView,KeyboardAvoidingView,Platform,SafeAreaView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Cadastro(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleCadastro = () => {
        if(!nome || !email || !senha){
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }
        Alert.alert("Sucesso", "Conta criada com sucesso!");
    };

    const handleLogin = () => {
        Alert.alert("Info", "Redirecionando para login...");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
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
                            <TouchableOpacity style={styles.buttonGoogle}>
                                <Text style={styles.buttonGoogleText}>Continuar com o Google</Text>
                            </TouchableOpacity>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine}/>
                                <Text style={styles.separatorText}>ou</Text>
                                <View style={styles.separatorLine}/>
                            </View>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name="perm-identity" size={16} color="#666" />
                                <Text style={styles.labelText}>Nome completo</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu nome completo"
                                value={nome}
                                onChangeText={setNome}
                            />
                            <View style={styles.labelContainer}>
                                <MaterialIcons name="email" size={16} color="#666" />
                                <Text style={styles.labelText}>E-mail</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                selectionColor="#89b490"
                            />
                            <View style={styles.labelContainer}>
                                <MaterialIcons name="lock" size={16} color="#666" />
                                <Text style={styles.labelText}>Senha</Text>
                            </View>
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
                            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                                <Text style={styles.buttonText}>➜   Criar conta</Text>
                            </TouchableOpacity>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine}/>
                            </View>
                            <View style={styles.loginContainer}>
                                <Text style={styles.subtitle}>Já tem uma conta? </Text>
                                <TouchableOpacity onPress={handleLogin}>
                                    <Text style={styles.linkText}>Fazer Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
    
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fafcfa",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 32,
    },
    container: {
        width: "100%",
        maxWidth: 420,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginBottom: 15,
    },
    title: {
        fontFamily: "Arial",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: "300",
        color: "#666",
        textAlign: 'center'
    },
    text: {
        fontFamily: "Arial",
        fontSize: 16,
        textAlign: "center",
    },
    labelText: {
        fontFamily: "Arial",
        fontSize: 14,
        marginLeft: 6,
        color: '#333',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    formContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 30,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#9fb9a4ff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
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
    button: {
        backgroundColor: "#89b490",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    buttonGoogle: { 
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderColor: "rgba(37, 37, 37, 0.33)",
        borderWidth: 1,
        padding: 12,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonGoogleText: {
        color: "#000000ff",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    linkText: {
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: "500",
        color: "#89b490",
        textDecorationLine: 'underline',
    }
})