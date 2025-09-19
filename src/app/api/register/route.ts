import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc.' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Định dạng email không hợp lệ.' }, { status: 400 });
    }

    await connectDB();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email đã tồn tại.' }, { status: 409 });
    }

    // TODO: Băm mật khẩu trước khi lưu (bảo mật)
    const user = await User.create({ email, password, name });
    return NextResponse.json({ message: 'Đăng ký thành công!', user: { email: user.email, name: user.name } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Có lỗi xảy ra khi đăng ký.' }, { status: 500 });
  }
}
