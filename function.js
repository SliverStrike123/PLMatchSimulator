export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export function SimPLMatch(team1, team2, odds1, odds2) {
    // Convert percentage odds back to decimals for calculation
    const team1Strength = odds1 / 100;
    const team2Strength = odds2 / 100;
    
    // Base goals calculation
    // Better teams have higher chance of scoring more
    const team1BaseGoals = Math.round(team1Strength * 3); // Max 3 goals base
    const team2BaseGoals = Math.round(team2Strength * 3);
    
    // Random factor for unpredictability
    const team1Goals = calculateTeamGoals(team1Strength);
    const team2Goals = calculateTeamGoals(team2Strength);
    
    return {
        team1Goals,
        team2Goals,
        winner: team1Goals > team2Goals ? team1 : team2Goals > team1Goals ? team2 : 'Draw'
    };
}

function calculateTeamGoals(teamStrength) {
    const random = Math.random();
    
    if (teamStrength > 0.25) { // Strong teams
        if (random < 0.05 || random > 0.95) return 0;     // 10% chance of 0 goals
        if (random < 0.25 || random > 0.85) return 1;     // 20% chance of 1 goal
        if (random < 0.55 && random > 0.25) return 2;     // 30% chance of 2 goals
        if (random < 0.75 && random > 0.55) return 3;     // 20% chance of 3 goals
        if (random < 0.85 && random > 0.75) return 4;     // 10% chance of 4 goals
        return 5;                                         // 10% chance of 5 goals
    } else if (teamStrength > 0.1) { // Medium teams
        if (random < 0.1 || random > 0.9) return 0;       // 20% chance of 0 goals
        if (random < 0.35 || random > 0.75) return 1;     // 30% chance of 1 goal
        if (random < 0.75 && random > 0.35) return 2;     // 30% chance of 2 goals
        if (random < 0.9 && random > 0.75) return 3;      // 15% chance of 3 goals
        return 4;                                         // 5% chance of 4 goals
    } else { // Weaker teams
        if (random < 0.15 || random > 0.85) return 0;     // 30% chance of 0 goals
        if (random < 0.55 || random > 0.75) return 1;     // 40% chance of 1 goal
        if (random < 0.75 && random > 0.55) return 2;     // 20% chance of 2 goals
        return 3;                                         // 10% chance of 3 goals
    }
}