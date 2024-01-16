import React from 'react';
import './App.css';
import { Route, Routes ,Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Product from './components/Product';
import Form from './components/Form';


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    // <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route
          path="/update"
          element={isLoggedIn ? <Form /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={isLoggedIn ? <Form /> : <Navigate to="/login" />}
        />
      </Routes>
    // </Router>
  );
}

export default App;
