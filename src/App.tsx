import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/login/login";
import Cadastro from "./screens/cadastro/cadastro";
import Home from "./screens/home/Home";
import CadastroPet from "./screens/CadastroPet/cadastropet";
import AdocaoPet from "./screens/AdocaoPet/adocaopet";
import Chatbot from "./screens/chatbot/chatbot";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  CadastroPet: undefined;
  AdocaoPet: undefined;
  Chatbot: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroPet" component={CadastroPet} />
        <Stack.Screen name="AdocaoPet" component={AdocaoPet} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
