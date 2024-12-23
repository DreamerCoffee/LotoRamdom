// js/modules/gameLogic.js
import { NumberGenerator } from './numberGenerator.js';

export class GameLogic {
    static GAME_MODES = {
        BALOTO: 'baLoto',
        COLOR_LOTO: 'colorLoto',
        MI_LOTO: 'miLoto'
    };

    static COLORS = {
        YELLOW: 'yellow',
        BLUE: 'blue',
        RED: 'red',
        GREEN: 'green',
        BLACK: 'black',
        WHITE: 'white'
    };

    static generateBalotoNumbers() {
        return {
            mainNumbers: NumberGenerator.generateUniqueNumbers(5, 1, 43),
            superBalota: NumberGenerator.generateRandomNumber(1, 16)
        };
    }

    static generateMiLotoNumbers() {
        return {
            numbers: NumberGenerator.generateUniqueNumbers(5, 1, 39)
        };
    }

    static generateColorLotoNumbers() {
    // Generate 6 numbers that can repeat (1-7)
    const numbers = Array(6).fill().map(() => 
        NumberGenerator.generateRandomNumber(1, 7)
    );
    
    // Generate random colors (can repeat)
    const colors = Array(6).fill().map(() => {
        const colorKeys = Object.values(this.COLORS);
        const randomIndex = NumberGenerator.generateRandomNumber(0, colorKeys.length - 1);
        return colorKeys[randomIndex];
    });

    return {
        numbers,
        colors
    };
    }
}