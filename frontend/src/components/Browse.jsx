import { Filter, Grid, List, Loader, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import FilterCard from './FilterCard';
import Job from './Job';
import Navbar from './shared/Navbar'
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const {allJobs, loading} = useSelector(store => store.job);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Jobs</h1>
                        <p className="text-gray-600 mt-2">
                            Discover your next career opportunity from {allJobs.length} available positions
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        {/* View Toggle */}
                        <div className="hidden md:flex bg-white rounded-lg border border-gray-200 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                        
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filters Sidebar - Desktop */}
                    <div className="hidden md:block w-full md:w-80 flex-shrink-0">
                        <FilterCard />
                    </div>

                    {/* Filters Sidebar - Mobile */}
                    {showFilters && (
                        <div className="md:hidden mb-6">
                            <FilterCard />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Search size={18} className="text-gray-400" />
                                    <span className="text-gray-700">
                                        Found <span className="font-semibold text-blue-600">{allJobs.length}</span> jobs
                                    </span>
                                </div>
                                
                                {loading && (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Loader size={16} className="animate-spin" />
                                        <span className="text-sm">Loading...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Jobs Grid/List */}
                        {allJobs.length > 0 ? (
                            <div className={
                                viewMode === 'grid' 
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                                    : 'space-y-6'
                            }>
                                {allJobs.map((job) => (
                                    <Job key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-500">
                                    {loading ? 'Loading job listings...' : 'Try adjusting your search or filter criteria'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse