import { pdfjs } from 'react-pdf';

// Explicitly set the worker source path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PDF_CONFIG = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/`,
};