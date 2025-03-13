import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic'; // Disable caching at the route level

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get all users with points
    const users = await db.collection('users')
      .find({ points: { $exists: true, $gt: 0 } })
      .project({
        _id: 1,
        firstname: 1,
        lastname: 1,
        college: 1,
        points: 1,
        displayName: 1,
        photoURL: 1
      })
      .toArray();
    
    // Calculate college points
    const collegeMap = new Map();
    const userList: {
      id: string;
      name: string;
      firstname?: string;
      lastname?: string;
      college: string;
      points: number;
      photoURL?: string;
    }[] = [];
    
    users.forEach(user => {
      // Add user to individual list
      userList.push({
        id: user._id,
        name: user.displayName || `${user.firstname || ''} ${user.lastname || ''}`.trim(),
        firstname: user.firstname,
        lastname: user.lastname,
        college: user.college || 'Unknown',
        points: user.points || 0,
        photoURL: user.photoURL
      });
      
      // Add to college total
      if (user.college) {
        const college = user.college;
        const currentPoints = collegeMap.get(college) || 0;
        collegeMap.set(college, currentPoints + (user.points || 0));
      }
    });
    
    // Convert college map to array and sort
    const collegeLeaderboard = Array.from(collegeMap.entries()).map(([name, points]) => ({
      name,
      points
    })).sort((a, b) => b.points - a.points);
    
    // Sort users by points and get top 100
    const topUsers = userList
      .sort((a, b) => b.points - a.points)
      .slice(0, 100);
    
    // Add cache control headers
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({ 
      success: true, 
      collegeLeaderboard,
      topUsers,
      lastUpdated: new Date().toISOString()
    }, { 
      headers,
      status: 200 
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch leaderboard data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 