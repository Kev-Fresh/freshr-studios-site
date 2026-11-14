import montageVideo from '../assets/Videos/Montage.mp4'

export const SERVICES = [
  {
    title: 'First Frame',
    tagline: 'One day. One business. Camera woven throughout.',
    bestFor: 'Best for a shop, studio, or small business',
    description: [
      'One day. One business. We show up, observe, and capture you doing what you actually do. Questions woven in naturally while you work. No staged moments. Just you being real on camera.',
      'One session. One story. Done right.',
    ],
    included: [
      '1 shoot day',
      'Organic interview woven into b-roll',
      '3–5 min edited film',
      'Music and color grade',
      '1 round of revisions',
      "Director's note on delivery",
    ],
    cta: 'Book First Frame',
    ctaHref: '/contact?service=first-frame',
  },
  {
    title: 'Sit Down',
    tagline: 'Two days. One subject. The full interview portrait.',
    bestFor: 'Best for a founder or person with a story to tell',
    description: [
      "Two days. One subject. Day one we capture your world — your space, the life of what you've built. Day two everything stops. Lights set up. Just you and the lens. We ask the questions nobody has ever asked you. The result is a portrait that feels documentary, not corporate.",
    ],
    included: [
      'Discovery call + Vision session',
      '2 shoot days',
      'Day 1: b-roll, space, organic moments',
      'Day 2: Full Netflix-style sit down interview',
      '5–10 min edited film',
      'Music and color grade',
      '2 rounds of revisions',
      "Director's note on delivery",
    ],
    cta: 'Book Sit Down',
    ctaHref: '/contact?service=the-sit-down',
  },
  {
    title: 'Reel',
    tagline: 'One night. Ninety seconds. The whole room.',
    bestFor: 'Best for parties, launches, and nights out',
    description: [
      'Ninety seconds or less. The whole night.',
      'No interview. No narration. Just the energy of the room cut tight enough that you feel like you were there. Reel is for the event that needs to be felt before the next one gets announced.',
    ],
    included: [
      'Full event coverage',
      '90 seconds or less edited film',
      'Music and audio mix',
      'Color grade',
      'Social ready delivery',
      '1 round of revisions',
    ],
    upgradeLine: 'Upgrade: full-day coverage + a 3–4 min story cut. Ask about it.',
    cta: 'Get Your Reel',
    ctaHref: '/contact?service=the-reel',
    video: montageVideo,
  },
]
