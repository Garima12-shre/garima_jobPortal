import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark, Briefcase, Clock, DollarSign, ExternalLink, Heart, MapPin } from 'lucide-react'
import React, { useState } from 'react'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    const handleSave = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    }

    const handleCardClick = () => {
        navigate(`/description/${job?._id}`);
    }
    
    return (
        <div 
            className="group p-6 rounded-2xl bg-white border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 relative overflow-hidden"
            onClick={handleCardClick}
        >
            {/* Subtle accent bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-600"></div>
            
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 py-1 px-3 rounded-full">
                    <Clock size={14} className="text-purple-500" />
                    <span>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                </div>
                <Button 
                    variant="ghost" 
                    className={`rounded-full p-2.5 ${isSaved ? 'text-amber-500 hover:text-amber-600 bg-amber-50' : 'text-gray-400 hover:text-gray-600 bg-gray-100'}`} 
                    size="icon"
                    onClick={handleSave}
                >
                    <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                </Button>
            </div>

            <div className="flex items-start gap-4 mb-5">
                <div className="p-1.5 bg-white rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Avatar className="h-14 w-14 rounded-xl">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="rounded-xl" />
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <h1 className="font-semibold text-lg text-gray-900 truncate">{job?.company?.name}</h1>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="text-purple-500 flex-shrink-0" />
                        <span className="truncate">Nepal • Remote</span>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <h1 className="font-bold text-xl text-gray-900 mb-2.5 group-hover:text-purple-700 transition-colors duration-300">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{job?.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium py-1.5 px-3 rounded-lg border-blue-100">
                    <Briefcase size={12} className="text-blue-600" />
                    <span>{job?.position} Positions</span>
                </Badge>
                <Badge className="flex items-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-medium py-1.5 px-3 rounded-lg border-red-100">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-0.5"></span>
                    {job?.jobType}
                </Badge>
                <Badge className="flex items-center gap-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium py-1.5 px-3 rounded-lg border-purple-100">
                    <DollarSign size={12} className="text-purple-600" />
                    <span>{job?.salary} LPA</span>
                </Badge>
            </div>
            
            <div className="flex items-center gap-3">
                <Button 
                    variant="outline" 
                    className="flex-1 border-gray-300 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg py-2.5 transition-all duration-300 flex items-center justify-center gap-1.5"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }}
                >
                    <span>View Details</span>
                    <ExternalLink size={16} />
                </Button>
                <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg py-2.5 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add save functionality here
                    }}
                >
                    <Heart size={16} className="fill-current" />
                    <span>Save For Later</span>
                </Button>
            </div>
        </div>
    )
}

export default Job