const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  let filePath = path.join(__dirname, 'View', reqUrl === '/' ? 'index.html' : reqUrl);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Rota padrão para o index.html e do resto
  if (!extname) {
    filePath += '.html';
  } else if (extname === '.css') {
    contentType = 'text/css';
  } else if (extname === '.js') {
    contentType = 'text/javascript';
  }
// Rota para exibir o arquivo de texto
  if (reqUrl === '/entrada/') {
    const mdFile = path.join(__dirname, 'entrada', 'texto.md');
    fs.readFile(mdFile, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Arquivo não encontrado.');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = `<html><body>${data.toString()}</body></html>`;
        res.write(html);
        res.end();
      }
    });
    // Rota para exibir os links do arquivo de texto
  } else if (reqUrl === '/links/') {
    const mdFile = path.join(__dirname, 'entrada', 'texto.md');
    fs.readFile(mdFile, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Arquivo não encontrado.');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const links = data.toString().match(/\bhttps?:\/\/\S+/gi);
        if (links) {
          res.write(links.join('\n'));
        } else {
          res.write('Arquivo não apresenta link de URL');
        }
        res.end();
      }
    });
    // Rota para validar o arquivo de texto
  } else if (reqUrl === '/validar/') {
    const mdFile = path.join(__dirname, 'entrada', 'texto.md');
    fs.access(mdFile, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Arquivo não encontrado.');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('HTTP 200 OK');
        res.end();
      }
    });
  } else {
    // Rota para lidar com o erro 404
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          const html = `<html><body><h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p></body></html>`;
          res.write(html);
          res.end();
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          const html = `<html><body><h1>500 Internal Server Error</h1><p>${err}</p></body></html>`;
          res.write(html);
          res.end();
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType
    });
    res.write(content);
    res.end();
  }
});
}
});

// Verifica se a porta 4250 está ocupada, se sim, usa a porta 7777

const PORT = 4250;
const SECURE_PORT = 7777;

server.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
if (err.code === 'EADDRINUSE') {
server.listen(SECURE_PORT, () => {
console.log(`Server running at http://localhost:${SECURE_PORT}/`);
});
} else {
console.error(err);
}
});
