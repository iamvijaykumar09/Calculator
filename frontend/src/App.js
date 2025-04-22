import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Calculator from './components/Calculator';

//Protect the Calculator route so only logged-in users can access it
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/signin'/>;
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          {/* Protected Routes (only accessible if logged in) */}
          <Route
            path='/calculator'
            element={
              <PrivateRoute>
                <Calculator />
              </PrivateRoute>
            }
          />

          {/* Default redirect to sign-in */}
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;