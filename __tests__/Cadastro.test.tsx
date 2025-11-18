import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Cadastro from "../src/screens/cadastro/cadastro";
import { registerUser } from "../src/services/user";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../src/App";
import type { RouteProp } from "@react-navigation/native";
import { Alert } from "react-native";

// Mock da função registerUser
jest.mock("../src/services/user", () => ({
  registerUser: jest.fn(),
}));

describe("Tela de Cadastro", () => {
  const mockNavigate = jest.fn();

   const mockNavigation = {
    navigate: mockNavigate,
  } as Partial<NativeStackNavigationProp<RootStackParamList, "Cadastro">> as any;

  const mockRoute: RouteProp<RootStackParamList, "Cadastro"> = {
  key: "CadastroKey",
  name: "Cadastro",
  params: undefined,
};

  beforeEach(() => {
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    jest.clearAllMocks();
  });


  const setup = () =>
    render(<Cadastro navigation={mockNavigation} route={mockRoute} />);

  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  it("deve renderizar a tela de Cadastro corretamente", () => {
    const { getByText, getByPlaceholderText } = setup();

    expect(getByText("Criar Conta")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu nome completo")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu e-mail")).toBeTruthy();
    expect(getByPlaceholderText("Digite sua senha")).toBeTruthy();
    expect(getByPlaceholderText("Confirme sua senha")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu endereço")).toBeTruthy();
    expect(getByText("➜   Criar conta")).toBeTruthy();
  });

  it("deve navegar para a tela de Login ao clicar em 'Fazer Login'", () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Fazer Login"));

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
