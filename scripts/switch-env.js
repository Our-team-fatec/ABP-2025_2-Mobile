const fs = require('fs');
const path = require('path');

const ENV_FILES = {
  dev: '.env.dev',
  prod: '.env.production',
  target: '.env'
};

function switchEnvironment(env) {
  const sourceFile = ENV_FILES[env];
  const targetFile = ENV_FILES.target;
  
  if (!sourceFile) {
    console.error('❌ Ambiente inválido. Use: dev ou prod');
    process.exit(1);
  }
  
  try {
    // Verifica se o arquivo fonte existe
    if (!fs.existsSync(sourceFile)) {
      console.error(`❌ Arquivo ${sourceFile} não encontrado`);
      process.exit(1);
    }
    
    // Copia o arquivo
    fs.copyFileSync(sourceFile, targetFile);
    
    // Lê o conteúdo para mostrar as configurações
    const content = fs.readFileSync(targetFile, 'utf8');
    const apiUrl = content.match(/API_BASE_URL=(.+)/)?.[1] || 'Não encontrada';
    
    if (env === 'dev') {
      console.log('✅ Ambiente alterado para DESENVOLVIMENTO');
      console.log('📍 API:', apiUrl);
      console.log('🔧 Debug: Habilitado');
    } else {
      console.log('✅ Ambiente alterado para PRODUÇÃO');  
      console.log('📍 API:', apiUrl);
      console.log('🔧 Debug: Desabilitado');
    }
    
    console.log('\n🔄 Reinicie o Metro bundler para aplicar as mudanças:');
    console.log('npm start -- --reset-cache');
    
  } catch (error) {
    console.error('❌ Erro ao trocar ambiente:', error.message);
    process.exit(1);
  }
}

// Pega o argumento da linha de comando
const env = process.argv[2];

if (!env) {
  console.log('🔧 Uso: node scripts/switch-env.js [dev|prod]');
  console.log('\nExemplos:');
  console.log('  node scripts/switch-env.js dev   # Para desenvolvimento');  
  console.log('  node scripts/switch-env.js prod  # Para produção');
  process.exit(1);
}

switchEnvironment(env);