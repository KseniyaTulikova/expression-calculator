function eval() {
    // Do not use eval!!!
    return;
}

const OPERATOR_PRIORITIES = {
    "+" : 1, // low prior
    "-" : 1, // low prior
    "/" : 2, // high prior
    "*" : 2 // high prior
}

function expressionCalculator(expr) {
    
    checkExpressionError(expr);

    let currentExpression = expr.trim().split(/\s+/);
    let operators = new Stack();
    let arrExpr = new Array();

    
    currentExpression.forEach(elem => {
        if(isOperator(elem)) {
            while (!operators.isEmpty() && OPERATOR_PRIORITIES[operators.getValue()] >= OPERATOR_PRIORITIES[elem]) {
                arrExpr.push(operators.pop());  
            }
            operators.push(elem);
        } else if(elem == '(') {
            operators.push(elem);
        } else if(elem == ')') {
            while(operators.getValue() != '('){
                arrExpr.push(operators.pop());
            }
            operators.pop();             
        } else {
            arrExpr.push(elem);
        }
    });

    while(!operators.isEmpty()) {
        arrExpr.push(operators.pop());
    }

    return calculateResult(arrExpr);
}

const isOperator = (element) => OPERATOR_PRIORITIES.hasOwnProperty(element);

const checkExpressionError = (expression) => {

    if (expression.split('(').length !== expression.split(')').length) {
        throw new Error('ExpressionError: Brackets must be paired');

    }
}

const calculateElements = (a, b, operator) => {
    switch (operator) {
        case '+':
            return a + b;

        case '-':
            return a - b;

        case '*':
            return a * b;

        case '/':
            if (b == 0) {
                throw new Error("TypeError: Division by zero.");
            }
            return a / b;

        default:

    }
}

const calculateResult = (array) => {

    for (let i = 0; i < array.length; i++) {
        if (isOperator(array[i])) {
            array.splice(i - 2, 3, calculateElements(Number(array[i - 2]), Number(array[i - 1]), array[i]));
            i -= 2;
        }
    }
    return array[0];
};

module.exports = {
    expressionCalculator
}


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    getValue() {
        return this.top.value;
    }

    push(value) {
        let currentTop = this.top;
        this.top = new Node(value);
        this.top.next = currentTop;

        this.length++;
    }

    pop() {
        let currentTop = this.top;
        this.top = currentTop.next;
        this.length--;

        return currentTop.value;
    }

    isEmpty() {
        return this.length == 0;
    }

    getLength() {
        return this.length;
    }
}


