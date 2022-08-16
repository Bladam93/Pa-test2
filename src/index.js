const buttons = document.querySelectorAll('.buttons > div');

function isSymbolAlreadyExistent(symbol) {
    const alreadyWrittenOperations = document.querySelector('.display').innerText;
    return alreadyWrittenOperations.indexOf(symbol) !== -1;
}

function getNumbers(sign) {
    const input = document.querySelector('.display').innerText;
    let signPosition = input.indexOf(sign);
    let firstPart = input.slice(0, signPosition);
    let firstNumber = parseInt(firstPart);
    let secondPart = input.slice(signPosition + 1, input.length);
    let secondNumber = parseInt(secondPart);
    return {
        firstNumber: firstNumber,
        secondNumber: secondNumber
    }
}

function processButton(e) {
    const display = document.querySelector('.display');
    
    if (e.target.innerText === "+") {
        if (isSymbolAlreadyExistent("/") || isSymbolAlreadyExistent("*") || isSymbolAlreadyExistent('+')) {
            return;
        }
    }
    if (e.target.innerText === "*") {
        if (isSymbolAlreadyExistent("/") || isSymbolAlreadyExistent("*") || isSymbolAlreadyExistent('+')) {
            return;
        }
    }
    if (e.target.innerText === "/") {
        if (isSymbolAlreadyExistent("/") || isSymbolAlreadyExistent("*") || isSymbolAlreadyExistent('+')) {
            return;
        }
    }

    if (e.target.innerText === "=") {
        if (isSymbolAlreadyExistent("+")) {
            let result = getNumbers('+');
            display.innerText = result.firstNumber + result.secondNumber;
            if(isNaN(display.innerText)){
                display.innerText = 0;
            }
        } else if (isSymbolAlreadyExistent("*")) {
            let result = getNumbers("*");
            display.innerText = result.firstNumber * result.secondNumber;
            if(isNaN(display.innerText)){
                display.innerText = 0;
            }
        } else if (isSymbolAlreadyExistent("/")){
            let result = getNumbers("/")
            display.innerText = result.firstNumber / result.secondNumber
            if(isNaN(display.innerText)){
                display.innerText = 0;
            }
        }
    } else {
        display.innerText += e.target.innerText;
    }
    if(display.innerText % 2 == 0){
        display.style.color = "#12796E";
    }else {
        display.style.color = "#FF5733";
    }

    
}

for (let i = 0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', processButton)
}

