import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Define event interface with string ID
interface Event {
  id: string; // Changed from _id to id
  title: string; // Changed from name to title
  description: string;
  tag: string; // Added tag field
  src: string; // Added src field
  ctaText: string; // Added ctaText field
  ctaLink: string; // Added ctaLink field
  content: string; // Added content field
  password: string;
}

export async function POST() {
  try {
    const { db } = await connectToDatabase();
    
    // Clear existing events
    await db.collection('events').deleteMany({});
    
    // Insert sample events with string IDs
    const eventsCollection = db.collection<Event>('events');
    const result = await eventsCollection.insertMany([
      {
        "id": "algorithm_roulette_2025",
        "password": "securepass123",
        "description": "A team-based machine learning challenge where participants spin a wheel to receive a random algorithm, preprocess datasets, and build models within a time limit.",
        "title": "Algorithm Roulette",
        "tag": "technical",
        "src": "",
        "ctaText": "Know More",
        "ctaLink": "#register",
        "content": `
                <div>
                    <p>
                        <strong>Date:</strong> March 20, 2025
                    </p>
                    <p>
                        <strong>Duration:</strong> 2 hours
                    </p>
                    <p>
                        <strong>Type:</strong> Team (2-3 members)
                    </p>
                    <br />
                    <p>
                        <strong>Rules:</strong>
                    </p>
                    <ul>
                        <li>Teams spin a wheel to receive a random machine learning algorithm.</li>
                        <li>Teams preprocess the provided dataset and apply the assigned algorithm.</li>
                        <li>Present solutions to judges in the final round.</li>
                        <li>Participants must submit their predictions within the given time limits.</li>
                        <li>Use of the internet is restricted except for documentation purposes.</li>
                    </ul>
                    <br />
                    <p>
                        <strong>Rounds:</strong>
                    </p>
                    <p>
                        <strong>Round 1:</strong>
                    </p>
                    <ul>
                        <li>Spin the wheel to receive a random ML algorithm.</li>
                        <li>Teams preprocess and apply the algorithm to a dataset within 30 minutes.</li>
                        <li>The top-performing teams based on accuracy and initial insights move to the next round.</li>
                    </ul>
                    <p>
                        <strong>Round 2:</strong>
                    </p>
                    <ul>
                        <li>Refine the models and prepare a short presentation.</li>
                        <li>Present to judges, answer rapid-fire questions, and demonstrate creativity.</li>
                    </ul>
                    <br />
                    <p>
                        <strong>Judgment Criteria:</strong>
                    </p>
                    <ul>
                        <li>Model accuracy and insights</li>
                        <li>Creativity in problem-solving</li>
                        <li>Clarity in presentation and explanation</li>
                    </ul>
                    <br />
                    <p>
                        <strong>More Details:</strong>
                    </p>
                    <p>
                        Panchami Pai: 9141135787<br />
                        Vishrutha: 6361441895
                    </p>
                    <br />
                    <p>
                        <strong>Faculty Coordinator:</strong>
                    </p>
                    <p>
                        Dr. Surajit<br />
                        Associate Professor<br />
                        Department of Computer Science & Engineering
                    </p>
                </div>`
        },
    
        {
          "id": "code_resurrect_2025",
          "password": "securepass123",
          "description": "An intense debugging competition where teams identify and fix bugs in code snippets and projects across multiple languages.",
          "title": "Code Resurrect",
          "tag": "technical",
          "src": "",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                  <div>
                      <p>
                          <strong>Date:</strong> March 20, 2025
                      </p>
                      <p>
                          <strong>Duration:</strong> 1h 30min (Round 1 - 30 min + Round 2 - 1h)
                      </p>
                      <p>
                          <strong>Type:</strong> Team (2 members)
                      </p>
                      <br />
                      <p>
                          <strong>Rules:</strong>
                      </p>
                      <ul>
                          <li>Teams debug and fix code snippets in multiple languages.</li>
                          <li>Points are awarded for every successfully fixed bug.</li>
                          <li>Internet access is restricted.</li>
                          <li>Submissions must be functional and optimized.</li>
                      </ul>
                      <br />
                      <p>
                          <strong>Rounds:</strong>
                      </p>
                      <p>
                          <strong>Round 1:</strong>
                      </p>
                      <ul>
                          <li>Debug Sprint</li>
                          <li>Fix as many buggy code snippets as possible within 30 minutes.</li>
                          <li>The top-performing teams advance to the next round.</li>
                      </ul>
                      <p>
                          <strong>Round 2:</strong>
                      </p>
                      <ul>
                          <li>The Ultimate Code Revival</li>
                          <li>Teams debug and optimize a larger project within 1 hour.</li>
                          <li>Submit and demo the functional project to the judges.</li>
                      </ul>
                      <br />
                      <p>
                          <strong>Judgment Criteria:</strong>
                      </p>
                      <ul>
                          <li>Problem-solving skills and efficiency</li>
                          <li>Quality and creativity in the final output</li>
                          <li>Optimization techniques applied</li>
                      </ul>
                      <br />
                      <p>
                          <strong>More Details:</strong>
                      </p>
                      <p>
                          Chethan V Ketian: 8123936830<br />
                          Ananya Bhat: 9483146270
                      </p>
                      <br />
                      <p>
                          <strong>Faculty Coordinator:</strong>
                      </p>
                      <p>
                          Ms. Preethi<br />
                          Assistant Professor (Sr.)<br />
                          Department of Computer Science & Engineering
                      </p>
                  </div>`
      },
      {
        "id": "hackhunt_2025",
        "password": "securepass123",
        "description": "An exciting coding competition where teams uncover hidden flags in code, files, and programs through logic puzzles and code analysis.",
        "title": "HackHunt",
        "tag": "technical",
        "src": "",
        "ctaText": "Know More",
        "ctaLink": "#register",
        "content": `
                <div>
                    <p>
                        <strong>Date:</strong> March 20, 2025
                    </p>
                    <p>
                        <strong>Duration:</strong> 3 hours (Round 1 - 90 min + Round 2 - 2h)
                    </p>
                    <p>
                        <strong>Type:</strong> Team (2-3 members)
                    </p>
                    <br />
                    <p>
                        <strong>Rules:</strong>
                    </p>
                    <ul>
                        <li>Search for hidden flags embedded in code, files, and programs.</li>
                        <li>Teams may request hints at a penalty cost.</li>
                        <li>Submit all found flags and explanations for discovery.</li>
                        <li>Internet access is not allowed unless specified for specific tasks.</li>
                    </ul>
                    <br />
                    <p>
                        <strong>Rounds:</strong>
                    </p>
                    <p>
                        <strong>Round 1:</strong>
                    </p>
                    <ul>
                        <li>The Code Puzzle Rush</li>
                        <li>Solve code snippets and logic puzzles containing hidden flags within 90 minutes.</li>
                        <li>The top-performing teams advance.</li>
                    </ul>
                    <p>
                        <strong>Round 2:</strong>
                    </p>
                    <ul>
                        <li>The Code Quest Challenge</li>
                        <li>Analyze a broken or obfuscated codebase to identify hidden flags within 2 hours.</li>
                    </ul>
                    <br />
                    <p>
                        <strong>Judgment Criteria:</strong>
                    </p>
                    <ul>
                        <li>Number of flags discovered.</li>
                        <li>Creativity and efficiency in solving challenges.</li>
                        <li>Explanations provided for each flag found.</li>
                    </ul>
                    <br />
                    <p>
                        <strong>More Details:</strong>
                    </p>
                    <p>
                        Ramachandra Udupa: 8867004280<br />
                        Anurag R Rao: 8792338988
                    </p>
                    <br />
                    <p>
                        <strong>Faculty Coordinator:</strong>
                    </p>
                    <p>
                        Mr. Balachandra Jogi<br />
                        Assistant Professor<br />
                        Department AI & ML
                    </p>
                </div>`
    },
    {
      "id": "fastest_line_follower_2025",
      "password": "autobotrace2025",
      "description": "Robotics event where teams race autonomous bots along a black line on a white track, with penalties for deviations.",
      "title": "Fastest Line Follower",
      "tag": "technical",
      "src": "",
      "ctaText": "Know More",
      "ctaLink": "#register",
      "content": `
              <div>
                  <p>
                      <strong>Date:</strong> March 20, 2025
                  </p>
                  <p>
                      <strong>Duration:</strong> 7 hours (9 minutes per match) 
                      (2 minutes setup, 2 minutes technical timeout, 2 minutes buffer, 3 minutes race)
                  </p>
                  <p>
                      <strong>Type:</strong> Team (2-4 members)
                  </p>
                  <br />
                  <p>
                      <strong>Rules:</strong>
                  </p>
                  <ul>
                      <li>Robots must be fully autonomous with no manual intervention during the race.</li>
                      <li>The robot must follow a black line on a white track.</li>
                      <li>Deviating from the track incurs a 5-second penalty per incident.</li>
                      <li>A bot must complete the track within the 3-minute time limit to avoid disqualification.</li>
                      <li>Manual interference results in disqualification unless authorized by the referee.</li>
                  </ul>
                  <br />
                  <p>
                      <strong>Rounds:</strong>
                  </p>
                  <p>
                      <strong>Round 1:</strong>
                  </p>
                  <ul>
                      <li>Knockout Round – Bots race on a simple track, fastest bots qualify for the final round.</li>
                  </ul>
                  <p>
                      <strong>Round 2:</strong>
                  </p>
                  <ul>
                      <li>Final Judgment Round – Qualified bots race on a more complex track, the bot with the shortest time wins.</li>
                  </ul>
                  <br />
                  <p>
                      <strong>Judgment Criteria:</strong>
                  </p>
                  <ul>
                      <li>Time taken to complete the track.</li>
                      <li>Accuracy in following the track.</li>
                      <li>Smoothness of the robot's trajectory.</li>
                      <li>Penalties for deviating or exceeding time.</li>
                  </ul>
                  <br />
                  <p>
                      <strong>More Details:</strong>
                  </p>
                  <p>
                      Pavan R Gond: 9448278725<br />
                      Vishwas Bhat: 7795126252
                  </p>
                  <br />
                  <p>
                      <strong>Faculty Coordinator:</strong>
                  </p>
                  <p>
                      Ms. Megharani<br />
                      Assistant Professor<br />
                      Department of Artificial Intelligence and Machine Learning
                  </p>
              </div>`
  },
  {
    "id": "electro_detectives_2025",
    "password": "circuitfix2025",
    "description": "Electronics circuit-based hands-on event where teams answer given questions and prepare the circuit by solving errors in an existing circuit diagram.",
    "title": "Electro Detectives (Circuit Debugging)",
    "tag": "technical",
    "src": "",
    "ctaText": "Know More",
    "ctaLink": "#register",
    "content": `
            <div>
                <p>
                    <strong>Date:</strong> March 20, 2025
                </p>
                <p>
                    <strong>Duration:</strong> 2 hours (30 minutes for rounds 1 & 3, 
                    15 minutes for round 2, and 15 minutes for evaluation for each round)
                </p>
                <p>
                    <strong>Type:</strong> Team (2 members)
                </p>
                <br />
                <p>
                    <strong>Rules:</strong>
                </p>
                <ul>
                    <li>No usage of mobiles, laptops, or any textbooks while the event is going on.</li>
                    <li>Asking for any type of help from another is prohibited.</li>
                </ul>
                <br />
                <p>
                    <strong>Rounds:</strong>
                </p>
                <p>
                    <strong>Round 1:</strong>
                </p>
                <ul>
                    <li>A simple pen-and-paper test with 25 questions on electronics that must be answered in 30 minutes.</li>
                </ul>
                <p>
                    <strong>Round 2:</strong>
                </p>
                <ul>
                    <li>Drawings of circuits with faults will be sent to the teams that advanced from Round 1. Their job is to find the errors and then precisely redo the circuit.</li>
                </ul>
                <p>
                    <strong>Round 3:</strong>
                </p>
                <ul>
                    <li>Participants in this round must design and construct a circuit hands-on and demonstrate the intended output. The top qualifiers from Round 2 will be permitted to compete.</li>
                </ul>
                <br />
                <p>
                    <strong>Judgment Criteria:</strong>
                </p>
                <ul>
                    <li>The scores gained by the teams.</li>
                    <li>The value and position of the components in the drawing.</li>
                    <li>The perfection of the output.</li>
                </ul>
                <br />
                <p>
                    <strong>More Details:</strong>
                </p>
                <p>
                    Athulya A Bhat: 9113949231<br />
                    Adithya R Das: 8073487458
                </p>
                <br />
                <p>
                    <strong>Faculty Coordinator:</strong>
                </p>
                <p>
                    Mr. Sandeep Prabhu<br />
                    Assistant Professor<br />
                    Department of ECE
                </p>
            </div>`
},{
  "id": "squid_hunt_2025",
  "password": "hunt4tech2025",
  "description": "Thrilling team-based event where participants solve proverbs to locate checkpoints, complete physical games, and tackle programming challenges.",
  "title": "Squid Hunt",
  "tag": "technical",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Duration:</strong> 1h 30min (60 minutes per round)
              </p>
              <p>
                  <strong>Type:</strong> Team (4 members)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Solve a proverb to identify the location of the first checkpoint.</li>
                  <li>Complete a physical game at the checkpoint within 5 minutes.</li>
                  <li>If successful, solve a surprise engineering-related problem within the remaining time of the 5 minutes.</li>
                  <li>Repeat this process for multiple checkpoints.</li>
                  <li>Teams failing the physical game proceed without earning bonus points.</li>
              </ul>
              <br />
              <p>
                  <strong>Rounds:</strong>
              </p>
              <p>
                  <strong>Round 1:</strong>
              </p>
              <ul>
                  <li>Checkpoint challenges with basic tasks. Teams that successfully complete all tasks in this round will qualify for Round 2.</li>
              </ul>
              <p>
                  <strong>Round 2:</strong>
              </p>
              <ul>
                  <li>A Roadies-style event to determine the ultimate winner.</li>
              </ul>
              <br />
              <p>
                  <strong>Judgment Criteria:</strong>
              </p>
              <ul>
                  <li>Accuracy and speed in solving proverbs.</li>
                  <li>Success in physical games and programming challenges.</li>
                  <li>Team coordination and time management.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Bhushan Pejayy: 7381709385<br />
                  Shreehiran: 7019267494
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Rajesh Nayak<br />
                  Assistant Professor<br />
                  Department AI & DS
              </p>
          </div>`
},{
  "id": "lan_party_2025",
  "password": "minimatch2025",
  "description": "Intense deathmatch competition where 3-member teams battle it out in knockout rounds.",
  "title": "LAN PARTY (Mini Militia)",
  "tag": "gaming",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Duration:</strong> 1 hour
              </p>
              <p>
                  <strong>Type:</strong> Team (3 members)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Teams must consist of 3 members, with no substitutions allowed.</li>
                  <li>Participants must bring their own mobile devices; the game version will be provided by the organizers.</li>
                  <li>Matches are deathmatch style and follow a knockout format.</li>
                  <li>No use of hacked versions or cheat codes, violators will be disqualified.</li>
                  <li>Communication will be managed by the team captain, who handles interaction with judges.</li>
              </ul>
              <br />
              <p>
                  <strong>Rounds:</strong>
              </p>
              <ul>
                  <li>League Matches: 8 minutes</li>
                  <li>Semifinals: 10 minutes</li>
                  <li>Finals: 15 minutes</li>
              </ul>
              <br />
              <p>
                  <strong>Judgment Criteria:</strong>
              </p>
              <ul>
                  <li>Team performance in deathmatch rounds.</li>
                  <li>Fair play and adherence to game rules.</li>
                  <li>Compliance with the provided game version and equipment requirements.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Bhushan Pejayy: 7381709385<br />
                  Tejas Nayak: 8296151623
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Jayashree<br />
                  Assistant Professor<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "robo_soccer_2025",
  "password": "goalbot2025",
  "description": "Knockout tournament where teams control robots to score goals within a timed match.",
  "title": "ROBO SOCCER",
  "tag": "technical",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Duration:</strong> 7 hours (5 minutes per match)
              </p>
              <p>
                  <strong>Type:</strong> Team (2-4 members)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Knockout format with teams advancing based on wins.</li>
                  <li>Matches are divided into two 2-minute rounds, with a 1-minute technical timeout.</li>
                  <li>Teams may request one additional 1-minute timeout without penalty, extended timeouts incur a 1-point deduction per extra minute (up to 3 minutes).</li>
                  <li>A goal is worth 1 point, and the ball remains in play after scoring.</li>
                  <li>Robots must be within 30cm × 30cm × 30cm dimensions and not exceed 5.5kg.</li>
                  <li>Robots can push or hit the ball but cannot grab or trap it.</li>
                  <li>No deliberate interference or damage to opponents' bots, violations lead to disqualification.</li>
              </ul>
              <br />
              <p>
                  <strong>Rounds:</strong>
              </p>
              <ul>
                  <li>Round 1: Knockout match (5-minute duration, divided into two 2-minute rounds).</li>
                  <li>Round 2: Continued knockout rounds with similar match duration until the final.</li>
              </ul>
              <br />
              <p>
                  <strong>Judgment Criteria:</strong>
              </p>
              <ul>
                  <li>Number of goals scored during the match.</li>
                  <li>Successful robot interaction with the ball.</li>
                  <li>Adherence to fair play and technical rules.</li>
                  <li>Deductions for penalty violations (e.g., extended timeouts, deliberate damage).</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Pavan R Gend: 9445827825<br />
                  Vishwas Bhat: 7795126252
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Uthapavarathi<br />
                  Assistant Professor<br />
                  Department of Physics
              </p>
          </div>`
},{
  "id": "wright_brothers_2025",
  "password": "flyhigh2025",
  "description": "Design and build hand-launched planes, judged on creativity, craftsmanship, and flight performance.",
  "title": "WRIGHT BROTHERS (Plane Competition)",
  "tag": "technical",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Duration:</strong> 7 hours (1 hour for plane building + 2 rounds of judging)
              </p>
              <p>
                  <strong>Type:</strong> Team (2-3 members)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Planes must be hand-launched with no motors or directional controls.</li>
                  <li>Maximum plane weight: 500g; no design or dimensional restrictions.</li>
                  <li>Planes must be built at the venue using materials brought by the team.</li>
                  <li>Pre-made or kit planes are not allowed; teams may reference blueprints during the build phase.</li>
                  <li>Disqualification from Round 2 occurs if the plane breaks during flight.</li>
                  <li>The referee's decisions are final and binding.</li>
              </ul>
              <br />
              <p>
                  <strong>Rounds:</strong>
              </p>
              <ul>
                  <li>Round 1: Static Inspection judged on aesthetics, design innovation, and build quality.</li>
                  <li>Round 2: Flight Test - planes are evaluated on flight distance and time of flight.</li>
              </ul>
              <br />
              <p>
                  <strong>Judgment Criteria:</strong>
              </p>
              <ul>
                  <li><strong>Static Inspection:</strong></li>
                  <ul>
                      <li>Aesthetics: Creativity and visual appeal.</li>
                      <li>Design Innovation: Novelty and uniqueness.</li>
                      <li>Build Quality: Stability and craftsmanship.</li>
                  </ul>
                  <li><strong>Flight Test:</strong></li>
                  <ul>
                      <li>Distance of Flight: Measured in meters.</li>
                      <li>Time of Flight: Duration the plane stays airborne.</li>
                  </ul>
                  <li><strong>Final Score:</strong> Total points from both rounds, with weightages disclosed on the event day.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Pavan R Gend: 9445827825<br />
                  Vishwas Bhat: 7795126252
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Jayaram Nayak<br />
                  Assistant Professor<br />
                  Department of Civil Engineering
              </p>
          </div>`
},
{
  "id": "route_rush_2025",
  "password": "mazerunner2025",
  "description": "Robotics event where teams race autonomous bots along a path between the walls, with penalties for deviations.",
  "title": "ROUTE RUSH (Maze Follower)",
  "tag": "technical",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Duration:</strong> 6 hours 10 minutes per match 
                  (2 minutes setup, 2 minutes technical timeout, 2 minutes buffer, 4 minutes race)
              </p>
              <p>
                  <strong>Type:</strong> Team (2-3 members)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Robots must be fully autonomous with no manual intervention during the race.</li>
                  <li>The robot should have dimensions of 15 x 15 x 15 cm and a maximum power of 12V.</li>
                  <li>The walls of the maze are 1-2 cm thick and 15 cm high.</li>
                  <li>Deviating from the path incurs a 5-second penalty per incident.</li>
                  <li>A bot must complete the path within the 3 to 4-minute time limit to avoid disqualification.</li>
                  <li>Manual interference results in disqualification unless authorized by the referee.</li>
              </ul>
              <br />
              <p>
                  <strong>Rounds:</strong>
              </p>
              <ul>
                  <li>Round 1: Knockout Round—Bots race on a simple path; the fastest bots qualify for the final round.</li>
                  <li>Round 2: Final Judgment Round—Qualified bots race on a more complex path; the bot with the shortest time wins.</li>
              </ul>
              <br />
              <p>
                  <strong>Judgment Criteria:</strong>
              </p>
              <ul>
                  <li>Time taken to complete the path.</li>
                  <li>Accuracy in following the path.</li>
                  <li>Smoothness of the robot's trajectory.</li>
                  <li>Penalties for deviating or exceeding time.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Athula A Bhat: 9113949231<br />
                  Adithya R Das: 8073487458
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Pavithra Poornima<br />
                  Assistant Professor<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "shruthi_samrat_2025",
  "password": "classicalvoice2025",
  "description": "A solo classical singing competition allowing classical film songs and instrumental accompaniments.",
  "title": "SHRUTHI SAMRAT (Solo Singing Classical)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 4+1 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Accompanying instruments are allowed (Maximum 2 accompanists).</li>
                  <li>Karaoke must be submitted to the organizers a day prior to the competition.</li>
                  <li>Classical film songs are allowed.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Ria Shetty: 7019538635<br />
                  Pratham E Kamath: 8971318455
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Udhapavarathi<br />
                  Assistant Professor<br />
                  Department of Physics
              </p>
          </div>`
},{
  "id": "raag_rumble_2025",
  "password": "filmyharmonies2025",
  "description": "A group singing competition featuring filmy songs, allowing instrumental accompaniments.",
  "title": "RAAG RUMBLE (Group Singing Filmy)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group (Maximum 8 members)
              </p>
              <p>
                  <strong>Duration:</strong> 5+1 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Accompanying instruments are allowed (Maximum 2 accompanists).</li>
                  <li>Karaoke must be submitted to the organizers a day prior to the competition.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Anjali: 7259119454<br />
                  Ananya Salian: 63617452831
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Ashwini<br />
                  Assistant Professor<br />
                  Department of Artificial Intelligence and Machine Learning
              </p>
          </div>`
},{
  "id": "speech_of_smiles_2025",
  "password": "standuplaughs2025",
  "description": "A solo stand-up comedy competition judged on originality, fluency, spontaneity, and humor.",
  "title": "SPEECH OF SMILES (Stand-Up Comedy)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 4+2 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Judging will be based on content, fluency, spontaneity, presentation, and humor, with the highest weightage on originality and delivery.</li>
                  <li>Exceeding the time limit will result in negative marking.</li>
                  <li>Performances must not include any comments that could offend a community based on religion, race, sex, culture, or heritage.</li>
                  <li>Props are allowed if they are relevant, safe, non-disruptive, and pre-approved by the organizers.</li>
                  <li>Participants must report 15 minutes before the event, and the judges' decision will be final and binding.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Adithi G. Rao: 9483077609
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Pavithra Poornima<br />
                  Assistant Professor<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "melody_chain_2025",
  "password": "antaksharibeats2025",
  "description": "A fun and competitive Antakshari event featuring Sandalwood and Bollywood songs.",
  "title": "MELODY CHAIN (Antakshari)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group of 2 members
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Both Sandalwood and Bollywood film songs are included.</li>
                  <li>The preliminary round will be conducted in the morning.</li>
                  <li>Selected teams will only contest for the final round.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Abhishek Kini: 9844011520<br />
                  Sathvik Bhat: 7349215644
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Ananth Mohan Mallya<br />
                  Assistant Professor (Sr.)<br />
                  Department of Mechanical Engineering
              </p>
          </div>`
},{
  "id": "reel_o_mania_2025",
  "password": "reelmakers2025",
  "description": "A creative reel-making competition as part of the Varnothsava Event.",
  "title": "REEL-O-MANIA (Reel Making)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20 - 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group of 2 members
              </p>
              <p>
                  <strong>Duration:</strong> One and a half days
              </p>
              <p>
                  <strong>Theme:</strong> Varnothsava Event
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Length of video clips should be 90 seconds.</li>
                  <li>Video Aspect Ratio: 16:9 (Horizontal only).</li>
                  <li>Watermark should not be applied to videos.</li>
                  <li>Video must be submitted on the 2nd day before 12:00 Noon to the student coordinator.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Trishul: 8316368976
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Sudhir<br />
                  Assistant Professor (Sr.)<br />
                  Department of Mechanical Engineering
              </p>
          </div>`
},{
  "id": "focus_to_prize_2025",
  "password": "photography2025",
  "description": "A photography contest under the Varnothsava Event that tests creativity and technical skills.",
  "title": "FOCUS TO PRIZE (Photography)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 20, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> One and a half days
              </p>
              <p>
                  <strong>Theme:</strong> Varnothsava Event
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>The participant shall bring their own camera.</li>
                  <li>The memory card shall be formatted by the coordinators before the contest.</li>
                  <li>No photos using mobile phones are allowed.</li>
                  <li>No editing of photos is allowed.</li>
                  <li>Watermark should not be applied to photos.</li>
                  <li>Best 2 JPG photos must be submitted on the 2nd day before 12:00 Noon to the student coordinator.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Nihar: 9483166210<br />
                  Dhruva: 8431060332
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Chethan R<br />
                  Assistant Professor (Sr.)<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "thandav_taal_2025",
  "password": "classicaldance2025",
  "description": "A solo classical dance competition showcasing the elegance of Indian dance forms.",
  "title": "THANDAV TAAL (Solo Classical Dance)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 4+2 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Recorded music is allowed.</li>
                  <li>Any Indian pure classical dance form may be performed.</li>
                  <li>Film songs based on classical music may be used.</li>
                  <li>Props may be used.</li>
                  <li>Water, colour, gas, and fire should not be used.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Sunidhi Bhat: 6366799484<br />
                  Vaishnavi Acharya: 6366393526
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Jayashree M<br />
                  Assistant Professor<br />
                  Department of Electronics and Communication Engineering
              </p>
          </div>`
},{
  "id": "groove_gala_2025",
  "password": "groupdance2025",
  "description": "A vibrant group dance competition embracing diverse dance forms and music.",
  "title": "GROOVE GALA (Group Dance)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group (Minimum 5, Maximum 10 members)
              </p>
              <p>
                  <strong>Duration:</strong> 6+2 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Recorded music is allowed.</li>
                  <li>Any language songs can be used.</li>
                  <li>Any dance forms can be performed (non-classical dance forms).</li>
                  <li>Props may be used.</li>
                  <li>Obscene dressing, presentation, and vulgarity are not allowed.</li>
                  <li>Water, colour, gas, and fire should not be used.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Namana: 8296262606<br />
                  Rahul: 9744876728
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Preethi<br />
                  Assistant Professor (Sr.)<br />
                  CSE Department
              </p>
          </div>`
},{
  "id": "silent_symphony_2025",
  "password": "mime2025",
  "description": "A group mime performance emphasizing silent storytelling with expressive gestures.",
  "title": "SILENT SYMPHONY (Mime)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group (Minimum 4, Maximum 10 members)
              </p>
              <p>
                  <strong>Duration:</strong> 4+2 min
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Recorded music is allowed.</li>
                  <li>Participants should not convey wrong information to the audience.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Mayur Kamath: 9448186715<br />
                  K Varsha Kamath: 9740391751
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Jayavan Nayak B<br />
                  Assistant Professor (Sr.)<br />
                  Department of Civil Engineering
              </p>
          </div>`
},{
  "id": "who_am_i_2025",
  "password": "facepainting2025",
  "description": "A solo face painting contest showcasing creativity and artistic skills.",
  "title": "WHO AM I (Face Painting)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 1 hour 15 minutes
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>No assistants to the competitor are allowed during the competition (only 2 people: one competitor and one person for painting).</li>
                  <li>Participants can use only FDA-approved, skin-safe face paints and brushes.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Ullas Acharya: 7204954136
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Reshma<br />
                  Assistant Professor<br />
                  Department of Computer Science and Engineering
              </p>
          </div>`
},{
  "id": "aakrithi_2025",
  "password": "rangoli2025",
  "description": "A creative Rangoli competition where participants showcase their artistic skills using vibrant colors.",
  "title": "AAKRITHI (Rangoli)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group of 2 members
              </p>
              <p>
                  <strong>Duration:</strong> 2 hours
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Maximum size: 4ft by 4ft.</li>
                  <li>Rangoli should be made using rangoli colors only.</li>
                  <li>Participants are not allowed to refer to any printed material, phones, etc., during the contest.</li>
                  <li>No use of stencils or sketches.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Ganavi: 8505285588<br />
                  Kavya: 9945651743
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Kavya<br />
                  Assistant Professor<br />
                  Department of Mathematics
              </p>
          </div>`
},{
  "id": "natures_palette_2025",
  "password": "flowers2025",
  "description": "An artistic competition where participants showcase their creativity through flower arrangements and vegetable carving.",
  "title": "NATURE'S PALETTE (Flower Arrangement & Vegetable Carving)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group of 3 members
              </p>
              <p>
                  <strong>Duration:</strong> 2 hours
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Use of only fresh and natural flowers is allowed.</li>
                  <li>Use of pin holders and floral foam is allowed.</li>
                  <li>No scraping or carving of vegetables is allowed before the start of the event. Carving will be done only during the assigned time.</li>
                  <li>All categories of vegetables and fruits can be used.</li>
                  <li>Connections with toothpicks, skewers, etc., should not be visible. Participants should bring their own carving tools and cutting board.</li>
                  <li>Use of artificial colors is not allowed.</li>
                  <li>Minimum of 2 sculptures must be prepared for vegetable carving.</li>
                  <li>Participants are not allowed to refer to any printed material or use phones during the contest.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Veerendra Nayani: 8296148038<br />
                  Pranau: 7899158783
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Megharani<br />
                  Assistant Professor<br />
                  Department of Artificial Intelligence and Machine Learning
              </p>
          </div>`
},{
  "id": "hasthakala_mehendi_2025",
  "password": "mehendi2025",
  "description": "A traditional Mehendi competition where participants showcase their intricate henna designs based on the theme of Bridal Mehendi (Indian).",
  "title": "HASTHAKALA (Mehendi)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Theme:</strong> Bridal Mehendi (Indian)
              </p>
              <p>
                  <strong>Duration:</strong> 1 hour 30 minutes
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Participants have to apply mehendi on the palmar and dorsal side of the hand (only one hand is sufficient).</li>
                  <li>Normal mehendi cone should be brought by participants.</li>
                  <li>Use of glitters, stencils, and other colors is not allowed.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Deepa D Prabhu: 6361774398<br />
                  Chirashee: 6364100730
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Sahana<br />
                  Assistant Professor (Sr.)<br />
                  Department of Computer Science and Engineering
              </p>
          </div>`
},{
  "id": "kala_sangama_2025",
  "password": "varietyact2025",
  "description": "A group performance event that includes multiple forms of artistic expression like singing, dancing, skits, and more. The act should be creative and engaging while adhering to the event guidelines.",
  "title": "KALA SANGAMA (Variety Act)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Group (Minimum 6, Maximum 15 members)
              </p>
              <p>
                  <strong>Duration:</strong> 15 minutes + 2 minutes (preparation)
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>The show should include a variety of performances like singing, dancing, skits, drawing on the spot, etc.</li>
                  <li>MC carries additional points.</li>
                  <li>Obscene dressing, presentation, and vulgarity are not allowed.</li>
                  <li>Props and recorded music are allowed.</li>
                  <li>Water, color, gas, and fire should not be used.</li>
                  <li>Participants should not convey wrong information to the audience.</li>
                  <li>The act should not be against any individual/community.</li>
                  <li>Stage setting should be done within a 2-minute preparation time.</li>
              </ul>
              <br />
              <p>
                  <strong>Suggested Theme Ideas:</strong>
              </p>
              <ul>
                  <li>Save Girl Child, Unity in Diversity, School to College Journey, Women Empowerment</li>
                  <li>Peer Pressure to Students in College Life, Child Labour, Save Environment</li>
                  <li>Mobile Addiction, Say No to Drugs and Tobacco</li>
                  <li>Students can pick from these themes or choose their own.</li>
                  <li>Should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Ramya Sooraj: 8105220835<br />
                  Samarth Shettigar: 9108777638
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Ms. Savitha Shenoy<br />
                  Assistant Professor (Sr.)<br />
                  Department of Computer Science and Engineering
              </p>
          </div>`
},{
  "id": "shades_n_strokes_2025",
  "password": "pencilsketch2025",
  "description": "A solo pencil sketching competition where the theme will be revealed on the spot. Participants must create their artwork within the given time using gradation pencils.",
  "title": "SHADES N STROKES (Pencil Sketch)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 1 hour 15 minutes
              </p>
              <p>
                  <strong>Theme:</strong> The contest theme will be revealed on the spot, 15 minutes prior to the event.
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Only A3 drawing sheets will be provided.</li>
                  <li>The sketch should be done using gradation pencils (HB, 2B, 3B, etc.).</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Chiranth: 86183 94760
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Ganesh U G<br />
                  Assistant Professor<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "expression_speaks_2025",
  "password": "pickandact2025",
  "description": "A solo acting competition where contestants must act out a given situation without using words. The challenge is to express effectively through gestures and expressions.",
  "title": "EXPRESSION SPEAKS (Pick and Act)",
  "tag": "cultural",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Date:</strong> March 21, 2025
              </p>
              <p>
                  <strong>Type:</strong> Solo
              </p>
              <p>
                  <strong>Duration:</strong> 1+2 Minutes
              </p>
              <br />
              <p>
                  <strong>Rules:</strong>
              </p>
              <ul>
                  <li>Contestants should act out what is on their slip without speaking.</li>
                  <li>Participants should report 15 minutes prior to the event.</li>
              </ul>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Shri Varsha: 9148972562<br />
                  Sudeep Shetty: 9740992953
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Ganesh Shetty<br />
                  Assistant Professor (Sr.)<br />
                  Department of ECE
              </p>
          </div>`
},{
  "id": "strategic_stoxx_2025",
  "password": "financegame2025",
  "description": "The ultimate finance and stock market challenge where participants step into the shoes of real-world investors, traders, and strategists to navigate market fluctuations in real-time.",
  "title": "STRATEGIC STOXX",
  "tag": "business",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Team Size:</strong> 2
              </p>
              <br />
              <p>
                  Are you ready to test your financial acumen and strategic thinking? <strong>Strategic Stoxx</strong> is the ultimate finance and stock market challenge, where participants step into the shoes of real-world investors, traders, and financial strategists. 
              </p>
              <p>
                  This competition is designed to push your analytical skills, market intuition, and decision-making abilities to the next level. Navigate market fluctuations, outsmart competitors, and make high-stakes investment decisions in real-time. 
              </p>
              <p>
                  Only the sharpest minds will rise to the top—do you have what it takes to be a <strong>Strategic Stoxx Champion?</strong>
              </p>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Mr. Ronan Thomas Saldanha: 9586048520
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Varun K.<br />
                  9900977963
              </p>
          </div>`
},{
  "id": "visionary_ventures_2025",
  "password": "bplan2025",
  "description": "A business plan competition where participants turn their innovative ideas into reality, presenting practical and impactful solutions to real-world problems.",
  "title": "VISIONARY VENTURES",
  "tag": "business",
  "src": "",
  "ctaText": "Know More",
  "ctaLink": "#register",
  "content": `
          <div>
              <p>
                  <strong>Team Size:</strong> 3
              </p>
              <br />
              <p>
                  Do you have a business idea that’s keeping you up at night? <strong>Unleash it!</strong> 
              </p>
              <p>
                  Stop dreaming, start building! This isn’t just a competition; it’s your launchpad. Bring your burning business ideas to life at our Business Plan Competition. 
              </p>
              <p>
                  We’re not just looking for concepts, we’re looking for solutions. The world needs your innovation – show us what you’ve got. Turn your vision into reality and grab the chance to win along the way.
              </p>
              <br />
              <p>
                  <strong>More Details:</strong>
              </p>
              <p>
                  Mr. Ronan Thomas Saldanha: 9586048520
              </p>
              <br />
              <p>
                  <strong>Faculty Coordinator:</strong>
              </p>
              <p>
                  Mr. Varun K.<br />
                  9900977963
              </p>
          </div>`
}] as Event[]);

    return NextResponse.json({ 
      success: true, 
      message: 'Events initialized successfully',
      insertedCount: result.insertedCount
    });
  } catch (error) {
    console.error('Error initializing events:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initialize events',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 