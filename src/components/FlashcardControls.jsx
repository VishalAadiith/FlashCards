import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFlashcards } from '../contexts/FlashcardContext';

const FlashcardControls = () => {
  const { flashcards, previousCard, nextCard } = useFlashcards();
  
  if (flashcards.length === 0) return null;

  return (
    <div className="flex justify-center gap-6 p-4">
      <button
        onClick={previousCard}
        className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-300 text-gray-700"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextCard}
        className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-300 text-gray-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FlashcardControls;