import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Product from './components/Product';
import Form from './components/Form';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path='/update' element={<Form/>}></Route>
      <Route path='/add' element={<Form/>}></Route>
      
    </Routes>      
    </>
  );
}

export default App;
