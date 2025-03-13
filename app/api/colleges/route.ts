import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET college leaderboard
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Get colleges sorted by points in descending order
    const colleges = await db.collection("colleges")
      .find({})
      .sort({ points: -1 })
      .toArray();

    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    console.error("Error fetching college leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch college leaderboard" },
      { status: 500 }
    );
  }
} 