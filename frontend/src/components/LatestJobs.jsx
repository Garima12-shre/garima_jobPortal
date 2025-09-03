import { ArrowRight, Briefcase, Sparkles, TrendingUp } from 'lucide-react';

import LatestJobCards from './LatestJobCards';
import React from 'react';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
            </div>

            {/* Heading Section */}
            <div className="text-center mb-16 relative">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200 px-5 py-2.5 rounded-full text-sm font-medium mb-6 shadow-sm">
                    <Sparkles size={16} className="text-purple-600" />
                    <span>Featured Opportunities</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Latest & Top </span> 
                    Job Openings
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Discover the most recent and exciting career opportunities from top companies
                </p>
                
                {/* Stats bar */}
                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <TrendingUp size={16} className="text-green-500" />
                        <span className="text-sm font-medium text-gray-700">
                            <span className="text-green-600 font-bold">+24%</span> jobs this month
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <Briefcase size={16} className="text-purple-500" />
                        <span className="text-sm font-medium text-gray-700">
                            <span className="text-purple-600 font-bold">{allJobs.length}+</span> total opportunities
                        </span>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            {allJobs.length <= 0 ? (
                <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                        <Briefcase className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Jobs Available</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        We're constantly adding new opportunities. Check back soon for exciting career options.
                    </p>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200">
                        <span>Refresh</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}

            {/* CTA Button */}
            {allJobs.length > 6 && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">View All Jobs</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            )}
        </section>
    );
};

export default LatestJobs;