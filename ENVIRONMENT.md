# 🔧 Gerenciamento de Ambientes

Este projeto suporta múltiplos ambientes com variáveis de ambiente configuráveis.

## 📁 Arquivos de Ambiente

- `.env` - Ambiente atual (ignorado pelo git)
- `.env.dev` - Template para desenvolvimento 
- `.env.production` - Configurações de produção

## 🚀 Como Usar

### Trocar para Desenvolvimento
```bash
npm run env:dev
# ou
node scripts/switch-env.js dev
```

### Trocar para Produção  
```bash
npm run env:prod
# ou
node scripts/switch-env.js prod
```

### Verificar Ambiente Atual
```bash
npm run env:info
```

### Iniciar com Cache Limpo
```bash
npm start -- --reset-cache
```

## ⚙️ Variáveis Disponíveis

| Variável | Desenvolvimento | Produção |
|----------|----------------|----------|
| `NODE_ENV` | development | production |
| `API_BASE_URL` | http://localhost:3000/api | URL PRIVADA |
| `DEBUG_MODE` | true | false |
| `APP_NAME` | Da Vinci Pets | Da Vinci Pets |
| `APP_VERSION` | 1.0.0 | 1.0.0 |

## 💻 Usando no Código

```typescript
import { Environment } from '@/utils/environment';

// Acessar variáveis
console.log(Environment.API_BASE_URL);
console.log(Environment.IS_DEV);
console.log(Environment.DEBUG_MODE);

// Métodos utilitários
if (Environment.isDevelopment()) {
  console.log('Modo desenvolvimento');
}

// Log apenas em dev
Environment.log('Debug info:', data);
```

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento Local:**
   ```bash
   npm run env:dev
   npm start
   ```

2. **Build para Produção:**
   ```bash
   npm run env:prod
   npm start -- --reset-cache
   ```

3. **Deploy:**
   - Configure as variáveis no seu serviço de deploy
   - Use o arquivo `.env.production` como referência

## ⚠️ Importante

- Nunca commite o arquivo `.env` 
- Sempre use `.env.example` como template
- Configure a URL de produção no `.env.production`
- Reinicie o Metro bundler após trocar ambiente