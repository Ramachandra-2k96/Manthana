"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { getCookie } from "cookies-next";
import Podium from "../components/Podium";
import LeaderboardTable from "../components/LeaderboardTable";
import MobilePodium from "../components/MobilePodium";
import CollegePodium from "../components/CollegePodium";

type User = {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  college: string;
  points: number;
  photoURL?: string;
};

type College = {
  name: string;
  points: number;
};

type LeaderboardData = {
  collegeLeaderboard: College[];
  topUsers: User[];
  lastUpdated: string;
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"colleges" | "individuals">("colleges");
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { width, height } = useWindowSize();
  
  // Get current user from cookie
  useEffect(() => {
    const userInfoCookie = getCookie("user_info");
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoCookie as string));
        setCurrentUserId(userInfo.uid);
      } catch (e) {
        console.error("Error parsing user cookie:", e);
      }
    }
  }, []);
  
  // Fetch leaderboard data with React Query for caching
  const { data, isLoading, error, refetch, isFetching } = useQuery<LeaderboardData>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/leaderboard?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      
      const result = await response.json();
      
      // Ensure we have the expected data structure
      if (!result.collegeLeaderboard || !result.topUsers) {
        console.error('Invalid leaderboard data structure:', result);
        throw new Error('Invalid leaderboard data structure');
      }
      
      return result;
    },
    staleTime: 0, // Always consider data stale to force refresh
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // Format name properly
  const formatName = (user: User) => {
    if (user.firstname && user.lastname) {
      return `${user.firstname} ${user.lastname}`;
    } else if (user.firstname) {
      return user.firstname;
    } else if (user.name && !user.name.includes('@')) {
      return user.name;
    } else {
      // If name looks like an email or is missing, show a generic name
      return "Participant";
    }
  };

  // Prepare data for components
  const prepareCollegeData = () => {
    if (!data?.collegeLeaderboard) return [];
    return data.collegeLeaderboard.map(college => ({
      name: college.name,
      points: college.points,
    }));
  };

  const prepareUserData = () => {
    if (!data?.topUsers) return [];
    return data.topUsers.map(user => ({
      id: user.id,
      name: formatName(user),
      points: user.points,
      photoURL: user.photoURL,
      subtitle: user.college,
    }));
  };

  const handleRefresh = () => {
    // Force a complete refresh by invalidating the query cache
    refetch({ cancelRefetch: false });
  };

  const handlePodiumVisible = () => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0014] text-white p-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-700/20 blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-fuchsia-700/20 blur-[100px]"></div>
        </div>
        <div className="text-center z-10">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full mx-auto"
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 font-bold"
          >
            Loading leaderboard data...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0014] text-white p-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-red-700/20 blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-700/20 blur-[100px]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-black/40 p-6 rounded-xl border border-red-500/40 max-w-md backdrop-blur-md z-10 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
        >
          <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">Error</h2>
          <p className="text-gray-300">{error instanceof Error ? error.message : 'Failed to load leaderboard'}</p>
          <button 
            onClick={handleRefresh}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Ensure we have data before rendering
  const collegeData = prepareCollegeData();
  const userData = prepareUserData();

  return (
    <div className="min-h-screen bg-[#0a0014] text-white p-4 md:p-8 overflow-x-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-700/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-fuchsia-700/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/3 bg-gradient-to-r from-purple-900/10 to-fuchsia-900/10 blur-[50px] transform rotate-12"></div>
      </div>
      
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#c026d3', '#8b5cf6', '#f472b6', '#2563eb']} />}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 drop-shadow-[0_0_10px_rgba(192,38,211,0.3)]"
        >
          Varnothsava 2025 Leaderboard
        </motion.h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {data && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-fuchsia-400 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full border border-purple-500/20"
            >
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </motion.div>
          )}
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(192,38,211,0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg transition-all disabled:opacity-50 border border-purple-500/30 shadow-[0_0_10px_rgba(192,38,211,0.3)]"
          >
            {isFetching ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </>
            )}
          </motion.button>
        </div>
        
        {/* Tab Navigation - Optimized for mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-black/30 backdrop-blur-md p-1 rounded-full shadow-lg border border-purple-500/30 w-full max-w-md flex shadow-[0_0_15px_rgba(192,38,211,0.2)]">
            <button
              onClick={() => setActiveTab("colleges")}
              className={`flex-1 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all ${
                activeTab === "colleges"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-purple-900/20"
              }`}
            >
              College Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("individuals")}
              className={`flex-1 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all ${
                activeTab === "individuals"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-purple-900/20"
              }`}
            >
              Top 100 Individuals
            </button>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "colleges" && (
            <motion.div 
              key="colleges-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {collegeData.length >= 2 ? (
                <CollegePodium 
                  items={collegeData.slice(0, 2).map((college, index) => ({
                    ...college,
                    rank: index + 1
                  }))}
                  onVisible={handlePodiumVisible}
                />
              ) : (
                <div className="text-center p-6 mb-8 bg-black/30 rounded-xl border border-purple-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                  <p className="text-fuchsia-400">Not enough college data to display podium</p>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === "individuals" && (
            <motion.div 
              key="individuals-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {userData.length >= 3 ? (
                <>
                  {/* Desktop Podium */}
                  <div className="hidden sm:block w-full overflow-visible">
                    <Podium 
                      items={userData.slice(0, 3)} 
                      showSubtitle={true}
                      onVisible={handlePodiumVisible}
                    />
                  </div>
                  
                  {/* Mobile Podium */}
                  <MobilePodium
                    items={userData.slice(0, 3)}
                    showSubtitle={true}
                  />
                </>
              ) : (
                <div className="text-center p-6 mb-8 bg-black/30 rounded-xl border border-purple-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                  <p className="text-fuchsia-400">Not enough user data to display podium</p>
                </div>
              )}
              
              <LeaderboardTable 
                items={userData.length >= 3 ? userData.slice(3) : userData}
                currentUserId={currentUserId}
                showAvatar={true}
                showSubtitle={true}
                startRank={userData.length >= 3 ? 4 : 1}
                emptyMessage="No user data available yet"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 