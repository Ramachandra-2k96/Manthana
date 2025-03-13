import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST request handler
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ uid: string }> } // params is now a Promise
) {
  try {
    const { uid } = await context.params; // Awaiting params
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("varnothsava");

    // Check if user exists to preserve existing fields
    const existingUser = await db.collection("users").findOne({ firebaseUid: uid });

    const updateData = {
      firstname: body.firstname || existingUser?.firstname || null,
      lastname: body.lastname || existingUser?.lastname || null,
      college: body.college || existingUser?.college || null,
      email: body.email,
      lastLogin: body.lastLogin,
      displayName: body.displayName || null,
      photoURL: body.photoURL || null,
      points: existingUser?.points || 0,
    };

    await db.collection("users").updateOne(
      { firebaseUid: uid },
      {
        $set: updateData,
        $setOnInsert: { createdAt: new Date().toISOString() },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// GET request handler
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ uid: string }> } // params is now a Promise
) {
  try {
    const { uid } = await context.params; // Awaiting params
    const client = await clientPromise;
    const db = client.db("varnothsava");

    const user = await db.collection("users").findOne({ firebaseUid: uid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
