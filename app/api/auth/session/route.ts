import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { getFirebaseAdmin } from "@/lib/firebaseadmin"; // See note below

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const adminAuth = getFirebaseAdmin().auth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    return NextResponse.json({ uid }, { status: 200 });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}