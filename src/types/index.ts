export interface User {
  name: string;
  email: string;
  isVerified: boolean;
  hasPassword: boolean;
  hasGeneratedPlan: boolean;
  firstAccess: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'pt' | 'es' | 'en';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'quiz';
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  questions?: QuizQuestion[];
  size?: string;
  rating?: number;
  downloads?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}