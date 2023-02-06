# Estudo sobre Web Stream

Olá, resolvi compartilhar esta aplicação desenvolvida durante uma aula sobre leitura de dados no front end de maneira mais eficiente e capaz de lidar com grandes quantidades de informações. De uma maneira resumida, o __Backend__ e o __Frontend__ irão trabalhar simultaneamente (semelhante a websocket) para a leitura ou envio de grandes quantidades de informação. O que despertou meu interesse por este conteúdo foi a possibilidade do front end a qualquer momento encerrar e retomar a conexão. 




## Execução

Para executar esse projeto é necessário rodar o server e o app juntos. 

Para rodar o backend, digite:

```bash
    cd server/
    npm i
    npm run dev
```

Para rodar o Frontend, (***Particularmente, eu prefiro utilizar o plugin Liver Server no VS-Code, mas fica registrado aqui para quem quiser rodar pelo pacote npm mesmo***) digite:

```bash
    cd app/
    npm i
    npm run start
```

## Referência

 - [Como ler 10GB de JSON no frontend sem travar a tela - Webstreams 101](https://www.youtube.com/watch?v=-IpRYbL4yMk)
 - [Web Streams API](https://nodejs.org/api/webstreams.html)