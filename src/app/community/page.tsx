import './community.css';
import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: "Makers & Mugs: Summer Twilight Market",
    date: "Saturday, July 18, 2026",
    time: "4:00 PM — 9:00 PM",
    description: "Discover unique, handmade goods from over 30 local artisans.",
    image: "/images/market.jpg",
  },
  {
    id: 2,
    title: "Hand-Poured Soy Candle Making Workshop",
    date: "Saturday, August 8, 2026",
    time: "2:00 PM — 4:30 PM",
    description: "Join us in our sunlit pottery studio for a cozy, hands-on afternoon.",
    image: "/images/candle.jpg",
  },
  {
    id: 3,
    title: "Hands-On: The Creator's Campfire",
    date: "Sunday, September 13, 2026",
    time: "10:00 AM — 6:00 PM",
    description: "Get hands-on at this interactive, creator-focused wonderland.",
    image: "/images/campfire.jpg",
  },
];

const stories = [
  {
    id: 1,
    title: '"Quilts of Memory: Ornelle African Patchwork"',
    body: "Ornelle, a textile artist from France, stitches quilts inspired by African traditions. Each piece blends recycled fabrics with family stories, creating heirlooms that connect generations while promoting sustainable craftsmanship.",
    image: "/images/ornelle.jpg",
  },
  {
    id: 2,
    title: '"Forged in Fire: Daniel Midwest Ironwork"',
    body: "Daniel, a blacksmith from Ohio, turns raw iron into functional art. From hand crafted kitchen utensils to decorative gates. His work brings back techniques from centuries ago, proving that strength and beauty can coexist in everyday objects.",
    image: "/images/daniel.jpg",
  },
];

export default function CommunityPage() {
  return (
    <main className="community-page">

      {/* Hero Section */}
      <section className="community-hero">
        <div className="community-container">
        <h1>Join the Community</h1>
        <p>Connect with Fellow Creators and Showcase Your Craft</p>
        </div>
      </section>

      {/* Events */}
      <section className="community-events">
        <div className="community-container">
          <h2>Upcoming Events and Workshops</h2>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image-wrapper">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={180}
                    className="event-image"
                  />
                  <h3 className="event-title-overlay">{event.title}</h3>
                  <div className="event-datetime-overlay">
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                  </div>
                </div>
                <div className="event-info">
                  <p className="event-description">{event.description}</p>
                  <Link href="#" className="btn-learn-more">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maker Stories */}
      <section className="community-stories">
        <div className="community-container">
          <h2 className="stories-heading">Maker Stories</h2>
          <div className="stories-list">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-text">
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </div>
                <div className="story-image-wrapper">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={600}
                    height={400}
                    className="story-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}