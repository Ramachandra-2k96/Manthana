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
          "id": "raaga_ninada_2025",
          "password": "solomelodies2025",
          "description": "A solo singing competition featuring Indian film, classical, and folk songs.",
          "title": "RAAGA NINADA (Solo Singing)",
          "tag": "cultural",
          "src": "/images/manthana/3.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 17, 2025</p>
                    <p><strong>Type:</strong> Solo</p>
                    <p><strong>Duration:</strong> 4+1 min</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>No accompanying instruments allowed.</li>
                        <li>Background music (karaoke) is allowed and must be submitted three days prior.</li>
                        <li>Participants must report 15 minutes before the event.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Arjun: 7676448961</p>
                </div>`
        },
        {
          "id": "hasthakala_2025",
          "password": "bridalmehendi2025",
          "description": "A solo mehendi competition based on the bridal theme.",
          "title": "HASTHAKALA (Mehendi)",
          "tag": "cultural",
          "src": "/images/manthana/5.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 17, 2025</p>
                    <p><strong>Type:</strong> Solo</p>
                    <p><strong>Duration:</strong> 1 hour 15 minutes</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Only normal mehendi cones allowed; no glitters or colors.</li>
                        <li>Participants must apply mehendi on one hand (palmer and dorsal sides).</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Ananya Bhat: 9483146270</p>
                </div>`
        },
        {
          "id": "swarnashringara_2025",
          "password": "creativehairstyle2025",
          "description": "A solo hairstyling competition with a focus on creativity and originality.",
          "title": "SWARNASHRINGARA (Hairstyle)",
          "tag": "cultural",
          "src": "/images/manthana/7.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 17, 2025</p>
                    <p><strong>Type:</strong> Solo</p>
                    <p><strong>Duration:</strong> 30+10 minutes</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>No artificial hair extensions or printed references allowed.</li>
                        <li>Only two people per entry (one stylist and one model).</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Manya: 8660350280</p>
                </div>`
        },
        {
          "id": "swaranjali_2025",
          "password": "filmyharmonies2025",
          "description": "A group singing competition featuring filmy songs, allowing instrumental accompaniments.",
          "title": "SWARANJALI (Group Singing Filmy)",
          "tag": "cultural",
          "src": "/images/manthana/9.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 17, 2025</p>
                    <p><strong>Type:</strong> Group (Maximum 6 members)</p>
                    <p><strong>Duration:</strong> 5+1 min</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Accompanying instruments allowed (max 2 accompanists).</li>
                        <li>Karaoke must be submitted a day prior.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Sujal: 8867667092</p>
                </div>`
        },
        {
          "id": "roopasanchara_2025",
          "password": "ethnicwalk2025",
          "description": "A team-based ethnic wear fashion walk competition.",
          "title": "ROOPASANCHARA (Ethnic Walk)",
          "tag": "cultural",
          "src": "/images/manthana/11.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 17, 2025</p>
                    <p><strong>Type:</strong> Team (Min 5 - Max 15 members)</p>
                    <p><strong>Duration:</strong> 7+3 min</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Only ethnic wear is allowed.</li>
                        <li>Tracks must be submitted in a pen drive by March 15, 2025.</li>
                        <li>Vulgarity or obscenity will lead to disqualification.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Ramya: 8105220835</p>
                </div>`
        },
        {
          "id": "aakarsha_2025",
          "password": "outdoorconcept2025",
          "description": "A team-based outdoor concept model competition to enhance campus beauty.",
          "title": "AAKARSHA (Outdoor Concept Model)",
          "tag": "cultural",
          "src": "/images/manthana/13.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 18, 2025</p>
                    <p><strong>Type:</strong> Team (Max 5 members)</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Teams will be allotted space on campus.</li>
                        <li>Only temporary structures allowed.</li>
                        <li>Designs must not conflict with any religious or cultural beliefs.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Abhishek: 9741633252</p>
                </div>`
        },
        {
          "id": "akriti_2025",
          "password": "mementodesign2025",
          "description": "A memento design competition focused on originality and creativity.",
          "title": "AKRITI (Memento Design)",
          "tag": "cultural",
          "src": "/images/manthana/19.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 18, 2025</p>
                    <p><strong>Type:</strong> Team (Max 2 members)</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Designs must include the college logo.</li>
                        <li>Plagiarism is strictly prohibited.</li>
                        <li>Use of cardboard and art supplies is allowed.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Nishanth: 9108007378</p>
                </div>`
        },
        {
          "id": "dhanveshan_2025",
          "password": "treasurehunt2025",
          "description": "A team-based treasure hunt competition with multiple elimination rounds.",
          "title": "DHANVESHAN (Treasure Hunt)",
          "tag": "cultural",
          "src": "/images/manthana/21.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 18, 2025</p>
                    <p><strong>Type:</strong> Team (4 members per team)</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Cheating or tampering with clues will lead to disqualification.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Satvik Bhat: 7349215644</p>
                </div>`
        },
        {
          "id": "pili_tha_pajje_2025",
          "password": "tigerdance2025",
          "description": "A traditional tiger dance competition with music and props.",
          "title": "PILI THA PAJJE (Tiger Dance)",
          "tag": "cultural",
          "src": "/images/manthana/23.jpg",
          "ctaText": "Know More",
          "ctaLink": "#register",
          "content": `
                <div>
                    <p><strong>Date:</strong> March 18, 2025</p>
                    <p><strong>Type:</strong> Team (Max 12 members)</p>
                    <p><strong>Duration:</strong> 5 minutes</p>
                    <br />
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Only traditional props are allowed.</li>
                        <li>Music must be submitted via USB/Pen Drive.</li>
                        <li>No fire, explosives, or offensive gestures allowed.</li>
                        <li>Body paint is not mandatory; participants can wear black dress.</li>
                    </ul>
                    <br />
                    <p><strong>More Details:</strong></p>
                    <p>Chithkala: 6360258731</p>
                </div>`
        }
      ] as Event[]);

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