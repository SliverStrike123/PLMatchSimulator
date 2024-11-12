export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export function SimPLMatch(team1,team2,odds1,odds2){
    
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
        return team1;
    }
    else{
        return team2;
    }

}