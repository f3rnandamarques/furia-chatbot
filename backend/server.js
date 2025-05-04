require('dotenv').config();

const token = process.env.PANDASCORE_API_TOKEN;

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'))

const endpoint = 'https://api.pandascore.co/csgo/matches/upcoming';

const NOME_TIMES_VALIDOS = [
    "furia",
    "furia academy",
    "furia esports female"
];

app.get('/api/matches', async (req, res) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                sort: 'begin_at',
                page: 1,
                per_page: 50,
                'filter[videogame_title]': 'cs-2'
            }
        });

        // response.data.forEach(match => {
        //     const nomes = match.opponents?.map(o => o.opponent?.name?.toLowerCase().trim());
        //     console.log('Times encontrados:', nomes);
        // });

        const dataAtualUTC = new Date();
        // console.log('Data atual (UTC):', dataAtualUTC);

        const partidasFiltradas = response.data.filter(match => {
            const ehPartidaFutura = new Date(match.begin_at) >= dataAtualUTC;

            const contemTimeFuria = match.opponents?.some(op => {
                const nome = op.opponent?.name?.toLowerCase().trim();
                return NOME_TIMES_VALIDOS.includes(nome);
            });

            return ehPartidaFutura && contemTimeFuria;
        });

        partidasFiltradas.forEach(match => {
            const nomesTimes = match.opponents?.map(o => o.opponent?.name);
            // console.log('Match:', match.name);
            // console.log('Times:', nomesTimes);
        });

        res.json(partidasFiltradas);
    } catch (error) {
        console.error('Erro ao buscar dados:', {
            message: error.message,
            url: error.config?.url,
            params: error.config?.params,
            response: error.response?.data
        });
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
});

app.listen(port, () => {
    // console.log(`Servidor backend rodando em http://localhost:${port}`);
});