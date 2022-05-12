import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Redux et reducer
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import selectedMode from './reducers/selectedMode';

// Import des composants de navigation
import Countries from './components/Countries';
import Country from './components/Country';
import NotFound from './components/404';

const store = createStore(combineReducers({selectedMode}))

function App() {

  return (
    <Provider store={store}>
    <Router>
    <Routes>
      <Route element={<Countries />} path="/" exact />
      <Route element={<Country />} path="/country-info/:name" exact />
      <Route element={<NotFound/>} path='*' />
    </Routes>
  </Router>
    </Provider>
  );
}

export default App;
