// Configuração da API - Carregada do arquivo config.js
// Para alterar a URL da API, edite o arquivo config.js

// Elementos do DOM
const patientForm = document.getElementById('patientForm');
const formSection = document.querySelector('.form-section');
const resultsSection = document.getElementById('resultsSection');
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');

// Elementos de resultado
const resultAge = document.getElementById('resultAge');
const resultGender = document.getElementById('resultGender');
const riskClass = document.getElementById('riskClass');
const riskLetter = document.getElementById('riskLetter');
const riskInterpretation = document.getElementById('riskInterpretation');
const confidence = document.getElementById('confidence');
const errorMessage = document.getElementById('errorMessage');

// Mapeamento de labels em português
const ageLabels = {
    '0-18': '0-18 anos',
    '19-35': '19-35 anos',
    '36-60': '36-60 anos',
    '61+': '61+ anos'
};

const genderLabels = {
    'Masculino': 'Masculino',
    'Feminino': 'Feminino',
    'Outro': 'Outro'
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Classificação de Pacientes iniciado');
    console.log('URL da API:', API_BASE_URL);
    checkAPIHealth();
});

patientForm.addEventListener('submit', handleFormSubmit);

// Verificar se a API está funcionando
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'healthy' && data.modelo_carregado) {
            console.log('✅ API funcionando e modelo carregado');
        } else {
            console.warn('⚠️ API funcionando mas modelo não carregado');
        }
    } catch (error) {
        console.error('❌ Erro ao conectar com a API:', error);
        showError(`Erro de conexão com o servidor (${API_BASE_URL}). Verifique se a API está rodando e se a URL está correta.`);
    }
}

// Manipular envio do formulário
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(patientForm);
    const ageGroup = formData.get('age_group');
    const gender = formData.get('gender');
    
    // Validação básica
    if (!ageGroup || !gender) {
        showError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    try {
        const prediction = await classifyPatient(ageGroup, gender);
        showResults(ageGroup, gender, prediction);
    } catch (error) {
        console.error('Erro na classificação:', error);
        showError(error.message || 'Erro inesperado ao classificar paciente.');
    }
}

// Fazer requisição para classificar paciente
async function classifyPatient(ageGroup, gender) {
    const requestBody = {
        age_group: ageGroup,
        gender: gender
    };
    
    console.log('Enviando dados para classificação:', requestBody);
    
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `Erro HTTP: ${response.status}`);
        }
        
        if (!data.success) {
            throw new Error(data.error || 'Erro na resposta da API');
        }
        
        console.log('Resposta da API:', data);
        return data;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error(`Não foi possível conectar com a API em ${API_BASE_URL}. Verifique se o backend está rodando.`);
        }
        throw error;
    }
}

// Mostrar seção de loading
function showLoading() {
    hideAllSections();
    loadingSection.style.display = 'block';
}

// Mostrar resultados
function showResults(ageGroup, gender, data) {
    hideAllSections();
    
    // Preencher dados do paciente
    resultAge.textContent = ageLabels[ageGroup] || ageGroup;
    resultGender.textContent = genderLabels[gender] || gender;
    
    // Preencher resultado da classificação
    const prediction = data.prediction;
    const riskLevelClass = `risk-${prediction.risk_class.toLowerCase()}`;
    
    riskLetter.textContent = prediction.risk_class;
    riskClass.className = `risk-class ${riskLevelClass}`;
    riskInterpretation.textContent = prediction.interpretation;
    confidence.textContent = prediction.confidence;
    
    // Mostrar seção de resultados
    resultsSection.style.display = 'block';
    
    // Scroll suave para os resultados
    resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Mostrar erro
function showError(message) {
    hideAllSections();
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
}

// Esconder todas as seções
function hideAllSections() {
    resultsSection.style.display = 'none';
    loadingSection.style.display = 'none';
    errorSection.style.display = 'none';
}

// Resetar formulário para nova classificação
function resetForm() {
    hideAllSections();
    patientForm.reset();
    
    // Scroll para o formulário
    formSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Função para copiar resultado (funcionalidade extra)
function copyResults() {
    const ageText = resultAge.textContent;
    const genderText = resultGender.textContent;
    const riskText = riskLetter.textContent;
    const interpretationText = riskInterpretation.textContent;
    const confidenceText = confidence.textContent;
    
    const resultText = `
Classificação de Paciente - Home Care
=====================================
Idade: ${ageText}
Gênero: ${genderText}
Classificação de Risco: ${riskText}
Interpretação: ${interpretationText}
Confiança: ${confidenceText}%
=====================================
Gerado em: ${new Date().toLocaleString('pt-BR')}
    `.trim();
    
    navigator.clipboard.writeText(resultText).then(() => {
        // Mostrar feedback visual
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar resultado');
    });
}

// Adicionar botão de copiar resultado (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.querySelector('.results-container');
    
    if (resultsContainer) {
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar Resultado';
        copyBtn.onclick = copyResults;
        copyBtn.style.cssText = `
            background: #17a2b8;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 0.9rem;
            cursor: pointer;
            margin-top: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: background-color 0.3s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', function() {
            this.style.background = '#138496';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.background = '#17a2b8';
        });
        
        resultsContainer.appendChild(copyBtn);
    }
});

// Log de inicialização
console.log('🚀 Frontend do Sistema de Classificação de Pacientes carregado');
console.log('📡 API URL configurada:', API_BASE_URL);
console.log('💡 Para alterar a URL da API, edite o arquivo config.js');
