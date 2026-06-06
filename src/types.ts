/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  tags: string[];
  techStack: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  projectType: 'ai-crm' | 'ai-content' | 'rag-system' | 'other';
  message: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  date: string;
  aiAnalysis?: {
    spamScore: number; // 0 to 100
    estimatedComplexity: 'Low' | 'Medium' | 'High';
    recommendedStack: string[];
    actionItems: string[];
  };
}
