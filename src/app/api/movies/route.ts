import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Movie, { IMovie } from '@/models/Movie';

// Số lượng phim mỗi trang mặc định
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Lấy các tham số từ query string
    const genre = searchParams.get('genre');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(
      parseInt(searchParams.get('limit') || DEFAULT_LIMIT.toString()),
      MAX_LIMIT
    );
    const sortBy = searchParams.get('sort') || '-year';
    const searchQuery = searchParams.get('q');
    const year = searchParams.get('year');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    
    // Kết nối tới MongoDB
    await connectDB();
    
    // Xây dựng query
    const query: any = {};
    
    // Lọc theo thể loại
    if (genre) {
      query.genres = { $in: [new RegExp(genre, 'i')] };
    }
    
    // Tìm kiếm theo từ khóa
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { plot: { $regex: searchQuery, $options: 'i' } },
        { 'cast': { $in: [new RegExp(searchQuery, 'i')] } },
        { 'directors': { $in: [new RegExp(searchQuery, 'i')] } }
      ];
    }
    
    // Lọc theo năm
    if (year) {
      query.year = parseInt(year);
    }
    
    // Lọc theo đánh giá tối thiểu
    if (minRating > 0) {
      query['imdb.rating'] = { $gte: minRating };
    }
    
    // Xử lý sắp xếp
    const sortOptions: any = {};
    if (sortBy) {
      const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
      const sortOrder = sortBy.startsWith('-') ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    }
    
    // Đếm tổng số phim phù hợp
    const total = await Movie.countDocuments(query);
    
    // Lấy dữ liệu phim với phân trang và sắp xếp
    const movies = await Movie.find(query)
      .select('title plot genres year released poster imdb.rating imdb.votes runtime')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    return NextResponse.json({
      movies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit
    });
    
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch movies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Thêm phim mới (ví dụ)
export async function POST(request: Request) {
  try {
    await connectDB();
    const movieData = await request.json();
    
    const movie = new Movie(movieData);
    await movie.save();
    
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
