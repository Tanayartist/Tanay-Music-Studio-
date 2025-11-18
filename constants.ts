
import type { Option } from './types';

export const GENRES: Option[] = [
  { name: 'Pop', value: 'pop' },
  { name: 'Hip Hop / Rap', value: 'hip hop' },
  { name: 'Indian Classical', value: 'indian classical' },
  { name: 'Bollywood', value: 'bollywood' },
  { name: 'Lo-fi', value: 'lo-fi' },
  { name: 'Electronic', value: 'electronic' },
  { name: 'Rock', value: 'rock' },
  { name: 'Folk', value: 'folk' },
];

export const MOODS: Option[] = [
  { name: 'Happy / Upbeat', value: 'happy, upbeat' },
  { name: 'Sad / Melancholic', value: 'sad, melancholic' },
  { name: 'Energetic / Hype', value: 'energetic, hype' },
  { name: 'Calm / Relaxing', value: 'calm, relaxing' },
  { name: 'Romantic', value: 'romantic' },
  { name: 'Epic / Cinematic', value: 'epic, cinematic' },
];

export const MUSIC_PURPOSES: Option[] = [
  { name: 'YouTube Vlog (Travelling)', value: 'music for a travel youtube vlog' },
  { name: 'YouTube Vlog (Wedding)', value: 'music for a wedding youtube vlog' },
  { name: 'Short Film Score', value: 'background score for a short film' },
  { name: 'Podcast Intro', value: 'intro music for a podcast' },
  { name: 'Guided Meditation', value: 'music for guided meditation' },
];

export const LANGUAGES: Option[] = [
    { name: 'Hindi', value: 'hindi' },
    { name: 'English', value: 'english' },
    { name: 'Hinglish (Hindi + English)', value: 'hinglish' },
];

export const VOICE_STYLES: Option[] = [
  // DHH & International
  { name: 'Deep Male Rap (DHH-style)', value: 'Fenrir' },
  { name: 'Smooth Male English (International)', value: 'Charon' },
  // Indian Male
  { name: 'Warm Male Hindi (Arijit-style)', value: 'Kore' },
  // Indian Female (Originals)
  { name: 'Clear Female Hindi (Jonita-style)', value: 'Puck' },
  { name: 'Modern Female Pop (Nikita-style)', value: 'Zephyr' },
  // Expanded "Cute" Indian Female Voices (Stylistic variations)
  { name: 'Sweet & Melodious Hindi Female', value: 'Puck' },
  { name: 'Youthful Pop Hindi Female', value: 'Zephyr' },
  { name: 'Gentle Storyteller Female', value: 'Puck' },
  { name: 'Energetic VJ Female', value: 'Zephyr' },
  { name: 'Calm & Soothing Female', value: 'Puck' },
  { name: 'Cheerful & Bubbly Female', value: 'Zephyr' },
  { name: 'Soft Spoken ASMR Female', value: 'Puck' },
  { name: 'Confident Announcer Female', value: 'Zephyr' },
  { name: 'Traditional Folk Female', value: 'Puck' },
  { name: 'Upbeat Podcast Host Female', value: 'Zephyr' },
  { name: 'Elegant & Graceful Female', value: 'Puck' },
  { name: 'Playful & Cute Female', value: 'Zephyr' },
  { name: 'Inspirational Speaker Female', value: 'Puck' },
  { name: 'Casual & Friendly Female', value: 'Zephyr' },
  { name: 'Poetic & Expressive Female', value: 'Puck' },
  { name: 'Modern & Chic Female', value: 'Zephyr' },
  { name: 'Warm & Inviting Female', value: 'Puck' },
  { name: 'Crisp & Clear Corporate Female', value: 'Zephyr' },
  { name: 'Dreamy & Ethereal Female', value: 'Puck' },
];

export const INSTRUMENT_PRESETS: Option[] = [
    { name: 'Custom...', value: 'custom' },
    { name: 'Acoustic Pop Trio', value: 'Acoustic guitar, piano, strings' },
    { name: 'Bollywood Pop Orchestra', value: 'Sitar, tabla, dholak, synth pads, strings section, 808 bass' },
    { name: 'Indian Classical Fusion', value: 'Sitar, sarod, tabla, flute, gentle electronic drums' },
    { name: 'Hip Hop Trap Kit', value: 'Distorted 808s, sharp hi-hats, melodic synth lead, dark piano chords' },
    { name: 'Lo-fi Chill Hop', value: 'Jazzy electric piano, vinyl crackle, simple boom-bap drum loop, mellow bass' },
    { name: 'Cinematic Epic Score', value: 'Full orchestra, powerful brass, timpani, choir' },
];


export const QUALITY_OPTIONS: Option[] = [
    { name: 'Standard Quality', value: 'standard quality' },
    { name: 'High Fidelity (4K)', value: 'high fidelity, 4k quality, rich detail' },
    { name: 'Mastering Grade (8K)', value: 'mastering grade, 8k quality, extremely detailed and nuanced' },
];
