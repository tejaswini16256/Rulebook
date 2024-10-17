const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
    type: String,
    left: Object,
    right: Object,
    value: Object,
});

const RuleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },
    ast: NodeSchema,  // Store the AST structure
});

module.exports = mongoose.model("Rule", RuleSchema);
