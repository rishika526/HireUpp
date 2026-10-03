import json
import logging
import re
from typing import Dict, Any, Optional, Tuple
import httpx
from app.config import settings

logger = logging.getLogger("hireupp.llm")


SYSTEM_PROMPT = """You are HireUpp AI's Lead Executive ATS & Career Diagnostic Engine.
Your task is to perform an honest, transparent, high-precision ATS compatibility analysis of a candidate's resume against a specific target job description.

You must output STRICT, VALID JSON ONLY. No introductory phrases, no markdown wrapping, no explanation outside JSON.
The JSON must adhere to this exact structure:
{
  "ats_score": <integer 0-100 overall compatibility score>,
  "summary": "<2-3 sentence executive assessment summarizing match strength, seniority alignment, and main gap>",
  "category_scores": {
    "skills_match": <integer 0-100>,
    "experience_relevance": <integer 0-100>,
    "education": <integer 0-100>,
    "projects": <integer 0-100>,
    "keywords": <integer 0-100>,
    "role_alignment": <integer 0-100>
  },
  "skills": ["<extracted skill 1>", "<extracted skill 2>", ...],
  "matched_skills": ["<skill present in both resume and job>", ...],
  "missing_skills": ["<critical skill demanded in job description but absent from resume>", ...],
  "education": [
    {
      "institution": "<university or college name>",
      "degree": "<degree e.g. B.Tech / B.S.>",
      "field_of_study": "<field or major>",
      "year": "<graduation year or duration>"
    }
  ],
  "experience": [
    {
      "company": "<company name>",
      "role": "<job title>",
      "duration": "<dates>",
      "highlights": ["<action-driven achievement 1>", "<achievement 2>"]
    }
  ],
  "projects": [
    {
      "name": "<project name>",
      "description": "<concise summary>",
      "technologies": ["<tech 1>", "<tech 2>"]
    }
  ],
  "certifications": ["<certification name>", ...],
  "strengths": [
    {
      "title": "<concise strength title>",
      "detail": "<explanation citing evidence from resume>",
      "category": "<e.g. Technical Depth, Quantified Impact, Leadership, Architecture>"
    }
  ],
  "improvements": [
    {
      "title": "<concise deficit title>",
      "impact": "<e.g. -5 ATS Points>",
      "severity": "<High, Medium, or Low>",
      "recommendation": "<actionable advice on how candidate can fix this in their resume>"
    }
  ],
  "recommended_keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", ...]
}
"""


class LLMService:
    @classmethod
    def clean_json_response(cls, raw_content: str) -> Dict[str, Any]:
        """
        Strips markdown code fences and extracts clean JSON.
        """
        text = raw_content.strip()
        # Remove ```json or ``` fences if present
        if text.startswith("```"):
            text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
            text = re.sub(r"\s*```$", "", text)
        text = text.strip()

        # Find first { and last }
        start_idx = text.find("{")
        end_idx = text.rfind("}")
        if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
            text = text[start_idx : end_idx + 1]

        return json.loads(text)

    @classmethod
    async def analyze_with_gemini(cls, resume_text: str, job_description: str) -> Optional[Dict[str, Any]]:
        """
        Uses Google Gemini via google-generativeai API.
        """
        if not settings.GEMINI_API_KEY:
            return None

        try:
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-1.5-flash")

            prompt = f"{SYSTEM_PROMPT}\n\nTARGET JOB DESCRIPTION:\n{job_description}\n\n---\n\nCANDIDATE RESUME TEXT:\n{resume_text}"
            response = await model.generate_content_async(prompt)
            
            if response and response.text:
                return cls.clean_json_response(response.text)
        except Exception as e:
            logger.warning(f"Gemini API invocation failed: {e}. Falling back to deterministic demo engine.")
            return None

    @classmethod
    async def analyze_with_openai(cls, resume_text: str, job_description: str) -> Optional[Dict[str, Any]]:
        """
        Uses OpenAI Compatible Chat Completions API.
        """
        if not settings.OPENAI_API_KEY:
            return None

        try:
            headers = {
                "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                "Content-Type": "application/json",
            }
            payload = {
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {
                        "role": "user",
                        "content": f"TARGET JOB DESCRIPTION:\n{job_description}\n\n---\n\nCANDIDATE RESUME TEXT:\n{resume_text}",
                    },
                ],
                "response_format": {"type": "json_object"},
                "temperature": 0.2,
            }
            async with httpx.AsyncClient(timeout=45.0) as client:
                res = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    content = data["choices"][0]["message"]["content"]
                    return cls.clean_json_response(content)
        except Exception as e:
            logger.warning(f"OpenAI API call failed: {e}. Falling back to deterministic demo engine.")
            return None

    @classmethod
    async def analyze_resume(cls, resume_text: str, job_description: str) -> Tuple[Dict[str, Any], bool, str]:
        """
        Orchestrates LLM call based on config.
        Returns:
            Tuple of (analysis_dict, is_demo_mode, provider_used)
        """
        # If explicitly in DEMO_MODE, bypass external network calls
        if settings.DEMO_MODE:
            return None, True, "demo_mode"

        # Try Gemini if configured
        if settings.LLM_PROVIDER == "gemini" and settings.GEMINI_API_KEY:
            result = await cls.analyze_with_gemini(resume_text, job_description)
            if result:
                return result, False, "gemini-1.5-flash"

        # Try OpenAI if configured
        if settings.LLM_PROVIDER == "openai" and settings.OPENAI_API_KEY:
            result = await cls.analyze_with_openai(resume_text, job_description)
            if result:
                return result, False, "gpt-4o-mini"

        # If none succeeded, fallback to demo mode
        return None, True, "deterministic_fallback"
