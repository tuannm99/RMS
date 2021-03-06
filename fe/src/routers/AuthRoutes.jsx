import React from 'react';
import { AuthRoute } from './route';
import { Routes, Route } from 'react-router-dom';

function AuthRoutes() {
  return (
    <Routes>
      {AuthRoute.map((item) => (
        <Route key={item.path} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
}

export default AuthRoutes;
