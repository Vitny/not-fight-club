const input = document.querySelector('.playername');
const createNameButton = document.querySelector('.create-name');
const welcomePage = document.querySelector('.welcome-page');
const appearancePage = document.querySelector('.appearance-page');
const welcomePlayer = document.querySelector('.welcome-player');
let playerName = '';

createNameButton.addEventListener('click', () => {
  playerName = input.value;
  if (playerName === '') {
    playerName = 'Unknown Hero';
  }

  welcomePage.classList.remove('active');
  appearancePage.classList.add('active');

  welcomePlayer.textContent = `Glory to the ${playerName}!`;
});

