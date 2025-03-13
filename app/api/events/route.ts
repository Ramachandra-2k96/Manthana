import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { connectToDatabase } from '@/lib/mongodb';

// GET all events
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get all events
    const events = await db.collection('events').find({}).toArray();

    return NextResponse.json({ 
      success: true, 
      events
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch events'
      },
      { status: 500 }
    );
  }
}

// POST create a new event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Validate required fields
    if (!body.name || !body.points) {
      return NextResponse.json(
        { error: "Name and points are required" },
        { status: 400 }
      );
    }

    const result = await db.collection("events").insertOne({
      name: body.name,
      description: body.description || "",
      points: body.points,
      date: body.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Event created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
} 