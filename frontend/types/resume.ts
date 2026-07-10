export interface Resume {
  id: number;
  title: string;
  contentJson?: string;
  status: "draft" | "uploaded" | "reviewed";
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeAnalysisSection {
  name: string;
  score: number;
  maxScore: number;
}

export interface ResumeAnalysisProject {
  name: string;
  stars: number;
  techStack: string[];
  feedback: string[];
}

// ── New comprehensive types ────────────────────────────────────────────────

export interface OwnerValidation {
  ownerMatched: boolean;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  warning: string;
}

export interface CandidateInfo {
  name: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  address?: string | null;
}

export interface EducationInfo {
  degree?: string | null;
  college?: string | null;
  university?: string | null;
  cgpa?: string | null;
  percentage?: string | null;
  graduationYear?: string | null;
}

export interface CertificationItem {
  certification: string;
  organization?: string | null;
  date?: string | null;
}

// ── Main analysis type ─────────────────────────────────────────────────────

export interface ResumeAnalysis {
  // Comprehensive new fields
  ownerValidation?: OwnerValidation;
  candidate?: CandidateInfo;
  education?: EducationInfo | null;
  certifications?: CertificationItem[];
  achievements?: string[];
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];

  // Core scores
  overallScore: number;
  atsScore: number;
  atsFeedback: string[];
  sections: ResumeAnalysisSection[];

  // Skills
  skills: {
    technical: string[];
    soft: string[];
    missing: string[];
  };

  // Keywords
  keywords: {
    found: number;
    missing: number;
    matchScore: number;
  };

  // Experience
  experience: {
    totalYears: string;
    relevantYears?: string;
    feedback: string[];
  };

  // Projects
  projects: ResumeAnalysisProject[];

  // Formatting & quality
  formatting: {
    score: number;
    suggestions: string[];
  };
  grammar: {
    grammarScore: number;
    spellingScore: number;
    readabilityScore: number;
  };
  actionVerbs: {
    good: string[];
    suggestions: string[];
  };

  // Other
  missingInfo: string[];
  recruiterReadiness: {
    interviewReady: boolean;
    recruiterAppeal: number;
    atsFriendly: boolean;
    recommendedRoles: string[];
    confidence?: string;
    reason?: string;
  };
}
