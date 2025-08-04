// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Vui lòng khai báo biến môi trường MONGODB_URI trong file .env');
}

// Kiểm tra xem connection string có hợp lệ không
if (!MONGODB_URI.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI không hợp lệ. Phải bắt đầu bằng mongodb+srv://');
}

// Khởi tạo cached connection
type CachedConnection = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongoose: CachedConnection;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log('✅ Sử dụng kết nối MongoDB đã có');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('🔄 Đang kết nối tới MongoDB...');
        
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // Thời gian chờ kết nối tối đa 10s
        };

        try {
            cached.promise = mongoose.connect(MONGODB_URI, opts);
            const conn = await cached.promise;
            console.log('✅ Kết nối MongoDB thành công!');
            return conn;
        } catch (error) {
            console.error('❌ Lỗi kết nối MongoDB:', error);
            throw error;
        }
    }

    try {
        cached.conn = await cached.promise;
        console.log('✅ MongoDB connected!');
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;