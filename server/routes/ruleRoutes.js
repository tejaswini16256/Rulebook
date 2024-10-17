const express = require("express");
const router = express.Router();
const { createRule, evaluateRule } = require("../controllers/ruleController");

router.post("/create", createRule);
router.post("/evaluate", evaluateRule);

module.exports = router;
