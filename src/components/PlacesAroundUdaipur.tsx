import React from 'react';
import { MapPin, Clock, Mountain, BookTemplate as Temple, Shield, Star, ArrowUpRight } from 'lucide-react';

const PlacesAroundUdaipur = () => {
  const places = [
    {
      id: 1,
      name: 'Kumbhalgarh Fort',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://images.unsplash.com/photo-1651739312933-9026620a78a5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VtYmhhbGdhcmh8ZW58MHx8MHx8fDA%3D',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Second most important citadel after Chittorgarh, built in 15th century with 36km long walls.',
      distance: '100km',
      driveTime: '2 hours',
      highlights: ['UNESCO Site', 'Great Wall', 'Fort Complex', 'History'],
      category: 'Fort',
      size: 'large',
      featured: true
    },
    {
      id: 2,
      name: 'Ranakpur Jain Temples',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://plus.unsplash.com/premium_photo-1697730481640-114d8546ef3d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuYWtwdXIlMjBqYWluJTIwdGVtcGxlfGVufDB8fDB8fHww',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Beautifully sculptured Jain temples, one of five holy places for Jain community.',
      distance: '109km',
      driveTime: '2 hours',
      highlights: ['Marble Carvings', 'Architecture', 'Spirituality', 'Art'],
      category: 'Temple',
      size: 'medium',
      timings: '12:00 - 17:00'
    },
    {
      id: 3,
      name: 'Chittorgarh Fort',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://images.unsplash.com/photo-1717329162563-2f93e83cc717?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpdHRvcmdhcmglMjBmb3J0fGVufDB8fDB8fHww',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Epitome of Rajput pride and spirit, massive hilltop fort depicting Rajput culture.',
      distance: '126km',
      driveTime: '3 hours',
      highlights: ['Rajput Heritage', 'Hilltop Fort', 'History', 'Culture'],
      category: 'Fort',
      size: 'large'
    },
    {
      id: 4,
      name: 'Eklingji Temple',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://media.istockphoto.com/id/1196518135/photo/dead-temple-in-rajasthan.jpg?s=612x612&w=0&k=20&c=dZTNwpuGcCRNUOTQ13Kx7b3O49wFdnwVZW1KQ4eCk2o=',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Hindu temple complex with 108 temples built in 734 AD, devoted to Lord Shiva.',
      distance: '22km',
      driveTime: '30 mins',
      highlights: ['Ancient Temples', 'Shiva Deity', 'Architecture', 'Spirituality'],
      category: 'Temple',
      size: 'small',
      timings: '04:00-06:30, 10:30-13:30, 17:15-19:45'
    },
    {
      id: 5,
      name: 'Nathdwara',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://assets.zeezest.com/blogs/PROD_Nathdwara%20cover_1714031994270.jpg',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Gateway to the Lord - Vaishnavite shrine built in 17th century.',
      distance: '61km',
      driveTime: '1 hour',
      highlights: ['Krishna Temple', 'Pilgrimage', 'Art', 'Culture'],
      category: 'Temple',
      size: 'medium'
    },
    {
      id: 6,
      name: 'Haldi Ghati',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/2-haldighati-udaipur-rajasthan-attr-hero?qlt=82&ts=1742160239591',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Historical battlefield where Maharana Pratap fought against Mughal Emperor Akbar in 1576.',
      distance: '40km',
      driveTime: '1 hour',
      highlights: ['Battlefield', 'Maharana Pratap', 'History', 'Memorial'],
      category: 'Historical',
      size: 'small'
    },
    {
      id: 7,
      name: 'Jaisamand Lake',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://udaipurtourism.co.in/images/places-to-visit/headers/jaisamand-lake-udaipur-indian-tourism-entry-fee-timings-holidays-reviews-header.jpg',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Second largest artificial lake in Asia, built by Maharana Jai Singh in 1691.',
      distance: '50km',
      driveTime: '1.5 hours',
      highlights: ['Artificial Lake', 'Scenic Beauty', 'Boating', 'Wildlife'],
      category: 'Lake',
      size: 'medium'
    }
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      Fort: Shield,
      Temple: Temple,
      Historical: Mountain,
      Lake: MapPin
    };
    return icons[category as keyof typeof icons] || MapPin;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Fort: 'bg-red-100 text-red-800',
      Temple: 'bg-orange-100 text-orange-800',
      Historical: 'bg-purple-100 text-purple-800',
      Lake: 'bg-blue-100 text-blue-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getGridClass = (place: any, index: number) => {
    if (place.size === 'large') {
      return index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2';
    }
    return place.size === 'medium' ? 'md:col-span-1' : 'md:col-span-1';
  };

  return (
    <section className="py-section bg-gradient-to-br from-background to-surface">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-poppins font-medium text-sm rounded-full mb-4">
            Beyond the City
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Places Around Udaipur
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Venture beyond Udaipur to discover magnificent forts, ancient temples, and historical sites 
            that showcase the rich heritage of Rajasthan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {places.map((place, index) => {
            const IconComponent = getCategoryIcon(place.category);
            return (
              <div
                key={place.id}
                className={`group bg-surface rounded-2xl shadow-xl overflow-hidden hover-lift border border-gray-100 relative ${getGridClass(place, index)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Category & Featured Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${getCategoryColor(place.category)}`}>
                        <IconComponent className="w-3 h-3 inline mr-1" />
                        {place.category}
                      </span>
                      {place.featured && (
                        <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-poppins font-semibold">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-raleway font-bold text-white mb-3 group-hover:text-secondary transition-colors ${
                      place.size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
                    }`}>
                      {place.name}
                    </h3>

                    {/* Description */}
                    <p className={`text-white/90 font-poppins leading-relaxed mb-4 ${
                      place.size === 'large' ? 'text-base' : 'text-sm'
                    }`}>
                      {place.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Distance & Time */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <MapPin className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-poppins">{place.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <Clock className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-poppins">{place.driveTime}</span>
                      </div>
                    </div>

                    {/* Timings (if available) */}
                    {place.timings && (
                      <div className="mb-4">
                        <span className="text-white/80 text-xs font-poppins bg-black/30 px-2 py-1 rounded">
                          Timings: {place.timings}
                        </span>
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {place.highlights.slice(0, place.size === 'large' ? 4 : 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-poppins border border-white/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-secondary hover:text-white text-white py-3 rounded-lg font-poppins font-medium transition-all duration-300 border border-white/20 hover:border-secondary group-hover:shadow-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <span>Plan Visit</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 rajasthani-pattern opacity-20"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-8 h-8" />
                </div>
                <h4 className="font-raleway font-bold text-primary mb-2">Day Excursions</h4>
                <p className="text-text-secondary font-poppins text-sm">Perfect for full-day exploration trips</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="font-raleway font-bold text-primary mb-2">Heritage Sites</h4>
                <p className="text-text-secondary font-poppins text-sm">UNESCO World Heritage locations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h4 className="font-raleway font-bold text-primary mb-2">Expert Guides</h4>
                <p className="text-text-secondary font-poppins text-sm">Local knowledge and historical insights</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-text-secondary font-poppins text-center mb-4">
                Ready to explore the heritage sites around Udaipur?
              </p>
              <a href="#contact" className="btn-primary inline-flex items-center space-x-2">
                <span>Book Multi-Day Tour</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacesAroundUdaipur;