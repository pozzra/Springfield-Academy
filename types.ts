import { SECTIONS } from './constants';

export type Section = (typeof SECTIONS)[number]['id'];

export interface WebSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: WebSource[];
}