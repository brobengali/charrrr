// Hush Hall · Curated Audiobook Archive & Listening Salon
import { AMAZON_AFFILIATE_TAG } from './books.js';

export function getAudiobookAffiliateLink(title, author, affiliateTag = AMAZON_AFFILIATE_TAG) {
  const query = encodeURIComponent(`${title} ${author}`);
  return `https://www.amazon.com/s?k=${query}&i=audible&tag=${affiliateTag}`;
}

export function getAudibleDirectLink(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  return `https://www.audible.com/search?keywords=${query}`;
}

export const AUDIOBOOK_GENRES = [
  {
    id: 'business',
    name: 'Business & High Performance',
    icon: '💼',
    description: 'Foundational works on strategy, high output, negotiation, and compounding habits.',
    audiobooks: [
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        narrator: 'James Clear',
        duration: '5 hrs 35 mins',
        tagline: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        coverColor: '#1d2a3a'
      },
      {
        title: 'Never Split the Difference',
        author: 'Chris Voss',
        narrator: 'Michael Kramer',
        duration: '8 hrs 7 mins',
        tagline: 'Negotiating As If Your Life Depended On It from an FBI Hostage Negotiator',
        coverColor: '#2b1e1a'
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        narrator: 'Jeff Bottoms',
        duration: '7 hrs 44 mins',
        tagline: 'Rules for Focused Success in a Distracted World',
        coverColor: '#1c2e24'
      },
      {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        narrator: 'Chris Hill',
        duration: '5 hrs 48 mins',
        tagline: 'Timeless lessons on wealth, greed, and happiness',
        coverColor: '#28231c'
      },
      {
        title: 'Shoe Dog',
        author: 'Phil Knight',
        narrator: 'Norbert Leo Butz',
        duration: '13 hrs 21 mins',
        tagline: 'A Memoir by the Creator of Nike',
        coverColor: '#301d24'
      },
      {
        title: 'High Output Management',
        author: 'Andrew S. Grove',
        narrator: 'John H. Mayer',
        duration: '7 hrs 12 mins',
        tagline: 'The essential handbook for creating and sustaining winning teams',
        coverColor: '#1e2430'
      }
    ]
  },
  {
    id: 'ai-tech',
    name: 'AI, Tech & The Future',
    icon: '🤖',
    description: 'Seminal audiobooks on silicon warfare, superintelligence, algorithms, and computing revolutions.',
    audiobooks: [
      {
        title: 'Chip War',
        author: 'Chris Miller',
        narrator: 'Chris Miller',
        duration: '12 hrs 40 mins',
        tagline: 'The Fight for the World’s Most Critical Technology',
        coverColor: '#192b3a'
      },
      {
        title: 'Life 3.0',
        author: 'Max Tegmark',
        narrator: 'Rob Shapiro',
        duration: '11 hrs 45 mins',
        tagline: 'Being Human in the Age of Artificial Intelligence',
        coverColor: '#1b2233'
      },
      {
        title: 'The Innovators',
        author: 'Walter Isaacson',
        narrator: 'Dennis Boutsikaris',
        duration: '17 hrs 30 mins',
        tagline: 'How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution',
        coverColor: '#22252a'
      },
      {
        title: 'Superintelligence',
        author: 'Nick Bostrom',
        narrator: 'Napoleon Ryan',
        duration: '11 hrs 14 mins',
        tagline: 'Paths, Dangers, Strategies in the Rise of Machine Minds',
        coverColor: '#1c1c28'
      },
      {
        title: 'The Coming Wave',
        author: 'Mustafa Suleyman',
        narrator: 'Mustafa Suleyman',
        duration: '9 hrs 18 mins',
        tagline: 'Technology, Power, and the Twenty-first Century’s Greatest Dilemma',
        coverColor: '#18242a'
      }
    ]
  },
  {
    id: 'economics',
    name: 'Economics, Markets & Finance',
    icon: '📈',
    description: 'Master classes on market cycles, liquidity, financial history, and sovereign debt.',
    audiobooks: [
      {
        title: 'Principles for Navigating Big Debt Crises',
        author: 'Ray Dalio',
        narrator: 'Jeremy Bobb',
        duration: '14 hrs 22 mins',
        tagline: 'A comprehensive study of historical debt cycles and macroeconomic policy',
        coverColor: '#1a2b22'
      },
      {
        title: 'The Big Short',
        author: 'Michael Lewis',
        narrator: 'Jesse Boggs',
        duration: '9 hrs 26 mins',
        tagline: 'Inside the Doomsday Machine and the 2008 Financial Meltdown',
        coverColor: '#261b17'
      },
      {
        title: 'Lords of Finance',
        author: 'Liaquat Ahamed',
        narrator: 'Grover Gardner',
        duration: '19 hrs 14 mins',
        tagline: 'The Bankers Who Broke the World (Pulitzer Prize Winner)',
        coverColor: '#221e18'
      },
      {
        title: 'Flash Boys',
        author: 'Michael Lewis',
        narrator: 'Dylan Baker',
        duration: '8 hrs 33 mins',
        tagline: 'A Wall Street Revolt and the Mechanics of High-Frequency Trading',
        coverColor: '#17232e'
      },
      {
        title: 'The Price of Time',
        author: 'Edward Chancellor',
        narrator: 'Robin Sachs',
        duration: '13 hrs 8 mins',
        tagline: 'The Real Story of Interest and the Allocation of Capital',
        coverColor: '#241a20'
      }
    ]
  },
  {
    id: 'philosophy',
    name: 'Philosophy & Mental Models',
    icon: '🏛️',
    description: 'Timeless reflections on resilience, stoic discipline, ethics, and clarity of mind.',
    audiobooks: [
      {
        title: 'Meditations',
        author: 'Marcus Aurelius',
        narrator: 'Duncan Steen',
        duration: '5 hrs 8 mins',
        tagline: 'Personal notes on stoic perseverance by the Roman Emperor',
        coverColor: '#2a2217'
      },
      {
        title: 'Man’s Search for Meaning',
        author: 'Viktor E. Frankl',
        narrator: 'Simon Vance',
        duration: '4 hrs 44 mins',
        tagline: 'The classic tribute to hope from the depths of the Holocaust',
        coverColor: '#1f1a18'
      },
      {
        title: 'The Daily Stoic',
        author: 'Ryan Holiday & Stephen Hanselman',
        narrator: 'Ryan Holiday',
        duration: '10 hrs 50 mins',
        tagline: '366 Meditations on Wisdom, Perseverance, and the Art of Living',
        coverColor: '#2c2217'
      },
      {
        title: 'Letters from a Stoic',
        author: 'Seneca',
        narrator: 'Tim Pigott-Smith',
        duration: '8 hrs 20 mins',
        tagline: 'Epistles on virtue, friendship, wealth, and mortality',
        coverColor: '#231d17'
      },
      {
        title: 'Ego Is the Enemy',
        author: 'Ryan Holiday',
        narrator: 'Ryan Holiday',
        duration: '6 hrs 52 mins',
        tagline: 'The Fight to Master Our Greatest Opponent in Life and Career',
        coverColor: '#2b1b1c'
      }
    ]
  },
  {
    id: 'science',
    name: 'Science, Cosmos & Biology',
    icon: '⚛️',
    description: 'Expeditions into human origins, spacetime physics, the quantum realm, and genetics.',
    audiobooks: [
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        narrator: 'Derek Perkins',
        duration: '15 hrs 17 mins',
        tagline: 'How an unremarkable ape became the ruler of planet Earth',
        coverColor: '#1f2824'
      },
      {
        title: 'The Order of Time',
        author: 'Carlo Rovelli',
        narrator: 'Benedict Cumberbatch',
        duration: '4 hrs 19 mins',
        tagline: 'A poetic physics exploration into the mystery of temporal reality',
        coverColor: '#192233'
      },
      {
        title: 'The Gene: An Intimate History',
        author: 'Siddhartha Mukherjee',
        narrator: 'Dennis Boutsikaris',
        duration: '20 hrs 58 mins',
        tagline: 'The definitive history of genetics and the human blueprint',
        coverColor: '#241b2a'
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        narrator: 'Michael Jackson',
        duration: '5 hrs 49 mins',
        tagline: 'From the Big Bang to Black Holes',
        coverColor: '#171c2b'
      },
      {
        title: 'The Body: A Guide for Occupants',
        author: 'Bill Bryson',
        narrator: 'Bill Bryson',
        duration: '14 hrs 4 mins',
        tagline: 'A head-to-toe tour of the miraculous human machine',
        coverColor: '#2d221c'
      }
    ]
  },
  {
    id: 'biographies',
    name: 'Biographies & Masterminds',
    icon: '🎙️',
    description: 'Immersive life stories of founders, visionaries, polymaths, and leaders.',
    audiobooks: [
      {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        narrator: 'Dylan Baker',
        duration: '25 hrs 18 mins',
        tagline: 'The definitive biography of the Apple visionary and design pioneer',
        coverColor: '#1e2129'
      },
      {
        title: 'Elon Musk',
        author: 'Walter Isaacson',
        narrator: 'Walter Isaacson',
        duration: '20 hrs 26 mins',
        tagline: 'An astonishingly intimate story of the world’s most fascinating disruptor',
        coverColor: '#1a222c'
      },
      {
        title: 'Leonardo da Vinci',
        author: 'Walter Isaacson',
        narrator: 'Alfred Molina',
        duration: '16 hrs 52 mins',
        tagline: 'The creative genius of history’s most relentlessly curious mind',
        coverColor: '#2d2419'
      },
      {
        title: 'Titan: The Life of John D. Rockefeller, Sr.',
        author: 'Ron Chernow',
        narrator: 'Grover Gardner',
        duration: '35 hrs 4 mins',
        tagline: 'The rise of Standard Oil and the creation of modern capitalism',
        coverColor: '#241d17'
      }
    ]
  }
];

