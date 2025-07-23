import React from 'react';
<<<<<<< HEAD
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
import Header from './components/Header';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import TourPackages from './components/TourPackages';
import PlacesInUdaipur from './components/PlacesInUdaipur';
import PlacesAroundUdaipur from './components/PlacesAroundUdaipur';
import BookingSystem from './components/BookingSystem';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
<<<<<<< HEAD

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Fleet />
      <TourPackages />
      <PlacesInUdaipur />
      <PlacesAroundUdaipur />
      <BookingSystem />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
=======
import AdminDashboard from './components/AdminDashboard';

const HomePage = () => (
  <>
    <Header />
    <Hero />
    <Fleet />
    <TourPackages />
    <PlacesInUdaipur />
    <PlacesAroundUdaipur />
    <BookingSystem />
    <About />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
}

export default App;