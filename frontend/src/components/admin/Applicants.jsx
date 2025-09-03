import { useDispatch, useSelector } from 'react-redux';
import{ useEffect, useState } from 'react';

import { APPLICATION_API_END_POINT } from '@/utils/constant';
import ApplicantsTable from './ApplicantsTable';
import { Input } from '../ui/input';
import { MagnifyingGlass } from 'phosphor-react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';
import { useParams } from 'react-router-dom';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
            <p className="text-gray-600 mt-1">
              Total: <span className="font-semibold">{applicants?.applications?.length || 0}</span>
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search applicants..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <ApplicantsTable search={search} />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
