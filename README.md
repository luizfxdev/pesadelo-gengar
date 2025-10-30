# 👻 Pesadelo do Gengar - A Batalha pela Mente

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Pokemon](https://img.shields.io/badge/Pokémon-FFCB05?style=for-the-badge&logo=pokemon&logoColor=white)

> Um desafio interativo de programação que testa seus conhecimentos sobre Pokémon através de uma batalha épica contra Gengar!

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/luizfxdev/pesadelo-gengar)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 📖 Descrição do Desafio

### Pesadelo do Gengar — A Batalha pela Mente

Você acorda em uma cidade envolta por nuvens roxas e chamas misteriosas. A silhueta colossal do **Gengar** domina o céu, seus olhos hipnóticos brilham intensamente. Seu grupo está preso em um pesadelo que parece não ter fim — **a única saída é derrotar Gengar em batalha**. Porém, não será fácil escapar da sua hipnose!

#### ⚡ Como funciona o desafio?

* No input, você pode escolher até **6 Pokémon**, digitando os nomes em inglês separados por vírgula.
* Para vencer Gengar, você precisa pelo menos de um Pokémon do tipo **Fantasma (Ghost)** ou **Escuro (Dark)** entre os escolhidos, pois apenas esses são super efetivos contra o tipo Fantasma.
* Se nenhum dos seus Pokémon escolhidos tiver o tipo Fantasma ou Escuro, Gengar usa sua habilidade especial **Comer Sonhos (Dream Eater)**, te derrotando instantaneamente e mantendo sua equipe presa no pesadelo para sempre!
* O sistema irá conferir seu time em um banco de dados com todos os Pokémon e seus tipos — **só quem conhece bem a lore Pokémon escapará desse desafio**.

#### 🎯 Melhorias para aumentar a dificuldade:

* Gengar pode utilizar outros movimentos estratégicos, como **Sombra Noturna (Night Shade)** e **Bola Sombria (Shadow Ball)**, anulando Pokémon que não tenham imunidade ou que sejam vulneráveis ao tipo Fantasma.
* O sistema pode sortear uma fraqueza extra para o Gengar (como acesso ao tipo Veneno), tornando necessário inserir pokémons que resistam a ataques venenosos.
* Rodadas limitadas de tentativas: após uma escolha errada, o usuário só pode tentar mais uma vez antes de ser "devorado pelo sonho".
* Pontuação bônus para quem montar um time com sinergias defensivas (exemplo: habilidades de proteção ou cura contra golpes tipo Fantasma ou Veneno).

**Esse desafio testa não só seu conhecimento sobre a tipagem dos Pokémon, mas também estratégias para escapar de um dos maiores vilões dos pesadelos!**



## 🚀 Aplicação em Projetos Reais

Este projeto demonstra conceitos fundamentais de desenvolvimento web que podem ser aplicados em diversos cenários profissionais:

### 📊 Sistemas de Validação Complexa
- **E-commerce**: Validar combinações de produtos, descontos e cupons
- **Formulários**: Verificar múltiplas condições antes de submissão
- **Configuradores**: Validar compatibilidade entre componentes selecionados

### 🎯 Integração com APIs Externas
- **Busca de dados**: Consumo eficiente de APIs REST
- **Cache inteligente**: Redução de requisições repetidas
- **Tratamento de erros**: Experiência do usuário resiliente

### 💾 Arquitetura Cliente-Servidor
- **Backend Node.js/Express**: API RESTful escalável
- **Frontend assíncrono**: Comunicação via Fetch API
- **Separação de responsabilidades**: Clean Code e SOLID

### 🎨 UX/UI Interativa
- **Feedback visual**: Animações e estados de loading
- **Design responsivo**: Mobile-first approach
- **Acessibilidade**: Navegação por teclado e feedback claro

---

## 🧩 Lógica de Solução

### Função Principal: `startDuel()`

A função principal que resolve o desafio implementa uma lógica de validação em múltiplas etapas:

```javascript
async function startDuel() {
    // 1. VALIDAÇÃO DE ENTRADA
    const input = pokemonInput.value.trim();
    const pokemonNames = input.split(',').map(name => name.trim()).filter(name => name);
    
    // Validações iniciais
    if (!input) return showError('Input vazio');
    if (pokemonNames.length === 0) return showError('Nenhum Pokémon válido');
    if (pokemonNames.length > 6) return showError('Máximo 6 Pokémon');

    // 2. REQUISIÇÃO À API
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonNames })
    });

    // 3. PROCESSAMENTO DA RESPOSTA
    const data = await response.json();
    
    // 4. LÓGICA DE VALIDAÇÃO DO DESAFIO
    // Verificar se há pelo menos 1 Pokémon tipo Ghost OU Dark
    const hasGhost = data.pokemonData.some(p => p.types.includes('ghost'));
    const hasDark = data.pokemonData.some(p => p.types.includes('dark'));
    const canDefeatGengar = hasGhost || hasDark;

    // 5. EXIBIÇÃO DO RESULTADO
    if (canDefeatGengar) {
        displayVictory();
    } else {
        displayDefeat();
    }
}
```

### Algoritmo de Validação

O desafio utiliza o padrão **"Filter-Map-Reduce"** para processar os dados:

#### 1️⃣ **Filtragem (Filter)**
```javascript
// Remove entradas vazias e normaliza nomes
const pokemonNames = input
    .split(',')
    .map(name => name.trim())
    .filter(name => name);
```

#### 2️⃣ **Mapeamento (Map)**
```javascript
// Backend: transforma resposta da PokeAPI em objeto simplificado
const pokemon = {
    name: response.data.name,
    id: response.data.id,
    types: response.data.types.map(t => t.type.name),
    sprite: response.data.sprites.front_default
};
```

#### 3️⃣ **Redução (Some/Every)**
```javascript
// Verifica se PELO MENOS 1 Pokémon tem tipo Ghost ou Dark
const hasGhost = pokemonData.some(p => p.types.includes('ghost'));
const hasDark = pokemonData.some(p => p.types.includes('dark'));

// Lógica booleana: vitória se houver pelo menos 1 dos tipos
const canDefeatGengar = hasGhost || hasDark;
```

### Complexidade Algorítmica

- **Temporal**: O(n × m) onde:
  - `n` = número de Pokémon (máx 6)
  - `m` = número de tipos por Pokémon (máx 2-3)
  - Complexidade efetiva: **O(1)** (entrada limitada)

- **Espacial**: O(n) para armazenar dados dos Pokémon

### Padrões de Código Utilizados

| Padrão | Aplicação |
|--------|-----------|
| **Async/Await** | Requisições assíncronas legíveis |
| **Try/Catch** | Tratamento robusto de erros |
| **Early Return** | Validações rápidas sem aninhamento |
| **Cache Pattern** | Evita requisições repetidas |
| **MVC** | Separação Model (API) - View (HTML) - Controller (JS) |

---

## 🔌 APIs e Banco de Dados

### PokeAPI - The RESTful Pokémon API

Este projeto utiliza a **[PokeAPI](https://pokeapi.co/)**, uma API RESTful gratuita e open-source que fornece dados completos sobre todos os Pokémon.

#### 📡 Endpoint Utilizado

```
GET https://pokeapi.co/api/v2/pokemon/{nome-ou-id}
```

#### 📦 Estrutura da Resposta

```json
{
  "id": 94,
  "name": "gengar",
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "ghost",
        "url": "https://pokeapi.co/api/v2/type/8/"
      }
    },
    {
      "slot": 2,
      "type": {
        "name": "poison",
        "url": "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/..."
  }
}
```

### 🗄️ Banco de Dados Pokémon

A PokeAPI mantém informações de:
- **✅ 1.281+ Pokémon** (de todas as gerações)
- **✅ 18 tipos** (Normal, Fire, Water, Electric, etc.)
- **✅ 900+ habilidades**
- **✅ 800+ movimentos**
- **✅ Sprites oficiais** de todos os Pokémon

#### Cache Local Implementado

Para otimizar performance, implementamos um sistema de cache:

```javascript
const pokemonCache = {};

// Verifica cache antes de fazer requisição
if (pokemonCache[normalizedName]) {
    return pokemonCache[normalizedName];
}

// Salva no cache após buscar
pokemonCache[normalizedName] = pokemon;
```

**Benefícios do Cache:**
- 🚀 Reduz latência em buscas repetidas
- 💰 Economiza banda da API (rate limit friendly)
- ⚡ Melhora experiência do usuário

---

## 🙏 Agradecimentos

Agradecimento especial à **comunidade PokeAPI** e seus mantenedores:

- **Paul Hallett** ([@phalt](https://github.com/phalt)) - Criador original
- **Comunidade Open Source** - Contribuidores ativos
- **The Pokémon Company** - Por criar este universo incrível

A PokeAPI é mantida por voluntários e é **100% gratuita**. Se você gosta do projeto, considere:
- ⭐ Dar uma estrela no [repositório oficial](https://github.com/PokeAPI/pokeapi)
- 💰 [Apoiar financeiramente](https://pokeapi.co/docs/v2#fairuse)
- 🤝 Contribuir com código ou documentação

---

## 📥 Instalação

### Pré-requisitos

- Node.js 14+ instalado
- NPM ou Yarn

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/luizfxdev/pesadelo-gengar.git

# 2. Entre na pasta
cd pesadelo-gengar

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm start

# 5. Acesse no navegador
# http://localhost:3000
```

---

## 🎯 Exemplos de Uso

### ✅ Times Vencedores (3 exemplos)

| Input | Resultado | Motivo |
|-------|-----------|--------|
| `Gengar, Umbreon, Absol` | **🎉 VITÓRIA** | Gengar (Ghost), Umbreon (Dark), Absol (Dark) |
| `Spiritomb, Darkrai, Hydreigon` | **🎉 VITÓRIA** | Spiritomb (Ghost/Dark), Darkrai (Dark), Hydreigon (Dark/Dragon) |
| `Haunter, Gastly, Misdreavus` | **🎉 VITÓRIA** | Todos são tipo Ghost |

### ❌ Times Derrotados (3 exemplos)

| Input | Resultado | Motivo |
|-------|-----------|--------|
| `Pikachu, Charizard, Blastoise` | **💀 DERROTA** | Nenhum é Ghost ou Dark |
| `Mewtwo, Alakazam, Gardevoir` | **💀 DERROTA** | Todos são Psychic (fraco contra Ghost) |
| `Dragonite, Garchomp, Salamence` | **💀 DERROTA** | Todos são Dragon (sem vantagem contra Ghost) |

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Axios** - Cliente HTTP
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada (Grid, Flexbox, Animations)
- **JavaScript ES6+** - Lógica interativa
- **Fetch API** - Requisições assíncronas

### APIs
- **PokeAPI v2** - Dados dos Pokémon

---

## 📂 Estrutura do Projeto

```
pesadelo-gengar/
├── assets/
│   ├── background.mp4      # Vídeo de fundo
│   └── theme.mp3           # Música tema
├── js/
│   ├── button.js           # Animações dos botões
│   ├── script.js           # Lógica principal
│   └── server.js           # Backend Node.js
├── index.html              # Página principal
├── styles.css              # Estilos
├── package.json            # Dependências
└── README.md              # Este arquivo
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## ⭐ Mostre seu apoio

Se este projeto te ajudou, considere dar uma ⭐ no repositório!

[![Star on GitHub](https://img.shields.io/github/stars/luizfxdev/pesadelo-gengar?style=social)](https://github.com/luizfxdev/pesadelo-gengar/stargazers)

***"Você tem o poder de construir seu próprio caminho"***
