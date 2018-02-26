const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

/** 
 * getInfixQueue - accepts input from the console 
 * and converts it into an infix queue (Array class is used)
*/
function getInfixQueue() {

    rl.question('Please enter an infix math problem or enter "quit": ', (answer) => {

        if (answer.toLowerCase() === 'quit') {
            rl.close();
        }
        else {
            let infixQ = [];
            let i = 0;
            let invalidSymbolFlag = 0;
            while(i < answer.length) {
                let num = [];
                if (answer[i] === ' ') {
                    i++;
                }
                else if (/[+|\-|*|/|%|(|)]/.test(answer[i])) {
                    infixQ.push(answer[i++]);
                }
                else if (/\d/.test(answer[i])) {
                    while (/\d/.test(answer[i])) {
                        num.push(answer[i++]);
                    }
                    infixQ.push(num.join(''));
                }   
                else if (answer.slice(i, i+3) === 'POW') {
                    i = i+3;
                    infixQ.push('POW');
                }
                else {
                    console.log('Problem contains invalid symbols.');
                    invalidSymbolFlag = 1;
                    break;
                }  
            }
        
            if (invalidSymbolFlag === 0)
                console.log(infixQ);
            getInfixQueue();
        }
    });
}

getInfixQueue();

