import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, eventId } = body;
    
    if (!userId || !eventId) {
      return NextResponse.json({ 
        success: false, 
        message: 'User ID and Event ID are required' 
      }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Find user - try different ID formats
    let user;
    
    // Try as ObjectId
    try {
      const objectId = new ObjectId(userId);
      user = await db.collection('users').findOne({ _id: objectId });
    } catch (e) {
      // Not a valid ObjectId, try other formats
    }
    
    // Try as string ID
    if (!user) {
      user = await db.collection('users').findOne({ _id: userId });
    }
    
    // Try as firebaseUid
    if (!user) {
      user = await db.collection('users').findOne({ firebaseUid: userId });
    }
    
    // If user still not found, return error
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found. Please make sure the user is registered in the system.' 
      }, { status: 404 });
    }

    // Check if already registered
    const userIdStr = user._id.toString();
    const existing = await db.collection('event_registrations').findOne({
      userId: userIdStr,
      eventId: eventId
    });

    if (existing) {
      return NextResponse.json({ 
        success: true, 
        user: user,
        duplicate: true,
        message: 'User already registered for this event'
      });
    }

    // Register user and award participation point
    await db.collection('event_registrations').insertOne({
      userId: userIdStr,
      eventId: eventId,
      eventPoints: {
        participationPoint: true
      },
      registeredAt: new Date()
    });

    // Update user's total points (+1 for participation)
    await db.collection('users').updateOne(
      { _id: user._id },
      { $inc: { points: 1 } }
    );

    // Get updated user
    const updatedUser = await db.collection('users').findOne({ _id: user._id });

    return NextResponse.json({ 
      success: true, 
      user: updatedUser,
      message: 'User registered successfully'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error'
    }, { status: 500 });
  }
} 