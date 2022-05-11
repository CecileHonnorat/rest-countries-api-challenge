import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Countries from './components/Countries';
import Country from './components/Country';
import NotFound from './components/404';

function App() {

  return (
    <Router>
    <Routes>
      <Route element={<Countries />} path="/" exact />
      <Route element={<Country />} path="/country-info/:name" exact />
      <Route element={<NotFound/>} path='*' />
    </Routes>
  </Router>
  );
}

export default App;
