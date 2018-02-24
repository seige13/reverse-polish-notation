const rl = require('readline');

let problem = '2 + 3';
let operators = ['+','-','*','/']
let chars = [];
let output = [];
let ops = [];


for (var i=0; i<problem.length;i++) {
	if (problem[i] == ' ') {
		continue
	} else {
		chars.push(problem[i]);
	}
}

//precedence: exp then mult/div/remainder then add/sub

for (var i=0; i<chars.length; i++) {
  if (parseInt(chars[i])) {
    output.push(chars[i])
  } else if (operators.includes(chars[i])) { //this needs to assess precedence
    ops.push(chars[i])
    console.log('this is an operator')
  } else if (chars[i] == '(') {
    ops.push(chars[i])
  } else if (chars[i] == ')') {
    ops.push(chars[i])
    console.log('this is a right parenthesis') //this needs to assess if top of stack is right parens
  }
}

for (var i=0; i<ops.length; i++) {
  output.push(ops[i])
}

console.log(chars)
console.log(output)
