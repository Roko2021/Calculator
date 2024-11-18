// دالة لتحليل المعادلة
exports.calculate = function(expression) {
    // التعامل مع الأقواس: تحليل التعبير داخل الأقواس أولاً
    while (expression.includes('(') || expression.includes(')')) {
        const innerExpression = expression.match(/\([^\(\)]*\)/);
        if (innerExpression) {
            const result = evaluate(innerExpression[0].slice(1, -1));
            expression = expression.replace(innerExpression[0], result);
        }
    }
    return evaluate(expression);
};

// دالة لتقييم العمليات الحسابية
function evaluate(expression) {
    try {
        const operators = ['+', '-', '*', '/'];
        const tokens = expression.split(" ").filter(token => token.trim() !== '');

        // معالجة العمليات الثنائية مثل (+ 3 2)
        if (tokens.length === 3 && operators.includes(tokens[0])) {
            return eval(`${tokens[1]} ${tokens[0]} ${tokens[2]}`);
        }

        // معالجة العمليات المعقدة مثل (* + 3 2 4)
        if (tokens.length === 5 && operators.includes(tokens[0]) && operators.includes(tokens[1])) {
            const intermediateResult = eval(`${tokens[2]} ${tokens[1]} ${tokens[3]}`);
            return eval(`${intermediateResult} ${tokens[0]} ${tokens[4]}`);
        }

        // معالجة الحالات المعقدة مثل (/ - 8 3 + 2 2)
        if (tokens.length === 7 && operators.includes(tokens[0]) && operators.includes(tokens[1]) && operators.includes(tokens[4])) {
            const leftSide = eval(`${tokens[2]} ${tokens[1]} ${tokens[3]}`);
            const rightSide = eval(`${tokens[5]} ${tokens[4]} ${tokens[6]}`);
            return eval(`${leftSide} ${tokens[0]} ${rightSide}`);
        }

        return eval(expression);
    } catch (error) {
        return `Invalid expression: ${expression}`;
    }
}

// أمثلة للاستخدام
console.log(exports.calculate("(+ 3 2)"));
console.log(exports.calculate("* + 3 2 4"));
console.log(exports.calculate("/ - 8 3 + 2 2"));