require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Carregar o módulo node-fetch dinamicamente
loadNodeFetch();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json());

// Verifique se a chave da API do Google Generative AI está definida
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error('Chave da API do Google Generative AI não encontrada. Certifique-se de definir GOOGLE_API_KEY no arquivo .env');
    process.exit(1);
}

// Inicialize GoogleGenerativeAI com sua chave de API
const genAI = new GoogleGenerativeAI(apiKey);

app.get('/start-server', async (req, res) => {
    try {
        await startServer(); // Chama a função startServer
        res.json({ message: 'Servidor iniciado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao iniciar o servidor' });
    }
});

const startServer = async () => {
    // Rota para lidar com mensagens de chat
    app.post('/api/chat', async (req, res) => {
        const userMessage = req.body.message;
        const setPrompt = req.body.prompt;

        let prompt = setPrompt === '' ? 
            'Por favor, revise e corrija o seguinte texto em português, **mantendo o significado original e sem fornecer explicações sobre as correções:**\n\n' + userMessage + '\n\n**Concentre-se em corrigir a gramática, ortografia e pontuação.**' :
            setPrompt + '\n' + userMessage;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Obtém o modelo generativo "gemini-pro" da instância genAI.
            const result = await model.generateContent(prompt); // Gera conteúdo com base no prompt fornecido usando um modelo (model).
            const response = await result.response; // Aguarda a conclusão da geração e obtém a resposta.
            const botResponse = response.text(); // A resposta é então convertida em texto e atribuída a botResponse.

            // Substitua quebras de linha por <br> para que sejam exibidas corretamente no navegador
            const formattedResponse = botResponse.replace(/\n/g, '<br>');

            // Enviando a resposta do bot como resposta final
            res.json({ message: formattedResponse });
        } catch (error) {
            console.error('Ocorreu um erro ao processar a solicitação:\n', error);

            const errorMessages = {
                'Bad Request': { statusCode: 400, message: 'Solicitação inválida.' },
                'Payment Required': { statusCode: 402, message: 'Pagamento necessário.' },
                'default': { statusCode: 500, message: 'Ocorreu um erro interno. Tente novamente mais tarde.' }
            };

            let statusCode, errorMessageText;

            const errorMessage = Object.keys(errorMessages).find(message => error.message.includes(message));
            if (errorMessage && errorMessages[errorMessage]) {
                statusCode = errorMessages[errorMessage].statusCode;
                errorMessageText = errorMessages[errorMessage].message;
            } else {
                statusCode = errorMessages['default'].statusCode;
                errorMessageText = errorMessages['default'].message;
            }

            console.error(`Erro: ${errorMessageText}`);
            res.status(statusCode).json({ message: errorMessageText });
        }
    });
};

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});

// Função assíncrona para carregar o módulo node-fetch de forma dinâmica e definir globalmente o método fetch.
async function loadNodeFetch() {
    try {
        // Importa o módulo node-fetch de forma assíncrona.
        const { default: fetch } = await import('node-fetch');
        // Define o método fetch globalmente para uso em todo o escopo do aplicativo.
        global.fetch = fetch;
    } catch (error) {
        console.error('Erro ao carregar o módulo node-fetch:', error);
    }
}

// Exporte a função startServer para que possa ser acessada de outros módulos
module.exports = { startServer };