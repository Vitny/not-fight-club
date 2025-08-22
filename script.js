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

let player = {
  name: "",
  health: 120,
  damage: 10,
  critChance: 0.25,
  critMultiplier: 2,
  attackZones: [],
  defenseZones: [],
};

createNameButton.addEventListener('click', () => {
  playerName = welcomeInput.value;
  if (playerName === '') {
    playerName = 'Unknown Hero';
    player.name = playerName;
  }

  changeInput.value = playerName;
  welcomePage.classList.remove('active');
  appearancePage.classList.add('active');

  welcomePlayer.textContent = `Glory to the ${playerName}!`;
  playerNameDisplay.textContent = playerName;
  playerNameDisplayFight.textContent = playerName;
  player.name = playerName;

  saveGameState();
});

avatarOptions.forEach(option => {
  option.addEventListener('click', () => {
    avatarOptions.forEach(o => o.classList.remove('avatar-selected'));
    option.classList.add('avatar-selected');

    playerAvatar = option.src;
    playerAvatarDisplay.src = playerAvatar;
    playerAvatarDisplayFight.src = playerAvatar;
    
    confirmAppearanceButton.classList.remove('inactive');

    saveGameState();
  });
});

confirmAppearanceButton.addEventListener('click', () => {
  if (confirmAppearanceButton.classList.contains('inactive')) 
    return;

  mainScreen.classList.add('active');
  appearancePage.classList.remove('active');

  welcomePlayer.textContent = `Change the appearance of your character`;
  appearanceText.textContent = ' ';
  saveGameState();
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
  playerNameDisplayFight.textContent = playerName;
  player.name = playerName;

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
  });
});


//enemy list
const enemyName = document.querySelector('.enemy-name-fight');
const enemyAvatar = document.querySelector('.enemy-avatar-fight');
const enemyHealthCounter = document.querySelector('.health-counter-enemy');
const enemyHealthBar = document.querySelector('.health-bar-enemy');

const enemies = [
  {
    name: 'Jorik',
    avatar: 'assets/pic/enemies/enemy1.jpg',
    health: 110,
    damage: 7,
    critChance: 0.25, 
    critMultiplier: 1.8,
    attackZones: 1,
    defenseZones: 2,
  },
  {
    name: 'Soev',
    avatar: 'assets/pic/enemies/enemy2.jpg',
    health: 120,
    damage: 6,
    critChance: 0.2,
    critMultiplier: 1.8,
    attackZones: 1,
    defenseZones: 2,
  },
  {
    name: 'Hobo',
    avatar: 'assets/pic/enemies/enemy3.jpg',
    health: 70,
    damage: 8,
    critChance: 0.2,
    critMultiplier: 1.5,
    attackZones: 2,
    defenseZones: 1,
  }
];

//pick enemy
let currentEnemy = null;

fightButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * enemies.length);
  currentEnemy = enemies[randomIndex];

  enemyName.textContent = currentEnemy.name;
  enemyAvatar.src = currentEnemy.avatar;
  enemyHealthCounter.textContent = currentEnemy.health;

  selectedAttack = null;
  optionsAttack.forEach(label => {
    label.classList.remove('selected');
    label.querySelector('input').checked = false;
  });

  selectedDefence = [];
  optionsDefence.forEach(label => {
    label.classList.remove('selected');
    label.querySelector('input').checked = false;
  });

  checkAttackButton();
  saveGameState();
});



const attackButton = document.querySelector('.attack-button');
const leaveButton = document.querySelector('.leave-button');
const playerHealthCounter = document.querySelector('.health-counter-player');
const playerHealthBar = document.querySelector('.health-bar-player');
const logText = document.querySelector('.log-text');

let winsCounter = document.querySelector('.wins-counter');
let losesCounter = document.querySelector('.loses-counter');

//update healthbar
function updateBars() {
  playerHealthCounter.textContent = player.health;
  playerHealthBar.style.width = (player.health / 120 * 100) + "%";

  enemyHealthCounter.textContent = currentEnemy.health;
  enemyHealthBar.style.width = (currentEnemy.health / 150 * 100) + "%"; 
}


function checkAttackButton() {
  if (player.health <= 0 || currentEnemy.health <= 0) {
    attackButton.classList.add('inactive');
    saveGameState();
    return;
  }

  if (selectedAttack && selectedDefence.length === 2) {
    attackButton.classList.remove('inactive');
  } else {
    attackButton.classList.add('inactive');
  }
}

optionsAttack.forEach(l => l.addEventListener('click', checkAttackButton));
optionsDefence.forEach(l => l.addEventListener('click', checkAttackButton));

// generate random zones
function getRandomZones(allZones, count) {
  let zones = [];
  while (zones.length < count) {
    const rand = allZones[Math.floor(Math.random() * allZones.length)];
    if (!zones.includes(rand)) zones.push(rand);
  }
  return zones;
}

// crit-hit
function getDamage(baseDamage, critChance, critMultiplier) {
  if (Math.random() < critChance) {
    return { damage: Math.floor(baseDamage * critMultiplier), crit: true };
  }
  return { damage: baseDamage, crit: false };
}

// add text to log
function addLog(attacker, defender, zone, damage, crit, blocked) {
  let attackerColor = attacker === player.name ? "green" : "darkred";
  let defenderColor = defender === player.name ? "green" : "darkred";

  let dmgText = damage > 0 
    ? `<span style="color:red">${damage}</span> damage`
    : "no damage";

  if (crit) dmgText = `CRITICAL <span style="color:red">${damage}</span> damage`;

  let text = `<span style="color:${attackerColor}">${attacker}</span> attacked 
              <span style="color:${defenderColor}">${defender}</span> to 
              <span style="color:blue">${zone}</span> `;

  if (blocked && !crit) {
    text += `but ${defender} was able to protect his ${zone}.`;
  } else if (blocked && crit) {
    text += `but ${defender} blocked it, still hit ${dmgText}.`;
  } else {
    text += `and deal ${dmgText}.`;
  }

  logText.insertAdjacentHTML('beforeend', `<p>${text}</p>`);

  requestAnimationFrame(() => {
    logText.scrollTop = logText.scrollHeight;
  });
}

attackButton.addEventListener('click', () => {
  if (attackButton.classList.contains('inactive')) return;
  if (!currentEnemy) return;

  const playerAttack = selectedAttack;
  const playerDefence = [...selectedDefence];

  const zones = ["head","neck","body","legs"];
  const enemyAttack = getRandomZones(zones, currentEnemy.attackZones);
  const enemyDefence = getRandomZones(zones, currentEnemy.defenseZones);

  let dmgObj = getDamage(player.damage, player.critChance, player.critMultiplier);
  let blocked = enemyDefence.includes(playerAttack);

  if (blocked && !dmgObj.crit) dmgObj.damage = 0;
  if (blocked && dmgObj.crit) dmgObj.damage = Math.floor(dmgObj.damage / 2);

  currentEnemy.health -= dmgObj.damage;
  if (currentEnemy.health < 0) currentEnemy.health = 0;

  addLog(player.name, currentEnemy.name, playerAttack, dmgObj.damage, dmgObj.crit, blocked);

  let totalDamage = 0;
  enemyAttack.forEach(zone => {
    let dmgObjE = getDamage(currentEnemy.damage, currentEnemy.critChance, currentEnemy.critMultiplier);
    let blockedE = playerDefence.includes(zone);

    if (blockedE && !dmgObjE.crit) dmgObjE.damage = 0;
    if (blockedE && dmgObjE.crit) dmgObjE.damage = Math.floor(dmgObjE.damage / 2);

    player.health -= dmgObjE.damage;
    if (player.health < 0) player.health = 0;

    addLog(currentEnemy.name, player.name, zone, dmgObjE.damage, dmgObjE.crit, blockedE);

    totalDamage += dmgObjE.damage;
  });

  updateBars();
  saveGameState();

  // checkin if fight ends
  if (player.health <= 0 || currentEnemy.health <= 0) {
    attackButton.classList.add('inactive');

    if (player.health <= 0 && currentEnemy.health > 0) {
      logText.innerHTML += `<p style="color:red">YOU LOST!</p>`;
      losesCounter.textContent = parseInt(losesCounter.textContent) + 1;
    } else if (currentEnemy.health <= 0 && player.health > 0) {
      logText.innerHTML += `<p style="color:green">YOU WIN!</p>`;
      winsCounter.textContent = parseInt(winsCounter.textContent) + 1;
    } else {
      logText.innerHTML += `<p style="color:gray">DRAW!</p>`;
    }
    saveGameState();
  }
});

// Leave fight
leaveButton.addEventListener('click', () => {
  fightScreen.classList.remove('active');
  mainScreen.classList.add('active');

  if (player.health > 0 && currentEnemy.health <= 0) {
  } else if (player.health <= 0 || currentEnemy.health > 0) {
    losesCounter.textContent = parseInt(losesCounter.textContent) + 1;
  }

  player.health = 120;
  if (currentEnemy) currentEnemy.health = 120;
  updateBars();
  logText.innerHTML = "";

  saveGameState();
});


//save player data
function saveGameState() {
  const state = {
    playerName,
    playerAvatar,
    playerHealth: player.health,
    playerWins: parseInt(winsCounter.textContent),
    playerLoses: parseInt(losesCounter.textContent),
    selectedAttack,
    selectedDefence,
    currentEnemy: currentEnemy ? {
      name: currentEnemy.name,
      health: currentEnemy.health,
      avatar: currentEnemy.avatar,
      damage: currentEnemy.damage,
      critChance: currentEnemy.critChance,
      critMultiplier: currentEnemy.critMultiplier,
      attackZones: currentEnemy.attackZones,
      defenseZones: currentEnemy.defenseZones,
      attackZonesSelected: currentEnemy.attackZonesSelected || []
    } : null,
    fightLog: Array.from(logText.children).map(p => p.innerHTML),
    isFighting: fightScreen.classList.contains('active')
  };
  localStorage.setItem('gameState', JSON.stringify(state));
}

function loadGameState() {
  const state = JSON.parse(localStorage.getItem('gameState'));
  if (!state) return;

  if (state.playerName) {
    playerName = state.playerName;
    player.name = state.playerName;
    playerNameDisplay.textContent = player.name;
    playerNameDisplayFight.textContent = player.name;
    changeInput.value = playerName;
  }

  if (state.playerAvatar) playerAvatar = state.playerAvatar;
  playerNameDisplay.textContent = playerName;
  playerNameDisplayFight.textContent = playerName;
  playerAvatarDisplay.src = playerAvatar || '';
  playerAvatarDisplayFight.src = playerAvatar || '';

  winsCounter.textContent = state.playerWins || 0;
  losesCounter.textContent = state.playerLoses || 0;

  player.health = state.playerHealth || 120;

  selectedAttack = state.selectedAttack || null;
  selectedDefence = state.selectedDefence || [];

  if (state.currentEnemy) {
    currentEnemy = state.currentEnemy;
    enemyName.textContent = currentEnemy.name;
    enemyAvatar.src = currentEnemy.avatar;
    enemyHealthCounter.textContent = currentEnemy.health;

    currentEnemy.attackZonesSelected = currentEnemy.attackZonesSelected || [];

    selectedAttack = state.selectedAttack || null;
    selectedDefence = state.selectedDefence || [];

    optionsAttack.forEach(label => {
      label.addEventListener('click', (e) => {
        e.preventDefault();
        saveGameState();
      });

      const input = label.querySelector('input');
      if (input.value === selectedAttack) {
        label.classList.add('selected');
        input.checked = true;
      } else {
        label.classList.remove('selected');
        input.checked = false;
      }
    });

    optionsDefence.forEach(label => {
      label.addEventListener('click', (e) => {
        e.preventDefault();
        saveGameState();
      });

      const input = label.querySelector('input');
      if (selectedDefence.includes(input.value)) {
        label.classList.add('selected');
        input.checked = true;
      } else {
        label.classList.remove('selected');
        input.checked = false;
      }
    });

    checkAttackButton();
  }

  if (state.fightLog && state.fightLog.length) {
    logText.innerHTML = '';
    state.fightLog.forEach(msg => {
      logText.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
    });
    logText.scrollTop = logText.scrollHeight;
  }

  if (!playerName) {
    welcomePage.classList.add('active');
  } else if (playerName && !playerAvatar) {
    appearancePage.classList.add('active');
    welcomePlayer.textContent = `Glory to the ${playerName}!`;
  } else if (state.isFighting && state.currentEnemy) {
    fightScreen.classList.add('active');
    mainScreen.classList.remove('active');

    currentEnemy = state.currentEnemy;
    player.attackZones = state.playerAttackZones || [];
    player.defenseZones = state.playerDefenseZones || [];

    enemyName.textContent = currentEnemy.name;
    enemyAvatar.src = currentEnemy.avatar;
    enemyHealthCounter.textContent = currentEnemy.health;

    if (state.fightLog && state.fightLog.length) {
      logText.innerHTML = '';
      state.fightLog.forEach(msg => logText.insertAdjacentHTML('beforeend', `<p>${msg}</p>`));
      logText.scrollTop = logText.scrollHeight;
    }

    updateBars();
  } else {
    mainScreen.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', loadGameState);