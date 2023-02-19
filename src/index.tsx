import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById("root");
if(container === null) throw new Error("root is missing");
const root = ReactDOM.createRoot(container);
root.render(<App />);