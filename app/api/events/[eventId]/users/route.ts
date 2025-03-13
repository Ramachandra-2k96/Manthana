import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  context: { params: Promise<{ eventId: string }> }
) {
  try {
    // Await the params Promise
    const params = await context.params;
    const eventId = params.eventId;
    
    if (!eventId) {
      return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    // Find all registrations for this event
    const registrations = await db.collection('event_registrations')
      .find({ eventId: eventId })
      .toArray();
    
    // Get all user IDs from registrations
    const userIds = registrations.map(reg => reg.userId);
    
    // Find all users - handle both string IDs and ObjectIds
    const users = [];
    
    for (const id of userIds) {
      let user;
      
      // Try as ObjectId
      try {
        user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      } catch (e) {
        // Not a valid ObjectId, try as string
        user = await db.collection('users').findOne({ _id: id });
      }
      
      if (user) {
        // Find the registration for this user
        const registration = registrations.find(reg => reg.userId === id);
        
        // Add event points to user object
        users.push({
          ...user,
          eventPoints: registration?.eventPoints || { participationPoint: true }
        });
      }
    }

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}