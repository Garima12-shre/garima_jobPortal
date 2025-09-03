import { Plus, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-8'>
                    <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
                    <p className="text-gray-600 mt-2">Manage all registered companies in your platform</p>
                </div>
                
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                className="pl-10 w-full"
                                placeholder="Search companies by name..."
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                        >
                            <Plus className="h-4 w-4" />
                            New Company
                        </Button>
                    </div>
                </div>
                
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies