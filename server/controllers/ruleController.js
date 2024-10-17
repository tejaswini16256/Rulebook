const Rule = require("../models/Rule");
const { Node, parseRuleToAST } = require("../utils/astUtils");

const createRule = async (req, res) => {
    const { ruleString } = req.body;
    const ast = parseRuleToAST(ruleString);
    const newRule = new Rule({ ruleString, ast });
    await newRule.save();
    res.json(newRule);
};

const evaluateRule = async (req, res) => {
    const { ruleId, data } = req.body;
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ message: "Rule not found" });
    
    const isEligible = evaluateAST(rule.ast, data);  // Implement evaluateAST function
    res.json({ isEligible });
};

module.exports = { createRule, evaluateRule };
