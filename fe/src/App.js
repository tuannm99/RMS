import React from 'react';
import './App.css';
import { ProtectedLayout } from './layout';
import Home from './pages/publicComponent';
import HomeDetail from './pages/publicDetail';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route end path="/*" element={<ProtectedLayout />} />
          <Route path="/PublicJob" element={<Home />} />
          <Route path="/PublicJob/:id" element={<HomeDetail />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
