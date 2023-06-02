//this file needs to setup the routes necessary for react-router-dom, structure the components correctly, Header first, Then Home, Then Footer
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route
         path = '/'
         element = {<Home />}
        />
      </Routes>
    </Router>
  );
}

export default App;
