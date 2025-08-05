import { IMovie } from '@/models/Movie';

const API_BASE_URL = '/api/movies';

export const movieService = {
  // Lấy danh sách phim
  async getMovies(params?: {
    genre?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<{ movies: IMovie[]; total: number }> {
    try {
      // Tạo query string từ params
      const queryParams = new URLSearchParams();
      if (params?.genre) queryParams.append('genre', params.genre);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.sort) queryParams.append('sort', params.sort);

      const response = await fetch(`${API_BASE_URL}?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  // Lấy chi tiết phim theo ID
  async getMovieById(id: string): Promise<IMovie> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error('Movie not found');
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      throw error;
    }
  },

  // Tìm kiếm phim
  async searchMovies(query: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<{ movies: IMovie[]; total: number }> {
    try {
      const queryParams = new URLSearchParams({ q: query });
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(`${API_BASE_URL}/search?${queryParams}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Lấy danh sách thể loại phim
  async getGenres(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`);

      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  },

  // Lấy phim theo thể loại
  async getMoviesByGenre(genre: string, params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<{ movies: IMovie[]; total: number }> {
    return this.getMovies({
      genre,
      page: params?.page,
      limit: params?.limit,
      sort: params?.sort
    });
  },

  // Lấy phim phổ biến
  async getPopularMovies(limit: number = 10): Promise<IMovie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/popular?limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }

      const data = await response.json();
      return data.movies || [];
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  // Lấy phim mới nhất
  async getLatestMovies(limit: number = 10): Promise<IMovie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/latest?limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch latest movies');
      }

      const data = await response.json();
      return data.movies || [];
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      return [];
    }
  }
};

export default movieService;
