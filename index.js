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
const OPERATORS = ['+', '-', '*', '/'];

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
          while (/\d/.test(answer[i])) {
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
  let output = [];
  let ops = [];

  for (let i = 0; i < problem.length; i++) {
    if (parseInt(problem[i])) {
      output.push(problem[i])
    } else if (OPERATORS.includes(problem[i])) { //this needs to assess precedence
      ops.push(problem[i]);
      console.log('this is an operator');
    } else if (problem[i] === ')') {
      ops.push(problem[i]);
      console.log('this is a right parenthesis') //this needs to assess if top of stack is right parentheses
    }
  }

  for (let i = 0; i < ops.length; i++) {
    output.push(ops[i])
  }

  console.log(output);
  console.log(calculateResult(output));
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
      stack.push(eval(firstNumber + token + secondNumber + ''));
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
