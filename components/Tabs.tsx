import React from 'react';
import type { ActiveTab } from '../types';

interface TabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const TabButton: React.FC<{
    label: string;
    tabName: ActiveTab;
    activeTab: ActiveTab;
    onClick: () => void;
    icon: React.ReactElement;
}> = ({ label, tabName, activeTab, onClick, icon }) => {
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 ${
        isActive
          ? 'bg-purple-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const MusicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" /></svg>;
    const LyricsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm5 3a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zM9 12a1 1 0 112 0v1a1 1 0 11-2 0v-1z" clipRule="evenodd" /></svg>;
    const BeatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
    const VoiceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-12 0H3a7.001 7.001 0 006 6.93V17H7a1 1 0 100 2h6a1 1 0 100-2h-2v-2.07z" clipRule="evenodd" /></svg>;
    const SongIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 3.293A1 1 0 0118 4v12a1 1 0 01-1.707.707L13 13.414V17a1 1 0 11-2 0v-5a1 1 0 011-1h5a1 1 0 110 2h-1.586l2.293 2.293A1 1 0 0117 16.586V4.414l-2.293 2.293A1 1 0 0114 6.586V4a1 1 0 01.707-.707l2.586-1A1 1 0 0117.293 3.293zM9 3a1 1 0 012 0v1.34l-1 1V3zM9 7.414l-4.707 4.707A1 1 0 013 11.414V4a1 1 0 112 0v5.586l2-2V3a1 1 0 112 0v4.414z" /></svg>;
    const LibraryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;

  return (
    <div className="flex justify-center bg-black/20 backdrop-blur-sm p-2 rounded-lg max-w-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-2">
        <TabButton label="Music" tabName="music" activeTab={activeTab} onClick={() => setActiveTab('music')} icon={<MusicIcon />} />
        <TabButton label="Lyrics" tabName="lyrics" activeTab={activeTab} onClick={() => setActiveTab('lyrics')} icon={<LyricsIcon />} />
        <TabButton label="Beats" tabName="beats" activeTab={activeTab} onClick={() => setActiveTab('beats')} icon={<BeatIcon />} />
        <TabButton label="Voice" tabName="voice" activeTab={activeTab} onClick={() => setActiveTab('voice')} icon={<VoiceIcon />} />
        <TabButton label="Song" tabName="song" activeTab={activeTab} onClick={() => setActiveTab('song')} icon={<SongIcon />} />
        <TabButton label="Library" tabName="library" activeTab={activeTab} onClick={() => setActiveTab('library')} icon={<LibraryIcon />} />
      </div>
    </div>
  );
};

export default Tabs;