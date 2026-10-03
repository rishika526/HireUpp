from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class CategoryScores(BaseModel):
    skills_match: int = Field(..., ge=0, le=100, description="Skills alignment score (0-100)")
    experience_relevance: int = Field(..., ge=0, le=100, description="Experience relevance score (0-100)")
    education: int = Field(..., ge=0, le=100, description="Education qualification match (0-100)")
    projects: int = Field(..., ge=0, le=100, description="Projects and technical depth score (0-100)")
    keywords: int = Field(..., ge=0, le=100, description="ATS keyword density & frequency score (0-100)")
    role_alignment: int = Field(..., ge=0, le=100, description="Overall seniority and role alignment (0-100)")


class EducationItem(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    year: Optional[str] = None


class ExperienceItem(BaseModel):
    company: str
    role: str
    duration: Optional[str] = None
    highlights: List[str] = Field(default_factory=list)


class ProjectItem(BaseModel):
    name: str
    description: str
    technologies: List[str] = Field(default_factory=list)


class StrengthItem(BaseModel):
    title: str
    detail: str
    category: str


class ImprovementItem(BaseModel):
    title: str
    impact: str
    severity: str = Field(..., description="High, Medium, or Low")
    recommendation: str


class ResumeAnalysisResponse(BaseModel):
    ats_score: int = Field(..., ge=0, le=100, description="Overall ATS compatibility benchmark (0-100)")
    summary: str = Field(..., description="Executive AI assessment summary")
    category_scores: CategoryScores
    skills: List[str] = Field(default_factory=list, description="All extracted skills from the resume")
    matched_skills: List[str] = Field(default_factory=list, description="Skills matched with job requirements")
    missing_skills: List[str] = Field(default_factory=list, description="Critical skills missing for the job description")
    education: List[EducationItem] = Field(default_factory=list)
    experience: List[ExperienceItem] = Field(default_factory=list)
    projects: List[ProjectItem] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    strengths: List[StrengthItem] = Field(default_factory=list)
    improvements: List[ImprovementItem] = Field(default_factory=list)
    recommended_keywords: List[str] = Field(default_factory=list)
    extracted_character_count: int = 0
    is_demo_mode: bool = False
    provider_used: str = "demo"


class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "HireUpp Resume Intelligence"
    version: str = "1.0.0"
    mode: str = "active"
