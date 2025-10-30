const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Servir pasta raiz
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/js', express.static(path.join(__dirname)));

// Cache para evitar requisições repetidas à PokeAPI
const pokemonCache = {};

// Endpoint para buscar informações de um Pokémon
app.post('/api/check-pokemon', async (req, res) => {
  console.log('=== NOVA REQUISIÇÃO RECEBIDA ===');
  console.log('Body:', req.body);

  try {
    const { pokemonNames } = req.body;

    if (!pokemonNames || pokemonNames.length === 0) {
      console.log('Erro: Nenhum Pokémon fornecido');
      return res.status(400).json({
        error: 'Nenhum Pokémon foi fornecido!'
      });
    }

    if (pokemonNames.length > 6) {
      console.log('Erro: Mais de 6 Pokémon');
      return res.status(400).json({
        error: 'Você pode escolher no máximo 6 Pokémon!'
      });
    }

    const pokemonData = [];
    const notFound = [];

    console.log('Buscando informações de', pokemonNames.length, 'Pokémon...');

    // Buscar informações de cada Pokémon
    for (const name of pokemonNames) {
      const normalizedName = name.toLowerCase().trim();
      console.log('Processando:', normalizedName);

      // Verificar cache
      if (pokemonCache[normalizedName]) {
        console.log('  -> Encontrado no cache');
        pokemonData.push(pokemonCache[normalizedName]);
        continue;
      }

      try {
        console.log('  -> Buscando na PokeAPI...');
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${normalizedName}`);

        const pokemon = {
          name: response.data.name,
          id: response.data.id,
          types: response.data.types.map(t => t.type.name),
          sprite: response.data.sprites.front_default
        };

        console.log('  -> Encontrado:', pokemon.name, 'Tipos:', pokemon.types);

        // Salvar no cache
        pokemonCache[normalizedName] = pokemon;
        pokemonData.push(pokemon);
      } catch (error) {
        console.log('  -> NÃO encontrado');
        notFound.push(name);
      }
    }

    // Verificar se há Pokémon Ghost ou Dark
    const hasGhost = pokemonData.some(p => p.types.includes('ghost'));
    const hasDark = pokemonData.some(p => p.types.includes('dark'));
    const canDefeatGengar = hasGhost || hasDark;

    console.log('=== RESULTADO ===');
    console.log('Pokémon encontrados:', pokemonData.length);
    console.log('Pokémon não encontrados:', notFound.length);
    console.log('Tem Ghost:', hasGhost);
    console.log('Tem Dark:', hasDark);
    console.log('Pode derrotar Gengar:', canDefeatGengar);

    const responseData = {
      success: true,
      pokemonData,
      notFound,
      canDefeatGengar,
      hasGhost,
      hasDark
    };

    console.log('Enviando resposta:', JSON.stringify(responseData, null, 2));
    res.json(responseData);
  } catch (error) {
    console.error('=== ERRO NO SERVIDOR ===');
    console.error('Erro:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      error: 'Erro ao processar a requisição!'
    });
  }
});

// Servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('🔥  SERVIDOR RODANDO COM SUCESSO!');
  console.log('═══════════════════════════════════════════════');
  console.log(`📍  URL: http://localhost:${PORT}`);
  console.log('👻  Prepare-se para enfrentar o Gengar!');
  console.log('═══════════════════════════════════════════════');
  console.log('');
});
