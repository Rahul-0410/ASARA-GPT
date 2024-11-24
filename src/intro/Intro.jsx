import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sanchitImg from "../assets/sanchit.jpeg"
import rahulImg from "../assets/rahul.jpeg"
import img from "../assets/white-logo-nobackground.png"
import img1 from "../assets/ai-talkingbot.png"
import img2 from "../assets/beach.jpg"
import { Menu, X } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Intro = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToFeedback = (e) => {
    e.preventDefault();
    const feedbackSection = document.getElementById('feedback');
    feedbackSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <img src={img} alt="Logo" className="h-8" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="#feedback" onClick={scrollToFeedback}>Feedback</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <MobileNavLink href="/login">Login</MobileNavLink>
                <MobileNavLink href="/signup">Sign Up</MobileNavLink>
                <MobileNavLink href="#feedback" onClick={scrollToFeedback}>
                  Feedback
                </MobileNavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Improved Mobile Image */}
      <section className="pt-24 pb-16 px-4 sm:pt-32 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                AASRA-GPT
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Welcome to Aasra GPT, your AI-powered mental health companion designed to support you through 
                life's challenges. At Aasra GPT, we are committed to providing a compassionate and innovative 
                approach to mental health support.
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg 
                         font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur-3xl opacity-20"></div>
              <img
                src={img1}
                alt="AI Talking Bot"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover sm:max-w-lg sm:mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our mission is to leverage advanced AI technology to offer accessible, personalized mental health 
              support. We aim to create a safe and supportive environment where users can explore their feelings, 
              receive guidance, and develop coping strategies to improve their mental well-being.
            </p>
          </div>
          <div className="relative mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl blur-3xl opacity-20"></div>
            <img
              src={img2}
              alt="Nature"
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team and Feedback Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Team Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
              <div className="space-y-6">
                <TeamMember
                  name="Sanchit Bajaj"
                  role="Web Developer"
                  email="Sanchitbajaj2003@gmail.com"
                  imageSrc={sanchitImg}
                  linkedinUrl="https://www.linkedin.com/in/sanchit-bajaj-977908283/"
                  githubUrl="https://github.com/sanchitbajaj123"
                />
              
    
                <TeamMember
                  name="Rahul"
                  role="Web Developer"
                  email="rgs786999@gmail.com"
                  imageSrc={rahulImg}
                  linkedinUrl="https://www.linkedin.com/in/rahul0410/"
                  githubUrl="https://github.com/Rahul-0410"
                />
              </div>
            </div>

            {/* Feedback Form */}
            <div id="feedback" className="bg-slate-800/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Feedback</h2>
              <form action="https://api.web3forms.com/submit" method="post" className="space-y-6">
                <input type="hidden" name="access_key" value="1a562657-bc02-4007-bc9a-c4ada2a53918"/>
                <FormField label="Name" type="text" name="name" required />
                <FormField label="Email" type="email" name="email" required />
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Feedback</label>
                  <textarea
                    name="feedback"
                    rows="4"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg 
                             text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                             focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white 
                           rounded-lg font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>© 2024 Asara GPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 
               transition-colors duration-200"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium
               hover:bg-slate-800 transition-colors duration-200"
  >
    {children}
  </a>
);

const TeamMember = ({ name, role, email, imageSrc,linkedinUrl,githubUrl,instagramUrl }) => (
  <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-xl hover:bg-slate-800 
                  transition-colors duration-200">
    <img
      src={imageSrc}
      alt={name}
      className="w-16 h-16 rounded-full object-cover hover:scale-110 transition-transform duration-200"
    />
    <div>
      <h3 className="text-white font-semibold">{name}</h3>
      <p className="text-slate-400">{role}</p>
      <p className="text-slate-500 text-sm">{email}</p>
      <div style={{ display: "flex", gap: "8px",marginTop:"3px" }}>
      <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-400 text-lg "
          aria-label={`LinkedIn profile of ${name}`}
        >
          <FaLinkedin />
        </a>     
        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 text-lg"
            aria-label={`GitHub profile of ${name}`}
          >
            <FaGithub />
          </a>
          </div>
    </div>
  </div>
);

const FormField = ({ label, type, name, required }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white 
                 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 
                 focus:border-transparent"
    />
  </div>
);

export default Intro;