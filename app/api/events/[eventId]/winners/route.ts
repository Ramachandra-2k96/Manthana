import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface EventPoints {
  participationPoint: boolean;
  firstPlace: boolean;
  secondPlace: boolean;
  thirdPlace: boolean;
  fourthPlace: boolean;
  completedInTime: boolean;
}

interface Registration extends Document {
  _id: ObjectId;
  userId: string;
  eventId: string;
  eventPoints: EventPoints;
  registeredAt: Date;
}

interface User extends Document {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  college: string;
  displayName: string;
}

export async function GET(
    request: Request,
    context: { params: Promise<{ eventId: string }> }
  ) {
    try {
    const eventId = (await context.params).eventId;
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Get event details
    const event = await db.collection("events").findOne({
      _id: new ObjectId(eventId)
    });

    if (!event) {
      return NextResponse.json({
        success: false,
        error: "Event not found"
      }, { status: 404 });
    }

    // Use the correct collection name: event_registrations
    const registrations = await db.collection("event_registrations").find({
      eventId: eventId,
      $or: [
        { "eventPoints.firstPlace": true },
        { "eventPoints.secondPlace": true },
        { "eventPoints.thirdPlace": true }
      ]
    }).toArray();
    
    // Process winners - only include top 3 positions
    const winners = [];
    
    for (const reg of registrations) {
      try {
        if (!reg.eventPoints) continue;
        
        const points = reg.eventPoints;
        let position = 0;
        
        // Only include top 3 positions
        if (points.firstPlace) position = 1;
        else if (points.secondPlace) position = 2;
        else if (points.thirdPlace) position = 3;
        else continue; // Skip participation and other positions
        
        // Get user details
        const user = await db.collection("users").findOne({
          _id: new ObjectId(reg.userId)
        });
        
        if (!user) continue;
        
        winners.push({
          userName: `${user.firstname} ${user.lastname}`,
          userEmail: user.email,
          userCollege: user.college || '',
          userPhone: "",
          position: position,
          rank: getPositionText(position),
          points: getPoints(position)
        });
      } catch (error) {
        // Silently continue to next registration
      }
    }
    
    // Sort winners by position
    const sortedWinners = winners.sort((a, b) => a.position - b.position);
    
    return NextResponse.json({
      success: true,
      eventName: event.title,
      winners: sortedWinners
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch winners"
    }, { status: 500 });
  }
}

// Helper functions
function getPositionText(position: number): string {
  switch (position) {
    case 1: return "First Place";
    case 2: return "Second Place";
    case 3: return "Third Place";
    default: return `Position ${position}`;
  }
}

function getPoints(position: number): number {
  switch (position) {
    case 1: return 10;
    case 2: return 7;
    case 3: return 5;
    default: return 0;
  }
} 