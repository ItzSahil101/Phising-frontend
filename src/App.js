import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from './components/Main';
import Admin from './components/Admin';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/access/user/data" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App