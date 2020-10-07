window.alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");

var player = {
    "name": playerName,
    "health": 100,
    "currentHealth": 100,
    "attack": 10,
    "money": 0
}

var enemies = [
    {
        "name": "Joeboto",
        "health": 50,
        "currentHealth": 50,
        "attack": 12,
        "prize": 5
    },
    {
        "name": "Andy Android",
        "health": 25,
        "currentHealth": 25,
        "attack": 16,
        "prize": 7
    },
    {
        "name": "BeeBop",
        "health": 60,
        "currentHealth": 60,
        "attack": 9,
        "prize": 4
    }
];

var choice = () => {
    var promptFight = window.prompt("Would you likt to fight or skip this battle?\nEnter fight or skip to choose.");

    if (promptFight.toLowerCase() === 'fight') {
        // var names = [];
        // window.prompt(`Choose a fighter. Your choices are:\n`)
        fight(enemies[1]);
    } else if (promptFight.toLowerCase() === 'skip') {
        var confirmSkip = window.confirm("Are you sure you want to skip? This will cost you $2.00.");

        if (confirmSkip) {
            player['money'] -= 2;
            window.alert(`${player['name']} has chosen to skip the fight! This has cost $2.00`);
        } else {
            choice();
        }
    } else {
        window.alert("You need to pick a valid toption. Please try again.");
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

var fight = (enemy) => {
    while (!isKnockedOut(player) && !isKnockedOut(enemy)) {
        flury(enemy);
    };

    var winner = player['currentHealth'] > 0 ? player : enemy;

    console.log(`${winner['name']} won the fight!`)

    //reset fighters for next fight
    player['currentHealth'] = player['health'];
    enemy['currentHealth'] = enemy['health'];

};

choice();