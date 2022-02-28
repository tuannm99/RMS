import React from 'react';
import './App.css';
import LayoutPrivate from './components/layoutPrivate';
import Home from './pages/publicComponent';
import HomeDetail from './pages/publicDetail';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route end path="/*" element={<LayoutPrivate />} />
          <Route path="/PublicJob" element={<Home />} />
          <Route path="/PublicJob/:id" element={<HomeDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
