import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebaseadmin";

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    // First try to get token from auth-token cookie
    const authToken = req.cookies.get("auth-token")?.value;
    
    if (authToken) {
      try {
        // Verify the token
        const adminAuth = getFirebaseAdmin().auth();
        const decodedToken = await adminAuth.verifyIdToken(authToken);
        
        // Get additional user information
        const userRecord = await adminAuth.getUser(decodedToken.uid);
        
        // Return user information
        return NextResponse.json({
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            emailVerified: userRecord.emailVerified,
          }
        }, { status: 200 });
      } catch (error) {
        console.error("Error verifying auth-token:", error);
        // Continue to try other methods
      }
    }
    
    // If no auth-token or verification failed, try user_info cookie
    const userInfoCookie = req.cookies.get("user_info")?.value;
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoCookie));
        const uid = userInfo.uid;
        
        if (!uid) {
          return NextResponse.json({ error: "No UID in user_info cookie" }, { status: 401 });
        }
        
        // Get user information
        const adminAuth = getFirebaseAdmin().auth();
        const userRecord = await adminAuth.getUser(uid);
        
        // Return user information
        return NextResponse.json({
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            emailVerified: userRecord.emailVerified,
          }
        }, { status: 200 });
      } catch (error) {
        console.error("Error parsing or using user_info cookie:", error);
        return NextResponse.json({ error: "Invalid user_info cookie" }, { status: 401 });
      }
    }
    
    // If no valid cookies found
    return NextResponse.json({ error: "No authentication token provided" }, { status: 401 });
  } catch (error) {
    console.error("Verify session error:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

// Keep the POST method for compatibility
export async function POST(req: NextRequest) {
  return GET(req);
} 