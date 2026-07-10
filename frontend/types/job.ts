export interface Job {
  id: number;

  title: string;
  company: string;
  companyLogo?: string;

  description: string;

  location: string;
  salary: string;

  jobType: string;
  employmentType?: string;

  experience?: string;
  level?: string;

  matchScore?: number;

  skills?: string;
  tags?: string;

  status: string;

  applyUrl?: string;

  postedBy?: string;

  createdAt?: string;
}