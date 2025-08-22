//screens
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
const playerAvatarDisplayFight = document.querySelector('.player-avatar-fight');
const playerNameDisplayFight = document.querySelector('.character-name-fight');

const mainScreen = document.querySelector('.main-screen');

const fightButton = document.querySelector('.fight-button');
const fightScreen = document.querySelector('.fight-screen');

let playerName = '';
let playerAvatar = '';

createNameButton.addEventListener('click', () => {
  playerName = welcomeInput.value;
  if (playerName === '') {
    playerName = 'Unknown Hero';
  }

  changeInput.value = playerName;
  welcomePage.classList.remove('active');
  appearancePage.classList.add('active');

  welcomePlayer.textContent = `Glory to the ${playerName}!`;
  playerNameDisplay.textContent = playerName;
  playerNameDisplayFight.textContent = playerName;
});

avatarOptions.forEach(option => {
  option.addEventListener('click', () => {
    avatarOptions.forEach(o => o.classList.remove('avatar-selected'));
    option.classList.add('avatar-selected');

    playerAvatar = option.src;
    playerAvatarDisplay.src = playerAvatar;
    playerAvatarDisplayFight.src = playerAvatar;
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

fightButton.addEventListener('click', () => {
  mainScreen.classList.remove('active');
  fightScreen.classList.add('active');
});


//checkboxes
const optionsDefence = document.querySelectorAll('.option-defence');
let selectedDefence = [];

optionsDefence.forEach(label => {
  const input = label.querySelector('input');

  label.addEventListener('click', (e) => {
    e.preventDefault();

    if (label.classList.contains('selected')) {
      label.classList.remove('selected');
      input.checked = false;
      selectedDefence = selectedDefence.filter(val => val !== input.value);
    }
    else {
      if (selectedDefence.length < 2) {
        label.classList.add('selected');
        input.checked = true;
        selectedDefence.push(input.value);
      } else {
        const first = selectedDefence.shift();
        document.querySelector(`input[value="${first}"]`).parentElement.classList.remove('selected');
        document.querySelector(`input[value="${first}"]`).checked = false;

        label.classList.add('selected');
        input.checked = true;
        selectedDefence.push(input.value);
      }
    }
  });
});

const optionsAttack = document.querySelectorAll('.option-attack');
let selectedAttack = null;

optionsAttack.forEach(label => {
  const input = label.querySelector('input');

  label.addEventListener('click', (e) => {
    e.preventDefault();

    if (label.classList.contains('selected')) {
      label.classList.remove('selected');
      input.checked = false;
      selectedAttack = null;
    }
    else {
      optionsAttack.forEach(l => {
        l.classList.remove('selected');
        l.querySelector('input').checked = false;
      });

      label.classList.add('selected');
      input.checked = true;
      selectedAttack = input.value;
    }

    console.log("Выбран:", selectedAttack);
  });
});


//enemy list
const enemyNameEl = document.querySelector('.enemy-name-fight');
const enemyAvatarEl = document.querySelector('.enemy-avatar-fight');
const enemyHealthCounterEl = document.querySelector('.health-counter-enemy');
const enemyHealthBarEl = document.querySelector('.health-bar-enemy');

const enemies = [
  {
    name: 'Jorik',
    avatar: "assets/pic/enemies/enemy1.jpg",
    health: 130,
    crit: 1.5
  },
  {
    name: 'Soev',
    avatar: "assets/pic/enemies/enemy2.jpg",
    health: 90,
    crit: 1.2
  },
  {
    name: 'Hobo',
    avatar: "assets/pic/enemies/enemy3.jpg",
    health: 150,
    crit: 1.8
  }
];

//pick enemy
let currentEnemy = null;

fightButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * enemies.length);
  currentEnemy = enemies[randomIndex];

  enemyNameEl.textContent = currentEnemy.name;
  enemyAvatarEl.src = currentEnemy.avatar;
  enemyHealthCounterEl.textContent = currentEnemy.health;
});