import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    plot?: string;
    genres?: string[];
    runtime?: number;
    cast?: string[];
    poster?: string;
    fullplot?: string;
    languages?: string[];
    released?: Date;
    directors?: string[];
    rated?: string;
    awards?: {
        wins: number;
        nominations: number;
        text: string;
    };
    year?: number;
    imdb?: {
        rating: number;
        votes: number;
        id: number;
    };
    countries?: string[];
    type?: string;
    tomatoes?: any;
}

const movieSchema = new Schema({
    title: { type: String, required: true },
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    poster: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    countries: [String],
    type: String,
    tomatoes: Schema.Types.Mixed
}, {
    timestamps: true
});

// Kiểm tra nếu model đã tồn tại thì sử dụng lại
const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', movieSchema, 'movies');

export default Movie;
