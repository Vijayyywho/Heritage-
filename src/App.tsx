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
import SEOTags from './components/SEOTags';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <SEOTags /> {/* Default SEO for the homepage */}
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
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;