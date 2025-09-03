import { ArrowRight, Loader2, Lock, Mail, Phone, Upload, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <h1 className="text-2xl font-bold">Create Your Account</h1>
                        <p className="text-blue-100 mt-1">Join us and find your dream job or talent</p>
                    </div>
                    
                    <form onSubmit={submitHandler} className="p-6 space-y-5">
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Your Full Name"
                                    className="pl-10 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Your Email"
                                    className="pl-10 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Your Number"
                                    className="pl-10 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Password"
                                    className="pl-10 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-gray-700 block">I am a:</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="radio"
                                        id="student"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="hidden peer"
                                        required
                                    />
                                    <label 
                                        htmlFor="student" 
                                        className="flex flex-col items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors"
                                    >
                                        <span className="text-gray-700 font-medium">Job Seeker</span>
                                        <span className="text-xs text-gray-500">Looking for jobs</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="recruiter"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="hidden peer"
                                    />
                                    <label 
                                        htmlFor="recruiter" 
                                        className="flex flex-col items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors"
                                    >
                                        <span className="text-gray-700 font-medium">Recruiter</span>
                                        <span className="text-xs text-gray-500">Hiring talent</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Profile Picture (Optional)</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors">
                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">
                                        {input.file ? input.file.name : "Click to upload or drag and drop"}
                                    </span>
                                    <input 
                                        id="file-upload" 
                                        accept="image/*" 
                                        name="file" 
                                        type="file" 
                                        onChange={changeFileHandler} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                        </div>
                        
                        {loading ? (
                            <Button disabled className="w-full py-2.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium shadow-md transition-all"
                            >
                                Create Account <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                        
                        <div className="text-center pt-4">
                            <span className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup