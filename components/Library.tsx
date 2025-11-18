
import React, { useRef, useState } from 'react';
import type { LibraryItem } from '../types';
import { decode, decodeAudioData } from '../utils/audioUtils';

interface LibraryProps {
  items: LibraryItem[];
}

const LibraryCard: React.FC<{ item: LibraryItem }> = ({ item }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

    const stopPlayback = () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.onended = null;
            audioSourceRef.current = null;
            setIsPlaying(false);
        }
    };

    const playAudio = async (base64Audio: string) => {
        if (isPlaying) {
            stopPlayback();
            return;
        }
        
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            stopPlayback();
            setIsPlaying(true);

            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
            
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => {
                setIsPlaying(false);
                audioSourceRef.current = null;
            };
            source.start();
            audioSourceRef.current = source;
        } catch (err) {
            console.error("Error playing audio from library:", err);
            setIsPlaying(false);
        }
    };


    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'music': return 'bg-blue-500/20 text-blue-300';
            case 'lyrics': return 'bg-pink-500/20 text-pink-300';
            case 'beats': return 'bg-purple-500/20 text-purple-300';
            case 'voice': return 'bg-green-500/20 text-green-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-md font-semibold text-gray-200 truncate pr-2">{item.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(item.type)}`}>
                    {item.type}
                </span>
            </div>
            <div className="p-4 text-gray-300">
                {item.type === 'voice' ? (
                    <div className="flex items-center justify-between gap-4">
                        <p className="italic text-gray-400">"{item.originalText}"</p>
                        <button onClick={() => playAudio(item.content)} className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                ) : (
                     <p className="whitespace-pre-wrap text-sm max-h-32 overflow-y-auto">{item.content}</p>
                )}
            </div>
            <div className="p-2 border-t border-white/10 text-right">
                <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
};


const Library: React.FC<LibraryProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-black/20 backdrop-blur-sm rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11h.01M16 11h.01" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-white">Your Library is Empty</h3>
        <p className="mt-1 text-md text-gray-400">
          Creations you make in other tabs will be saved here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <LibraryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Library;
