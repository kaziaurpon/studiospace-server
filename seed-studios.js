import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is missing. Add it to server/.env before seeding.');
  process.exit(1);
}

const client = new MongoClient(uri);
const samples = [
  {
    seedKey: 'sample-daylight-atelier',
    title: 'The Daylight Atelier',
    category: 'Photo Studio',
    hourlyRate: 85,
    price: 85,
    securityDeposit: 150,
    capacity: 8,
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Natural light', 'Cyclorama wall', 'Lighting kit', 'Styling area'],
    overview: 'A light-filled studio with tall windows, clean backdrops, and room to create a polished shoot.',
    hostName: 'Maya Chen',
    hostEmail: 'maya@example.com',
    ownerEmail: 'maya@example.com',
    rating: 4.98,
  },
  {
    seedKey: 'sample-room-tone',
    title: 'Room Tone Studio',
    category: 'Podcast Lounge',
    hourlyRate: 65,
    price: 65,
    securityDeposit: 100,
    capacity: 6,
    location: 'East London, UK',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Studio microphones', 'Soundproofing', '4K cameras', 'Lounge'],
    overview: 'An acoustically treated recording suite for conversations, interviews, and shows worth hearing.',
    hostName: 'Alex Morgan',
    hostEmail: 'alex@example.com',
    ownerEmail: 'alex@example.com',
    rating: 4.96,
  },
  {
    seedKey: 'sample-northlight-stage',
    title: 'Northlight Soundstage',
    category: 'Film Stage',
    hourlyRate: 140,
    price: 140,
    securityDeposit: 250,
    capacity: 24,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Lighting grid', 'Blackout curtains', 'Green room', 'Load-in access'],
    overview: 'A production-ready stage with a lighting grid and room for a full crew and set.',
    hostName: 'Jordan Lee',
    hostEmail: 'jordan@example.com',
    ownerEmail: 'jordan@example.com',
    rating: 4.94,
  },
  {
    seedKey: 'sample-soft-focus',
    title: 'Soft Focus Workshop',
    category: 'Art Workshop',
    hourlyRate: 55,
    price: 55,
    securityDeposit: 75,
    capacity: 12,
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Work tables', 'Natural light', 'Utility sink', 'Materials library'],
    overview: 'A welcoming workshop for makers, artists, and small creative gatherings.',
    hostName: 'Sam Rivera',
    hostEmail: 'sam@example.com',
    ownerEmail: 'sam@example.com',
    rating: 4.92,
  },
  {
    seedKey: 'sample-analog-house',
    title: 'Analog House',
    category: 'Music Suite',
    hourlyRate: 95,
    price: 95,
    securityDeposit: 125,
    capacity: 5,
    location: 'Nashville, TN',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Vintage instruments', 'Vocal booth', 'Piano', 'Coffee'],
    overview: 'A warm, analog-forward writing and recording room made for focused collaboration.',
    hostName: 'Chris Bell',
    hostEmail: 'chris@example.com',
    ownerEmail: 'chris@example.com',
    rating: 4.91,
  },
  {
    seedKey: 'sample-maison-lumiere',
    title: 'Maison Lumière',
    category: 'Photo Studio',
    hourlyRate: 110,
    price: 110,
    securityDeposit: 175,
    capacity: 10,
    location: 'Montreal, QC',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Cyclorama', 'Props', 'Makeup station', 'Freight elevator'],
    overview: 'A refined daylight space with a full cyclorama and room for thoughtful production.',
    hostName: 'Éloïse Martin',
    hostEmail: 'eloise@example.com',
    ownerEmail: 'eloise@example.com',
    rating: 4.89,
  },
];

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'studiospace');
  const studios = db.collection('studios');
  for (const sample of samples) {
    await studios.updateOne(
      { seedKey: sample.seedKey },
      { $setOnInsert: { ...sample, isSampleListing: true, createdAt: new Date() } },
      { upsert: true },
    );
  }
  const count = await studios.countDocuments();
  console.log(`Sample studios are ready. Total studio listings: ${count}. Existing records were preserved.`);
} catch (error) {
  console.error('Could not seed sample studios:', error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
