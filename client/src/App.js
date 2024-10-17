// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RuleForm from './components/RuleForm';
import EvaluateForm from './components/EvaluateForm';
import './styles/APP.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Welcome to the Rule Engine Application</h1>
        <RuleForm onRuleSubmit={(data) => console.log(data)} />
        <EvaluateForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
