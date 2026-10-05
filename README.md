# HireUpp — AI-Powered Recruitment & Career Intelligence Platform

Live site- https://hireupp.onrender.com/

**HireUpp** is an all-in-one intelligent recruitment and career preparation ecosystem built with modern technologies:
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Framer Motion
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic v2, PyPDF
- **AI Core**: Large Language Models (Gemini / OpenAI), RAG-ready semantic chunking, and deterministic ATS evaluation fallback (`DEMO_MODE=true`)

---

## Architecture Overview

```
HireUpp/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI application entrypoint with CORS
│   │   ├── config.py                # Environment configurations (no hardcoded keys)
│   │   ├── models.py                # Pydantic schema models
│   │   ├── services/
│   │   │   ├── pdf_service.py       # Safe PDF extraction & byte validation
│   │   │   ├── chunking_service.py  # RAG section chunker for vector DB indexing
│   │   │   ├── llm_service.py       # Gemini & OpenAI provider orchestration
│   │   │   └── analysis_service.py  # Transparent ATS scoring & deterministic fallback
│   │   └── routers/
│   │       ├── health.py            # GET /api/health
│   │       └── resume.py            # POST /api/resume/analyze
│   ├── samples/
│   │   └── Alex_Morgan_Senior_SWE.pdf # Bundled sample resume
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── test_backend.py              # Automated test suite
│
├── src/                             # React + Vite Frontend
│   ├── components/
│   │   ├── layout/ (Navbar, Footer, Layout)
│   │   └── ui/     (ProgressRing, ScoreCard, CompanyCard, ResumeUploader, etc.)
│   ├── pages/      (Home, ResumeAnalyzer, MockInterview, CompanyPrep, Dashboard, Recruiter)
│   └── services/   (api.ts - client API integration)
└── public/
    └── Alex_Morgan_Senior_SWE.pdf   # Preloaded testing PDF for quick demonstration
```

---

## Step-by-Step Setup & Execution

### 1. Install Frontend Dependencies
```bash
# In the project root (HireUpp/)
npm install
```

### 2. Install Backend Dependencies
```bash
# In the backend directory
cd backend
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` in the `backend/` directory:
```bash
cp .env.example .env
```
Key configuration settings:
* `DEMO_MODE=true` (Default: runs the deterministic ATS engine without requiring paid external API keys).
* `LLM_PROVIDER=gemini` or `openai`
* `GEMINI_API_KEY=` (Add your Google Gemini API key here for live LLM inference)
* `OPENAI_API_KEY=` (Or add your OpenAI API key here)

### 4. Start the FastAPI Backend Server
```bash
cd backend
uvicorn app.main:app --port 8000 --reload
# Or run with python launcher:
# py -m uvicorn app.main:app --port 8000 --reload
```
Verify the backend is live:
* Health Check: `http://localhost:8000/api/health`
* Swagger UI Docs: `http://localhost:8000/docs`

### 5. Start the React Frontend Application
```bash
# In the project root (HireUpp/)
npm run dev
```
Open **http://localhost:5173/** in your browser.

---

## Testing the Resume Analysis & ATS Compatibility Flow

1. Navigate to **http://localhost:5173/resume/analyze** in your browser.
2. Verify the top status banner indicates **`Backend API: Connected (FastAPI :8000)`**.
3. Click the **"Load Sample PDF"** button (or upload any standard PDF resume from your machine).
4. Review or edit the target Job Description in the right textarea.
5. Click **"Run Live ATS Scan"**.
6. The application performs real-time text extraction, calculates semantic keyword alignment, and renders:
   * **Overall ATS Compatibility Score** (e.g. 83/100)
   * **Category Score Breakdown**: Skills Match, Experience Relevance, Education, Projects, Keywords, and Role Alignment
   * **Matched Skills** vs **Missing Skills**
   * **Executive AI Diagnostic Summary**
   * **Verified Strengths & Actionable Improvements**
   * **Extracted Work Experience, Education, and Projects**

---

## API Reference

### 1. Health Check
`GET /api/health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "HireUpp Resume Intelligence",
  "version": "1.0.0",
  "mode": "active"
}
```

### 2. Resume & ATS Analysis
`POST /api/resume/analyze`

**Request:** `multipart/form-data`
* `resume`: Binary PDF file (max 10MB)
* `job_description`: (string, optional) Target requisition text

**Response (200 OK):**
```json
{
  "ats_score": 83,
  "summary": "Candidate profile demonstrates strong technical foundation with an estimated ATS compatibility of 83%...",
  "category_scores": {
    "skills_match": 75,
    "experience_relevance": 88,
    "education": 92,
    "projects": 70,
    "keywords": 95,
    "role_alignment": 85
  },
  "skills": ["TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "Redis"],
  "matched_skills": ["AWS", "Docker", "Node.js", "PostgreSQL", "TypeScript"],
  "missing_skills": ["Kafka", "Kubernetes"],
  "education": [
    {
      "institution": "University Institute of Technology",
      "degree": "Bachelor of Technology in Computer Science & Engineering",
      "year": "Graduated 2020"
    }
  ],
  "experience": [
    {
      "company": "CloudScale Systems",
      "role": "Staff Senior Software Engineer",
      "duration": "2022 - Present",
      "highlights": [
        "Architected and deployed 6 microservices on AWS ECS, reducing p99 response times by 38%."
      ]
    }
  ],
  "strengths": [
    {
      "title": "Matched 5 Core Technical Competencies",
      "detail": "Demonstrated verified alignment with key requisition skills: AWS, Docker, Node.js, PostgreSQL.",
      "category": "Skills & Depth"
    }
  ],
  "improvements": [
    {
      "title": "Missing Requisition Keyword: Kafka",
      "impact": "-4 to -6 ATS Points",
      "severity": "High",
      "recommendation": "The target job emphasizes Kafka. Explicitly incorporate relevant event-streaming use cases."
    }
  ],
  "recommended_keywords": ["Kafka", "Kubernetes", "Microservices", "Scalability"],
  "extracted_character_count": 1508,
  "is_demo_mode": true,
  "provider_used": "HireUpp Deterministic ATS Engine (DEMO_MODE=true)"
}
```

**Error Responses:**
* `400 Bad Request`: Non-PDF format, empty file (0 bytes), oversized file (>10MB), or corrupted PDF.
* `500 Internal Server Error`: Parsing or system failure with sanitized message (no sensitive content or API keys exposed).

---

## Running Automated Backend Tests
Run the built-in test suite:
```bash
cd backend
py test_backend.py
```
This tests:
1. `GET /api/health` connectivity
2. `POST /api/resume/analyze` valid PDF analysis
3. Corrupt/non-PDF file rejection (400 Bad Request)
4. Empty PDF rejection (400 Bad Request)
