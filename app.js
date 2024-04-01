const { exec } = require('child_process');
const express = require("express");
const path = require("path");

const { startServer } = require('./server.js');

// Função para iniciar o servidor e abrir o navegador
async function startApp() {
    console.log("Iniciando servidor e navegador...");

    // Iniciar servidor (chamando a função do server.js)
    await startServer(); // Chamada de startServer agora dentro de startApp

    // Iniciar servidor
    const app = express();
    const port = process.env.PORT || 8001;

    app.use(express.static(path.join(__dirname, "")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}.\nClique aqui para abrir o navegador: http://localhost:${port}`);
    });

    // Abrir navegador após 2 segundos
    setTimeout(() => {
        const url = `http://localhost:${port}`;
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
    }, 2000);
}

// Iniciar app
startApp();