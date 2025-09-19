// File này là API route cho endpoint /api/subscribe
// Chức năng: Nhận email từ client, kiểm tra hợp lệ và lưu vào MongoDB (collection: subscribers)
// Kết nối tới database qua connectDB và sử dụng model Subscriber

import { NextRequest, NextResponse } from 'next/server'; // Dùng để xử lý request/response kiểu Next.js API Route

import connectDB from '@/lib/mongodb'; // Hàm kết nối tới MongoDB, dùng chung cho toàn bộ backend
import Subscriber from '@/models/subscriber'; // Mongoose model thao tác với collection 'subscribers' trong MongoDB

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Kết nối DB và lưu subscriber
    await connectDB();
    try {
      const existing = await Subscriber.findOne({ email });
      if (existing) {
        return NextResponse.json(
          { error: 'Email already subscribed!' },
          { status: 409 }
        );
      }
      const subscriber = await Subscriber.create({ email });
      return NextResponse.json(
        {
          message: 'Successfully subscribed!',
          email: subscriber.email,
        },
        { status: 201 }
      );
    } catch (dbError) {
      return NextResponse.json(
        { error: 'Database error', details: dbError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
