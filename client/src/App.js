// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import GymDetails from "./components/GymDetails";
import PrivateRoute from "./components/routing/PrivateRoute";

// If you have additional components like NotFound or others, import them here
// import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gyms/:gymId"
          element={
            <PrivateRoute>
              <GymDetails />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for undefined paths (Optional) */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
