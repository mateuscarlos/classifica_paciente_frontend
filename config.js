/* 
====================================
ARQUIVO DE CONFIGURAÇÃO DA API
====================================

Este arquivo contém as configurações para conectar o frontend com o backend.
Altere apenas a variável API_BASE_URL conforme necessário.
*/

// Configuração da URL da API
// IMPORTANTE: Altere esta URL para apontar para seu backend em produção

// ===== DESENVOLVIMENTO LOCAL =====
const API_BASE_URL = 'http://localhost:5000';

// ===== EXEMPLOS PARA PRODUÇÃO =====
// Descomente a linha apropriada e comente a linha de desenvolvimento local

// Heroku
// const API_BASE_URL = 'https://sua-api.herokuapp.com';

// Railway
// const API_BASE_URL = 'https://sua-api.railway.app';

// Render
// const API_BASE_URL = 'https://sua-api.render.com';

// Vercel
// const API_BASE_URL = 'https://sua-api.vercel.app';

// Azure App Service
// const API_BASE_URL = 'https://sua-api.azurewebsites.net';

// AWS Elastic Beanstalk
// const API_BASE_URL = 'https://sua-api.elasticbeanstalk.com';

// DigitalOcean App Platform
// const API_BASE_URL = 'https://sua-api.ondigitalocean.app';

// Servidor personalizado
// const API_BASE_URL = 'https://api.seudominio.com';

// ===== CONFIGURAÇÕES ADICIONAIS =====

// Timeout para requisições (em millisegundos)
const API_TIMEOUT = 10000; // 10 segundos

// Configurações de retry
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

// Configuração de debug (true para ambiente de desenvolvimento)
const DEBUG_MODE = true;

// ===== ENDPOINTS DA API =====
const ENDPOINTS = {
    HEALTH: '/health',
    PREDICT: '/predict'
};

// ===== MENSAGENS DE ERRO =====
const ERROR_MESSAGES = {
    CONNECTION: 'Não foi possível conectar com o servidor. Verifique sua conexão e tente novamente.',
    TIMEOUT: 'A requisição demorou muito para responder. Tente novamente.',
    SERVER_ERROR: 'Erro interno do servidor. Tente novamente em alguns minutos.',
    VALIDATION: 'Dados inválidos. Verifique os campos preenchidos.',
    UNKNOWN: 'Erro inesperado. Tente novamente.'
};

// ===== EXPORTAR CONFIGURAÇÕES =====
// Não modifique esta seção
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_BASE_URL,
        API_TIMEOUT,
        MAX_RETRIES,
        RETRY_DELAY,
        DEBUG_MODE,
        ENDPOINTS,
        ERROR_MESSAGES
    };
}
