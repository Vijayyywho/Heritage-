import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
}

export default App;