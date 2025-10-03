import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove o header padrão
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Login',
        }} 
      />
      <Stack.Screen 
        name="cadastro" 
        options={{ 
          title: 'Cadastro',
        }} 
      />
    </Stack>
  );
}