import React, { useState } from 'react';
import axios from 'axios';

const EvaluateForm = () => {
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(''); // State for result message
  const [submittedRule, setSubmittedRule] = useState(null);

  const handleSubmitRule = async (event) => {
    event.preventDefault();

    // Define the rule to evaluate
    const ruleData = {
      operator: "AND",
      left: {
        operator: "OR",
        left: {
          operator: "AND",
          left: { field: "age", operator: ">", value: 30 },
          right: { field: "department", operator: "==", value: "Sales" }
        },
        right: {
          operator: "AND",
          left: { field: "age", operator: "<", value: 25 },
          right: { field: "department", operator: "==", value: "Marketing" }
        }
      },
      right: {
        operator: "OR",
        left: { field: "salary", operator: ">", value: 50000 },
        right: { field: "experience", operator: ">", value: 5 }
      }
    };

    setSubmittedRule(ruleData);

    try {
      await axios.post('http://localhost:5000/api/rules', {
        rule: ruleData,
      });

      alert('Rule submitted successfully!');
    } catch (error) {
      console.error('Error submitting rule:', error);
    }
  };

  const handleEvaluate = async (event) => {
    event.preventDefault();

    const inputData = {
      age: parseInt(age, 10),
      department,
      salary: parseInt(salary, 10),
      experience: parseInt(experience, 10),
    };

    if (!submittedRule) {
      alert("Please submit a rule first!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/evaluate', {
        rule: submittedRule,
        data: inputData,
      });

      // Assuming the backend returns { result: ..., eligibleMessage: ... }
      setResult(response.data.result);
      setMessage(response.data.eligibleMessage); // Set the message based on the result
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  return (
    <div>
      <h2>Submit Rule</h2>
      <form onSubmit={handleSubmitRule}>
        <button type="submit">Submit Rule</button>
      </form>

      <h2>Evaluate Input</h2>
      <form onSubmit={handleEvaluate}>
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
        <button type="submit">Evaluate</button>
      </form>
      {message && ( // Display the message if it exists
        <div>
          <h3>Evaluation Result: {message}</h3>
        </div>
      )}
      {result && ( // Optionally, display the evaluation result
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
};

export default EvaluateForm;
