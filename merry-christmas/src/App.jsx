import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FallingText from './components/FallingText';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={<FallingText />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
