import logging
from typing import Optional
from fastapi import APIRouter, File, Form, UploadFile, HTTPException, status
from app.models import ResumeAnalysisResponse
from app.services.pdf_service import PDFService
from app.services.analysis_service import AnalysisService

logger = logging.getLogger("hireupp.resume")
router = APIRouter(prefix="/api/resume", tags=["Resume Intelligence"])


@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    resume: UploadFile = File(..., description="PDF Resume file to analyze"),
    job_description: Optional[str] = Form(None, description="Optional target job description text to compare against")
):
    """
    POST /api/resume/analyze
    Analyzes an uploaded PDF resume against a target job description.
    Extracts structured skills, experience, education, projects, ATS compatibility scores,
    matched/missing skills, strengths, improvements, and keyword recommendations.
    """
    try:
        # 1. Safely validate and extract text from PDF
        extracted_text, page_count = await PDFService.extract_text_from_upload(resume)

        logger.info(
            f"Successfully parsed resume '{resume.filename}'. "
            f"Pages: {page_count}, Characters extracted: {len(extracted_text)}"
        )

        # 2. Run ATS and LLM/Deterministic Analysis
        analysis_result = await AnalysisService.analyze(
            resume_text=extracted_text,
            job_description=job_description or ""
        )

        return analysis_result

    except HTTPException:
        # Re-raise known HTTP exceptions with clean user-facing error details
        raise
    except Exception as e:
        logger.error(f"Unexpected error analyzing resume '{resume.filename}': {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected internal error occurred while processing the resume. Please check the file and try again."
        )
