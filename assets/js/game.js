
var player = {
    "name": null,
    "health": 100,
    "currentHealth": 100,
    "attack": 10,
    "money": 20
}

var enemies = [
    {
        "name": "Joeboto",
        "health": 50,
        "currentHealth": 50,
        "attack": 9,
        "prize": 5
    },
    {
        "name": "Andy Android",
        "health": 25,
        "currentHealth": 25,
        "attack": 12,
        "prize": 7
    },
    {
        "name": "bE3b0p",
        "health": 60,
        "currentHealth": 60,
        "attack": 9,
        "prize": 4
    }
];

window.alert("Welcome to Robot Gladiators!");

var createPlayerRobot = () => {
    while (player.name === null) {
        var value = window.prompt("What is your robot's name?");
            console.log(value);
        if (value) {
            player.name = value;
        } else {
            window.alert("You must name your robot.");
            createPlayerRobot();
        }
    }
}

createPlayerRobot();

var startGame = () => {
    var fightOrShop = window.prompt("Would you like to go to the store or go to the arena?\n\tType fight, shop or quit.");
    console.log(fightOrShop);
    if (fightOrShop && fightOrShop.toLowerCase() === 'fight') {
        fight(); 
    } else if (fightOrShop && fightOrShop.toLowerCase() === 'shop') {
        shop(); 
    } else if (fightOrShop && fightOrShop.toLowerCase() === 'quit') {
        quit(); 
    } else {
        window.alert("You need to pick a valid option. Please try again.");
        startGame();
    }
}

var shop = () => {
    var promptStore = window.prompt("For 3 dollars you can refill your health to full or upgrade your attack by 5.\nAvailable options are refill, upgrade, leave (to go back to the main menu) or quit the game.");
    if (promptStore && promptStore.toLowerCase() === 'refill') {
        if (player.currentHealth === player.health) {
            window.alert("Your bot's health is already full. Now go fight.");
        } else {
            player.currentHealth = player.health;
            window.alert(`Your bot's health is now full at ${player.currentHealth}`);
        }
        startGame();
    } else if (promptStore && promptStore.toLowerCase() === 'upgrade') {
        if (player.attack >= 100) {
            window.alert("Your bot's attack is maxed out and could punch through the earth with a little luck.");
        } else {
            player.attack += 10;
            window.alert(`${player.name}'s attack is now ${player.attack}. Go get 'em tiger... bot.`);
        }
        startGame();
    } else if (promptStore && promptStore.toLowerCase() === 'leave') {
        startGame();
    } else if (promptStore && promptStore.toLowerCase() === 'quit') {
        quit(); 
    } else {
        window.alert("You need to pick a valid option. Please try again.");
        shop();
    }

}

var quit = () => {
    var again = window.confirm("Would you like to return to the main menu?");

    if (again) {
        fight();
    } else {
        var confirmExit = window.confirm("Ok, if you change your mind you can refresh the page and start all over.");
        if (!confirmExit) {
            fight();
        } else {
            window.alert("Have a nice day!");
            process.exit(0);
        }
    };
}

var fight = () => {
    var promptFight = window.prompt("Would you like to fight or skip this battle?\nAvailable options are fight, skip and quit.", '');

    if (promptFight && promptFight.toLowerCase() === 'fight') {
        tournament();
    } else if (promptFight && promptFight.toLowerCase() === 'skip') {
        var confirmSkip = window.confirm("Are you sure you want to skip? This will cost you $2.00.");

        if (confirmSkip) {
            player['money'] -= 2;
            window.alert(`${player['name']} has chosen to skip the fight! This has cost $2.00`);
        }         
        startGame();
    } else if (promptFight && fightOrShop.toLowerCase() === 'quit') {
        quit(); 
    } else {
        window.alert("You need to pick a valid option. Please try again.");
        fight();
    }
};

var attack = (attacker, target) => {
    target.currentHealth -= Math.round(attacker['attack'] * Math.random());
    console.log(`${attacker['name']} attacked ${target['name']}. ${target['name']} now has ${target.currentHealth} health remaining.`)
};

var flury = (enemy) => {
    // Who attacks whom 50/50
    if (Math.random() < 0.5) {
        attack(player, enemy);
    } else {
        attack(enemy, player);
    };
};

var isKnockedOut = (fighter) => {
    console.log(`Health of ${fighter['name']} = ${fighter['currentHealth']}`);
    return fighter['currentHealth'] <= 0;
};

var round = (enemy) => {
    while (!isKnockedOut(player) && !isKnockedOut(enemy)) {
        flury(enemy);
    };

    var winner = player['currentHealth'] > 0 ? player : enemy;

    return winner;
};

var tournament = () => {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].currentHealth = enemies[i].health;
        window.alert(`Welcome to round ${i + 1}\nThe challenger, ${player.name} will be fighting ${enemies[i].name}`);
        var winner = round(enemies[i]);

        //If the player wins he gets some $$
        if (winner === player) {
            window.alert(`${player.name} has won round ${i + 1}.`);
            player.money += enemies[i].prize;
        } else {
            window.alert("You have lost your robot in battle! Game Over!\nRefresh the page and create a new bot.");
            break;
        }
    };

    quit();
};

startGame();