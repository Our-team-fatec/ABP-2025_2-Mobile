# Instruções de Instalação - Exportar Carteirinha Pet

## Dependências Necessárias

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install react-native-view-shot expo-sharing expo-file-system expo-media-library
```

## Permissões Necessárias (app.json)

Adicione as seguintes permissões no arquivo `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Permitir que $(PRODUCT_NAME) acesse suas fotos para salvar a carteirinha.",
          "savePhotosPermission": "Permitir que $(PRODUCT_NAME) salve fotos na galeria."
        }
      ]
    ],
    "ios": {
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "Precisamos de acesso à galeria para salvar a carteirinha do seu pet.",
        "NSPhotoLibraryAddUsageDescription": "Precisamos de permissão para salvar a carteirinha na sua galeria."
      }
    },
    "android": {
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_IMAGES"
      ]
    }
  }
}
```

## Como Usar

1. **Visualizar Pet**: Abra o modal de visualização de um pet
2. **Exportar**: Clique no botão "Exportar Carteirinha"
3. **Visualizar Carteirinha**: Uma nova modal será exibida com a carteirinha do pet
4. **Exportar**: Clique em "Exportar" para escolher entre:
   - **Compartilhar**: Compartilha a carteirinha através de apps (WhatsApp, Email, etc.)
   - **Salvar na Galeria**: Salva a carteirinha diretamente na galeria de fotos do dispositivo

## Funcionalidades Implementadas

✅ **Componente PetCarteirinha** (`src/components/PetCarteirinha.tsx`)
- Design verde e branco conforme especificado
- Exibe foto do pet ou placeholder
- Mostra informações: Nome, Raça, Idade, Sexo, Cor, Peso
- Gera ID único e data de expedição
- Captura de screenshot da carteirinha

✅ **Botão Exportar no ViewPetModal** (`src/components/ViewPetModal.tsx`)
- Novo botão "Exportar Carteirinha" com ícone
- Abre modal da carteirinha ao clicar

✅ **Opções de Exportação**
- Compartilhamento via apps nativos
- Salvamento na galeria do dispositivo
- Tratamento de permissões
- Mensagens de sucesso/erro

## Estrutura de Arquivos Criados/Modificados

```
src/
  components/
    PetCarteirinha.tsx          ← NOVO: Componente da carteirinha
    ViewPetModal.tsx            ← MODIFICADO: Adicionado botão exportar
  styles/
    cadastroPet.ts              ← MODIFICADO: Adicionado estilo do botão
```

## Testando

1. Execute `npm start` para iniciar o app
2. Abra um pet existente
3. Clique em "Exportar Carteirinha"
4. Teste as opções de compartilhar e salvar

## Observações

- A carteirinha é gerada em tempo real com os dados do pet
- O ID é gerado automaticamente no formato "PET" + timestamp
- A data de expedição é a data atual
- Funciona tanto em iOS quanto em Android
- Requer permissões de galeria para salvar imagens
