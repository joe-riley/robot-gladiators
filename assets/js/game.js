
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

var getPlayerStats = () => {
    return `Name: ${playerName}\nHealth: ${playerHealth}\nAttack: ${playerAttack}`;
};

var enemyName = "JoeBerto";
var enemyHealth = 50;
var enemyAttack = 12;

var getEnemyStats = () => {
    return `Name: ${enemyName}\nHealth: ${enemyHealth}\nAttack: ${enemyAttack}`;
};

var fight = () => {
    window.alert("Welcome to Robot Gladiators!");

    enemyHealth -= playerAttack;
    console.log(`${playerName} attacked ${enemyName}. ${enemyName} now has ${enemyHealth} health remaining.`)

    if (enemyHealth <= 0) {
        window.alert(`${enemyName} has died!`);
    } 
    else {
        window.alert(`${enemyName} still has ${enemyHealth} health left.`);
    }

    playerHealth -= enemyAttack;
    console.log(`${enemyName} attacked ${playerName}. ${playerName} now has ${playerHealth} health remaining.`)

    if (playerHealth <= 0) {
        window.alert(`${playerName} has died!`);
    } 
    else {
        window.alert(`${playerName} still has ${playerHealth} health left.`);
    }
};

fight();