import Image from "next/image";

const speakers = [
  { name: "Dr. Sarah Johnson", role: "Tech Lead, Google", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Prof. Michael Chen", role: "AI Researcher", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Emma Williams", role: "Startup Founder", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200" }
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Speakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{speaker.name}</h3>
              <p className="text-muted-foreground">{speaker.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}