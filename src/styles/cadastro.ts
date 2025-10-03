import { StyleSheet } from "react-native";

export const cadastroStyles = StyleSheet.create({
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
        margin: 10,
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
    },
    inputError: {
        borderColor: "#e74c3c",
        borderWidth: 2,
    },
    buttonDisabled: {
        backgroundColor: "#c0c0c0",
        opacity: 0.7,
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
        fontStyle: "italic",
    },
})