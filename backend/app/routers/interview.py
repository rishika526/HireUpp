import logging
from fastapi import APIRouter, HTTPException, status
from app.models_interview import (
    InterviewGenerateRequest,
    InterviewGenerateResponse,
    InterviewEvaluateRequest,
    InterviewEvaluateResponse,
)
from app.services.interview_service import InterviewService

logger = logging.getLogger("hireupp.interview")
router = APIRouter(prefix="/api/interview", tags=["AI Mock Interview"])


@router.post("/generate", response_model=InterviewGenerateResponse)
async def generate_interview_questions(payload: InterviewGenerateRequest):
    """
    POST /api/interview/generate
    Generates structured, calibrated mock interview questions based on:
    - Target role (Java, Python, Full Stack, Frontend, Backend, Data Analyst, Software Engineer)
    - Experience level (Beginner, Intermediate, Advanced)
    - Interview type (Technical, HR, Mixed)
    - Difficulty (Easy, Medium, Hard)
    - Optional candidate resume context & job description keywords
    """
    try:
        logger.info(f"Generating {payload.question_count} questions for role '{payload.role}' ({payload.difficulty})")
        response = InterviewService.generate_questions(payload)
        return response
    except Exception as e:
        logger.error(f"Error generating interview questions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate interview questions. Please try again."
        )


@router.post("/evaluate", response_model=InterviewEvaluateResponse)
async def evaluate_interview_answers(payload: InterviewEvaluateRequest):
    """
    POST /api/interview/evaluate
    Evaluates candidate answers using a transparent deterministic rubric:
    - Technical correctness & expected keyword matching
    - Completeness and depth
    - Structure and clarity
    Returns overall score, rubric category scores, question-by-question breakdown,
    strengths, areas for improvement, and next practice recommendations.
    """
    try:
        logger.info(f"Evaluating {len(payload.qa_pairs)} answers for session '{payload.session_id}'")
        response = InterviewService.evaluate_answers(payload)
        return response
    except Exception as e:
        logger.error(f"Error evaluating interview answers: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to evaluate interview answers. Please try again."
        )

