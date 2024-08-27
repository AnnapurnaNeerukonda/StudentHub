import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage';
import Youtube from './Youtube';
import DictionarySearch from './Dictionary';
import Register from './register';
import DisplayPosts from './post'
import UserDetails from './userdetails';
import Todo from './todo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/dictionary" element={<DictionarySearch />} />
        <Route path="/post" element={<DisplayPosts/>} />
        <Route path="/user-details" element={<UserDetails/>} />
        <Route path="/todo" element={<Todo/>} />
      </Routes>
    </Router>
  );
}

export default App;
