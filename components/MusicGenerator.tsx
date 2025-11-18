
import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Select from './common/Select';
import TextArea from './common/TextArea';
import { GENRES, MOODS, MUSIC_PURPOSES, QUALITY_OPTIONS, INSTRUMENT_PRESETS } from '../constants';
import { generateText } from '../services/geminiService';
import type { LibraryItem } from '../types';

interface MusicGeneratorProps {
  addToLibrary: (item: Omit<LibraryItem, 'id' | 'timestamp'>) => void;
}

const MusicGenerator: React.FC<MusicGeneratorProps> = ({ addToLibrary }) => {
    const [purpose, setPurpose] = useState(MUSIC_PURPOSES[0].value);
    const [genre, setGenre] = useState(GENRES[0].value);
    const [mood, setMood] = useState(MOODS[0].value);
    const [instruments, setInstruments] = useState(INSTRUMENT_PRESETS[1].value);
    const [quality, setQuality] = useState(QUALITY_OPTIONS[1].value);
    const [musicDescription, setMusicDescription] = useState('');
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
        setMusicDescription('');

        const prompt = `
            Create a detailed music composition prompt for a music producer.
            Purpose: ${purpose}.
            Genre: ${genre}.
            Mood: ${mood}.
            Key Instruments: ${instruments}.
            Quality: ${quality}.

            Describe the song's structure (intro, verse, chorus, bridge, outro), tempo (BPM), key signature, and overall feel.
            Provide ideas for the melody, harmony, and rhythm.
            Suggest specific production techniques or effects.
            The output should be a rich, inspiring brief for creating the music.
        `;

        const result = await generateText(prompt);
        setMusicDescription(result);
        setIsLoading(false);

        if (result) {
            const purposeName = MUSIC_PURPOSES.find(p => p.value === purpose)?.name || 'Music Idea';
            addToLibrary({
                type: 'music',
                title: `Music Idea: ${purposeName}`,
                content: result,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <Select label="Purpose" options={MUSIC_PURPOSES} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                </div>
                <Select label="Genre" options={GENRES} value={genre} onChange={(e) => setGenre(e.target.value)} />
                <Select label="Mood" options={MOODS} value={mood} onChange={(e) => setMood(e.target.value)} />
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
                 <div className="md:col-span-2">
                    <Select label="Quality" options={QUALITY_OPTIONS} value={quality} onChange={(e) => setQuality(e.target.value)} />
                </div>
                <div className="md:col-span-2 mt-4">
                    <Button type="submit" isLoading={isLoading}>
                        Generate Music Idea
                    </Button>
                </div>
            </form>

            {isLoading && <div className="text-center mt-6">Crafting your musical blueprint...</div>}
            {musicDescription && (
                <Card title="Generated Music Idea">
                    {musicDescription}
                </Card>
            )}
        </div>
    );
};

export default MusicGenerator;
