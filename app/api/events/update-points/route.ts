import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define a type for the valid point types
type PointType = 'firstPlace' | 'secondPlace' | 'thirdPlace' | 'fourthPlace' | 'completedInTime' | 'participationPoint';

// Updated point values according to requirements
const POINT_VALUES: Record<PointType, number> = {
  firstPlace: 10,
  secondPlace: 7,
  thirdPlace: 5,
  fourthPlace: 2,
  completedInTime: 1,
  participationPoint: 1
};

export async function POST(request: Request) {
  try {
    const { userId, eventId, pointType, value } = await request.json();
    if (!userId || !eventId || !pointType) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Get current registration
    const registration = await db.collection('event_registrations').findOne({
      userId: userId,
      eventId: eventId
    });

    if (!registration) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not registered for this event' 
      }, { status: 404 });
    }

    // Calculate points difference
    const currentValue = registration.eventPoints?.[pointType as PointType] || false;
    const pointsDiff = value && !currentValue ? POINT_VALUES[pointType as PointType] : 
                      !value && currentValue ? -POINT_VALUES[pointType as PointType] : 0;

    // Update event registration points
    await db.collection('event_registrations').updateOne(
      { userId: userId, eventId: eventId },
      { $set: { [`eventPoints.${pointType}`]: value } }
    );

    // Update user's total points
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { points: pointsDiff } }
    );

    // Get updated user
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!updatedUser) {
      throw new Error('Failed to retrieve updated user');
    }

    return NextResponse.json({ 
      success: true, 
      updatedPoints: updatedUser.points,
      message: 'Points updated successfully'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update points'
    }, { status: 500 });
  }
} 