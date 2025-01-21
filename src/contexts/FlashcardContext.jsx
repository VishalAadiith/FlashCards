import React, { createContext, useContext, useState, useCallback } from 'react';

const FlashcardContext = createContext(null);

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addFlashcards = useCallback((cards) => {
    setFlashcards(cards);
    setCurrentIndex(0);
    setError(null);
  }, []);

  const toggleMastered = useCallback((id) => {
    setFlashcards(cards =>
      cards.map(card =>
        card.id === id ? { ...card, mastered: !card.mastered } : card
      )
    );
  }, []);

  const nextCard = useCallback(() => {
    if (flashcards.length > 0) {
      setCurrentIndex(i => (i + 1) % flashcards.length);
    }
  }, [flashcards.length]);

  const previousCard = useCallback(() => {
    if (flashcards.length > 0) {
      setCurrentIndex(i => (i - 1 + flashcards.length) % flashcards.length);
    }
  }, [flashcards.length]);

  return (
    <FlashcardContext.Provider
      value={{
        flashcards,
        currentIndex,
        loading,
        error,
        setLoading,
        setError,
        addFlashcards,
        toggleMastered,
        nextCard,
        previousCard
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within a FlashcardProvider');
  }
  return context;
};