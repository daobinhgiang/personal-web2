import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// POST - Batch delete multiple posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postIds } = body;

    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post IDs array is required' },
        { status: 400 }
      );
    }

    // Validate all IDs
    const invalidIds = postIds.filter((id: string) => !ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid post IDs: ${invalidIds.join(', ')}` },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Convert string IDs to ObjectIds
    const objectIds = postIds.map((id: string) => new ObjectId(id));

    // Delete multiple posts at once
    const result = await db.collection('posts').deleteMany({
      _id: { $in: objectIds }
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
      requestedCount: postIds.length,
    });
  } catch (error) {
    console.error('Error batch deleting posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
