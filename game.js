import { data } from './data.js';
import { getRndInteger, SimPLMatch } from './function.js';

class GameUI {
    constructor() {
        this.initializeElements();
        this.populateDropdowns();
        this.bindEvents();
    }

    initializeElements() {
        // Dropdown elements
        this.team1Select = document.getElementById('team1-select');
        this.team2Select = document.getElementById('team2-select');
        
        // Display elements
        this.team1NameEl = document.getElementById('team1-name');
        this.team2NameEl = document.getElementById('team2-name');
        this.team1OddsEl = document.getElementById('team1-odds');
        this.team2OddsEl = document.getElementById('team2-odds');
        
        // Button elements
        this.predictTeam1Btn = document.getElementById('predict-team1');
        this.predictTeam2Btn = document.getElementById('predict-team2');
        this.randomMatchBtn = document.getElementById('random-match');
        
        // Popup elements
        this.overlay = document.getElementById('overlay');
        this.popup = document.getElementById('result-popup');
        this.popupWinnerText = document.getElementById('popup-winner-text');
        this.popupPredictionText = document.getElementById('popup-prediction-text');
        this.popupCloseBtn = document.getElementById('popup-close');
    }

    bindEvents() {
        // Dropdown events
        this.team1Select.addEventListener('change', () => this.handleTeamSelection());
        this.team2Select.addEventListener('change', () => this.handleTeamSelection());
        
        // Button events
        this.randomMatchBtn.addEventListener('click', () => this.generateRandomMatch());
        this.predictTeam1Btn.addEventListener('click', () => {
            if (this.team1Select.value) {
                this.makeGuess(this.team1Select.value);
            }
        });
        this.predictTeam2Btn.addEventListener('click', () => {
            if (this.team2Select.value) {
                this.makeGuess(this.team2Select.value);
            }
        });
        
        // Popup events
        this.popupCloseBtn.addEventListener('click', () => this.closePopup());
    }

    makeGuess(guess) {
        const team1 = this.team1Select.value;
        const team2 = this.team2Select.value;
        
        if (!team1 || !team2) {
            alert('Please select both teams first!');
            return;
        }

        const team1Data = data.find(t => t.team === team1);
        const team2Data = data.find(t => t.team === team2);
        
        const totalOdds = team1Data.odds + team2Data.odds;
        const team1Odds = Math.round((team1Data.odds/totalOdds) * 100);
        const team2Odds = Math.round((team2Data.odds/totalOdds) * 100);

        const winner = SimPLMatch(team1, team2, team1Odds, team2Odds);
        
        // Update popup content
        this.popupWinnerText.textContent = `${winner} has won the match!`;
        this.popupPredictionText.textContent = guess === winner 
            ? "Congratulations on guessing correctly!" 
            : "Whoops, you guessed incorrectly!";
        
        // Set prediction text color
        this.popupPredictionText.style.color = guess === winner ? '#28a745' : '#dc3545';
        
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
        // Reset selections for new game
        this.team1Select.value = '';
        this.team2Select.value = '';
        this.updateDisplay();
    }

    updateDisplay() {
        // Reset display if no teams selected
        if (!this.team1Select.value || !this.team2Select.value) {
            this.team1NameEl.textContent = 'Team 1';
            this.team2NameEl.textContent = 'Team 2';
            this.team1OddsEl.textContent = '50%';
            this.team2OddsEl.textContent = '50%';
            this.predictTeam1Btn.textContent = 'Pick Team 1';
            this.predictTeam2Btn.textContent = 'Pick Team 2';
            return;
        }

        // Update with selected teams
        this.team1NameEl.textContent = this.team1Select.value;
        this.team2NameEl.textContent = this.team2Select.value;
        
        // Calculate and update odds
        const team1Data = data.find(t => t.team === this.team1Select.value);
        const team2Data = data.find(t => t.team === this.team2Select.value);
        const totalOdds = team1Data.odds + team2Data.odds;
        
        this.team1OddsEl.textContent = `${Math.round((team1Data.odds/totalOdds) * 100)}%`;
        this.team2OddsEl.textContent = `${Math.round((team2Data.odds/totalOdds) * 100)}%`;
        
        this.predictTeam1Btn.textContent = `Pick ${this.team1Select.value}`;
        this.predictTeam2Btn.textContent = `Pick ${this.team2Select.value}`;
    }

    handleTeamSelection() {
        const team1 = this.team1Select.value;
        const team2 = this.team2Select.value;

        if (team1 && team2 && team1 === team2) {
            alert('Please select different teams');
            if (this.lastChanged === 'team1') {
                this.team1Select.value = '';
            } else {
                this.team2Select.value = '';
            }
        }

        this.lastChanged = document.activeElement.id === 'team1-select' ? 'team1' : 'team2';
        this.updateDisplay();
    }

    populateDropdowns() {
        // Clear existing options
        this.team1Select.innerHTML = '<option value="" disabled selected>Select Home Team</option>';
        this.team2Select.innerHTML = '<option value="" disabled selected>Select Away Team</option>';
        
        // Sort teams alphabetically
        const sortedTeams = [...data].sort((a, b) => a.team.localeCompare(b.team));
        
        // Add teams to dropdowns
        sortedTeams.forEach(teamData => {
            // Home team dropdown
            const option1 = document.createElement('option');
            option1.value = teamData.team;
            option1.textContent = teamData.team;
            this.team1Select.appendChild(option1);

            // Away team dropdown
            const option2 = document.createElement('option');
            option2.value = teamData.team;
            option2.textContent = teamData.team;
            this.team2Select.appendChild(option2);
        });
    }

    generateRandomMatch() {
        let num1 = getRndInteger(0, data.length - 1);
        let num2 = getRndInteger(0, data.length - 1);
        
        while(num1 === num2) {
            num2 = getRndInteger(0, data.length - 1);
        }

        // Set dropdown values
        this.team1Select.value = data[num1].team;
        this.team2Select.value = data[num2].team;

        // Trigger team selection handler to update display
        this.handleTeamSelection();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gameUI = new GameUI();
}); 