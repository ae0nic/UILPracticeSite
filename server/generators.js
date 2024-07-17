const Parser = require('expr-eval').Parser;
const parser = new Parser();

module.exports = {
    generateBaseMathQuestion: function generateBaseMathQuestion()
        {
        let questionBases = [[2, "₂"], [4, "₄"], [8, "₈"], [16, "₁₆"]];
        let answerBases = [[2, "₂"], [4, "₄"], [8, "₈"], [10, "₁₀"], [16, "₁₆"]];
        let operators = [["*", (num1, num2) => num1*num2], ["+", (num1, num2) => num1+num2]];

        let question = {};

        let num1 = Math.floor(Math.random() * 100 + 30);
        let [base1Num, base1Subscript] = questionBases[Math.floor(Math.random() * questionBases.length)];
        let [base2Num, base2Subscript] = questionBases[Math.floor(Math.random() * questionBases.length)];
        let num2 = Math.floor(Math.random() * 100 + 30);
        let [operatorText, operatorLambda] = operators[Math.floor(Math.random() * operators.length)];

        
        
        let answer = operatorLambda(num1, num2);
        let [baseAnswerNum, baseAnswerSubscript] = answerBases[Math.floor(Math.random() * answerBases.length)];
        question["Question"] = 
        `Which of the following is equal to ${num1.toString(base1Num) + base1Subscript}  ${operatorText} ${num2.toString(base2Num) + base2Subscript}?`;
        
        question["CorrectChoice"] = Math.floor(Math.random() * 4);
        question["Choices"] = {};

        for (let i = 0; i < 4; i++)
        {
            let sign = Math.sign(Math.random() - 0.5) || 1;
            question["Choices"][i] = (Math.floor(Math.random() * 20 + 20 * sign) + answer)
            .toString(baseAnswerNum)
            .toUpperCase() + baseAnswerSubscript;
        }

        question["Choices"][question["CorrectChoice"]] = answer
            .toString(baseAnswerNum)
            .toUpperCase() + baseAnswerSubscript;
        return question;
    },
    
    generateBooleanLogicQuestion: function generateBooleanLogicQuestion()
        {
        
        let booleanOperators = [
            [" && ", (in1, in2) => in1 && in2],
            [" || ", (in1, in2) => in1 || in2],
            [" ^ ", (in1, in2) => in1 != in2]];
        let question = {};
        question["Question"] = "What is the output of the following code block?"
        question["CodeBlock"] = "boolean t = true;\nboolean f = false;\n"
        let t = true;
        let f = false;
        let [operatorText, operatorLambda] = booleanOperators[Math.floor(Math.random() * booleanOperators.length)];
        question["CodeBlock"] += `boolean x = t ${operatorText} f;\n`;
        let x = operatorLambda(t, f);
        
        let depth = 3;
        
        let [text, result] = recursiveBooleanLogicGenerator(depth, x);
        question["CodeBlock"] += `out.print(${text});`;
        question["Choices"] = {0: "true", 1: "false"};
        question["CorrectChoice"] = (result == true) ? 0 : 1;
        
        return question;
    },

    generateMathQuestion: function generateMathQuestion() {
        const operators = [
            ["{x} + {y}", "{x} + {y}"],
            ["{x} - {y}", "{x} - {y}"],
            ["{x} * {y}", "{x} * {y}"],
            ["{x} / {y}", "trunc({x} / {y})"],
            ["{x} % {y}", "{x} % {y}"]];

        let question = {};
        question["Question"] = "What is the output of the following code block?"
        
        let expressions = [];
        let length = Math.floor(Math.random() * 2 + 4);
        for (let i = 0; i < length; i++) {
            let [displayedOperation, computedOperation] = operators[Math.floor(Math.random() * operators.length)];
            let op1 = Math.floor(Math.random() * 20 + 5);
            let op2 = Math.floor(Math.random() * 20 + 5);
            displayedOperation = displayedOperation.replace("{x}", op1).replace("{y}", op2);
            computedOperation = computedOperation.replace("{x}", op1).replace("{y}", op2);
            expressions.push([displayedOperation, computedOperation]);
        }
        let [displayedExpression, computedExpression] = ["", ""];
        expressions.forEach((r, i) => {
            let op = (Math.floor(Math.random() * 2) == 0) ? " + " : " - "

            displayedExpression += r[0] + op
            computedExpression += r[1] + op
        });
        displayedExpression = displayedExpression.slice(0, -3);
        computedExpression = computedExpression.slice(0, -3);
        let answer = parser.evaluate(computedExpression);
        
        question["CodeBlock"] = `out.println(${displayedExpression})`;
        question["Choices"] = {};
        for (let i = 0; i < 4; i++)
        {
            let sign = (Math.round(Math.random()) == 0 ? 1 : -1);
            question["Choices"][i] = (Math.floor(Math.random() * 20 + 20 * sign) + answer).toString();
        }
        let correctChoice = Math.floor(Math.random() * 4);
        question["CorrectChoice"] = correctChoice;
        question["Choices"][correctChoice] = answer;

        return question;
    }
}

function recursiveBooleanLogicGenerator(remainingParenthesis, xValue)
{
    let booleanOperators = [
    [" && ", (in1, in2) => in1 && in2],
    [" || ", (in1, in2) => in1 || in2],
    [" ^ ", (in1, in2) => in1 != in2]];
    let fullOperandList = [["t", true], ["f", false], ["x", xValue]];
    let operandList = fullOperandList;
    
    let operand1Text, result1;
    let random = Math.random();
    if ( (random > 0.7 && remainingParenthesis > 0) || remainingParenthesis > 2)
    {
    [operand1Text, result1] = recursiveBooleanLogicGenerator(remainingParenthesis-1, xValue);
    operand1Text = "("+operand1Text+")";
    } else {
    let operandNumber = Math.floor(Math.random() * operandList.length);
    [operand1Text, result1] = operandList.splice(operandNumber, 1)[0];
    }
    if (Math.random() > 0.3)
    {
    operand1Text = "!" + operand1Text;
    result1 = !result1;
    }
    
    let [operator, operatorLambda] = booleanOperators[Math.floor(Math.random() * booleanOperators.length)];
    
    let operand2Text, result2;
    random = Math.random();
    if (random > 0.8 && remainingParenthesis > 0)
    {
    [operand2Text, result2] = recursiveBooleanLogicGenerator(remainingParenthesis-1, xValue);
    operand2Text = "("+operand2Text+")";
    } else {
    let operandNumber = Math.floor(Math.random() * operandList.length);
    [operand2Text, result2] = operandList.splice(operandNumber, 1)[0];
    }
    if (Math.random() > 0.65)
    {
    operand2Text = "!" + operand2Text;
    result2 = !result2;
    }

return [ (operand1Text + operator + operand2Text), operatorLambda(result1, result2)];


}