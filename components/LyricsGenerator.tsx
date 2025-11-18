
import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Select from './common/Select';
import TextArea from './common/TextArea';
import { GENRES, MOODS, LANGUAGES } from '../constants';
import { generateText } from '../services/geminiService';
import type { LibraryItem } from '../types';

interface LyricsGeneratorProps {
  addToLibrary: (item: Omit<LibraryItem, 'id' | 'timestamp'>) => void;
}

const LyricsGenerator: React.FC<LyricsGeneratorProps> = ({ addToLibrary }) => {
  const [topic, setTopic] = useState('');
  const [genre, setGenre] = useState(GENRES[0].value);
  const [mood, setMood] = useState(MOODS[0].value);
  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLyrics('');

    const prompt = `
      Generate song lyrics.
      Language: ${language}.
      Topic: ${topic}.
      Genre: ${genre}.
      Mood: ${mood}.
      
      Structure the lyrics with verses, a chorus, and a bridge.
      The lyrics should be creative, evocative, and fit the specified parameters.
      Output only the lyrics.
    `;

    const result = await generateText(prompt);
    setLyrics(result);
    setIsLoading(false);

    if (result) {
        addToLibrary({
            type: 'lyrics',
            title: `Lyrics: ${topic || 'Untitled'}`,
            content: result,
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextArea
            label="Topic / Theme"
            placeholder="e.g., A long road trip with friends"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <Select label="Genre" options={GENRES} value={genre} onChange={(e) => setGenre(e.target.value)} />
        <Select label="Mood" options={MOODS} value={mood} onChange={(e) => setMood(e.target.value)} />
        <div className="md:col-span-2">
          <Select label="Language" options={LANGUAGES} value={language} onChange={(e) => setLanguage(e.target.value)} />
        </div>
        <div className="md:col-span-2 mt-4">
          <Button type="submit" isLoading={isLoading}>
            Generate Lyrics
          </Button>
        </div>
      </form>

      {isLoading && <div className="text-center mt-6">Generating... Please wait.</div>}
      {lyrics && (
        <Card title="Generated Lyrics">
          {lyrics}
        </Card>
      )}
    </div>
  );
};

export default LyricsGenerator;
