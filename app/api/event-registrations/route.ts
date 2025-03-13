import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");
    
    console.log("Fetching event registrations with params:", { userId, eventId });
    
    const client = await clientPromise;
    const db = client.db("varnothsava");

    let query = {};
    
    if (userId) {
      query = { ...query, userId };
    }
    
    if (eventId) {
      query = { ...query, eventId };
    }
    
    console.log("Query:", JSON.stringify(query));
    
    const registrations = await db.collection("event_registrations").find(query).toArray();
    console.log(`Found ${registrations.length} event registrations`);
    
    return NextResponse.json(registrations, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching event registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch event registrations", details: error.message },
      { status: 500 }
    );
  }
} 