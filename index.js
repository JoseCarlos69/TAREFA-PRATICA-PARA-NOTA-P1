const express = require('express');
const fs = require('fs');
const extractUrls = require('extract-urls');
const app = express();
const PORT =  process.env.PORT || 4250;
const SECURE_PORT = process.env.SECURE_PORT || 7777;

//Configuração do servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
});

//Configuração do servidor seguro
const secureServer = app.listen(SECURE_PORT, () => {
    console.log(`Servidor seguro iniciado na porta ${SECURE_PORT}`)
});

//Rota para o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'View/index.html');
});

//Rota para os demais arquivos HTML
app.get('/pagina1', (req, res) => {
    const page = req.params.page;
    res.sendFile(__dirname + 'View/pagina1.html');
});

app.get('/pagina2', (req, res) => {
    const page = req.params.page;
    res.sendFile(__dirname + 'View/pagina2.html');
});

app.get('/pagina3', (req, res) => {
    const page = req.params.page;
    res.sendFile(__dirname + 'View/pagina3.html');
});

app.get('/pagina4', (req, res) => {
    const page = req.params.page;
    res.sendFile(__dirname + 'View/pagina4.html');
});

//Rota para a página de erro 404
app.use((req, res) => {
    res.status(404).sendFile(__dirname + 'View/404.html');
});

//Inicia o servidor na porta definida, ou na porta de segurança em caso de falha
app.listen(PORT, () => {
    consolole.log(`Servidor iniciado na porta ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`A porta ${PORT} está ocupada. Iniciando na porta de segurança ${SECURE_PORT}`);
        app.listen(SECURE_PORT, () => {
            console.log(`Servidor iniciado na porta ${SECURE_PORT}`);
        });
    } else {
        console.error('Erro ao iniciar o servidor:', err);
    }
});

app.get('/entrada', (req, res) => {
    const caminhoDoArquivo = __dirname + '/entrada/texto.md';

    fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo');
            return;
        }

        res.send(data);
    });
});

app.get('/links', (req, res) => {
    const caminhoDoArquivo = __dirname + '/entrada/texto.md';

    fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo');
            return;
        }

        const urls = extractUrls(data);

        if (urls.length === 0) {
            res.send('Arquivo não apresenta link de URL');
        } else {
            res.send(urls.join('<br>'));
        }
    });
});

app.get('/validar', (req, res) => {
    const caminhoDoArquivo = __dirname + '/entrada/texto.md';

    fs.access(caminhoDoArquivo, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Arquivo não encontrado');
        } else {
            res.status(200).send('Arquivo encontrado');
        }
    });
});
