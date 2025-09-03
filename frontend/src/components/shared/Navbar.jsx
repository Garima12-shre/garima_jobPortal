import { Avatar, AvatarImage } from '../ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui/button';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Branding */}
        <div>
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-6 font-medium text-gray-700">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="hover:text-blue-600 transition"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-blue-600 transition"><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-blue-600 transition"><Link to="/">Home</Link></li>
                <li className="hover:text-blue-600 transition"><Link to="/jobs">Jobs</Link></li>
                <li className="hover:text-blue-600 transition"><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth Buttons / User Popover */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 transition">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white transition">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-gray-200">
                  <AvatarImage src={user?.profile?.profilePhoto || ""} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="border-2 border-gray-200">
                    <AvatarImage src={user?.profile?.profilePhoto || ""} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500 truncate">{user?.profile?.bio || "No bio available"}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {user.role === 'student' && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      <User2 className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">View Profile</span>
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition w-full text-left text-gray-700"
                  >
                    <LogOut className="w-4 h-4 text-gray-600" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
