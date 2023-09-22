import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/App.css';
import Home from './routes/home';
import Details from './routes/details';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
