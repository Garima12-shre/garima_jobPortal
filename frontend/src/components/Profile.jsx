import { Avatar, AvatarImage } from './ui/avatar'
import { Award, Briefcase, Contact, FileText, Mail, Pen, User } from 'lucide-react'
import React, { useState } from 'react'

import AppliedJobTable from './AppliedJobTable'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Label } from './ui/label'
import Navbar from './shared/Navbar'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useSelector } from 'react-redux'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 relative">
                        <div className="absolute -bottom-16 left-8">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                <AvatarImage 
                                    src={user?.profile?.avatar || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                    alt="profile" 
                                    className="object-cover"
                                />
                            </Avatar>
                        </div>
                    </div>
                    
                    <div className="pt-20 px-8 pb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user?.fullname}</h1>
                                <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio added yet"}</p>
                                
                                <div className="flex items-center gap-4 mt-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-blue-500" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Contact size={16} className="text-blue-500" />
                                        <span>{user?.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <Button 
                                onClick={() => setOpen(true)} 
                                variant="outline" 
                                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                                <Pen size={16} />
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Skills Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Skills & Expertise</h2>
                        </div>
                        
                        {user?.profile?.skills?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.profile.skills.map((item, index) => (
                                    <Badge 
                                        key={index} 
                                        variant="secondary" 
                                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No skills added yet</p>
                        )}
                    </div>

                    {/* Resume Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Resume</h2>
                        </div>
                        
                        {user?.profile?.resume ? (
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 truncate">
                                        {user.profile.resumeOriginalName || "My Resume"}
                                    </p>
                                    <a 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        href={user.profile.resume} 
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No resume uploaded yet</p>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Applied Jobs</h2>
                    </div>
                    
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile