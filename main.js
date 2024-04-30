const data = require('./data.json')
const prompt = require("prompt-sync")();
const { getRndInteger, SimPLMatch } = require('./function.js');

const database = data.map(item => ({
    team: item.team,
    odds: item.odds
}))

var num1 = getRndInteger(0, 19);
var num2 = getRndInteger(0, 19);

while(num1 == num2){
    num2 = getRndInteger(0, 19);
}

const team1 = database[num1];
const team2 = database[num2];

const totalodds = team1.odds + team2.odds;
const team1odds = Math.round((team1.odds/totalodds)*100);
const team2odds = Math.round((team2.odds/totalodds)*100);

console.log(`${team1.team} vs ${team2.team}`)

var guess = prompt("Who do you think will win this game?: ")

while(guess != team1.team && guess != team2.team){
    guess = prompt("Error, please input a correct team: ")
}

const winner = SimPLMatch(team1.team,team2.team,team1odds,team2odds)

console.log(`${winner} has won the match`)
if(guess == winner){
    console.log("Congratulations on guessing correctly");
}
else{
    console.log("Whoops, you guessed incorrectly");
}

