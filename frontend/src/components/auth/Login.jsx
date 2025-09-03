import { Briefcase, Loader2, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setLoading, setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">Login</h1>
          <form onSubmit={submitHandler} className="space-y-5">

            {/* Email */}
            <div>
              <Label className="text-gray-700">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Your Email"
                className="mt-1 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md w-full transition duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Your Password"
                className="mt-1 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md w-full transition duration-200"
              />
            </div>

            {/* Role Selector */}
            <div>
              <Label className="text-gray-700 mb-2">Role</Label>
              <div className="grid grid-cols-2 gap-4">
                {/* Job Seeker */}
                <div
                  onClick={() => setInput({ ...input, role: "student" })}
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${input.role === "student" ? "border-blue-500 bg-blue-50 shadow" : "border-gray-300 hover:border-blue-400"}`}
                >
                  <User className={`h-5 w-5 ${input.role === "student" ? "text-blue-500" : "text-gray-400"}`} />
                  <span className={`font-medium ${input.role === "student" ? "text-blue-600" : "text-gray-700"}`}>Job Seeker</span>
                </div>

                {/* Recruiter */}
                <div
                  onClick={() => setInput({ ...input, role: "recruiter" })}
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${input.role === "recruiter" ? "border-green-500 bg-green-50 shadow" : "border-gray-300 hover:border-green-400"}`}
                >
                  <Briefcase className={`h-5 w-5 ${input.role === "recruiter" ? "text-green-500" : "text-gray-400"}`} />
                  <span className={`font-medium ${input.role === "recruiter" ? "text-green-600" : "text-gray-700"}`}>Recruiter</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
                }`}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin inline-block" /> : null}
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
