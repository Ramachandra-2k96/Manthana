"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { QrScanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  college: string;
  firebaseUid: string;
}

interface RegisteredUser extends User {
  eventPoints: {
    firstPlace?: boolean;
    secondPlace?: boolean;
    thirdPlace?: boolean;
    fourthPlace?: boolean;
    completedInTime?: boolean;
    participationPoint: boolean;
  }
}

export default function EventAdminPage({ 
  params 
}: { 
  params: Promise<{ eventId: string }> 
}) {
  const router = useRouter();
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [scanTimestamp, setScanTimestamp] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'passed', 'notPassed'
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  
  const resolvedParams = use(params);
  const eventId = resolvedParams.eventId;

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem(`event_auth_${eventId}`);
    if (!isAuthenticated) {
      router.push('/1e54615a1b51516d699d55bfd9407ffd');
      toast.error('Please enter the event password first');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`/api/events/${eventId}`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event details');
        }
        
        const eventData = await eventResponse.json();
        if (eventData.success) {
          setEventDetails(eventData.event);
        }

        // Fetch registered users
        const usersResponse = await fetch(`/api/events/${eventId}/users`);
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch registered users');
        }
        
        const usersData = await usersResponse.json();
        if (usersData.success) {
          setRegisteredUsers(usersData.users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, [eventId, router]);

  // This function will prevent multiple scans of the same QR code
  const handleQrScan = async (result: string) => {
    const now = Date.now();
    
    // Prevent duplicate scans by checking:
    // 1. If we're already processing a scan
    // 2. If this is the same code as the last one scanned
    // 3. If the scan is happening too quickly after the previous one (within 3 seconds)
    if (
      loading || 
      (lastScannedCode === result && now - scanTimestamp < 3000)
    ) {
      return;
    }
    
    // Update scan tracking
    setLastScannedCode(result);
    setScanTimestamp(now);
    setLoading(true);
    
    try {
      console.log('QR Scan result:', result);
      console.log('Registering user for event:', eventId);
      
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: result,
          eventId: eventId
        }),
      });

      console.log('Registration response status:', response.status);
      
      // Get response text for debugging
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response format');
      }
      
      if (data.success) {
        if (data.duplicate) {
          toast.error('User already registered for this event');
        } else {
          // Add user to the list with default participation point
          const newUser: RegisteredUser = {
            ...data.user,
            eventPoints: {
              participationPoint: true
            }
          };
          
          // Check if the user is already in the list to avoid duplicates
          if (!registeredUsers.some(user => user._id === newUser._id)) {
            setRegisteredUsers(prev => [...prev, newUser]);
            toast.success(`${data.user.firstname} ${data.user.lastname} registered successfully`);
          }
        }
      } else {
        throw new Error(data.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process QR code");
    } finally {
      setLoading(false);
      setShowScanner(false);
    }
  };

  const handleCheckboxChange = (userId: string, award: keyof RegisteredUser['eventPoints']) => {
    setRegisteredUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === userId 
          ? { ...user, eventPoints: { ...user.eventPoints, [award]: !user.eventPoints[award] } } 
          : user
      )
    );
  };

  // New function to select all users for completion
  const handleSelectAllCompleted = (checked: boolean) => {
    setRegisteredUsers(prevUsers => 
      prevUsers.map(user => ({
        ...user,
        eventPoints: { ...user.eventPoints, completedInTime: checked }
      }))
    );
  };

  // New function to update points for all users
  const handleUpdatePoints = async () => {
    setIsUpdating(true);
    
    try {
      // Create an array of update operations
      const updateOperations = registeredUsers.flatMap(user => {
        const operations = [];
        
        // For each point type, create an update operation if needed
        const pointTypes: (keyof RegisteredUser['eventPoints'])[] = [
          'firstPlace', 'secondPlace', 'thirdPlace', 'fourthPlace', 'completedInTime', 'participationPoint'
        ];
        
        for (const pointType of pointTypes) {
          operations.push({
            userId: user._id,
            eventId,
            pointType,
            value: user.eventPoints[pointType] || false
          });
        }
        
        return operations;
      });
      
      // Execute all update operations in sequence
      for (const operation of updateOperations) {
        await fetch('/api/events/update-points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(operation),
        });
      }
      
      toast.success('Points updated successfully');
    } catch (error) {
      console.error('Error updating points:', error);
      toast.error('Failed to update points');
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter users based on the selected filter
  const filteredUsers = registeredUsers.filter(user => {
    // Apply search filter
    const searchMatch = 
      searchTerm === '' || 
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply round filter
    if (filter === 'all') return searchMatch;
    if (filter === 'passed') return user.eventPoints.completedInTime && searchMatch;
    if (filter === 'notPassed') return !user.eventPoints.completedInTime && searchMatch;
    
    return searchMatch;
  });

  // Point values for display
  const pointValues = {
    firstPlace: 10,
    secondPlace: 7,
    thirdPlace: 5,
    fourthPlace: 2,
    completedInTime: 1,
    participationPoint: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-purple-500/30">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {eventDetails?.name || 'Event'} Administration
              </h2>
              <button
                onClick={() => router.push('/1e54615a1b51516d699d55bfd9407ffd')}
                className="bg-white/20 px-3 py-1 rounded-full text-white text-sm hover:bg-white/30 transition-colors"
              >
                Back to Events
              </button>
            </div>
          </div>

          <div className="p-4 text-white">
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setShowScanner(true)}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Scan QR Code"}
              </button>
              
              <button
                onClick={handleUpdatePoints}
                className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Points"}
              </button>
              
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 ${editMode ? 'bg-yellow-700' : 'bg-blue-700'} text-white rounded-md hover:${editMode ? 'bg-yellow-600' : 'bg-blue-600'} transition-colors`}
              >
                {editMode ? "Done Editing" : "Edit Points"}
              </button>
              
              <div className="ml-auto flex gap-2 items-center">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="passed">Passed Round</option>
                  <option value="notPassed">Not Passed</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>

            {showScanner && (
              <div className="mb-4 p-4 border border-purple-500/30 rounded-lg bg-gray-800">
                <h4 className="font-medium mb-2">Scan User QR Code</h4>
                <QrScanner
                  onDecode={handleQrScan}
                  onError={(error) => console.error(error)}
                  constraints={{ facingMode: "environment" }}
                  scanDelay={500} // Add delay between scans
                />
                <button
                  onClick={() => setShowScanner(false)}
                  className="mt-2 px-3 py-1 border border-gray-600 rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            
            {registeredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No users registered for this event yet. Scan QR codes to register users.
              </div>
            ) : (
              <div className="border border-purple-500/30 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">College</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                        <div className="flex items-center justify-between">
                          <span>Awards</span>
                          {editMode && (
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                onChange={(e) => handleSelectAllCompleted(e.target.checked)}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">Select All Completed</span>
                            </label>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.firstname} {user.lastname}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.college}
                        </td>
                        <td className="px-4 py-4">
                          {editMode ? (
                            <div className="flex flex-wrap gap-2">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={user.eventPoints?.firstPlace || false}
                                  onChange={() => handleCheckboxChange(user._id, 'firstPlace')}
                                  className="rounded text-purple-600 bg-gray-700 border-gray-600"
                                />
                                <span className="text-sm text-gray-300">1st (+{pointValues.firstPlace})</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={user.eventPoints?.secondPlace || false}
                                  onChange={() => handleCheckboxChange(user._id, 'secondPlace')}
                                  className="rounded text-purple-600 bg-gray-700 border-gray-600"
                                />
                                <span className="text-sm text-gray-300">2nd (+{pointValues.secondPlace})</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={user.eventPoints?.thirdPlace || false}
                                  onChange={() => handleCheckboxChange(user._id, 'thirdPlace')}
                                  className="rounded text-purple-600 bg-gray-700 border-gray-600"
                                />
                                <span className="text-sm text-gray-300">3rd (+{pointValues.thirdPlace})</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={user.eventPoints?.fourthPlace || false}
                                  onChange={() => handleCheckboxChange(user._id, 'fourthPlace')}
                                  className="rounded text-purple-600 bg-gray-700 border-gray-600"
                                />
                                <span className="text-sm text-gray-300">4th (+{pointValues.fourthPlace})</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={user.eventPoints?.completedInTime || false}
                                  onChange={() => handleCheckboxChange(user._id, 'completedInTime')}
                                  className="rounded text-purple-600 bg-gray-700 border-gray-600"
                                />
                                <span className="text-sm text-gray-300">Completed (+{pointValues.completedInTime})</span>
                              </label>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {user.eventPoints?.firstPlace && <span className="px-2 py-1 bg-purple-900/50 rounded-full text-xs">1st Place</span>}
                              {user.eventPoints?.secondPlace && <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs">2nd Place</span>}
                              {user.eventPoints?.thirdPlace && <span className="px-2 py-1 bg-green-900/50 rounded-full text-xs">3rd Place</span>}
                              {user.eventPoints?.fourthPlace && <span className="px-2 py-1 bg-yellow-900/50 rounded-full text-xs">4th Place</span>}
                              {user.eventPoints?.completedInTime && <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">Completed</span>}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}