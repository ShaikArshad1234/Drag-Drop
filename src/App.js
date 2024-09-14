
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageBuilder from './components/PageBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
