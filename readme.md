## 😺 CAT MODELS API

![GitHub repo size](https://img.shields.io/github/repo-size/vitorluizms/CatModel-API?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/vitorluizms/CatModel-API?style=for-the-badge)

Essa é a API RESTful para à uma agência de gatos modelos, nela é possível cadastrar um usuário, fazer login, buscar todos o modelos, buscar um em específico pelo ID, cadastrar um modelo, estando logado é possível buscar todos os seus modelos e gerenciá-los.

## 🌐 Deploy

O deploy do banco foi feito no ElephantSQL, e da API no Render.

URL da API: `https://catmodel-api.onrender.com`

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Node.js: v18.16.1 (Utilizado no desenvolvimento);
- NPM: v9.5.1 (Utilizado no desenvolvimento);
- Postgres: v16.1 (Utilizado no desenvolvimento);

## 🔧 Tecnologias

Para a construção do projeto foi utilizado as seguintes tecnologias:

- Javascript ES6;
- Node: v18.16.1;
- Express (Framework de Node.js): v4.18.2;
- PostgreSQL (Banco de dados);
- GitHub (versionamento de código);
- Joi (validação de campos): v17.11.0;
- Nodemon (Reinicialização automática do servidor): v3.0.1.

## 📏Padronização

Neste projeto foi utilizado:

- ESLint para padronizar o código e manter consistência,
- Prettier para autoformatação do código
- Husky para validar e padronizar os commits;

## 🚀 Instalando CAT MODELS API

Para instalar o Cat Models API, siga estas etapas:

1. Clone o repositório: `git clone https://github.com/vitorluizms/CatModel-API`;
2. Acesse o diretório do projeto: `cd CatModel-API`;
3. Instale as dependências: `npm install` ou `npm i`.

## 🗄️ Banco de Dados

O Script para criar o banco de dados é o seguinte:

`CREATE TABLE users` (
	id SERIAL PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(60) NOT NULL,
	cpf VARCHAR(11) NOT NULL UNIQUE,
	contact VARCHAR(11) NOT NULL UNIQUE
);

`CREATE TABLE sessions` (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER REFERENCES "users"("id"),
	token TEXT NOT NULL
);

`CREATE TABLE races` (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL
); 

`CREATE TABLE cats` (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL,
	"userId" INTEGER REFERENCES "users"("id"),
    "mainPic" INTEGER REFERENCES "pics("id)",
 	age INTEGER NOT NULL, 
	color VARCHAR(40) NOT NULL,
	race INTEGER REFERENCES "races"("id") NOT NULL,
	description TEXT NOT NULL,
	size VARCHAR(30) NOT NULL,
	"isDisponible" BOOL DEFAULT true
);

`CREATE TABLE pics` (
	id SERIAL PRIMARY KEY,
	url TEXT[] NOT NULL,
	"catId" INTEGER REFERENCES "cats"("id")
);

## ☕ Usando CAT MODELS API

Para usar, siga estas etapas:

1. Desenvolvimento: `npm run dev`;
2. Execução de Produção: `npm run start`;

## 🚀 GitFlow

Durante o desenvolvimento foi utilizado conceitos de GitFlow, juntamente com a extensão Git Flow para facilitar o uso.

## 📞 Contatos

linkedin: `https://www.linkedin.com/in/vitorluizmartins/`
gmail: `vitor.luiz.eer@gmail.com`