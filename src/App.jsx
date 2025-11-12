
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sermons from './components/Sermons';
import ServiceInfo from './components/ServiceInfo';
// import About from './components/About';
import Ministries from './components/Ministries';
// import Service from './components/Events';
// import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Sermons/>
      <ServiceInfo/>
      <Ministries />
        <Footer /> 
      {/* <About />
      <Service />
      <Contact />
     */}
    </div>
  );
}

export default App;
