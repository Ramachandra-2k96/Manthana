// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("varnothsava"); // Replace with your DB name

    const result = await db.collection("users").insertOne({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      college: body.college,
      firebaseUid: body.firebaseUid,
      createdAt: body.createdAt,
    });

    return NextResponse.json(
      { message: "User created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get all users (limit to 20 for safety)
    const users = await db.collection('users').find({}).limit(20).toArray();
    
    // Remove sensitive information
    const safeUsers = users.map(user => ({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      college: user.college,
      points: user.points,
    }));

    return NextResponse.json({ 
      success: true, 
      users: safeUsers,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}