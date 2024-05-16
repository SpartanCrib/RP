let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Old Sword"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const text = document.querySelector('#text'); 
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const monsterImage = document.querySelector('#monsterImage');
const monsterXp = document.querySelector('#monsterXp');
const storeImage = document.querySelector('#storeImage');

const weapons = [
    {name: 'Old Sword', power: 10},
    {name: 'Dagger', power: 20},
    {name: 'Bow', power: 30},
    {name: 'Long Sword', power: 40},
    {name: 'Spear', power: 50},
    {name: 'Axe', power: 60},
    {name: 'Pole-Axe', power: 200},
    {name: 'Hero Sword', power: 1000},
    {name: 'Stick', power: 99999}
];

//Have to have higher health boss on the bottome
const monsters = [
    {
        name: "Slime",
        level: 5,
        health: 15,
        image: "images/slime.png"
    },

    {
        name: "Gemrazer",
        level: 10,
        health: 70,
        image: "images/gemrazer.webp"
    },

    {
        name: "Dragon",
        level: 300,
        health: 2000,
        image: "images/dragon.png"
    },

    {
        name: "Primordial Hydra", //More powerful then the Dragon
        level: 320,
        health: 2200,
        image: "images/primordia-hydra.png"
    },

];

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town square. You see a sign that says \"Store\"."
    },
    {
        name: "Store",
        "button text": ["Buy 20 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "Cave",
        "button text": ["Fight Slime", "Fight Gemrazer", "Fight Primordial Hydra", "Go to town square"],
        "button functions": [fightSlime, fightBeast, fightprimordial ,goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "Kill Monster",
        "button text": ["Go to town square", "Go to Shop", "Hidden door"],
        "button functions": [goTown, goStore, easterEgg],
        text: 'The monster screams "Arg" as it dies. You gain experience points and find gold.'
    },
    {
        name: "Lose",
        "button text": ["REPLAY?"],
        "button functions": [restart],
        text: "You die. Hero the prince was take for ever and the kingdom hasents seen the pricen ever since."
    },
    {
        name: "Win",
        "button text": ["REPLAY?"],
        "button functions": [restart],
        text: "You defeat the dragon and saved the prince. You win the game, Hero but now you are stuck in this world and can not make it back to your world"
    },
    {
        name: "Easter Egg",
        "button text": ["Heads", "Tales", "Go to town square"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick Heads or Tales. Theres a floting conin in the air as you walked up to it you see that it said 'Pick heads or tales if you guess right you win Hero'"
    }
];

// Button event listeners
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightprimordial;
button4.onclick = viewInventory;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
    storeImage.src = "store.png";
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 20;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory.join(', ');
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift();
        text.innerText = "You sold a " + soldWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory.join(', ');
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightprimordial() {
    fighting = 3;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    monsterImage.src = monsters[fighting].image;

    const monsterLevel = monsters[fighting].level;
    monsterXp.innerText = monsterLevel
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
    if (Math.random() <= 0.1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["Old Sword"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}

function viewInventory() {
    text.innerText = "In your inventory you have: " + inventory.join(', ') + ".";
}
