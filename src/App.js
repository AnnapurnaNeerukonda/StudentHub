
 import MainPage from './mainPage';
import Navbar from './navbar';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Youtube from './Youtube'; 
import DictionarySearch from './Dictionary';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/dictionary" element={<DictionarySearch />} />
      </Routes>
    </Router>
  );
}

export default App;
