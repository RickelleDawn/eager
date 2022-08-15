import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import LoginForm from './Pages/LoginForm/LoginForm';
import Dashboard from './Pages/Dashboard/dashboard';


function RoutesContainer() {


  return (

    <BrowserRouter>
      <Routes>

        <Route element={<LoginForm />} path="/login" exact />
        <Route element={<Dashboard />} path="/dashboard" exact />


        <Route path="*" element={<LoginForm />} />


      </Routes>

    </BrowserRouter>

  );
}

export default RoutesContainer;


