// js/button.js - Configurações e animações dos botões

// ====================================
// CONTROLES DE ÁUDIO
// ====================================
const themeAudio = document.getElementById('theme-audio');
const playBtn = document.getElementById('play-audio');
const pauseBtn = document.getElementById('pause-audio');

// Controlar reprodução do áudio
if (playBtn) {
  playBtn.addEventListener('click', () => {
    themeAudio.play();
    playBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      playBtn.style.transform = 'scale(1)';
    }, 200);
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    themeAudio.pause();
    pauseBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      pauseBtn.style.transform = 'scale(1)';
    }, 200);
  });
}

// ====================================
// ANIMAÇÕES DAS POKÉBOLAS
// ====================================
function initPokeballAnimations() {
  // Botão DUELAR
  const duelButton = document.getElementById('duel-btn');
  const duelPokeballElem = duelButton ? duelButton.querySelector('.pokeball') : null;

  if (duelButton && duelPokeballElem) {
    duelButton.addEventListener('mouseenter', () => {
      duelPokeballElem.classList.remove('unselected');
      duelPokeballElem.classList.add('selected');
    });

    duelButton.addEventListener('mouseleave', () => {
      duelPokeballElem.classList.remove('selected');
      duelPokeballElem.classList.add('unselected');
    });
  }

  // Botão RETORNAR
  const returnButton = document.getElementById('return-btn');
  const returnPokeballElem = returnButton ? returnButton.querySelector('.pokeball') : null;

  if (returnButton && returnPokeballElem) {
    returnButton.addEventListener('mouseenter', () => {
      returnPokeballElem.classList.remove('unselected');
      returnPokeballElem.classList.add('selected');
    });

    returnButton.addEventListener('mouseleave', () => {
      returnPokeballElem.classList.remove('selected');
      returnPokeballElem.classList.add('unselected');
    });
  }
}

// Inicializar animações quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPokeballAnimations);
} else {
  initPokeballAnimations();
}

console.log('✅ button.js carregado com sucesso!');
