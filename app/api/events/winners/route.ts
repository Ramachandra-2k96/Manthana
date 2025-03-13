import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("varnothsava");
    
    // Fetch all events
    const events = await db.collection("events").find({}).toArray();
    
    // Prepare winners array
    const winners = [];
    
    // For each event, get the top 3 participants
    for (const event of events) {
      // Find participants for this event, sorted by score/points
      const participants = await db.collection("eventParticipants")
        .find({ eventId: event._id.toString() })
        .sort({ score: -1 }) // Sort by score descending
        .limit(3) // Get top 3
        .toArray();
      
      // Map positions to participants
      const positions = ["1st", "2nd", "3rd"];
      
      // For each of the top 3 participants, get their details
      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        
        // Get user details
        const user = await db.collection("users").findOne({ _id: participant.userId });
        
        if (user) {
          winners.push({
            eventName: event.name,
            position: positions[i],
            studentName: user.name,
            usn: user.usn,
            college: user.college,
            points: participant.score || 0
          });
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      winners: winners
    });
    
  } catch (error: any) {
    console.error("Error fetching winners:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch winners", details: error.message },
      { status: 500 }
    );
  }
} 