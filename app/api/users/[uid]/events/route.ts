import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    // Use 'uid' from the route to set userId
    const { uid } = await params;
    const userId = uid;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Find all events this user has participated in
    const userEvents = await db.collection("registrations").find({
      userId: userId
    }).toArray();

    console.log(`Found ${userEvents.length} events for user ${userId}`);

    return NextResponse.json({
      success: true,
      events: userEvents
    });
  } catch (error: any) {
    console.error("Error fetching user events:", error);
    return NextResponse.json(
      { error: "Failed to fetch user events", details: error.message },
      { status: 500 }
    );
  }
}
