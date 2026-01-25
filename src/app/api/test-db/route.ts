import { NextResponse } from 'next/server';
import clientPromise, { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Test the connection
    const client = await clientPromise;
    
    // Get database (you can specify a database name or it will use the one in the connection string)
    const db = await getDatabase();
    
    // Test by getting list of collections
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB successfully',
      database: db.databaseName,
      collections: collections.map(col => col.name),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
