import { useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Transfermoney } from './pages/Transfermoney';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/Notfound';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/transfer' element={<Transfermoney />}></Route>
        <Route path='*' element={<NotFound />} /> {/* Wildcard route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
