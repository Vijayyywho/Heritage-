import React from 'react';
import { MapPin, Clock, Camera, Star, Crown, Heart, Eye } from 'lucide-react';

const PlacesInUdaipur = () => {
  const places = [
    {
      id: 1,
      name: 'City Palace',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://bhairavgarh.com/wp-content/uploads/2025/02/city-1.png',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'A magnificent palace complex showcasing royal architecture and heritage with panoramic views of Lake Pichola.',
      timings: '09:30 - 17:30',
      distance: '10km',
      highlights: ['Royal Architecture', 'Museum', 'Lake Views', 'Heritage'],
      rating: 4.9,
      category: 'Palace'
    },
    {
      id: 2,
      name: 'Lake Pichola',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://www.vedantawakeup.com/wp-content/uploads/2022/04/boat-ride-at-lake-pichola-udaipur.jpg',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Take a scenic boat ride to visit Jag Mandir and enjoy breathtaking views of the illuminated City Palace.',
      timings: '09:00 - 18:00',
      distance: '11km',
      highlights: ['Boat Rides', 'Sunset Views', 'Islands', 'Photography'],
      rating: 4.8,
      category: 'Lake'
    },
    {
      id: 3,
      name: 'Jag Mandir',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/jag-mandir-palace-udaipur-rajasthan-2-musthead-hero?qlt=82&ts=1742171210266',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'An island palace in Lake Pichola known for stunning architecture and serene surroundings.',
      timings: '10:00 - 18:00',
      distance: '11km',
      highlights: ['Island Palace', 'Architecture', 'Serenity', 'History'],
      rating: 4.7,
      category: 'Palace'
    },
    {
      id: 4,
      name: 'Sajjangarh Palace',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://goyahills.com/wp-content/uploads/2025/01/Sajjangarh-Fort-3-1.webp',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Perched on a hill, offering stunning panoramic views of Udaipur, especially beautiful during sunset.',
      timings: '08:00 - 18:00',
      distance: '15km',
      highlights: ['Hill Views', 'Sunset', 'Photography', 'Panoramic'],
      rating: 4.6,
      category: 'Palace'
    },
    {
      id: 5,
      name: 'Jagdish Temple',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://udaipurtourism.co.in/images/places-to-visit/headers/jagdish-temple-udaipur-indian-tourism-entry-fee-timings-holidays-reviews-header.jpg',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Built in 1651, this temple enshrines Lord Vishnu and is the largest temple in Udaipur.',
      timings: '05:00-13:00 & 16:00-21:00',
      distance: '11km',
      highlights: ['Ancient Temple', 'Architecture', 'Spirituality', 'Heritage'],
      rating: 4.5,
      category: 'Temple'
    },
    {
      id: 6,
      name: 'Saheliyon-ki-Bari',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/saheliyon-ki-bari-udaipur-attr-hero-2?qlt=82&ts=1742196039494',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'A beautiful garden adorned with fountains, lotus pools, and marble pavilions.',
      timings: '09:00 - 19:00',
      distance: '13km',
      highlights: ['Gardens', 'Fountains', 'Marble Work', 'Peaceful'],
      rating: 4.4,
      category: 'Garden'
    },
    {
      id: 7,
      name: 'Fateh Sagar Lake',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: 'https://www.trawell.in/admin/images/upload/307070312Udaipur_Fateh_Sagar_Main.jpg',
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'A picturesque lake known for scenic boat rides and Nehru Garden on an island.',
      timings: '08:00 - 18:00',
      distance: '14km',
      highlights: ['Lake Views', 'Boat Rides', 'Island Garden', 'Scenic'],
      rating: 4.3,
      category: 'Lake'
    },
    {
      id: 8,
      name: 'Crystal Gallery',
<<<<<<< HEAD
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
=======
      image: "https://udaipurtourism.co.in/images//tourist-places/crystal-gallery-udaipur/crystal-gallery-udaipur-indian-tourism-location-address.jpg",
>>>>>>> a1ec68d407de2881a8f5d0005cbaaaa9dbb50f9f
      description: 'Located in Fateh Prakash Palace, featuring breathtaking crystal collections and jewel-studded carpets.',
      timings: '10:00 - 20:00',
      distance: '10km',
      highlights: ['Crystal Art', 'Royal Collection', 'Luxury', 'Unique'],
      rating: 4.2,
      category: 'Museum'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Palace: 'bg-purple-100 text-purple-800',
      Lake: 'bg-blue-100 text-blue-800',
      Temple: 'bg-orange-100 text-orange-800',
      Garden: 'bg-green-100 text-green-800',
      Museum: 'bg-amber-100 text-amber-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="places" className="py-section bg-surface">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-poppins font-medium text-sm rounded-full mb-4">
            Discover Udaipur
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Places to Visit in Udaipur
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Explore the magnificent City of Lakes with its royal palaces, serene lakes, 
            and rich cultural heritage that tells stories of Rajput valor and romance.
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {places.map((place, index) => (
            <div
              key={place.id}
              className="group bg-background rounded-2xl shadow-lg overflow-hidden hover-lift border border-gray-100 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${getCategoryColor(place.category)}`}>
                    {place.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-secondary fill-current" />
                    <span className="text-xs font-poppins font-medium">{place.rating}</span>
                  </div>
                </div>

                {/* Distance */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs font-poppins">{place.distance}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-raleway font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  {place.name}
                </h3>
                
                <p className="text-text-secondary text-sm font-poppins leading-relaxed mb-4 line-clamp-3">
                  {place.description}
                </p>

                {/* Timings */}
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-poppins text-text-secondary">{place.timings}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {place.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/5 text-primary px-2 py-1 rounded-full text-xs font-poppins"
                    >
                      {highlight}
                    </span>
                  ))}
                  {place.highlights.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-poppins">
                      +{place.highlights.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-primary/5 hover:bg-primary hover:text-white text-primary py-2 rounded-lg font-poppins font-medium text-sm transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Explore</span>
                  </div>
                </button>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 w-16 h-16 rajasthani-pattern opacity-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/5 to-secondary/5 px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
            <Crown className="w-6 h-6 text-secondary" />
            <span className="text-text-secondary font-poppins">Ready to explore these magnificent places?</span>
            <a href="#contact" className="btn-primary text-sm px-6 py-2">
              Plan Your Tour
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacesInUdaipur;