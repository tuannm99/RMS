import React from 'react';
import './App.css';
import LayoutPrivate from './components/layoutPrivate';
import Home from '../../fe/src/pages/publicComponent';
import HomeDetail from '../../fe/src/pages/publicDetail';
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
          <Route end path="/*" element={<LayoutPrivate />} />
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
