// js/modules/uiController.js
import { GameLogic } from './gameLogic.js';

export class UIController {
    constructor() {
        this.gameModeSelect = document.getElementById('gameMode');
        this.refreshButton = document.querySelector('.refresh-button');
        this.gameContainers = {
            baLoto: document.getElementById('baloto'),
            colorLoto: document.getElementById('colorLoto'),
            miLoto: document.getElementById('miLoto')
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.gameModeSelect.addEventListener('change', () => this.handleGameModeChange());
        this.refreshButton.addEventListener('click', () => this.handleRefresh());
    }

    handleGameModeChange() {
        const selectedMode = this.gameModeSelect.value;
        this.switchGameMode(selectedMode);
        this.resetNumbers();
    }

    switchGameMode(mode) {
        Object.values(this.gameContainers).forEach(container => {
            container.style.display = 'none';
        });
        this.gameContainers[mode].style.display = 'flex';
    }

    handleRefresh() {
        try {
            const mode = this.gameModeSelect.value;
            switch (mode) {
                case GameLogic.GAME_MODES.BALOTO:
                    this.updateBaloto();
                    break;
                case GameLogic.GAME_MODES.MI_LOTO:
                    this.updateMiLoto();
                    break;
                case GameLogic.GAME_MODES.COLOR_LOTO:
                    this.updateColorLoto();
                    break;
            }
        } catch (error) {
            console.error('Error al generar números:', error);
        }
    }

    updateBaloto() {
        const { mainNumbers, superBalota } = GameLogic.generateBalotoNumbers();
        const ballots = this.gameContainers.baLoto.querySelectorAll('.ballot');
        
        // Reset all ballots first
        ballots.forEach(ballot => this.resetBallotColors(ballot, true));
        
        mainNumbers.forEach((number, index) => {
            ballots[index].textContent = number.toString().padStart(2, '0');
            ballots[index].classList.add('ballot--grey');
            this.animateBallot(ballots[index]);
        });

        ballots[5].textContent = superBalota.toString().padStart(2, '0');
        ballots[5].classList.add('ballot--red--baloto');
        this.animateBallot(ballots[5]);
    }

    updateMiLoto() {
        const { numbers } = GameLogic.generateMiLotoNumbers();
        const ballots = this.gameContainers.miLoto.querySelectorAll('.ballot');
        
        ballots.forEach((ballot, index) => {
            this.resetBallotColors(ballot, true);
            ballot.textContent = numbers[index].toString().padStart(2, '0');
            this.animateBallot(ballot);
        });
    }

    updateColorLoto() {
        const { numbers, colors } = GameLogic.generateColorLotoNumbers();
        const ballots = this.gameContainers.colorLoto.querySelectorAll('.ballot');
        
        ballots.forEach((ballot, index) => {
            // Reset ballot first
            this.resetBallotColors(ballot, false);
            
            // Update number
            ballot.textContent = numbers[index].toString();
            
            // Add new color class
            ballot.classList.add(`ballot--${colors[index]}`);
            
            // Animate
            this.animateBallot(ballot);
        });
    }

    resetBallotColors(ballot, isBalotoMode, index) {
        // Remove all color classes
        const classes = [...ballot.classList];
        classes.forEach(className => {
            if (className.startsWith('ballot--')) {
                ballot.classList.remove(className);
            }
        });

        // Reset to default grey depending on mode
        ballot.classList.add('ballot');
        if (isBalotoMode && index === 5) {
            ballot.classList.add('ballot--red--baloto'); // Para Baloto
        } else {
            ballot.classList.add('ballot--grey'); // Para ColorLoto
        }

        // Reset any inline styles if present
        ballot.style.border = '';
    }

    animateBallot(ballot) {
        ballot.style.animation = 'none';
        ballot.offsetHeight; // Trigger reflow
        ballot.style.animation = 'popIn 0.3s ease-out';
    }

    resetNumbers() {
        const currentMode = this.gameModeSelect.value;
        const container = this.gameContainers[currentMode];
    
        if (!container) return;
    
        const ballots = container.querySelectorAll('.ballot');
        ballots.forEach((ballot, index) => {
            this.resetBallotColors(ballot, currentMode === 'baLoto', index);
            // Set proper number format based on game mode
            if (currentMode === GameLogic.GAME_MODES.COLOR_LOTO) {
                ballot.textContent = '0';
            } else {
                ballot.textContent = '00';
            }
        });
    }

    handleGameModeChange() {
        const selectedMode = this.gameModeSelect.value;
        Object.values(this.gameContainers).forEach(container => {
            container.classList.add('hidden');
        });
        this.gameContainers[selectedMode].classList.remove('hidden');
        
        // Reset numbers with proper format for each mode
        this.resetNumbers();
    
        // Special handling for Baloto's red ballot
        if (selectedMode === GameLogic.GAME_MODES.BALOTO) {
            const balotoBallots = this.gameContainers.baLoto.querySelectorAll('.ballot');
            balotoBallots[5].classList.remove('ballot--grey');
            balotoBallots[5].classList.add('ballot--red--baloto');
        }
    }
}