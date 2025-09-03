import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import  { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
        };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table className="border-collapse">
                <TableCaption className="p-4 text-gray-500 text-sm bg-gray-50 border-b">A list of your recent registered companies</TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                        <TableHead className="py-4 px-6 text-gray-600 font-medium">Logo</TableHead>
                        <TableHead className="py-4 px-6 text-gray-600 font-medium">Name</TableHead>
                        <TableHead className="py-4 px-6 text-gray-600 font-medium">Date</TableHead>
                        <TableHead className="py-4 px-6 text-gray-600 font-medium text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                <TableCell className="py-3 px-6">
                                    <Avatar className="h-10 w-10 border border-gray-200 shadow-sm">
                                        <AvatarImage src={company.logo} className="object-cover" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-3 px-6 font-medium text-gray-800">{company.name}</TableCell>
                                <TableCell className="py-3 px-6 text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="py-3 px-6 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <div className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-gray-100 transition-colors ml-auto">
                                                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 rounded-lg shadow-md border border-gray-200">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className='flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors'
                                            >
                                                <Edit2 className='w-4 h-4 text-gray-700' />
                                                <span className="text-sm text-gray-700">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            
            {filterCompany.length === 0 && (
                <div className="py-12 text-center">
                    <div className="text-gray-400 mb-2">No companies found</div>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}

export default CompaniesTable