import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Select from './common/Select';
import TextArea from './common/TextArea';
import { GENRES, MOODS, INSTRUMENT_PRESETS } from '../constants';
import { generateText } from '../services/geminiService';
import type { LibraryItem } from '../types';

interface SongGeneratorProps {
  addToLibrary: (item: Omit<LibraryItem, 'id' | 'timestamp'>) => void;
}

const SongGenerator: React.FC<SongGeneratorProps> = ({ addToLibrary }) => {
    const [lyrics, setLyrics] = useState('');
    const [genre, setGenre] = useState(GENRES[0].value);
    const [mood, setMood] = useState(MOODS[0].value);
    const [instruments, setInstruments] = useState(INSTRUMENT_PRESETS[1].value);
    const [vocalStyle, setVocalStyle] = useState('Arijit Singh');
    const [songDescription, setSongDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInstrumentPresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value !== 'custom') {
            setInstruments(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSongDescription('');

        const prompt = `
            You are an expert music producer and composer. Your task is to create a detailed blueprint for turning the following lyrics into a complete song.

            **Lyrics:**
            ${lyrics}

            **Genre:** ${genre}
            **Mood:** ${mood}
            **Key Instruments:** ${instruments}
            **Vocal Style / Artist Influence:** ${vocalStyle}

            Based on the above, provide a comprehensive song production plan. Your plan should include:

            1.  **Overall Vibe & Concept:** A short summary of the song's feeling.
            2.  **Tempo & Key:** Suggest an appropriate BPM and musical key.
            3.  **Chord Progression:** Outline a main chord progression for verses and a different one for the chorus.
            4.  **Vocal Melody Direction:** Describe the vocal melody. Should it be high-pitched, melancholic, rhythmic? How should it move during the verse vs. the chorus?
            5.  **Instrumentation & Arrangement (Section by Section):**
                *   **Intro:** How does it start? Which instruments?
                *   **Verse 1:** How do the instruments support the vocals?
                *   **Chorus:** How does the energy build? What new instruments come in?
                *   **Bridge:** How does the song change here dynamically and harmonically?
                *   **Outro:** How does the song fade out or end?
            6.  **Production Notes:** Suggest specific effects (e.g., "add light reverb to the vocals," "sidechain the synth pads to the kick drum").

            The output should be a rich, inspiring brief for creating the song, formatted nicely with headings.
        `;

        const result = await generateText(prompt);
        setSongDescription(result);
        setIsLoading(false);

        if (result) {
            addToLibrary({
                type: 'song',
                title: `Song Idea: ${lyrics.substring(0, 20)}...`,
                content: result,
                originalText: lyrics,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
             <div className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg text-blue-200 text-sm mb-6">
                <strong>How it works:</strong> Provide your lyrics and customize the feel. The AI will generate a complete production plan to turn your words into a song.
            </div>
            <form onSubmit={handleSubmit} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="md:col-span-2">
                    <TextArea
                        label="Your Lyrics"
                        placeholder="Paste or write your song lyrics here..."
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        required
                        rows={8}
                    />
                </div>
                <Select label="Genre" options={GENRES} value={genre} onChange={(e) => setGenre(e.target.value)} />
                <Select label="Mood" options={MOODS} value={mood} onChange={(e) => setMood(e.target.value)} />
                 <div className="md:col-span-2">
                     <label htmlFor="vocal-style" className="block text-sm font-medium text-gray-300 mb-1">Vocal Style / Influence</label>
                    <input type="text" id="vocal-style" value={vocalStyle} onChange={(e) => setVocalStyle(e.target.value)} className="block w-full pl-3 pr-3 py-2 text-base bg-white/5 border border-white/20 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md text-white" placeholder="e.g., Jonita Gandhi, The Weeknd"/>
                </div>
                <div className="md:col-span-2">
                     <Select label="Instrument Presets" options={INSTRUMENT_PRESETS} onChange={handleInstrumentPresetChange} defaultValue={INSTRUMENT_PRESETS[1].value} />
                </div>
                <div className="md:col-span-2">
                    <TextArea
                        label="Instruments (Customize Here)"
                        placeholder="e.g., Sitar, tabla, synth pads, 808 bass"
                        value={instruments}
                        onChange={(e) => setInstruments(e.target.value)}
                        required
                    />
                </div>
                <div className="md:col-span-2 mt-4">
                    <Button type="submit" isLoading={isLoading} disabled={!lyrics.trim()}>
                        Generate Song Idea
                    </Button>
                </div>
            </form>

            {isLoading && <div className="text-center mt-6">Composing your song blueprint...</div>}
            {songDescription && (
                <Card title="Generated Song Production Plan">
                    {songDescription}
                </Card>
            )}
        </div>
    );
};

export default SongGenerator;