import React from 'react';
import { FlashcardProvider } from './contexts/FlashcardContext';
import PDFUploader from './components/PDFUploader';
import FlashcardViewer from './components/FlashcardViewer';
import FlashcardControls from './components/FlashcardControls';
import ProgressTracker from './components/ProgressTracker';
import './pdfjs-worker';

function App() {
  return (
    <FlashcardProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
            Interactive PDF Flashcards
          </h1>
          <PDFUploader />
          <FlashcardViewer />
          <FlashcardControls />
          <ProgressTracker />
        </div>
      </div>
    </FlashcardProvider>
  );
}

export default App;