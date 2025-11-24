import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Sermons from './components/Sermons';
import ServiceInfo from './components/ServiceInfo';
import Ministries from './components/Ministries';
import Socials from './components/Socials';
import About from './components/About';
import Footer from './components/Footer';
import Admin from './components/admin/Admin';

function Home({ autoScrollTo }) {
  const location = useLocation();
  useEffect(() => {
    const target = (autoScrollTo && autoScrollTo) || (location && location.state && location.state.scrollTo);
    if (!target) return;
    const t = setTimeout(() => {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(target);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
    return () => clearTimeout(t);
  }, [autoScrollTo, location]);

  return (
    <div className="site-wrapper">
      <div className="site-content">
        <Header />
        <Hero />
        <Sermons />
        <ServiceInfo />
        <Ministries />
        <Socials />
      </div>
      <Footer />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
       
        <Route
          path="/about"
          element={
            <div className="site-wrapper">
              <div className="site-content">
                <Header />
                <About />
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />

        
              </Routes>
    </Router>
  );
}
