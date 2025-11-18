
import React, { useState, useRef } from 'react';
import Button from './common/Button';
import Select from './common/Select';
import TextArea from './common/TextArea';
import { VOICE_STYLES } from '../constants';
import { generateSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audioUtils';
import type { LibraryItem } from '../types';

interface VoiceGeneratorProps {
  addToLibrary: (item: Omit<LibraryItem, 'id' | 'timestamp'>) => void;
}

const VoiceGenerator: React.FC<VoiceGeneratorProps> = ({ addToLibrary }) => {
    const [text, setText] = useState('Hello, welcome to Tanay Music Studio.');
    const [voice, setVoice] = useState(VOICE_STYLES[0].value);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

    const stopPlayback = () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current = null;
        }
    };
    
    const playAudio = async (base64Audio: string) => {
        setError(null);
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            stopPlayback();

            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
            
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.start();
            audioSourceRef.current = source;

        } catch (err) {
            console.error("Error playing audio:", err);
            setError("Failed to play audio. Please try again.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await generateSpeech(text, voice);
        setIsLoading(false);

        if (result) {
            await playAudio(result);
            const voiceName = VOICE_STYLES.find(v => v.value === voice)?.name || 'Voice';
            addToLibrary({
                type: 'voice',
                title: `Voice: ${voiceName}`,
                content: result,
                originalText: text,
            });
        } else {
            setError("Could not generate audio for the provided text. Please try a different text or voice.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm mb-6">
                <strong>Note:</strong> This generates spoken voice samples. The voice styles are inspired by popular artists and vocal tones. Many styles may share a similar underlying voice model.
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg grid grid-cols-1 gap-4">
                <div>
                    <Select label="Artist Voice Style" options={VOICE_STYLES} value={voice} onChange={(e) => setVoice(e.target.value)} />
                </div>
                <div>
                    <TextArea
                        label="Text to Generate"
                        placeholder="Enter text for the voice sample..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        rows={5}
                    />
                </div>
                <div className="mt-4">
                    <Button type="submit" isLoading={isLoading}>
                        {isLoading ? 'Generating Voice...' : 'Generate & Play Voice'}
                    </Button>
                </div>
            </form>

            {error && (
                <div className="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default VoiceGenerator;
