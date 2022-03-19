import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoute } from './route';
function Brower_Router() {
  return (
    <Router>
      <Routes>
        {AppRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default Brower_Router;
