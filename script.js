const welcomeInput = document.querySelector('.playername');
const createNameButton = document.querySelector('.create-name');
const welcomePage = document.querySelector('.welcome-page');

const appearancePage = document.querySelector('.appearance-page');
const welcomePlayer = document.querySelector('.welcome-player');
const avatarOptions = document.querySelectorAll('.avatar');
const confirmAppearanceButton = document.querySelector('.confirm-appearance');
const appearanceText = document.querySelector('.text-look');

const changeAppearanceButton = document.querySelector('.character-appearance-button');

const changeNameButton = document.querySelector('.character-name-button');
const confirmChangeNameButton = document.querySelector('.change-name-button');
const namePage = document.querySelector('.name-page');
const changeInput = document.querySelector('.playername-change');

const playerAvatarDisplay = document.querySelector('.player-avatar');
const playerNameDisplay = document.querySelector('.character-name');

const mainScreen = document.querySelector('.main-screen');

let playerName = '';
let playerAvatar = '';

createNameButton.addEventListener('click', () => {
  playerName = welcomeInput.value;
  if (playerName === '') {
    playerName = 'Unknown Hero';
  }

  welcomePage.classList.remove('active');
  appearancePage.classList.add('active');

  welcomePlayer.textContent = `Glory to the ${playerName}!`;
  playerNameDisplay.textContent = playerName;
});

avatarOptions.forEach(option => {
  option.addEventListener('click', () => {
    avatarOptions.forEach(o => o.classList.remove('avatar-selected'));
    option.classList.add('avatar-selected');

    playerAvatar = option.src;
    playerAvatarDisplay.src = playerAvatar;
  });
});

confirmAppearanceButton.addEventListener('click', () => {
  mainScreen.classList.add('active');
  appearancePage.classList.remove('active');

  welcomePlayer.textContent = `Change the appearance of your character`;
  appearanceText.textContent = ' ';
});

changeAppearanceButton.addEventListener('click', () => {
  mainScreen.classList.remove('active');
  appearancePage.classList.add('active');
});

changeNameButton.addEventListener('click', () => {
  mainScreen.classList.remove('active');
  namePage.classList.add('active');
});

confirmChangeNameButton.addEventListener('click', () => {
  playerName = changeInput.value;
  playerNameDisplay.textContent = playerName;

  mainScreen.classList.add('active');
  namePage.classList.remove('active');
});