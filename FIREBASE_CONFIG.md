# Configuração do Firebase para Carteirinha Pet

## Passos para Configurar

1. **Acesse o Firebase Console**
   - Vá para: https://console.firebase.google.com/
   - Faça login com sua conta Google

2. **Crie um Novo Projeto** (ou use um existente)
   - Clique em "Adicionar projeto"
   - Escolha um nome (ex: "da-vinci-pets")
   - Configure conforme necessário

3. **Ative o Firestore Database**
   - No menu lateral, vá em "Firestore Database"
   - Clique em "Criar banco de dados"
   - Escolha o modo de teste (para desenvolvimento)
   - Selecione a localização

4. **Obtenha as Credenciais do Projeto**
   - Vá em Configurações do Projeto (ícone de engrenagem)
   - Na aba "Geral", role até "Seus apps"
   - Clique no ícone da Web (</>)
   - Registre seu app com um nome
   - Copie o objeto `firebaseConfig`

5. **Substitua as Credenciais no Arquivo HTML**
   
   Abra o arquivo `carteirinha-pet.html` e localize esta seção:

   ```javascript
   const firebaseConfig = {
       apiKey: "SUA_API_KEY",
       authDomain: "SEU_PROJECT_ID.firebaseapp.com",
       projectId: "SEU_PROJECT_ID",
       storageBucket: "SEU_PROJECT_ID.appspot.com",
       messagingSenderId: "SEU_MESSAGING_SENDER_ID",
       appId: "SEU_APP_ID"
   };
   ```

   Substitua pelos valores fornecidos pelo Firebase Console.

## Regras de Segurança do Firestore (Para Desenvolvimento)

No Firebase Console, vá em "Firestore Database" > "Regras" e use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pets/{petId} {
      allow read, write: if true; // APENAS PARA DESENVOLVIMENTO
    }
  }
}
```

⚠️ **IMPORTANTE**: Para produção, implemente regras de segurança adequadas!

## Estrutura de Dados no Firestore

Coleção: `pets`

Documento exemplo:
```json
{
  "id": "pet_1700000000000",
  "nome": "Rex",
  "raca": "Labrador",
  "idade": "3 anos",
  "genero": "Macho",
  "cor": "Caramelo",
  "porte": "Grande",
  "foto": "https://exemplo.com/foto.jpg",
  "dataExpedicao": "19/11/2025",
  "dataAtualizacao": "2025-11-19T12:00:00.000Z"
}
```

## Testando o Aplicativo

1. Abra o arquivo `carteirinha-pet.html` no navegador
2. Preencha os dados do pet no formulário
3. Clique em "Salvar no Firestore"
4. Verifique no Firebase Console se o documento foi criado
5. Teste carregar, listar e excluir pets

## Funcionalidades

- ✅ Salvar pets no Firestore
- ✅ Carregar pets por ID
- ✅ Listar todos os pets cadastrados
- ✅ Excluir pets
- ✅ Visualização em tempo real da carteirinha
- ✅ Exportar/Imprimir PDF
- ✅ Design responsivo verde e branco
- ✅ Placeholder para fotos não informadas
