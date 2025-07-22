import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import TourPackages from './components/TourPackages';
import BookingSystem from './components/BookingSystem';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Fleet />
      <TourPackages />
      <BookingSystem />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;