import React, { useState } from 'react';
import { useFlashcards } from '../contexts/FlashcardContext';

const FlashcardViewer = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { flashcards, currentIndex, toggleMastered } = useFlashcards();
  
  const currentCard = flashcards[currentIndex];
  
  if (!currentCard) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-80 cursor-pointer perspective-1000"
      >
        <div className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 backface-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Card {currentIndex + 1} of {flashcards.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  currentCard.mastered
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currentCard.mastered ? 'Mastered' : 'Mark as Mastered'}
              </button>
            </div>
            <div className="flex items-center justify-center h-48">
              <p className="text-xl text-gray-800 text-center">
                {isFlipped ? currentCard.answer : currentCard.question}
              </p>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-sm text-gray-500">Click to flip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;