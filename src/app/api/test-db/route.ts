import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ success: true, message: 'Kết nối MongoDB thành công!' });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Lỗi kết nối MongoDB', details: error },
            { status: 500 }
        );
    }
}
