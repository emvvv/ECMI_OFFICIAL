
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sermons from './components/Sermons';
import ServiceInfo from './components/ServiceInfo';
import Ministries from './components/Ministries';
import Socials from './components/Socials';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Sermons/>
      <ServiceInfo/>
      <Ministries />
      <Socials/>
      <Footer /> 
    </div>
  );
}

export default App;
