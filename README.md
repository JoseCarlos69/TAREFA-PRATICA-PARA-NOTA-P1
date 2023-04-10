# TAREFA-PRATICA-PARA-NOTA-P1
## TAREFA PRATICA PARA NOTA P1

1. Em grupo de até 3 pessoas. 
2. Deve ser desenvolvido em programação node.js (podendo utilizar framework express.js apenas como opcional).
3. O grupo deve montar um sistema web que monte um webserver na porta 4250 e caso esteja ocupada utilize a porta de segurança 7777.
4. O sistema deve apresentar 5 sites (sendo o principal chamado index.html)
5. Caso não encontre a URL solicitada, apresentar a pagina de erro 404.
6. Todos os arquivos de templates devem estar no diretório chamado "View"
7. No projeto, deve existir um diretório chamado "entrada" no qual qualquer usuário pode inserir um arquivo chamado "texto.md" e acessando os caminhos:
- "http://localhost:4250/entrada/" leia o arquivo e mostre no site o texto contido no arquivo. 
* "http://localhost:4250/links/" leia o arquivo e demonstre todos os links deste arquivo. Caso o arquivo não apresente nenhum link mostre a mensagem "Arquivo não apresenta link de URL". 
+ "http://localhost:4250/validar/" leia o arquivo e demonstre o status code HTTP 200 ou 404.
8. O modelo do arquivo é o mesmo adotado no projeto 01.
9. A entrega deve ser realizada em link do diretório GitHub
10. Todos do grupo devem submeter o link do GitHub a fim de vincular a nota da tarefa

## Como rodar o programa

1. Clone o repositório
2. No cmd na pasta do projeto, digite npm install para instalar as dependencias
3. Rode o projeto digitando node index.js
