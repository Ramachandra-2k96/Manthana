import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// POST register a user for an event and award points
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Validate required fields
    if (!body.userId || !body.eventId) {
      return NextResponse.json(
        { error: "User ID and Event ID are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.collection("users").findOne({ 
      $or: [
        { _id: new ObjectId(body.userId) },
        { firebaseUid: body.userId }
      ]
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if event exists
    const event = await db.collection("events").findOne({ 
      $or: [
        { _id: new ObjectId(body.eventId) },
        { _id: body.eventId }
      ]
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check if user is already registered for this event
    const existingRegistration = await db.collection("registrations").findOne({
      userId: user._id.toString(),
      eventId: event._id.toString()
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "User already registered for this event" },
        { status: 400 }
      );
    }

    // Create registration
    const registration = {
      userId: user._id.toString(),
      eventId: event._id.toString(),
      eventName: event.name,
      points: event.points,
      registeredAt: new Date().toISOString(),
      college: user.college || "Unknown"
    };

    await db.collection("registrations").insertOne(registration);

    // Update user's points
    await db.collection("users").updateOne(
      { _id: user._id },
      { $inc: { points: event.points } }
    );

    // Update college points if college exists
    if (user.college) {
      await db.collection("colleges").updateOne(
        { name: user.college },
        { 
          $inc: { points: event.points },
          $setOnInsert: { createdAt: new Date().toISOString() }
        },
        { upsert: true }
      );
    }

    return NextResponse.json(
      { 
        message: "Registration successful", 
        points: event.points,
        totalUserPoints: (user.points || 0) + event.points
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
}

// GET all registrations or filter by userId or eventId
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");
    
    console.log("Fetching registrations with params:", { userId, eventId });
    
    const client = await clientPromise;
    const db = client.db("varnothsava");

    let query = {};
    
    if (userId) {
      // Make sure we're querying with the exact userId format from the database
      query = { ...query, userId };
    }
    
    if (eventId) {
      query = { ...query, eventId };
    }
    
    console.log("Query:", JSON.stringify(query));
    
    const registrations = await db.collection("registrations").find(query).toArray();
    console.log(`Found ${registrations.length} registrations`);
    
    return NextResponse.json(registrations, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations", details: error.message },
      { status: 500 }
    );
  }
} 