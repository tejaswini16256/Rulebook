// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Existing POST endpoint for rule creation
app.post('/api/rules', (req, res) => {
  const ruleData = req.body.rule; // Get the rule data from the request body
  console.log('Received rule data:', ruleData);
  
  // Logic to save ruleData if necessary

  res.status(200).json({
    message: 'Rule submitted successfully',
    rule: ruleData,
  });
});

// New POST endpoint to evaluate data against the rule
app.post('/api/evaluate', (req, res) => {
  const { rule, data } = req.body;

  // Evaluate the rule with the given data
  const result = evaluateRule(rule, data);

  res.status(200).json({
    message: 'Evaluation completed',
    result: result ? true : false, // Explicitly return true or false
    eligibleMessage: result ? 'Eligible' : 'Not Eligible', // Add message based on result
  });
});

function evaluateRule(rule, data) {
  // Evaluate based on the operator and structure
  if (rule.operator === "AND") {
    return evaluateRule(rule.left, data) && evaluateRule(rule.right, data);
  } else if (rule.operator === "OR") {
    return evaluateRule(rule.left, data) || evaluateRule(rule.right, data);
  } else if (rule.operator === "==") {
    return data[rule.field] === rule.value;
  } else if (rule.operator === ">") {
    return data[rule.field] > rule.value;
  } else if (rule.operator === "<") {
    return data[rule.field] < rule.value;
  }
  
  return false; // If no operator matched, return false
}

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
