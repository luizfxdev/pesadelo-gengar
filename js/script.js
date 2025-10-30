// js/script.js - Lógica principal do desafio

console.log('🔄 Carregando script.js...');

// ====================================
// ELEMENTOS DO DOM
// ====================================
const pokemonInput = document.getElementById('pokemon-input');
const duelBtn = document.getElementById('duel-btn');
const returnBtn = document.getElementById('return-btn');
const resultSection = document.getElementById('result-section');
const resultOutput = document.getElementById('result-output');

console.log('Elementos encontrados:', {
  pokemonInput: !!pokemonInput,
  duelBtn: !!duelBtn,
  returnBtn: !!returnBtn,
  resultSection: !!resultSection,
  resultOutput: !!resultOutput
});

// ====================================
// CONFIGURAÇÕES
// ====================================
const API_URL = 'http://localhost:3000/api/check-pokemon';

const typeColors = {
  ghost: 'type-ghost',
  dark: 'type-dark',
  normal: 'type-normal',
  fire: 'type-fire',
  water: 'type-water',
  electric: 'type-electric',
  grass: 'type-grass',
  psychic: 'type-psychic',
  fighting: 'type-fighting',
  rock: 'type-rock',
  dragon: 'type-dragon',
  ice: 'type-ice',
  bug: 'type-bug',
  steel: 'type-steel',
  fairy: 'type-fairy',
  ground: 'type-ground',
  poison: 'type-poison',
  flying: 'type-flying'
};

// ====================================
// FUNÇÕES AUXILIARES
// ====================================

function clearResult() {
  if (resultSection) resultSection.classList.add('hidden');
  if (resultOutput) resultOutput.innerHTML = '';
  console.log('📝 Resultado limpo');
}

function displayResult(html) {
  if (resultOutput) resultOutput.innerHTML = html;
  if (resultSection) resultSection.classList.remove('hidden');
  console.log('📝 Resultado exibido');

  setTimeout(() => {
    if (resultSection) {
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function createPokemonCard(pokemon, index) {
  const typeBadges = pokemon.types
    .map(type => {
      const colorClass = typeColors[type] || 'type-normal';
      return `<span class="type-badge ${colorClass}">${type}</span>`;
    })
    .join('');

  return `
        <div class="pokemon-card" style="animation-delay: ${index * 0.1}s">
            <h3>🔹 ${pokemon.name}</h3>
            <div class="pokemon-types">${typeBadges}</div>
            <p><strong>ID:</strong> #${pokemon.id.toString().padStart(3, '0')}</p>
        </div>
    `;
}

// ====================================
// FUNÇÃO PRINCIPAL DO DUELO
// ====================================

async function startDuel() {
  console.log('⚔️ === INICIANDO DUELO ===');

  clearResult();

  const input = pokemonInput ? pokemonInput.value.trim() : '';
  console.log('📥 Input do usuário:', input);

  if (!input) {
    console.log('⚠️ Input vazio');
    displayResult(`
            <div class="error-message">
                <p><strong>⚠️ Erro:</strong> Por favor, digite os nomes dos Pokémon!</p>
            </div>
        `);
    return;
  }

  const pokemonNames = input
    .split(',')
    .map(name => name.trim())
    .filter(name => name);
  console.log('🎯 Pokémon processados:', pokemonNames);

  if (pokemonNames.length === 0) {
    console.log('⚠️ Nenhum Pokémon válido');
    displayResult(`
            <div class="error-message">
                <p><strong>⚠️ Erro:</strong> Nenhum Pokémon válido foi fornecido!</p>
            </div>
        `);
    return;
  }

  if (pokemonNames.length > 6) {
    console.log('⚠️ Mais de 6 Pokémon');
    displayResult(`
            <div class="error-message">
                <p><strong>⚠️ Erro:</strong> Você pode escolher no máximo 6 Pokémon!</p>
            </div>
        `);
    return;
  }

  displayResult(`
        <div style="text-align: center; padding: 20px;">
            <p style="color: var(--cyan-neon); font-size: 1.2rem;">⚡ Analisando seu time...</p>
            <p style="color: #fff; margin-top: 10px;">Consultando o banco de dados Pokémon...</p>
        </div>
    `);

  try {
    console.log('🌐 Fazendo requisição para:', API_URL);
    console.log('📦 Payload:', { pokemonNames });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pokemonNames })
    });

    console.log('📡 Status da resposta:', response.status);

    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('❌ Resposta não é JSON:', textResponse);
      throw new Error('Servidor não retornou JSON. Verifique se o servidor está rodando corretamente.');
    }

    const data = await response.json();
    console.log('✅ Dados recebidos:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao processar requisição');
    }

    let resultHTML = '';

    if (data.pokemonData && data.pokemonData.length > 0) {
      console.log('👥 Pokémon encontrados:', data.pokemonData.length);
      resultHTML += '<h3 style="color: var(--purple-neon); margin-bottom: 15px;">👥 Seu Time:</h3>';
      data.pokemonData.forEach((pokemon, index) => {
        resultHTML += createPokemonCard(pokemon, index);
      });
    }

    if (data.notFound && data.notFound.length > 0) {
      console.log('❌ Pokémon não encontrados:', data.notFound);
      resultHTML += `
                <div class="error-message" style="margin-top: 15px;">
                    <p><strong>❌ Pokémon não encontrados:</strong></p>
                    <p>${data.notFound.join(', ')}</p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">Verifique a ortografia ou tente outros nomes em inglês.</p>
                </div>
            `;
    }

    resultHTML += '<h3 style="color: var(--cyan-neon); margin: 20px 0 15px;">⚔️ Análise da Batalha:</h3>';

    console.log('👻 Tem Ghost?', data.hasGhost);
    console.log('🌑 Tem Dark?', data.hasDark);
    console.log('🎯 Pode derrotar Gengar?', data.canDefeatGengar);

    if (data.hasGhost || data.hasDark) {
      const effectiveTypes = [];
      if (data.hasGhost) effectiveTypes.push('Fantasma (Ghost)');
      if (data.hasDark) effectiveTypes.push('Sombrio (Dark)');

      resultHTML += `
                <div style="background: rgba(123, 44, 191, 0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="color: #00ff88; font-weight: 600;">✅ Você possui Pokémon do tipo ${effectiveTypes.join(
                      ' e '
                    )}!</p>
                    <p style="margin-top: 8px; color: #e0e0e0;">Esses tipos são super efetivos contra o Gengar e podem resistir aos seus ataques sombrios.</p>
                </div>
            `;
    } else {
      resultHTML += `
                <div style="background: rgba(255, 0, 85, 0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="color: #ff0055; font-weight: 600;">❌ Nenhum Pokémon efetivo contra Gengar!</p>
                    <p style="margin-top: 8px; color: #e0e0e0;">Seu time não possui Pokémon dos tipos Fantasma (Ghost) ou Sombrio (Dark).</p>
                    <p style="margin-top: 8px; color: #e0e0e0;">Gengar usará <strong style="color: var(--pink-neon);">Comer Sonhos (Dream Eater)</strong> para drenar sua energia!</p>
                </div>
            `;
    }

    if (data.canDefeatGengar) {
      resultHTML += `
                <div class="verdict victory">
                    <div class="verdict-title">🎉 VITÓRIA!</div>
                    <p>Você conseguiu escapar do pesadelo!</p>
                    <p style="margin-top: 10px; font-size: 0.95rem;">Seu time estava preparado para enfrentar o poder do Gengar. Os olhos hipnóticos perdem seu brilho enquanto a cidade retorna à normalidade.</p>
                </div>
            `;
    } else {
      resultHTML += `
                <div class="verdict defeat">
                    <div class="verdict-title">💀 DERROTA...</div>
                    <p>Você foi preso no pesadelo eterno!</p>
                    <p style="margin-top: 10px; font-size: 0.95rem;">Gengar usou <strong>Comer Sonhos</strong>! Seu time não conseguiu resistir aos poderes hipnóticos. Você e seus Pokémon estão presos no mundo dos sonhos para sempre...</p>
                </div>
            `;
    }

    console.log('✅ Exibindo resultado HTML');
    displayResult(resultHTML);
  } catch (error) {
    console.error('❌ === ERRO CAPTURADO ===');
    console.error('Tipo do erro:', error.name);
    console.error('Mensagem do erro:', error.message);
    console.error('Stack trace:', error.stack);

    let errorMessage = error.message;

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage =
        'Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://localhost:3000';
    }

    displayResult(`
            <div class="error-message">
                <p><strong>❌ Erro de Conexão:</strong></p>
                <p>${errorMessage}</p>
                <p style="margin-top: 15px; font-size: 0.9rem;"><strong>Como resolver:</strong></p>
                <ul style="margin-top: 8px; padding-left: 20px; font-size: 0.9rem; list-style: disc;">
                    <li>Verifique se o servidor Node.js está rodando</li>
                    <li>Execute <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">npm start</code> no terminal</li>
                    <li>Certifique-se de que está acessando http://localhost:3000</li>
                    <li>Verifique se a porta 3000 está disponível</li>
                </ul>
            </div>
        `);
  }
}

// ====================================
// EVENT LISTENERS
// ====================================

console.log('🔗 Adicionando event listeners...');

if (duelBtn) {
  duelBtn.addEventListener('click', () => {
    console.log('🔥 Botão DUELAR clicado!');
    startDuel();
  });
  console.log('✅ Event listener do botão DUELAR adicionado');
}

if (returnBtn) {
  returnBtn.addEventListener('click', () => {
    console.log('🔄 Botão RETORNAR clicado!');
    if (pokemonInput) pokemonInput.value = '';
    clearResult();
    if (pokemonInput) pokemonInput.focus();
  });
  console.log('✅ Event listener do botão RETORNAR adicionado');
}

if (pokemonInput) {
  pokemonInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      console.log('⌨️ Enter pressionado no input');
      startDuel();
    }
  });
  console.log('✅ Event listener do input adicionado');
}

console.log('✅ script.js carregado com sucesso!');
