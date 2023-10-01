import React from 'react';
import './index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Hero from './Hero/Hero';
import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import Aboutpage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';




function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        
        
        <Routes>
          <Route path="/"element={<HomePage/>} />
          <Route path="/about" element={<Aboutpage/>} />
          
          <Route path="/login" element={<LoginPage/>} />
         
         
        </Routes>
        </div>
        <Footer/>
     
    </Router>
  );
}

export default App;
