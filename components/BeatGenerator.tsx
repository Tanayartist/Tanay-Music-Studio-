
import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Select from './common/Select';
import TextArea from './common/TextArea';
import { GENRES, MOODS, QUALITY_OPTIONS } from '../constants';
import { generateText } from '../services/geminiService';
import type { LibraryItem } from '../types';

interface BeatGeneratorProps {
  addToLibrary: (item: Omit<LibraryItem, 'id' | 'timestamp'>) => void;
}

const BeatGenerator: React.FC<BeatGeneratorProps> = ({ addToLibrary }) => {
    const [genre, setGenre] = useState(GENRES[1].value);
    const [mood, setMood] = useState(MOODS[2].value);
    const [bpm, setBpm] = useState('90');
    const [influences, setInfluences] = useState('Travis Scott, Metro Boomin');
    const [quality, setQuality] = useState(QUALITY_OPTIONS[1].value);
    const [beatDescription, setBeatDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setBeatDescription('');

        const prompt = `
            Create a detailed prompt for a beatmaker to produce a type beat.
            Genre: ${genre}.
            Mood: ${mood}.
            BPM: Approximately ${bpm} BPM.
            Influences / Artist Style: ${influences}.
            Quality: ${quality}.

            Describe the core elements of the beat:
            - Drums: Kick pattern, snare/clap sound, hi-hat pattern (e.g., trap skitters, boom-bap bounce), percussion.
            - Bass: 808 style (e.g., distorted, clean), bassline pattern.
            - Melody/Sample: Describe the main melodic instruments, sample ideas, or synth sounds.
            - Structure: Intro, verse, hook, bridge, outro arrangement.
            The output should be a comprehensive guide to create the beat.
        `;

        const result = await generateText(prompt);
        setBeatDescription(result);
        setIsLoading(false);

        if (result) {
            addToLibrary({
                type: 'beats',
                title: `Beat: ${influences} Type Beat`,
                content: result,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="Genre" options={GENRES.filter(g => ['hip hop', 'pop', 'lo-fi', 'electronic'].includes(g.value))} value={genre} onChange={(e) => setGenre(e.target.value)} />
                <Select label="Mood" options={MOODS} value={mood} onChange={(e) => setMood(e.target.value)} />
                <div className="md:col-span-2">
                    <TextArea
                        label="Influences / Artist Style"
                        placeholder="e.g., Drake, Nucleya, Ritviz"
                        value={influences}
                        onChange={(e) => setInfluences(e.target.value)}
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="bpm" className="block text-sm font-medium text-gray-300 mb-1">BPM (Tempo)</label>
                    <input type="number" id="bpm" value={bpm} onChange={(e) => setBpm(e.target.value)} className="block w-full pl-3 pr-3 py-2 text-base bg-white/5 border border-white/20 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md text-white" />
                </div>
                 <div>
                    <Select label="Quality" options={QUALITY_OPTIONS} value={quality} onChange={(e) => setQuality(e.target.value)} />
                </div>
                <div className="md:col-span-2 mt-4">
                    <Button type="submit" isLoading={isLoading}>
                        Generate Beat Idea
                    </Button>
                </div>
            </form>

            {isLoading && <div className="text-center mt-6">Building the beat foundation...</div>}
            {beatDescription && (
                <Card title="Generated Beat Idea">
                    {beatDescription}
                </Card>
            )}
        </div>
    );
};

export default BeatGenerator;
