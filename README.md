# Sistema de Classificação de Pacientes - Frontend

Interface web moderna para o sistema de classificação de risco de pacientes em Home Care.

## 📋 Sobre o Projeto

Este é o frontend do sistema de classificação de pacientes, uma aplicação web responsiva que permite aos profissionais de saúde inserir dados de pacientes e obter classificações de risco em tempo real.

## 🚀 Características

- **Interface Intuitiva**: Design moderno e responsivo
- **Classificação em Tempo Real**: Resultados instantâneos via API
- **Feedback Visual**: Indicadores visuais para diferentes níveis de risco
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Validação de Dados**: Validação de entrada e tratamento de erros

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Styling moderno com gradientes e animações
- **JavaScript (ES6+)**: Funcionalidades interativas e comunicação com API
- **Font Awesome**: Ícones modernos
- **Fetch API**: Comunicação assíncrona com o backend

## 📁 Estrutura do Projeto

```
classifica_paciente_frontend/
├── index.html          # Página principal
├── style.css           # Estilos da aplicação
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 🔧 Configuração

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Backend da API rodando (veja https://github.com/mateuscarlos/classifica_paciente_backend)

### Configuração da API

1. Abra o arquivo `script.js`
2. Localize a variável `API_BASE_URL` no início do arquivo
3. Altere a URL para apontar para seu backend:

```javascript
// Para ambiente local
const API_BASE_URL = 'http://localhost:5000';
```

## 🚀 Como Usar

### Método 1: Abrir Diretamente

1. Abra o arquivo `index.html` em seu navegador
2. O sistema irá verificar automaticamente a conexão com a API
3. Preencha os dados do paciente e clique em "Classificar"

### Método 2: Servidor Local

Para desenvolvimento ou para evitar problemas de CORS, você pode usar um servidor local:

```bash
# Usando Python
python -m http.server 8080

# Usando Node.js (http-server)
npx http-server -p 8080

# Usando PHP
php -S localhost:8080
```

Depois acesse: `http://localhost:8080`

## 🎯 Funcionalidades

### Formulário de Entrada
- **Faixa Etária**: Seleção entre 0-18, 19-35, 36-60, 61+ anos
- **Gênero**: Masculino, Feminino, Outro
- **Validação**: Campos obrigatórios com feedback

### Resultados
- **Classificação Visual**: Círculo colorido com letra da classe (A-E)
- **Interpretação**: Descrição do nível de risco
- **Confiança**: Percentual de confiança da predição
- **Copiar Resultado**: Botão para copiar resultado formatado

### Classes de Risco
- **Classe A**: Risco Muito Baixo (Verde)
- **Classe B**: Risco Baixo (Cinza)
- **Classe C**: Risco Moderado (Amarelo)
- **Classe D**: Risco Alto (Laranja)
- **Classe E**: Risco Muito Alto (Vermelho)

## 🔄 Estados da Interface

### 1. Formulário Inicial
Interface limpa com formulário para entrada de dados.

### 2. Carregando
Spinner de loading enquanto processa a requisição.

### 3. Resultado
Exibição dos resultados com opções de nova classificação.

### 4. Erro
Mensagem de erro com opção de tentar novamente.

## 🐛 Solução de Problemas

### Erro de Conexão
```
Erro de conexão com o servidor. Verifique se a API está rodando.
```

**Soluções:**
1. Verifique se o backend está rodando
2. Confirme se a URL da API está correta no `script.js`
3. Verifique problemas de CORS no backend

### Erro de CORS
Se você encontrar erros de CORS, certifique-se de que o backend está configurado para aceitar requisições do seu domínio.

### Campos Obrigatórios
```
Por favor, preencha todos os campos obrigatórios.
```

**Solução:** Selecione tanto a faixa etária quanto o gênero antes de submeter.

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:
- **Desktop**: Layout em duas colunas
- **Tablet**: Layout adaptativo
- **Mobile**: Layout em coluna única

## 🎨 Personalização

### Cores
As cores das classes de risco podem ser personalizadas no arquivo `style.css`:

```css
.risk-class.risk-a { background: #28a745; } /* Verde */
.risk-class.risk-b { background: #6c757d; } /* Cinza */
.risk-class.risk-c { background: #ffc107; } /* Amarelo */
.risk-class.risk-d { background: #fd7e14; } /* Laranja */
.risk-class.risk-e { background: #dc3545; } /* Vermelho */
```

### Tema
O gradiente de fundo pode ser alterado na classe `body`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🔗 Integração com Backend

### Endpoints Utilizados

#### GET /health
Verifica o status da API e do modelo

#### POST /predict
Envia dados para classificação

**Formato da Requisição:**
```json
{
    "age_group": "19-35",
    "gender": "Masculino"
}
```

**Formato da Resposta:**
```json
{
    "success": true,
    "prediction": {
        "risk_class": "B",
        "interpretation": "Risco Baixo",
        "confidence": "87"
    }
}
```

## 🤝 Integração com Backend

Este frontend foi desenvolvido para trabalhar com o backend disponível em:
- Repositório: `https://github.com/mateuscarlos/classifica_paciente_backend`
- URL padrão: `http://localhost:5000`

Certifique-se de que o backend esteja rodando antes de usar o frontend.

## 📄 Licença

Este projeto é parte do sistema de classificação de pacientes para Home Care.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

