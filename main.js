const data = require('./data.json')
const prompt = require("prompt-sync")();
const { getRndInteger, SimPLMatch } =require('./function.js');

const database = data.map(item => ({
    team: item.team,
    odds: item.odds
}))

var num1 = prompt("Please give a number from 1-20") - 1;
var num2 = getRndInteger(0, 19);

while(num1 == num2){
    num2 = getRndInteger(0, 19);
}

const team1 = database[num1];
const team2 = database[num2];

const totalodds = team1.odds + team2.odds;
const team1odds = Math.round((team1.odds/totalodds)*100);
const team2odds = Math.round((team2.odds/totalodds)*100);

SimPLMatch(team1.team,team2.team,team1odds,team2odds)

