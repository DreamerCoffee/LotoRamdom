// js/modules/numberGenerator.js

export class NumberGenerator {
    static generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateUniqueNumbers(quantity, min, max) {
        if (quantity > (max - min + 1)) {
            throw new Error('La cantidad solicitada es mayor que el rango disponible');
        }

        const numbers = new Set();
        while (numbers.size < quantity) {
            numbers.add(this.generateRandomNumber(min, max));
        }

        return Array.from(numbers).sort((a, b) => a - b);
    }
}