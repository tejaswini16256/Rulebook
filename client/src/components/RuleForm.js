// src/components/RuleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = ({ onRuleSubmit }) => {
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [ruleInput, setRuleInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure all inputs are provided
    if (!age || !department || !salary || !experience) {
      alert('Please fill in all fields except the optional rule input.');
      return;
    }

    // Prepare the rule data to be sent to the backend
    const ruleData = {
      operator: "AND",
      left: {
        operator: "OR",
        left: {
          operator: "AND",
          left: { field: "age", operator: ">", value: parseInt(age, 10) },
          right: { field: "department", operator: "==", value: department }
        },
        right: {
          operator: "AND",
          left: { field: "age", operator: "<", value: 25 },
          right: { field: "department", operator: "==", value: "Marketing" }
        }
      },
      right: {
        operator: "OR",
        left: { field: "salary", operator: ">", value: parseInt(salary, 10) },
        right: { field: "experience", operator: ">", value: parseInt(experience, 10) }
      }
    };

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/api/rules', ruleData);

      // Pass the rule data to the parent component
      onRuleSubmit(response.data);
      alert('Rule successfully submitted');
    } catch (error) {
      console.error('Error submitting rule:', error.response ? error.response.data : error.message);
      alert('There was an error submitting the rule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <input
        type="number"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <textarea
        placeholder='Enter your rule as a string (optional)'
        value={ruleInput}
        onChange={(e) => setRuleInput(e.target.value)}
        rows={5}
      />
      <button type="submit">Submit Rule</button>
    </form>
  );
};

export default RuleForm;
