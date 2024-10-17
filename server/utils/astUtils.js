// astUtils.js
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

const parseRuleToAST = (ruleString) => {
    // Implement parsing logic here
    // Create the AST using Node instances
};

module.exports = { Node, parseRuleToAST };
