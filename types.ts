export type GenerationType = 'music' | 'lyrics' | 'beats' | 'voice' | 'song';
export type ActiveTab = GenerationType | 'library';

export interface Option {
  name: string;
  value: string;
}

export interface LibraryItem {
    id: string;
    timestamp: number;
    type: GenerationType;
    title: string;
    content: string; // For text OR base64 audio
    originalText?: string; // For voice generation, to store the input text
}