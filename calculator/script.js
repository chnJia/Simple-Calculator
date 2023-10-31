class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        // 0 = first number || -1 = last number
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    // add any number clicked to the screen
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    calculate() {
        let calculate
        const prev = parseFloat(this.prevOperand) // convert the string to num
        const current = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(current)) return // check if there isn't any num then return

        switch (this.operation) {
            case '+':
                calculate = prev + current
                break
            case '-':
                calculate = prev - current
                break
            case 'x':
                calculate = prev * current
                break
            case '÷':
                calculate = prev / current
                break
            default:
                return
        }
        this.currOperand = calculate
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand)

        if (this.operation != null) {
            // display operation on prevOperand by concat it
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandTextElement.innerText = ''; // Clear the previous operand text
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const prevOperandTextElement = document.querySelector('[data-previous-operand]')
const currOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

clearAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})