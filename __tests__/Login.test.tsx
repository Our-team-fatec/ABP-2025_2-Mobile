import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../src/screens/login/login";
import { loginUser } from "../src/services/user";
import { Alert } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../src/App";

// Mock da função loginUser
jest.mock("../src/services/user", () => ({
  loginUser: jest.fn(),
}));

describe("Tela de Login", () => {
  const mockReplace = jest.fn();

  const mockNavigation = {
    replace: mockReplace,
    navigate: jest.fn(),
  } as Partial<NativeStackNavigationProp<RootStackParamList, "Login">> as any;

  const mockRoute: RouteProp<RootStackParamList, "Login"> = {
    key: "LoginKey",
    name: "Login",
    params: undefined,
  };

  beforeEach(() => {
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  const setup = () => render(<Login navigation={mockNavigation} route={mockRoute} />);

  it("deve renderizar a tela de Login corretamente", () => {
    const { getByText, getByPlaceholderText } = setup();

    expect(getByText("Fazer Login")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu e-mail")).toBeTruthy();
    expect(getByPlaceholderText("Digite sua senha")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
    expect(getByText("Não tenho uma conta?")).toBeTruthy();
    expect(getByText("Criar conta")).toBeTruthy();
  });

  it("deve mostrar erro ao tentar logar com campos vazios", async () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Erro",
        expect.stringContaining("preencher")
      );
    });
  });

  it("deve logar com sucesso", async () => {
    const { getByText, getByPlaceholderText } = setup();

    (loginUser as jest.Mock).mockResolvedValue({
      data: { 
        usuario: { nome: "João Teste" },
        accessToken: "token123"
      },
    });

    fireEvent.changeText(getByPlaceholderText("Digite seu e-mail"), "joao@teste.com");
    fireEvent.changeText(getByPlaceholderText("Digite sua senha"), "123456");

    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "joao@teste.com",
        senha: "123456",
      });

      expect(mockReplace).toHaveBeenCalledWith("Home");
    });
  });

  it("deve mostrar erro se o login falhar", async () => {
    const { getByText, getByPlaceholderText } = setup();

    (loginUser as jest.Mock).mockRejectedValue(new Error("E-mail ou senha incorretos"));

    fireEvent.changeText(getByPlaceholderText("Digite seu e-mail"), "joao@teste.com");
    fireEvent.changeText(getByPlaceholderText("Digite sua senha"), "123456");

    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Erro", "E-mail ou senha incorretos");
    });
  });

  it("deve navegar para a tela de Cadastro ao clicar em 'Criar conta'", () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Criar conta"));

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Cadastro");
  });

  it("deve alternar a visibilidade da senha ao clicar no ícone de olho", () => {
    const { getByPlaceholderText, getByTestId } = setup();

    const senhaInput = getByPlaceholderText("Digite sua senha");
    const eyeButton = getByTestId("toggle-password"); // você pode adicionar testID no TouchableOpacity

    expect(senhaInput.props.secureTextEntry).toBe(true);

    fireEvent.press(eyeButton);

    expect(senhaInput.props.secureTextEntry).toBe(false);

    fireEvent.press(eyeButton);

    expect(senhaInput.props.secureTextEntry).toBe(true);
  });
});
