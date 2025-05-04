let ultimaPergunta = null;

const intencoes = [
    {
        chave: "cumprimento",
        palavras: ["oi", "olá", "e aí"],
        resposta: "Olá! 👋 Como posso te ajudar hoje?"
    },
    {
        chave: "status",
        palavras: ["jogo agora", "tá tendo", "em andamento", "está jogando", "ao vivo", "qual o jogo de hoje"],
        resposta: null
    },
    {
        chave: "proximos",
        palavras: ["próximos jogos", "quando será", "qual o próximo", "agenda", "datas", "calendário", "quais são os próximos jogos"],
        resposta: null
    },
    {
        chave: "despedida",
        palavras: ["tchau", "até mais", "falou"],
        resposta: "Até logo! Obrigado por apoiar a FURIA! 🐾"
    },
    {
        chave: "sobreFuria",
        palavras: ["sobre a furia", "história da furia", "o que é a furia", "quem é a furia", "furia esports"],
        resposta: `A FURIA é uma organização brasileira de e-sports fundada em 2017, com atuação em jogos como Counter-Strike 2, Rocket League, League of Legends, Valorant, Rainbow Six: Siege, Apex Legends e Futebol de 7. Destaca-se principalmente pelo seu time de Counter-Strike, que figura entre os melhores do Brasil em competições internacionais. Foi eleita a melhor organização de e-sports do Brasil em 2020 e 2021, e, em 2022, foi reconhecida como a quinta maior organização de e-sports do mundo pelo portal Nerd Street.`
    }, {
        chave: "conquistas",
        palavras: ["títulos", "conquistas", "campeonatos", "vitórias"],
        resposta: "A FURIA já conquistou títulos importantes como a ESL Pro League North America (2020), CBCS Elite League Season 1 (2021), e já participou de diversos Majors de CS:GO representando o Brasil com destaque."
    }, {
        chave: "elenco",
        palavras: ["jogadores", "elenco", "quem joga", "time atual"],
        resposta: "O elenco atual da FURIA em CS2 inclui jogadores como KSCERATO, yuurih, chelo, FalleN e saffee. A equipe é liderada pelo coach guerri."
    }, {
        chave: "redes",
        palavras: ["redes sociais", "twitter", "instagram", "site oficial", "link"],
        resposta: `📲 Redes sociais da FURIA:
      - Twitter: https://twitter.com/FURIA
      - Instagram: https://instagram.com/furiagg
      - Site oficial: https://www.furia.gg`
    },
    {
        chave: "loja",
        palavras: ["loja", "comprar", "camisa", "merch", "roupas"],
        resposta: "Você pode conferir os produtos oficiais da FURIA na loja: https://store.furia.gg 👕🔥"
    },
    {
        chave: "curiosidades",
        palavras: ["curiosidades", "fatos", "sabia que", "fun facts"],
        resposta: "Você sabia? O nome FURIA vem da ideia de jogar com intensidade e garra. A organização também já teve uma equipe feminina e possui um centro de treinamento próprio nos EUA!"
    },
    {
        chave: "recomendacoes",
        palavras: ["recomenda", "dica", "sugestão", "o que fazer"],
        resposta: "Recomendo acompanhar o próximo jogo da FURIA ao vivo e seguir nossos jogadores nas redes! Você já viu os vídeos no canal do YouTube? 😉"
    }
];

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = input.value.trim().toLowerCase();

    if (userText !== "") {
        chatBox.innerHTML += `<p><strong>Você:</strong> ${input.value}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        const typingId = "typing-indicator";
        chatBox.innerHTML += `<p id="${typingId}"><em>FURIA Bot está digitando...</em></p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(async () => {
            document.getElementById(typingId).remove();

            let respostaBot = "Desculpe, ainda estou aprendendo. Tente outra pergunta!";
            let intencaoDetectada = null;

            if (["sim", "claro", "pode ser", "mais"].includes(userText)) {
                if (ultimaPergunta === "proximos") {
                    respostaBot = "Depois de NAVI, enfrentaremos a Vitality no dia 05/05 às 21h!";
                } else if (ultimaPergunta === "status") {
                    respostaBot = "Sim! A FURIA está vencendo por 12 a 8 no 2º mapa.";
                } else {
                    respostaBot = "Poderia me lembrar do que estávamos falando?";
                }
            } else {
                for (const intencao of intencoes) {
                    if (intencao.palavras.some(p => userText.includes(p))) {
                        intencaoDetectada = intencao.chave;

                        switch (intencaoDetectada) {
                            case "status":
                                await showGameStatus(); // Chama a função para jogos em andamento
                                ultimaPergunta = intencaoDetectada;
                                return;
                            case "proximos":
                                await showNextGames(); // Chama a função para próximos jogos
                                ultimaPergunta = intencaoDetectada;
                                return;
                            default:
                                respostaBot = intencao.resposta;
                        }
                        break;
                    }
                }
                ultimaPergunta = intencaoDetectada;
            }

            chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> ${respostaBot}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);

        input.value = "";
    }
}

async function showGameStatus() {
    const chatBox = document.getElementById('chat-box');

    try {
        const response = await fetch('/api/matches');
        const data = await response.json();

        const jogosFuria = data.filter(match => {
            const agora = new Date();
            const inicio = new Date(match.begin_at);

            return (
                match.opponents?.some(op =>
                    op.opponent?.name?.toLowerCase().replace(/[^a-z]/g, '').includes('furia')
                ) &&
                inicio <= agora &&
                match.status !== 'finished'
            );
        });

        if (jogosFuria.length > 0) {
            jogosFuria.forEach(match => {
                const opponent = match.opponents?.find(op =>
                    !op.opponent?.name?.toLowerCase().includes("furia")
                );

                const dataFormatada = new Date(match.begin_at).toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                chatBox.innerHTML += `
                    <p><strong>FURIA Bot:</strong> 🎮 Jogo em andamento:<br>
                    <strong>FURIA</strong> vs <strong>${opponent?.opponent?.name || 'Time desconhecido'}</strong><br>
                    ⏰ Horário: ${dataFormatada}<br>
                    📊 Status: ${match.status || 'Não disponível'}</p>
                `;
            });
        } else {
            chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> Nenhum jogo da FURIA em andamento. 🕒</p>`;
        }

    } catch (error) {
        console.error('Erro:', error);
        chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> Erro ao buscar jogos. ⚠️</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function showNextGames() {
    const chatBox = document.getElementById('chat-box');

    try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        console.log('Dados recebidos da API:', data)

        const futuros = data.filter(match => {
            const agora = new Date();
            const inicio = new Date(match.begin_at);

            return (
                match.opponents?.some(op =>
                    op.opponent?.name?.toLowerCase().replace(/[^a-z]/g, '').includes('furia')
                ) &&
                inicio > agora
            );
        });
        console.log('Jogos futuros da FURIA:', futuros);

        if (futuros.length > 0) {
            futuros.forEach(match => {
                const opponent = match.opponents?.find(op =>
                    !op.opponent?.name?.toLowerCase().includes("furia")
                );

                const dataFormatada = new Date(match.begin_at).toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                chatBox.innerHTML += `
                    <p><strong>FURIA Bot:</strong> 📅 Próximo jogo:<br>
                    <strong>FURIA</strong> vs <strong>${opponent?.opponent?.name || 'Time desconhecido'}</strong><br>
                    🗓️ Data: ${dataFormatada}</p>
                `;
            });
        } else {
            chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> Sem jogos futuros agendados. 🗓️</p>`;
        }

    } catch (error) {
        console.error('Erro:', error);
        chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> Erro ao buscar próximos jogos. ⚠️</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('user-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

document.getElementById('fan-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Cadastro enviado com sucesso!');
});

document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> Olá, fã da FURIA! Me pergunte sobre jogos em tempo real, próximos eventos ou sobre a Furia! 🐾</p>`;
});
