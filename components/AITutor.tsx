import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import type { ChatMessage, WebSource } from '../types';
import { createChat, streamChat } from '../services/geminiService';
import { useTranslation } from '../context/LanguageContext';


interface AITutorProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessageSkeleton: React.FC = () => (
    <div className="flex items-center space-x-2 p-2">
      <div className="h-2.5 w-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '-0.3s' }}></div>
      <div className="h-2.5 w-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '-0.15s' }}></div>
      <div className="h-2.5 w-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
    </div>
);

const SendButtonIcon: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
    
    
  );
};

const AITutor: React.FC<AITutorProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const { t, locale } = useTranslation();

  useEffect(() => {
    if (isOpen) {
        const instruction = t('aiTutor.systemInstruction');
        setChat(createChat(instruction));
        setMessages([
            { role: 'model', text: t('aiTutor.greeting') }
        ]);
    }
  }, [isOpen, locale, t]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chat) return;

    setIsLoading(true);
    const currentInput = input;
    const userMessage: ChatMessage = { role: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      const stream = streamChat(chat, currentInput);
      let fullResponse = '';
      const sourceMap = new Map<string, WebSource>();

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        
        if (chunk.sources) {
          chunk.sources.forEach(source => {
            if (source && source.uri && !sourceMap.has(source.uri)) {
              sourceMap.set(source.uri, { uri: source.uri, title: source.title || source.uri });
            }
          });
        }

        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                const updatedSources = Array.from(sourceMap.values());
                const updatedMessage: ChatMessage = { ...lastMessage, text: fullResponse, sources: updatedSources.length > 0 ? updatedSources : undefined };
                return [...prev.slice(0, -1), updatedMessage];
            }
            return prev;
        });
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = t('aiTutor.error');
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if(lastMessage?.role === 'model' && lastMessage.text === '') {
              return [...prev.slice(0, -1), { role: 'model', text: errorMessage }];
          }
          return [...prev, { role: 'model', text: errorMessage }];
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, chat, t]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg h-[80vh] flex flex-col transform transition-all duration-300 scale-100">
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('aiTutor.title')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-200'}`}>
                  {msg.role === 'model' && msg.text === '' && isLoading ? (
                    <MessageSkeleton />
                  ) : (
                    <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                  )}
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                      <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">{t('aiTutor.sources')}:</h4>
                      <ul className="text-xs space-y-1.5">
                        {msg.sources.map((source, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1 text-gray-500 dark:text-gray-400">&bull;</span>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all dark:text-blue-400 dark:hover:text-blue-300">
                              {source.title || source.uri}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('aiTutor.placeholder')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-12 h-12 flex items-center justify-center shrink-0 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-500"
              aria-label={isLoading ? 'Sending' : 'Send message'}
            >
              <SendButtonIcon isLoading={isLoading} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AITutor;