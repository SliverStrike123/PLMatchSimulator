export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export function SimPLMatch(team1, team2, odds1, odds2) {
    const random = Math.random() * 100;
    return random < odds1 ? team1 : team2;
}