import React from 'react';
import { useFlashcards } from '../contexts/FlashcardContext';

const ProgressTracker = () => {
  const { flashcards } = useFlashcards();
  
  if (flashcards.length === 0) return null;

  const masteredCount = flashcards.filter(card => card.mastered).length;
  const progressPercentage = (masteredCount / flashcards.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">
            {masteredCount} of {flashcards.length} cards mastered
          </p>
          <p className="font-medium text-purple-600">
            {progressPercentage.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;