import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

// IMPORTANT: This endpoint should be disabled in production or protected by a secret key
// Only use this during initial setup to create your first admin account

export async function POST(request: NextRequest) {
  try {
    // Optional: Add a setup secret to protect this endpoint
    // const { setupSecret } = await request.json();
    // if (setupSecret !== process.env.SETUP_SECRET) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user
    const result = await db.collection('admins').insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      adminId: result.insertedId,
    });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create admin',
      },
      { status: 500 }
    );
  }
}
