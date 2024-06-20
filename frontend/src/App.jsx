import { useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Transfermoney } from './pages/Transfermoney';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/Transfer' element={<Transfermoney />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
