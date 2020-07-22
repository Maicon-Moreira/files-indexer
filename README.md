## File indexer (Deep Search)

File indexer é um utilitário com dois usos principais complementares:

 - Analisar o tamanho de pastas e arquivos para localizar diretórios desnecessariamente grandes.
 - Fazer pesquisas indexadas de arquivos e pastas em altíssima velocidade.

## Demonstração

**Explorer:**
![Demo](https://i.ibb.co/cYJsmQ1/Captura-de-tela-de-2020-07-22-11-49-50.png)
Minha pasta */home/maicon*

**Pesquisa:**
![Search demo](https://i.ibb.co/d5Ps8B4/Captura-de-tela-de-2020-07-22-11-50-39.png)
Pesquisa do termo "teste" dentro da minha pasta /home/maicon realizado em **0.08** segundos.

## Como usar

Crie o arquivo de indexação:

    python3 index_creator.py 

Inicie o servidor express:

    cd server && yarn start

Inicie o website react:

    cd webpage && yarn start

E pronto, o servidor local http://localhost:3000 abrirá no seu navegador.

Fique a vontade para colocar a inicialização do servidor express junto com a do seu sistema ou utilizar algum dns local para o servidor React.



***Licensa MIT***

Feito por [Maicon](https://www.linkedin.com/in/maicon-moreira-38ab691a4/) com ❤️
