import { Briefcase, Code, Cpu, Database, Palette, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const category = [
    { name: "Frontend Developer", icon: <Code size={20} /> },
    { name: "Backend Developer", icon: <Cpu size={20} /> },
    { name: "Data Science", icon: <Database size={20} /> },
    { name: "Graphic Designer", icon: <Palette size={20} /> },
    { name: "FullStack Developer", icon: <Briefcase size={20} /> },
    { name: "Marketing", icon: <TrendingUp size={20} /> }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-16 bg-gradient-to-b from-white to-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Explore Popular Job Categories
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover opportunities in the most sought-after fields
                    </p>
                </div>
                
                <Carousel className="w-full mx-auto">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <div className="p-1">
                                    <Button
                                        onClick={() => searchJobHandler(cat.name)}
                                        variant="outline"
                                        className="rounded-xl px-5 py-6 h-auto flex flex-col items-center justify-center gap-3 w-full text-gray-700 bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-700 shadow-sm hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                            {cat.icon}
                                        </div>
                                        <span className="font-medium text-sm leading-tight">{cat.name}</span>
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 shadow-md h-10 w-10 rounded-full" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 shadow-md h-10 w-10 rounded-full" />
                </Carousel>
                
                <div className="text-center mt-10">
                    <p className="text-gray-500 text-sm">
                        Browse through our most popular categories to find your perfect role
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CategoryCarousel;