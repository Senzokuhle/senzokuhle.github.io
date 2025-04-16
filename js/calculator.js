class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.clearButton = document.getElementById('clear');
        this.backspaceButton = document.getElementById('backspace');
        this.equalsButton = document.getElementById('equals');
        this.numberButtons = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
        this.operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide');
        this.decimalButton = document.getElementById('decimal');

        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = null;

        this.initEventListeners();
    }

    initEventListeners() {
        this.clearButton.addEventListener('click', () => this.clear());
        this.backspaceButton.addEventListener('click', () => this.backspace());
        this.equalsButton.addEventListener('click', () => this.calculate());
        this.numberButtons.forEach(button => button.addEventListener('click', () => this.appendNumber(button.textContent)));
        this.operatorButtons.forEach(button => button.addEventListener('click', () => this.chooseOperation(button.textContent)));
        this.decimalButton.addEventListener('click', () => this.appendDecimal());
    }

    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = null;
        this.display.value = '';
    }

    backspace() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.display.value = this.currentNumber;
    }

    appendNumber(number) {
        if (this.currentNumber.includes('.') && number === '.') return;
        this.currentNumber += number;
        this.display.value = this.currentNumber;
    }

    appendDecimal() {
        if (this.currentNumber.includes('.')) return;
        this.currentNumber += '.';
        this.display.value = this.currentNumber;
    }