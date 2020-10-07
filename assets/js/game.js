window.alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");

var player = {
    "name": playerName,
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

var choice = () => {
    var promptFight = window.prompt("Would you like to fight or skip this battle?\nEnter fight or skip to choose.");

    if (promptFight.toLowerCase() === 'fight') {
        tournament();
    } else if (promptFight.toLowerCase() === 'skip') {
        var confirmSkip = window.confirm("Are you sure you want to skip? This will cost you $2.00.");

        if (confirmSkip) {
            player['money'] -= 2;
            window.alert(`${player['name']} has chosen to skip the fight! This has cost $2.00`);
            choice();
        } else {
            choice();
        }
    } else {
        window.alert("You need to pick a valid option. Please try again.");
        choice();
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
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

        player.currentHealth = player.health;
    };
};

choice();