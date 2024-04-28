const data = require('./data.json');

const database = data.map(item => ({
    team: item.team,
    odds: item.odds
}))

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function SimPLMatch(team1,team2,odds1,odds2){
    console.log(`${team1} vs ${team2}`)
    console.log(`Odds: ${odds1/100} vs ${odds2/100}`)
    const team1nums = [];
    const team2nums = [];
    const winner = getRndInteger(1,100);

    for(let i = 1;i <= 100;i++){
        var team1win = false;
        var team2win = false;

        if(team1nums.length != odds1 && team2nums.length != odds2){
            var rng = getRndInteger(0,1)
            if(rng == 0){
                team1nums.push(i)
            }
            else if(rng == 1){
                team2nums.push(i)
            }
            else{
                console.log("errorInRNG");
                break
            }
        }
        else if(team1nums.length == odds1){
            team2nums.push(i)
        }
        else if(team2nums.length == odds2){
            team1nums.push(i)
        }
    }

    for(let i=0;i<team1nums.length;i++){
        if(team1nums[i] == winner){
            team1win = true;
        }
    }
    for(let i=0;i<team2nums.length;i++){
        if(team2nums[i] == winner){
            team2win = true;
        }
    }

    if(team1win == true){
        console.log(`Winner is ${team1}`)
    }
    else{
        console.log(`Winner is ${team2}`)
    }

}

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

SimPLMatch(team1.team,team2.team,team1odds,team2odds)

