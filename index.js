/**
 * CS - 570 Reverse Polish Notation
 *
 * Prompt the user for an infix math problem.
 * Convert the problem to postfix.
 * Output the problem in postfix.
 * Calculate the result.
 * Display the result.
 * Ask the user for another math problem.
 */
const readline = require('readline');
const OPERATORS = {
  'POW': {prec: 2, assoc: 'R'},
  '*': {prec: 1, assoc: 'L'},
  '/': {prec: 1, assoc: 'L'},
  '%': {prec: 1, assoc: 'L'},
  '+': {prec: 0, assoc: 'L'},
  '-': {prec: 0, assoc: 'L'}
};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Accepts user input from the console
 */
function getInfixQueue() {

  rl.question('Please enter an infix math problem or enter "quit": ', (answer) => {

    if (answer.trim() === '') {
      return getInfixQueue();
    }

    if (answer.toLowerCase() === 'quit') {
      rl.close();
    }
    else {
      let infixQ = [];
      let i = 0;
      let invalidSymbolFlag = 0;
      while (i < answer.length) {
        let num = [];
        if (answer[i] === ' ') {
          i++;
        }
        else if (/[+|\-|*|\/|%|(|)]/.test(answer[i])) {
          infixQ.push(answer[i++]);
        }
        else if (/\d/.test(answer[i])) {
          while (/\d/.test(answer[i]) || answer[i] == '.') {
            num.push(answer[i++]);
          }
          infixQ.push(num.join(''));
        }
        else if (answer.slice(i, i + 3) === 'POW') {
          i = i + 3;
          infixQ.push('POW');
        }
        else {
          console.log('Problem contains invalid symbols.');
          invalidSymbolFlag = 1;
          break;
        }
      }

      if (invalidSymbolFlag === 0) {
        convertToPostfix(infixQ);
      }

      getInfixQueue();
    }
  });
}

/**
 * Converts the user inputted problem from infix to postfix notation
 *
 * @param {array} problem
 */
function convertToPostfix(problem) {
  let postQ = [];
  let opStack = [];


  for (let i = 0; i < problem.length; i++) {    //while (infixQ is not empty)

    let token = problem[i];

    if (parseInt(token) || token == '0') {  //if the token is a number, then push it to the output queue
      postQ.push(token)
    }
    else if (opStack.length === 0) { //if operator stack is empty
      opStack.push(token);            //push t onto operator stack
    }
    else if (token === '(') {    //if the token is a left bracket
      opStack.push(token);    //push it onto the operator stack
    }
    else if (token === ')') {    //if the token is a right bracket
      while (opStack[opStack.length - 1] !== '(') {
        postQ.push(opStack.pop());  //pop operators from the operator stack onto the output queue
      }
      opStack.pop();  // pop the left bracket from the stack
    }
    else {  //if 
      while
        (
        (opStack.length > 0)    //operator stack is not empty
        &&
        (opStack[opStack.length - 1] !== '(')  // (the operator at the top of the stack is not a left bracket)
        &&
        (
          (OPERATORS[token].prec < OPERATORS[opStack[opStack.length - 1]].prec)   // (there is an operator at the top of the operator stack with greater precedence)
          || // or
          ((OPERATORS[opStack[opStack.length - 1]].prec === OPERATORS[token].prec) && (OPERATORS[token].assoc === 'L'))
        )   // (the operator at the top of the operator stack has equal precedence and the operator is left associative)
        ) {
        postQ.push(opStack.pop());  // pop operators from the operator stack, onto the output queue
      }

      opStack.push(token);    // push the read operator onto the operator stack
    }
  }

  // Now there are no tokens left in infixQ 
  for (let i = opStack.length - 1; i >= 0; i--) {
    postQ.push(opStack[i]); //transfer remaining operators from stack into postQ
  }

  console.log(postQ.join(' '));
  
  try {
    console.log(calculateResult(postQ));
  } catch(err) {
    console.log(err.message);
  }
  
}

/**
 * Calculates a math problem in postfix notation and prints it out to the user
 *
 * Add each member to an array, when item is an operator, calculate two previous items with that operator
 *
 * @param {array} problem
 *
 * @return {Number} the result of the math problem
 */
function calculateResult(problem) {
  let stack = [], token;
  while (token = problem.shift()) {
    if (!isNaN(+token)) {
      stack.push(token);
    } else {
      let secondNumber = stack.pop();
      let firstNumber = stack.pop();
      if (token === 'POW') {
        stack.push(Math.pow(firstNumber, secondNumber));
      } 
      else if (parseInt(secondNumber) == 0 && token == '/' ) {
        throw new Error('Divide-by-Zero Exception'); //Catch divide-by-zero exception
      }
      else {
        stack.push(eval(firstNumber + token + secondNumber + ''));
      }

    }
  }
  return stack.pop();
}

/**
 * Initialize program
 */
function reversePolishNotation() {
  getInfixQueue();
}


reversePolishNotation();
