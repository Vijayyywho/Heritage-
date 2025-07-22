import React from 'react';
import { Shield, Award, Users, Heart, Crown, MapPin } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Licensed drivers, fully insured vehicles, and verified safety protocols for complete peace of mind.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      title: 'Local Expertise',
      description: 'Born and raised in Udaipur, we know every hidden gem, secret viewpoint, and the best routes.',
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'With our exclusive fleet, we offer intimate, personalized attention to each valued guest.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Heart,
      title: 'Passion for Heritage',
      description: 'We are passionate about sharing Udaipur\'s rich cultural heritage and royal history with the world.',
      color: 'bg-rose-100 text-rose-600'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience', icon: Crown },
    { number: '500+', label: 'Happy Guests', icon: Users },
    { number: '4.9', label: 'Average Rating', icon: Award },
    { number: '100%', label: 'Satisfaction Rate', icon: Heart }
  ];

  return (
    <section id="about" className="py-section bg-surface">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="animate-slide-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-poppins font-medium text-sm rounded-full mb-6">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-8">
              Your Gateway to 
              <span className="block text-secondary">Royal Udaipur</span>
            </h2>
            
            <div className="space-y-6 text-text-secondary leading-relaxed font-poppins">
              <p className="text-lg">
                Founded in the heart of the City of Lakes, <strong className="text-primary">Heritage Rides</strong> was born from a deep love 
                for Udaipur's majestic beauty and rich cultural heritage. As locals who have grown up 
                amidst the royal palaces and serene lakes, we understand what makes this city truly magical.
              </p>
              
              <p>
                Our journey began with a simple yet powerful vision: to offer discerning travelers an exclusive, 
                personalized way to explore Udaipur's wonders. With our carefully selected fleet of 
                premium vehicles, we ensure each guest receives the royal treatment they deserve.
              </p>
              
              <p>
                Every tour is crafted with insider knowledge, every transfer executed with precision, 
                and every interaction infused with the warmth of authentic Rajasthani hospitality. We don't just 
                provide transportation – <em className="text-secondary font-medium">we create memories that last a lifetime</em>.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a href="#contact" className="btn-primary inline-flex items-center space-x-2">
                <span>Start Your Journey</span>
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Image with Decorative Elements */}
          <div className="relative animate-fade-in">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-3xl transform -rotate-2"></div>
            
            {/* Main Image */}
            <img
              src="https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Udaipur City Palace"
              className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-secondary" />
                <div>
                  <div className="text-2xl font-raleway font-bold text-primary">Royal</div>
                  <div className="text-sm text-text-secondary font-poppins">Experience</div>
                </div>
              </div>
            </div>
            
            {/* Rajasthani Pattern */}
            <div className="absolute top-4 right-4 w-20 h-20 rajasthani-pattern opacity-30"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-background rounded-2xl shadow-lg hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-raleway font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-text-secondary font-poppins text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-raleway font-bold text-primary mb-4">
              Why Choose Heritage Rides
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins">
              Our commitment to excellence goes beyond transportation. We deliver experiences 
              that reflect the royal heritage of Udaipur.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover-lift bg-background border border-gray-100 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 rajasthani-pattern opacity-5"></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 ${value.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-raleway font-bold text-primary mb-4">{value.title}</h4>
                <p className="text-text-secondary font-poppins text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heritage Quote */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 rajasthani-pattern opacity-5"></div>
          <div className="relative z-10">
            <Crown className="w-16 h-16 text-secondary mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-raleway font-bold text-primary mb-4 italic">
              "Every journey with us is a royal experience, 
              every destination a discovery of heritage."
            </blockquote>
            <cite className="text-text-secondary font-poppins">
              — Heritage Rides Team, Udaipur
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;