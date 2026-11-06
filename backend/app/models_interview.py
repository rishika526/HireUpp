from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class InterviewGenerateRequest(BaseModel):
    role: str = Field(default="Full Stack Developer", description="Target role (e.g., Java Developer, Python Developer, Full Stack Developer, Frontend Developer, Backend Developer, Data Analyst, Software Engineer)")
    experience_level: str = Field(default="Intermediate", description="Beginner, Intermediate, Advanced")
    interview_type: str = Field(default="Technical", description="Technical, HR, Mixed")
    question_count: int = Field(default=5, ge=1, le=15, description="Number of questions (5, 10, or 15)")
    difficulty: str = Field(default="Medium", description="Easy, Medium, Hard")
    resume_context: Optional[str] = Field(default=None, description="Optional candidate resume skills and summary context")
    job_description: Optional[str] = Field(default=None, description="Optional target job description")


class InterviewQuestionItem(BaseModel):
    id: int
    category: str = Field(..., description="Technical, HR, or System Architecture")
    topic: str
    question: str
    expected_keywords: List[str] = Field(default_factory=list)
    hint: str


class InterviewGenerateResponse(BaseModel):
    session_id: str
    role: str
    experience_level: str
    interview_type: str
    difficulty: str
    questions: List[InterviewQuestionItem]
    is_demo_mode: bool = True
    provider_used: str = "curated_question_bank"


class AnswerSubmissionItem(BaseModel):
    question_id: int
    question: str
    category: str
    expected_keywords: List[str] = Field(default_factory=list)
    candidate_answer: str


class InterviewEvaluateRequest(BaseModel):
    session_id: str
    role: str
    interview_type: str = "Technical"
    difficulty: str = "Medium"
    qa_pairs: List[AnswerSubmissionItem]


class QuestionEvaluation(BaseModel):
    question_id: int
    question: str
    score: int = Field(..., ge=0, le=100)
    feedback: str
    matched_keywords: List[str] = Field(default_factory=list)
    missing_keywords: List[str] = Field(default_factory=list)
    sample_answer_snippet: str


class InterviewEvaluateResponse(BaseModel):
    session_id: str
    overall_score: int = Field(..., ge=0, le=100)
    score_grade: str
    summary: str
    category_scores: Dict[str, int]
    question_evaluations: List[QuestionEvaluation]
    strengths: List[str]
    areas_for_improvement: List[str]
    recommended_topics: List[str]
    recommended_practice_questions: List[str]
    is_demo_mode: bool = True
    provider_used: str = "deterministic_rubric_engine"

