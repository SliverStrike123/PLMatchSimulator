import { data } from './data.js';
import { getRndInteger, SimPLMatch } from './function.js';

class GameUI {
    constructor(data) {
        this.database = data.map(item => ({
            team: item.team,
            odds: item.odds
        }));
        
        this.initializeElements();
        this.bindEvents();
        this.startNewGame();
        
        // Store the original button color
        this.originalButtonColor = '#007bff'; // This should match your CSS button background-color
    }

    initializeElements() {
        this.team1NameEl = document.getElementById('team1-name');
        this.team2NameEl = document.getElementById('team2-name');
        this.team1OddsEl = document.getElementById('team1-odds');
        this.team2OddsEl = document.getElementById('team2-odds');
        this.predictTeam1Btn = document.getElementById('predict-team1');
        this.predictTeam2Btn = document.getElementById('predict-team2');
        this.resultDiv = document.getElementById('result');
        this.winnerText = document.getElementById('winner-text');
        this.predictionText = document.getElementById('prediction-text');
        this.playAgainBtn = document.getElementById('play-again');
        this.overlay = document.getElementById('overlay');
        this.popup = document.getElementById('result-popup');
        this.popupWinnerText = document.getElementById('popup-winner-text');
        this.popupPredictionText = document.getElementById('popup-prediction-text');
        this.popupCloseBtn = document.getElementById('popup-close');
        
        this.popupCloseBtn.addEventListener('click', () => this.closePopup());
    }

    bindEvents() {
        this.predictTeam1Btn.addEventListener('click', () => this.makeGuess(this.team1.team));
        this.predictTeam2Btn.addEventListener('click', () => this.makeGuess(this.team2.team));
        this.playAgainBtn.addEventListener('click', () => this.startNewGame());
    }

    startNewGame() {
        this.resultDiv.classList.add('hidden');
        
        let num1 = getRndInteger(0, 19);
        let num2 = getRndInteger(0, 19);
        
        while(num1 === num2) {
            num2 = getRndInteger(0, 19);
        }

        this.team1 = this.database[num1];
        this.team2 = this.database[num2];

        const totalodds = this.team1.odds + this.team2.odds;
        this.team1odds = Math.round((this.team1.odds/totalodds)*100);
        this.team2odds = Math.round((this.team2.odds/totalodds)*100);

        this.updateUI();
        
        // Reset button colors to original
        this.predictTeam1Btn.style.backgroundColor = this.originalButtonColor;
        this.predictTeam2Btn.style.backgroundColor = this.originalButtonColor;
    }

    updateUI() {
        this.team1NameEl.textContent = this.team1.team;
        this.team2NameEl.textContent = this.team2.team;
        this.team1OddsEl.textContent = `${this.team1odds}%`;
        this.team2OddsEl.textContent = `${this.team2odds}%`;
        
        this.predictTeam1Btn.textContent = `Pick ${this.team1.team}`;
        this.predictTeam2Btn.textContent = `Pick ${this.team2.team}`;
    }

    makeGuess(guess) {
        // Reset button styles to original color
        this.predictTeam1Btn.style.backgroundColor = this.originalButtonColor;
        this.predictTeam2Btn.style.backgroundColor = this.originalButtonColor;
        
        // Highlight selected team's button
        if (guess === this.team1.team) {
            this.predictTeam1Btn.style.backgroundColor = '#28a745'; // Green color
        } else {
            this.predictTeam2Btn.style.backgroundColor = '#28a745'; // Green color
        }

        const winner = SimPLMatch(this.team1.team, this.team2.team, this.team1odds, this.team2odds);
        
        // Update popup content
        this.popupWinnerText.textContent = `${winner} has won the match!`;
        this.popupPredictionText.textContent = guess === winner 
            ? "Congratulations on guessing correctly!" 
            : "Whoops, you guessed incorrectly!";
        
        // Show popup
        this.showPopup();
    }

    showPopup() {
        this.overlay.classList.add('show');
        this.popup.classList.add('show');
    }

    closePopup() {
        this.overlay.classList.remove('show');
        this.popup.classList.remove('show');
        this.startNewGame();
    }
}

// Initialize the game
const game = new GameUI(data); 