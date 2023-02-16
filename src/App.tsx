import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import {HomepageContainer} from "./components/homepage/homepage-container"
import { Home } from './pages/Home';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
