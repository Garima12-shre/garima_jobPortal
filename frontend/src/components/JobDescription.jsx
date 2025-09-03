import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { Briefcase, Calendar, DollarSign, FileText, MapPin, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-4xl mx-auto my-8 px-4'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div>
                        <h1 className='font-bold text-2xl text-gray-900'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4 flex-wrap'>
                            <Badge className={'bg-blue-100 text-blue-700 font-medium py-1 px-3'} variant="ghost">
                                {singleJob?.postion} Positions
                            </Badge>
                            <Badge className={'bg-orange-100 text-orange-700 font-medium py-1 px-3'} variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className={'bg-purple-100 text-purple-700 font-medium py-1 px-3'} variant="ghost">
                                {singleJob?.salary}LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-full px-6 py-2 text-base font-medium ${isApplied ? 
                            'bg-gray-100 text-gray-600 border border-gray-200 cursor-not-allowed' : 
                            'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                        <FileText className="h-5 w-5 text-purple-600" />
                        Job Description
                    </h2>
                </div>
                
                <div className='p-6 space-y-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-start gap-3'>
                            <div className='bg-purple-100 p-2 rounded-lg'>
                                <Briefcase className='h-5 w-5 text-purple-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Role</h3>
                                <p className='text-gray-900'>{singleJob?.title}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <div className='bg-blue-100 p-2 rounded-lg'>
                                <MapPin className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Location</h3>
                                <p className='text-gray-900'>{singleJob?.location}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <div className='bg-green-100 p-2 rounded-lg'>
                                <DollarSign className='h-5 w-5 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Salary</h3>
                                <p className='text-gray-900'>{singleJob?.salary} LPA</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <div className='bg-orange-100 p-2 rounded-lg'>
                                <Briefcase className='h-5 w-5 text-orange-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Experience</h3>
                                <p className='text-gray-900'>{singleJob?.experience} years</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <div className='bg-pink-100 p-2 rounded-lg'>
                                <Users className='h-5 w-5 text-pink-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Total Applicants</h3>
                                <p className='text-gray-900'>{singleJob?.applications?.length}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <div className='bg-gray-100 p-2 rounded-lg'>
                                <Calendar className='h-5 w-5 text-gray-600' />
                            </div>
                            <div>
                                <h3 className='font-medium text-gray-700'>Posted Date</h3>
                                <p className='text-gray-900'>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='pt-4 border-t border-gray-100'>
                        <h3 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                            <FileText className="h-4 w-4 text-gray-500" />
                            Job Description
                        </h3>
                        <p className='text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg'>
                            {singleJob?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription