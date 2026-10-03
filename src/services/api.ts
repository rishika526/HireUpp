export interface CategoryScores {
  skills_match: number;
  experience_relevance: number;
  education: number;
  projects: number;
  keywords: number;
  role_alignment: number;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field_of_study?: string;
  year?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration?: string;
  highlights: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
}

export interface StrengthItem {
  title: string;
  detail: string;
  category: string;
}

export interface ImprovementItem {
  title: string;
  impact: string;
  severity: 'High' | 'Medium' | 'Low';
  recommendation: string;
}

export interface ResumeAnalysisResponse {
  ats_score: number;
  summary: string;
  category_scores: CategoryScores;
  skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: string[];
  strengths: StrengthItem[];
  improvements: ImprovementItem[];
  recommended_keywords: string[];
  extracted_character_count: number;
  is_demo_mode: boolean;
  provider_used: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  mode: string;
}

// Fallback to direct backend URL if proxy isn't used
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function checkBackendHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) {
      throw new Error(`Health check failed with status: ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    // If proxy failed, try direct port 8000
    try {
      const directRes = await fetch(`http://localhost:8000/api/health`);
      if (directRes.ok) return await directRes.json();
    } catch {}
    throw new Error(`Could not connect to HireUpp backend service: ${err.message}`);
  }
}

export async function analyzeResumeApi(
  file: File,
  jobDescription: string
): Promise<ResumeAnalysisResponse> {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription.trim()) {
    formData.append('job_description', jobDescription.trim());
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/resume/analyze`, {
      method: 'POST',
      body: formData,
    });
  } catch (err: any) {
    // Retry on direct 8000 if localhost proxy encountered an issue
    try {
      res = await fetch('http://localhost:8000/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });
    } catch (directErr: any) {
      throw new Error(`Backend network error: Ensure FastAPI server is running on port 8000. (${err.message})`);
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const detail = errorData?.detail || `Server returned error status ${res.status}`;
    throw new Error(detail);
  }

  return await res.json();
}
