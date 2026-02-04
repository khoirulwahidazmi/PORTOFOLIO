import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;