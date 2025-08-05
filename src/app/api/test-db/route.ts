import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('🔄 Bắt đầu kiểm tra kết nối MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Đã khai báo' : 'Chưa khai báo');

    try {
        console.log('🔄 Đang thử kết nối...');
        await connectDB();
        console.log('✅ Kết nối MongoDB thành công!');
        return NextResponse.json({
            success: true,
            message: 'Kết nối MongoDB thành công!',
            database: process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] || 'Không xác định'
        });
    } catch (error: any) {
        console.error('❌ Lỗi kết nối MongoDB:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Lỗi kết nối MongoDB',
                message: error.message,
                name: error.name,
                code: error.code,
                details: {
                    connectionString: process.env.MONGODB_URI,
                    error: error.toString()
                }
            },
            { status: 500 }
        );
    }
}
