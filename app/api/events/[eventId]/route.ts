import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Define the Event interface
interface Event {
  _id: string | ObjectId;
  name: string;
  description: string;
  points: number;
  date: string;
  password: string;
}

// Correct route handler signature for Next.js 15
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Try to find the event by ID
    let event;
    
    try {
      // First try with ObjectId
      event = await db.collection("events").findOne({ 
        _id: new ObjectId(eventId) 
      });
    } catch (e) {
      // If that fails, try with string ID
      event = await db.collection("events").findOne({ 
        _id: eventId as unknown as ObjectId
      });
    }

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event: event
    });
  } catch (error: any) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch event", details: error.message },
      { status: 500 }
    );
  }
}