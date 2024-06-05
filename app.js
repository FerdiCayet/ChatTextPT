const { exec } = require('child_process');
const express = require("express");
const path = require("path");

const { startServer } = require('./server.js');

// Função para abrir o navegador
function openBrowser(url) {
    const startCommand = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
    exec(`${startCommand} ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao abrir o navegador: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erro ao abrir o navegador: ${stderr}`);
            return;
        }
        console.log(`Navegador aberto com sucesso: ${stdout}`);
    });
}

// Função para iniciar o servidor Express
async function startExpressServer() {
    const app = express();
    const port = process.env.PORT || 8001;

    app.use(express.static(path.join(__dirname, "")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}.\nClique aqui para abrir o navegador: http://localhost:${port}`);
            resolve(port);
        }).on('error', reject);
    });
}

// Função para iniciar o aplicativo completo
async function startApp() {
    try {
        console.log("Iniciando servidor e navegador...");

        // Iniciar o servidor do server.js
        await startServer();
        console.log("Servidor backend iniciado com sucesso.");

        // Iniciar o servidor Express
        const port = await startExpressServer();

        // Abrir navegador após 2 segundos
        setTimeout(() => {
            const url = `http://localhost:${port}`;
            openBrowser(url);
        }, 2000);
    } catch (error) {
        console.error("Erro ao iniciar o aplicativo:", error);
    }
}

// Iniciar app
startApp();