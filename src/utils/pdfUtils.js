import { getDocument } from 'pdfjs-dist';
import { PDF_CONFIG } from '../config/pdfjs-config';

export const extractTextFromPDF = async (file) => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({
      data: fileBuffer,
      ...PDF_CONFIG
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process PDF file');
  }
};

export const generateFlashcards = (text) => {
  // Split text into sections based on double newlines and periods
  const sections = text.split('\n\n')
    .filter(section => section.trim())
    .map(section => section.split('.').filter(s => s.trim()));

  return sections.flatMap((section, sectionIndex) => {
    // For each section, create flashcards from pairs of sentences
    const cards = [];
    for (let i = 0; i < section.length - 1; i += 2) {
      const question = section[i].trim();
      const answer = section[i + 1]?.trim() || section[i].trim();
      
      if (question) {
        cards.push({
          id: `${sectionIndex}-${i}`,
          question: question.endsWith('?') ? question : `${question}?`,
          answer,
          mastered: false
        });
      }
    }
    return cards;
  });
};