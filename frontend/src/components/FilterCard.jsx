import { Building, DollarSign, Filter, MapPin, X } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import React, { useEffect, useState } from 'react'

import { Label } from './ui/label'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Baneshowr", "Kathmandu", "Naxal", "Lalitpur", "Sanepa"],
        icon: <MapPin className="h-4 w-4" />
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "DevOps Engineer"],
        icon: <Building className="h-4 w-4" />
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
        icon: <DollarSign className="h-4 w-4" />
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    const clearFilter = () => {
        setSelectedValue('');
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-5 rounded-xl shadow-sm border border-gray-100'>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <h1 className='font-bold text-xl text-gray-800'>Filter Jobs</h1>
                </div>
                {selectedValue && (
                    <button 
                        onClick={clearFilter}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <X className="h-4 w-4" />
                        Clear
                    </button>
                )}
            </div>
            
            {selectedValue && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">Active filter:</p>
                    <p className="font-medium text-blue-700">{selectedValue}</p>
                </div>
            )}
            
            <hr className='my-4 border-gray-200' />
            
            <div className="md:hidden mb-4">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                    <span className="font-medium">Filters</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
            </div>
            
            <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
                <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                    {fitlerData.map((data, index) => (
                        <div key={index} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="text-blue-600">
                                    {data.icon}
                                </div>
                                <h2 className='font-semibold text-gray-800'>{data.fitlerType}</h2>
                            </div>
                            
                            <div className="space-y-2.5">
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className="text-blue-600 border-gray-300 data-[state=checked]:border-blue-600"
                                            />
                                            <Label 
                                                htmlFor={itemId} 
                                                className="text-gray-700 cursor-pointer font-normal hover:text-gray-900 transition-colors"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard