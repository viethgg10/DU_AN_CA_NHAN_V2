import { useState, useEffect, useCallback } from 'react';
import { IMovie } from '@/models/Movie';

interface UseMoviesOptions {
  genre?: string;
  page?: number;
  limit?: number;
  sort?: string;
  searchQuery?: string;
  year?: number;
  minRating?: number;
  enabled?: boolean;
}

interface UseMoviesResult {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  refetch: () => Promise<void>;
}

export function useMovies({
  genre = '',
  page = 1,
  limit = 20,
  sort = '-year',
  searchQuery = '',
  year,
  minRating,
  enabled = true
}: UseMoviesOptions = {}): UseMoviesResult {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchMovies = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        sort,
        ...(genre && { genre }),
        ...(searchQuery && { q: searchQuery }),
        ...(year && { year: year.toString() }),
        ...(minRating && { minRating: minRating.toString() }),
      });

      const response = await fetch(`/api/movies?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data.movies);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, enabled, genre, limit, minRating, searchQuery, sort, year]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const refetch = useCallback(async () => {
    await fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    refetch,
  };
}

// Hook để lấy phim phổ biến
export function usePopularMovies(limit: number = 5) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies?sort=-imdb.rating&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch popular movies');
        }

        const data = await response.json();
        setMovies(data.movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [limit]);

  return { movies, loading, error };
}

// Hook để lấy phim mới nhất
export function useLatestMovies(limit: number = 5) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies?sort=-released&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch latest movies');
        }

        const data = await response.json();
        setMovies(data.movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching latest movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, [limit]);

  return { movies, loading, error };
}
