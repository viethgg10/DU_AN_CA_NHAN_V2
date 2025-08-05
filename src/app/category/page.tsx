'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsHeader, Tab, Card, CardBody, Typography, Button, Spinner } from '@material-tailwind/react';
import { ArrowLeftIcon, FilmIcon } from '@heroicons/react/24/solid';
import { useMovies } from '@/hooks/useMovies';

// Define the category type
type Category = {
    label: string;
    value: string;
    description: string;
    icon: React.ElementType;
};

// Define the categories
const categories: Category[] = [
    {
        label: 'Action',
        value: 'Action',
        description: 'High-energy films with exciting stunts and battles',
        icon: FilmIcon,
    },
    {
        label: 'Comedy',
        value: 'Comedy',
        description: 'Light-hearted films full of humor and fun',
        icon: FilmIcon,
    },
    {
        label: 'Drama',
        value: 'Drama',
        description: 'Serious, emotional stories about human experiences',
        icon: FilmIcon,
    },
    {
        label: 'Horror',
        value: 'Horror',
        description: 'Scary films designed to frighten and unsettle',
        icon: FilmIcon,
    },
    {
        label: 'Sci-Fi',
        value: 'Sci-Fi',
        description: 'Futuristic and science-based stories',
        icon: FilmIcon,
    },
    {
        label: 'Adventure',
        value: 'Adventure',
        description: 'Exciting journeys and quests',
        icon: FilmIcon,
    },
    {
        label: 'Animation',
        value: 'Animation',
        description: 'Animated films for all ages',
        icon: FilmIcon,
    },
    {
        label: 'Romance',
        value: 'Romance',
        description: 'Stories about love and relationships',
        icon: FilmIcon,
    },
];

export default function CategoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // Get the category from URL params
    useEffect(() => {
        const category = searchParams.get('category') || '';
        setSelectedCategory(category);
    }, [searchParams]);

    // Use our custom hook to fetch movies
    const {
        movies,
        loading,
        error,
        total,
        totalPages,
        currentPage,
        refetch
    } = useMovies({
        genre: selectedCategory,
        limit: 12,
        enabled: !!selectedCategory
    });

    // Handle tab change
    const handleTabChange = (category: string) => {
        setSelectedCategory(category);
        router.push(`/category?category=${encodeURIComponent(category)}`);
    };

    // Handle back to categories
    const handleBackToCategories = () => {
        setSelectedCategory('');
        router.push('/category');
    };

    // Handle view movie details
    const handleViewMovie = (movieId: string) => {
        router.push(`/movie/${movieId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {selectedCategory ? (
                <div className="mb-6">
                    <Button
                        variant="text"
                        color="blue"
                        className="flex items-center gap-2 mb-4"
                        onClick={handleBackToCategories}
                        placeholder="Back button"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Categories
                    </Button>

                    <Typography variant="h2" className="mb-4" placeholder="Category title">
                        {selectedCategory} Movies
                    </Typography>

                    {loading ? (
                        <div className="text-center py-12">
                            <Spinner className="h-12 w-12 mx-auto" />
                            <Typography variant="h6" className="mt-4" placeholder="Loading text">
                                Loading {selectedCategory} movies...
                            </Typography>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <Typography color="red" className="mb-4" placeholder="Error text">
                                Error: {error}
                            </Typography>
                            <Button
                                color="blue"
                                onClick={refetch}
                                placeholder="Retry button"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : movies.length === 0 ? (
                        <Typography className="text-center py-12" placeholder="No movies message">
                            No movies found in the {selectedCategory} category.
                        </Typography>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <Typography variant="h6" placeholder="Results count">
                                    Found {total} movies
                                </Typography>
                                <div className="flex items-center gap-2">
                                    <Typography variant="small" placeholder="Pagination info">
                                        Page {currentPage} of {totalPages}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        disabled={currentPage <= 1}
                                        onClick={() => {
                                            const prevPage = currentPage - 1;
                                            router.push(`/category?category=${encodeURIComponent(selectedCategory)}&page=${prevPage}`);
                                        }}
                                        placeholder="Previous page"
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => {
                                            const nextPage = currentPage + 1;
                                            router.push(`/category?category=${encodeURIComponent(selectedCategory)}&page=${nextPage}`);
                                        }}
                                        placeholder="Next page"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {movies.map((movie) => (
                                    <Card
                                        key={movie._id}
                                        className="h-full transition-transform hover:scale-105 hover:shadow-xl"
                                        placeholder="Movie card"
                                    >
                                        <div className="relative h-64">
                                            <img
                                                src={movie.poster || '/placeholder-poster.jpg'}
                                                alt={movie.title}
                                                className="h-full w-full object-cover rounded-t-lg"
                                            />
                                            {movie.imdb?.rating && (
                                                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-sm font-bold">
                                                    ⭐ {movie.imdb.rating.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                        <CardBody className="flex flex-col h-full" placeholder="Movie card body">
                                            <Typography variant="h5" className="mb-2 line-clamp-2 h-16" placeholder="Movie title">
                                                {movie.title}
                                            </Typography>
                                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                <Typography variant="small" placeholder="Movie year">
                                                    {movie.year || 'N/A'}
                                                </Typography>
                                                {movie.runtime && (
                                                    <>
                                                        <span>•</span>
                                                        <Typography variant="small" placeholder="Movie duration">
                                                            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                                        </Typography>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {movie.genres?.slice(0, 3).map((genre, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-auto">
                                                <Button
                                                    color="blue"
                                                    fullWidth
                                                    onClick={() => handleViewMovie(movie._id)}
                                                    placeholder="View details button"
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Typography variant="h2" className="mb-8 text-center" placeholder="Page title">
                        Browse by Category
                    </Typography>

                    <Tabs value={selectedCategory} className="mb-8">
                        <TabsHeader className="bg-transparent" placeholder="Categories tabs">
                            {categories.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => handleTabChange(value)}
                                    className="py-2 px-4 text-sm font-medium"
                                    placeholder={label}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map(({ label, value, description, icon: Icon }) => (
                            <Card
                                key={value}
                                className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
                                onClick={() => handleTabChange(value)}
                                placeholder={`${label} category card`}
                            >
                                <CardBody className="text-center flex flex-col items-center flex-grow" placeholder={`${label} category card body`}>
                                    <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <Typography variant="h5" className="mb-2" placeholder={`${label} category title`}>
                                        {label}
                                    </Typography>
                                    <Typography className="text-gray-600 flex-grow" placeholder={`${label} category description`}>
                                        {description}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        color="blue"
                                        className="mt-4"
                                        placeholder={`View ${label} button`}
                                    >
                                        View All
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
