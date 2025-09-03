import { BookOpen, FileText, Loader2, Mail, Phone, User, X } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
                    <DialogTitle className="text-xl font-semibold text-gray-900">Update Profile</DialogTitle>
                    <p className="text-sm text-gray-500 mt-1">Keep your profile information up to date</p>
                </DialogHeader>
                
                <form onSubmit={submitHandler} className="px-6 py-4">
                    <div className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">
                                <User className="inline h-4 w-4 mr-2 text-blue-500" />
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                <Mail className="inline h-4 w-4 mr-2 text-blue-500" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email address"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                <Phone className="inline h-4 w-4 mr-2 text-blue-500" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                                <BookOpen className="inline h-4 w-4 mr-2 text-blue-500" />
                                Bio
                            </Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                            <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                                Skills (comma separated)
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="HTML, CSS, JavaScript, React, etc."
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                                <FileText className="inline h-4 w-4 mr-2 text-blue-500" />
                                Resume (PDF only)
                            </Label>
                            <div className="flex items-center gap-3">
                                <label htmlFor="file-upload" className="flex-1 cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-blue-400 transition-colors">
                                        <div className="text-center">
                                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">
                                                {input.file ? input.file.name : "Click to upload or drag and drop"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                                        </div>
                                    </div>
                                    <input
                                        id="file-upload"
                                        name="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                        className="hidden"
                                    />
                                </label>
                                {input.file && (
                                    <button
                                        type="button"
                                        onClick={() => setInput({ ...input, file: null })}
                                        className="p-2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1 border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        {loading ? (
                            <Button disabled className="flex-1 bg-blue-600 hover:bg-blue-700">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                Update Profile
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog