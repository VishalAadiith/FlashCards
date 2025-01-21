import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { extractTextFromPDF, generateFlashcards } from '../utils/pdfUtils';
import { useFlashcards } from '../contexts/FlashcardContext';

const PDFUploader = () => {
  const fileInputRef = useRef(null);
  const { setLoading, setError, addFlashcards } = useFlashcards();

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      const cards = generateFlashcards(text);
      
      if (cards.length === 0) {
        throw new Error('No content could be extracted from the PDF');
      }
      
      addFlashcards(cards);
    } catch (error) {
      setError(error.message || 'Error processing PDF. Please try again.');
      console.error('PDF processing error:', error);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <Upload className="w-12 h-12 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">
          Click to upload PDF or drag and drop
        </span>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default PDFUploader;