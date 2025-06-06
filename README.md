# FURIA Chatbot 🐾

Este é um chatbot interativo que utiliza a API PandaScore para exibir informações sobre partidas de e-sports, com foco no time FURIA. O projeto inclui um backend em Node.js e um frontend interativo para interação com os dados.

---

## 📋 Funcionalidades

- Exibe partidas futuras do time FURIA.
- Mostra jogos em andamento.
- Responde a perguntas sobre o time FURIA no chat interativo.
- Integração com a API PandaScore para dados atualizados.

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Axios.
- **Frontend**: HTML, CSS, JavaScript.
- **API**: PandaScore.

---

## 📦 Requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js (versão 16 ou superior)
- NPM (gerenciador de pacotes do Node.js)

---

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/f3rnandamarques/furia-chatbot.git
   cd furia-chatbot

2. Instale as dependências:
    npm install

3.Configure o token da API PandaScore:
    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
        PANDASCORE_API_TOKEN=sua-chave-aqui

▶️ Como Executar

1. Inicie o servidor backend:
npm start

2. Acesse o frontend:
    Abra o navegador e acesse: http://localhost:3000

🛠️ Estrutura do Projeto

furia-chatbot/
-├── backend/
-│   ├── server.js       # Código do servidor backend
-├── public/
-│   ├── index.html      # Página principal do frontend
-│   ├── script.js       # Lógica do frontend
-│   ├── style.css       # Estilos do frontend
-├── node_modules/
-├── .env                # Chave da API (não incluído no repositório)
-├── .gitignore          # Arquivos ignorados pelo Git
-├── package.json        # Dependências e scripts do projeto
-└── README.md           # Documentação do projeto


📝 Endpoints da API
GET /api/matches
Retorna as partidas futuras do time FURIA.

Exemplo de Resposta:
-[
-  {
-    "id": 12345,
-    "name": "FURIA vs NAVI",
-    "begin_at": "2025-05-04T15:30:00Z",
-    "status": "not_started",
-    "opponents": [
-      { "opponent": { "name": "FURIA" } },
-      { "opponent": { "name": "NAVI" } }
-    ]
-  }
-]

🤝 Contribuição
1. Faça um fork do projeto.

2. Crie uma branch para sua feature:
    git checkout -b minha-feature

3. Commite suas alterações:
    git commit -m "Adiciona nova feature"

4. Envie para o repositório remoto:
    git push origin minha-feature

5. Abra um Pull Request.

📞 Contato
-Autor: Fernanda Marques
-Email: f3rnandamarques@gmail.com
-GitHub: f3rnandamarques