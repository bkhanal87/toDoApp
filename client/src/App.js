import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Todos from './components/todos/Todos';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin/>} /> 
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Todos/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
