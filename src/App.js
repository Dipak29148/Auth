import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Contact from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Footer from './Components/Footer';
import ProductDetail1 from './Components/ProductDetail1';
import ProductDetail2 from './Components/ProductDetail2';
import ProductDetail3 from './Components/ProductDetail3';
import NotFound from './Components/NotFound';
import { ToastProvider } from './context/ToastContext';
import './App.css';
import './Components/styles/Toast.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ToastProvider>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="content-wrapper"> {/* Optional: for content layout */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
          <Route path="/product/1" element={<ProductDetail1 />} />
          <Route path="/product/2" element={<ProductDetail2 />} />
          <Route path="/product/3" element={<ProductDetail3 />} />
          <Route path="*" element={<NotFound />} />
       </Routes>
      </div>
      <Footer /> {/* Footer is placed here to ensure it's visible on all pages */}
    </Router>
    </ToastProvider>
  );
};

export default App;
