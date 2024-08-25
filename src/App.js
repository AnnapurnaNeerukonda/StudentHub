import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage';
import Youtube from './Youtube';
import DictionarySearch from './Dictionary';
import Register from './register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/dictionary" element={<DictionarySearch />} />
      </Routes>
    </Router>
  );
}

export default App;
