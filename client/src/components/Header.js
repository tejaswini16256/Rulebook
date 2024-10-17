// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Rule Engine App</h1>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#create">Create Rule</a></li>
          <li><a href="#evaluate">Evaluate</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
