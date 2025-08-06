import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import Contact from '@/models/Contact';

// Sử dụng trực tiếp model Contact đã được export từ file Contact.ts
const ContactModel = Contact;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, type, message } = body;

        // Validate data
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
                { status: 400 }
            );
        }

        // Kết nối tới MongoDB
        await connectDB();

        // Tạo và lưu contact mới
        const newContact = new ContactModel({
            firstName,
            lastName: lastName || '',
            email,
            type: type || 'General',
            message
        });

        await newContact.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Gửi thông tin liên hệ thành công!',
                data: newContact
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving contact:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Có lỗi xảy ra khi gửi thông tin',
                details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
            },
            { status: 500 }
        );
    }
}