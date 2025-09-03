import { ArrowRight, Building, MapPin, Search, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() === "") return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

  return (
    <section className="relative pt-28 pb-24 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bg-purple-200/20 rounded-full w-80 h-80 -top-24 -left-24 animate-float"></div>
        <div className="absolute bg-blue-200/20 rounded-full w-96 h-96 -bottom-40 -right-40 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bg-indigo-200/10 rounded-full w-72 h-72 top-1/3 left-1/3 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 opacity-10">
          <Sparkles size={120} className="text-purple-500" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Target size={100} className="text-blue-500" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50 text-purple-700 font-semibold text-sm uppercase tracking-wide mb-2 animate-pulse shadow-sm">
          <TrendingUp size={16} />
          <span>No.1 Job Hunt Website in Nepal</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 max-w-5xl">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Dream Job</span> 
          <br className="hidden sm:block" /> Without the Struggle
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
          Discover thousands of job opportunities from top companies and 
          connect with employers who value your skills
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-2">
          <div className="flex flex-col items-center gap-1 text-gray-700">
            <div className="bg-purple-100 p-3 rounded-full mb-2">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-bold text-2xl text-gray-900">10K+</span>
            <span className="text-gray-600 text-sm">Active Jobs</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-700">
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-bold text-2xl text-gray-900">500+</span>
            <span className="text-gray-600 text-sm">Companies</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-700">
            <div className="bg-indigo-100 p-3 rounded-full mb-2">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="font-bold text-2xl text-gray-900">50+</span>
            <span className="text-gray-600 text-sm">Locations</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-2xl mt-10">
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/80 p-2 flex items-center transition-all duration-300 hover:shadow-2xl hover:border-purple-300/50">
            <div className="flex-1 flex items-center pl-5">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                value={query}
                className="flex-1 py-4 text-gray-800 focus:outline-none text-lg placeholder-gray-500 font-normal"
              />
            </div>
            <Button
              onClick={searchJobHandler}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>Search Jobs</span>
              <ArrowRight size={18} />
            </Button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="text-sm text-gray-500 font-medium">Popular searches:</span>
            {['Frontend Developer', 'Marketing Manager', 'Data Analyst', 'UX Designer'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  dispatch(setSearchedQuery(tag));
                  navigate("/browse");
                }}
                className="text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-1.5 rounded-full transition-all duration-200 hover:shadow-sm flex items-center gap-1"
              >
                <Search size={12} />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;