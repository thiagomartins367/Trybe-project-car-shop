# Boas-vindas ao repositório do projeto Car Shop!

Este projeto foi desenvolvido durante o período de Curso da Trybe :rocket:

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados.

---

# Descrição

  Nesse projeto, foi aplicado os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos.
  
  Isso foi feito utilizando o banco de dados `MongoDB`.

# Orientações

<details>
  <summary>
    <strong>🎛 Linter</strong>
  </summary><br>

  Para fazer a análise estática do código neste projeto, foi utilizado o linter [ESLint](https://eslint.org/). Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção!

  - Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivo `package.json`
  - Para poder rodar o `ESLint` basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. 
  - Se a análise do `ESLint` encontrar problemas no código, eles serão mostrados no terminal. 
  - Se não houver problema no código, nada será impresso no terminal.
</details>

<details>
  <summary>
    <strong>🛠 Testes</strong>
  </summary><br>

  Para executar os testes localmente, digite no terminal o comando `npm test`.

  👀**De olho na dica**: especialmente no início, quando a maioria dos testes está falhando, a saída após executar os testes é bastante poluída. Desabilite temporariamente um teste utilizando a função `skip` junto à função `describe`. Como o nome indica, a função a seguir "pula" um teste:

  ```typescript
  describe.skip('...', () => {})

  ```

</details>

<details>
  <summary>
    <strong> 🐳 Como subir o banco do MongoDB usando Docker</strong>
  </summary><br>

  Caso não tenha o MongoDB instalado na máquina e deseje usar o Docker, é só seguir os passos a seguir:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-conteiner> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```

</details>

<details>
  <summary>
    <strong>🐳 Rodando no Docker vs Localmente</strong>
  </summary><br>

  ## Docker

  > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
  - A partir daqui pode-se rodar o container `car_shop` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it car_shop bash`.
  - Ele dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, o que pode acarretar conflito devido às versões alteradas.

  ## Localmente

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, o que pode acarretar conflito devido às versões alteradas.

  ✨ **Dica:** Para rodar o projeto desta forma, é obrigatoriamente ter o `node` instalado no computador.
  ✨ **Dica:** A versão do `node` utilizada tanto no desenvolvimento quanto no `Dockerfile` é a 16.

</details>

<details>
  <summary>
    <strong>👷 Estruturação do projeto </strong>
  </summary><br>

  ## Estrutura das pastas dentro de `src`

  ![Estrutura de arquivos](./public/folder_structure.png)

  ### Arquivos de exemplo

  Dentro da pasta `src` foram deixados alguns arquivos de exemplo sendo eles:

  - `src/index.example.ts`

</details>

<details>
  <summary>
    <strong>✅ Arquivos prontos para uso</strong>
  </summary><br>

  - O arquivo `src/connection.ts` possui o código necessário para realizar a conexão com o banco de dados:

  ```typescript
  import mongoose from 'mongoose';

  const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';
  const MONGO_DB_URL = 'mongodb://mongodb:27017/CarShop';

  const connectToDatabase = (
    mongoDatabaseURI = process.env.MONGO_URI
      || MONGO_DB_URL,
  ) => mongoose.connect(mongoDatabaseURI);

  export default connectToDatabase;

  ```

  - O arquivo `src/app.ts` contém o código necessário para subir o servidor:

  ```typescript
  import express from 'express';

  const app = express();

  export default app;

  ```
  ⚠️**Importante**: é muito importante que o arquivo `src/app.ts` exporte uma instância do `app express` para que os testes funcionem. ⚠️**
</details>

<details>
  <summary>
    <strong>🔥⚠️ Tenha atenção para os seguintes pontos: ⚠️🔥</strong>
  </summary><br>

  ➡️ A conexão do banco local contida no arquivo `src/connection.ts` deverá estar na seguinte variável, ou no `.env`:

  ```typescript
  const MONGO_URI = 'mongodb://localhost:27017/CarShop';
  ```

</details>
