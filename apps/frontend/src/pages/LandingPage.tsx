import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import advisorBot from '../assets/images/advisor.jpeg';
import detection from '../assets/images/crop.jpg';
import farmer from '../assets/images/farmer.jpeg';
import weather from '../assets/images/weather.png';
import bgVid from '../assets/bgVideo.mp4';
import farmer1 from '../assets/images/farmer1.png'
import farmer2 from '../assets/images/farmer2.png'
import farmer3 from '../assets/images/farmer3.png'


const LandingPage = () => {
  const { t } = useTranslation();
  const phrases = [
    t('landingPage.heroPhrase1'),
    t('landingPage.heroPhrase2'),
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setIsFading(true), 5000);
    const changeTimeout = setTimeout(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setIsFading(false);
    }, 6000);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(changeTimeout);
    };
  }, [currentPhraseIndex, phrases.length, t]);

  const features = [
    {
      title: t('landingPage.connectBuyers.title'),
      description: t('landingPage.connectBuyers.description'),
      image: farmer,
      bgColor: "from-emerald-900/80 to-emerald-700/50",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      isPolygon: true,
      layout: 'side'
    },
    {
      title: t('landingPage.aiDetection.title'),
      description: t('landingPage.aiDetection.description'),
      image: detection,
      bgColor: "from-amber-900/80 to-amber-700/50",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      isPolygon: true,
      layout: 'side'
    },
    {
      title: t('landingPage.advisor.title'),
      description: t('landingPage.advisor.description'),
      image: advisorBot,
      bgColor: "from-purple-900/80 to-purple-700/50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      isPolygon: true,
      layout: 'side'
    },
    {
      title: t('landingPage.weather.title'),
      description: t('landingPage.weather.description'),
      image: weather,
      bgColor: "from-blue-900/80 to-blue-700/50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      isPolygon: true,
      layout: 'side'
    }
  ];

  const testimonials = [
    {
      name: "Abebe",
      role: "Farmer, debub wolo",
      avatar: farmer1,
      quote: "Increased my crop yield by 40% using AI detection and expert advice."
    },
    {
      name: "Kebed",
      role: "Tea Plantation Owner, gambela",
      avatar: farmer2,
      quote: "The marketplace connected me with international buyers directly."
    },
    {
      name: "Shemsu",
      role: "Dairy & Crop Farmer, Sidama",
      avatar: farmer3,
      quote: "Weather predictions saved my crops from unexpected monsoon rains."
    }
  ];

  const faqItems = [
    {
      question: "How does the AI crop detection work?",
      answer: "Our AI uses satellite imagery and machine learning to identify crop health issues, pests, and diseases with 95% accuracy."
    },
  
    {
      question: "How do you connect farmers with buyers?",
      answer: "Our platform verifies both farmers and buyers, facilitates direct communication, and ensures fair pricing through market analytics."
    },
    {
      question: "What crops do you support?",
      answer: "We support all major crops including rice, wheat, cotton, fruits, vegetables, and specialty crops across different regions."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Ananya Singh",
      role: "Agricultural Scientist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      bio: "PhD in Agricultural Technology with 15 years of experience in crop science."
    },
    {
      name: "Vikram Mehta",
      role: "AI/ML Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Former Google AI researcher specializing in computer vision for agriculture."
    },
    {
      name: "Sneha Reddy",
      role: "Business Development",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "10+ years in agricultural supply chain and market development."
    }
  ];

  return (
    <div className="bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* Enhanced Header/Navigation */}
   

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src={bgVid} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDQiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjwvcmVjdD48L3N2Zz4=')] z-10"></div>

        <div className="relative z-20 px-4 w-full">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <span className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#81FBB8_0%,#28C76F_50%,#E2B0FF_100%)] bg-[length:200%_200%] animate-gradient">
              {phrases[currentPhraseIndex]}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-4xl mx-auto">
            <span>
              {t('landingPage.heroSubtext')}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/sign-up"
              className="inline-block py-4 px-12 text-lg font-semibold bg-white/90 text-gray-900 rounded-full shadow-xl hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              {t('landingPage.getStarted')}
            </Link>
            <a
              href="#services"
              className="inline-block py-4 px-12 text-lg font-semibold border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-500 hover:shadow-2xl"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Farmers Empowered" },
              { number: "125K+", label: "Crops Protected" },
              { number: "30%", label: "Average Yield Increase" },
              { number: "98%", label: "Farmer Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">
          <span className="text-gray-500">
            {t('landingPage.servicesTitle')}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} backdrop-blur-md border border-gray-700/30 rounded-3xl`}></div>
              
              {feature.layout === 'side' ? (
                <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[400px]">
                  <div className="p-10 flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-lg opacity-90 mb-6">{feature.description}</p>
                    <Link
                      to="/services"
                      className={`self-start py-3 px-8 rounded-full font-medium transition-all ${feature.buttonColor} text-white hover:scale-105`}
                    >
                      {t('landingPage.learnMore')}
                    </Link>
                  </div>
                  <div className={`flex-1 relative overflow-hidden ${index % 2 === 0 ? 'order-first' : ''}`}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${feature.isPolygon ? '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]' : ''}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.bgColor.split(' ')[0]}/80 via-transparent to-transparent`}></div>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col h-full items-center justify-center p-8">
                  <div className="w-full relative overflow-hidden flex-shrink-0 mb-6 h-[190px] md:h-80">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-lg opacity-90 mb-6">{feature.description}</p>
                    <Link
                      to="/services"
                      className={`inline-block py-3 px-8 rounded-full font-medium transition-all ${feature.buttonColor} text-white hover:scale-105`}
                    >
                      {t('landingPage.learnMore')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Revolutionizing Agriculture with <span className="text-green-400">Technology</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                We are committed to empowering farmers with cutting-edge technology that transforms traditional farming practices. Our platform combines AI, data analytics, and agricultural expertise to create sustainable solutions for the modern farmer.
              </p>
              <div className="space-y-4">
                {[
                  "Founded in 2018 with a mission to bridge technology and agriculture",
                  "Serving farmers across 15+ countries worldwide",
                  "Partnerships with agricultural universities and research institutions",
                  "ISO 9001 certified for quality management systems"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop" 
                alt="Farm Innovation" 
                className="rounded-2xl h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop" 
                alt="Technology in Agriculture" 
                className="rounded-2xl h-48 object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop" 
                alt="Sustainable Farming" 
                className="rounded-2xl h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1500384066616-8a8d547abfc9?w=500&h=300&fit=crop" 
                alt="Farm Community" 
                className="rounded-2xl h-48 object-cover mt-8"
              />
            </div>
          </div>

          {/* Team Section */}
       
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            What Farmers <span className="text-green-400">Say</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of farmers who have transformed their agricultural practices with our platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/30 p-8 rounded-3xl border border-gray-700/30 hover:border-green-400/30 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt="" className="w-14 h-14 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-green-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                <h4 className="text-lg font-semibold mb-3 text-white">{item.question}</h4>
                <p className="text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get In <span className="text-green-400">Touch</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Have questions about our platform? Our team is here to help you get started and answer any questions you may have.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    content: "hello@agroLink.com",
                    subtitle: "We'll respond within 24 hours"
                  },
                  {
                    icon: "📞",
                    title: "Phone",
                    content: "+251 912 34 56 78",
                    subtitle: "Mon-Fri from 9am to 6pm"
                  },
                  {
                    icon: "📍",
                    title: "Office",
                    content: "123 Farm Tech Avenue",
                    subtitle: "Agricultural Innovation Park, Ethiopia"
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <div className="font-semibold text-lg">{contact.title}</div>
                      <div className="text-green-400">{contact.content}</div>
                      <div className="text-gray-400 text-sm">{contact.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-3xl p-8 border border-gray-700/30">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-400 transition-colors duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-400 transition-colors duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-400 transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-400 transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-400 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your farming needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already increasing their yields and profits with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/sign-up"
              className="inline-block py-4 px-12 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              Start 
            </Link>
            <Link
              to="/demo"
              className="inline-block py-4 px-12 text-lg font-semibold border border-gray-600 text-gray-300 rounded-full hover:border-green-400 hover:text-green-400 transition-all duration-300"
            >
              Book a Demo
            </Link>
          </div>
          

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  {t('አግሮLink')}
                </span>
              </Link>
              <p className="text-gray-400 mb-4">
                Empowering farmers with AI technology for sustainable agriculture.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    {/* Social icons would go here */}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Case Studies", "Updates"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact", "Documentation", "API Status"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 agroLink Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;