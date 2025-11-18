
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import LyricsGenerator from './components/LyricsGenerator';
import MusicGenerator from './components/MusicGenerator';
import BeatGenerator from './components/BeatGenerator';
import VoiceGenerator from './components/VoiceGenerator';
import Library from './components/Library';
import type { ActiveTab, LibraryItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('music');
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);

  // Load library from localStorage on initial render
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('tanayMusicLibrary');
      if (storedItems) {
        setLibraryItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load library from localStorage:", error);
    }
  }, []);

  // Save library to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('tanayMusicLibrary', JSON.stringify(libraryItems));
    } catch (error) {
      console.error("Failed to save library to localStorage:", error);
    }
  }, [libraryItems]);

  const addToLibrary = (item: Omit<LibraryItem, 'id' | 'timestamp'>) => {
    const newItem: LibraryItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };
    setLibraryItems(prevItems => [newItem, ...prevItems]);
  };
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'lyrics':
        return <LyricsGenerator addToLibrary={addToLibrary} />;
      case 'music':
        return <MusicGenerator addToLibrary={addToLibrary} />;
      case 'beats':
        return <BeatGenerator addToLibrary={addToLibrary} />;
      case 'voice':
        return <VoiceGenerator addToLibrary={addToLibrary} />;
      case 'library':
        return <Library items={libraryItems} />;
      default:
        return <MusicGenerator addToLibrary={addToLibrary} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-96 w-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-0 h-96 w-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 h-96 w-96 bg-pink-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default App;
