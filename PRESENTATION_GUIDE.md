# HireUpp — Project Presentation & Evaluation Guide

**Project Title:** HireUpp — AI-Powered Smart Career Preparation & Recruitment Intelligence Platform  
**Target Audience:** External Project Evaluator / Guide / Viva Panel  
**Student Level:** Computer Science & Engineering (B.Tech / B.E.)  
**Live Application:** [https://hireupp.onrender.com/](https://hireupp.onrender.com/)  
**GitHub Repository:** [https://github.com/rishika526/HireUpp](https://github.com/rishika526/HireUpp)  

---

## A. Project Overview

### 1. What is HireUpp?
HireUpp is a unified career acceleration and recruitment intelligence platform. It bridges the gap between college graduates preparing for technical placements and recruiters screening candidates for engineering roles.

### 2. What problem does it solve?
* **For Candidates:** Over 75% of job applicants are rejected by automated Applicant Tracking Systems (ATS) due to formatting anomalies or missing technical keywords. Furthermore, students lack realistic technical interview practice with automated, objective feedback.
* **For Recruiters:** Hiring teams receive hundreds of unstructured PDF resumes and spend dozens of hours manually matching required skills against job descriptions.

### 3. Who are its users?
1. **Job Seekers / Students (Candidate Mode):** Upload PDF resumes for ATS benchmarking, practice live technical/HR mock interviews with voice input, follow structured learning roadmaps, and track company-specific placement syllabi.
2. **Hiring Managers / Recruiters (Recruiter Mode):** Post engineering requisitions, review incoming candidate applications, assess semantic skill-match percentages, and manage candidates through an interactive recruitment pipeline.

### 4. What is its main objective?
To provide an end-to-end, demonstrable software system combining PDF text extraction, ATS compatibility evaluation, browser-based voice interview simulation, and structured interview curricula within a modern, responsive web application.

---

## B. Complete Technology Stack

Every technology listed below is actually implemented in this repository:

1. **React 19:** Frontend UI library used for building interactive, component-driven single-page interfaces with declarative state management.
2. **TypeScript:** Strongly-typed programming language that extends JavaScript, providing static type checking across models, API responses, and UI props.
3. **Vite:** High-performance frontend build tool and development server providing lightning-fast Hot Module Replacement (HMR) and optimized Rollup production bundling.
4. **Tailwind CSS (v4):** Modern utility-first CSS framework providing responsive grid layouts, purple/blue gradients, glassmorphism cards, and dark SaaS styling.
5. **Python 3.10+:** Robust backend language used for data parsing, natural language processing, and web microservice development.
6. **FastAPI:** High-performance asynchronous Python web framework used for exposing RESTful API endpoints with automatic Swagger documentation and Pydantic schema validation.
7. **Uvicorn:** Lightning-fast ASGI (Asynchronous Server Gateway Interface) web server used to run the FastAPI application.
8. **PyPDF:** Pure-Python PDF library used in the backend to open uploaded resume files, inspect page streams, and extract clean text.
9. **Browser Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`):** Native browser voice-to-text API allowing candidates to speak their interview responses aloud with real-time text transcription.
10. **Browser SpeechSynthesis API (`window.speechSynthesis`):** Native browser speech synthesis engine used to read interview questions aloud to candidates.
11. **Browser MediaDevices API (`navigator.mediaDevices.getUserMedia`):** Native browser API used to display a 100% local video preview mirror for candidates during mock interviews.
12. **Lucide React & Framer Motion:** Icon library and animation toolkit used for smooth interface transitions, status rings, and modal dialogues.
13. **Render Cloud:** Cloud hosting platform running the frontend static build and the FastAPI backend service.

---

## C. Complete System Architecture

```text
+-----------------------------------------------------------------------------------+
|                                CLIENT BROWSER (Vite + React 19 + TypeScript)      |
|                                                                                   |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | Resume Analyzer UI |  | Mock Interview UI  |  | Company Prep & Dashboard UI |  |
|  +---------+----------+  +---------+----------+  +--------------+--------------+  |
|            |                       |                            |                 |
|            | Web Speech / Media    | Web Speech (TTS / STT)     | LocalStorage    |
|            | FormData (multipart)  | JSON REST Payload          | Offline Cache   |
+------------|-----------------------|----------------------------|-----------------+
             |                       |                            |
             v                       v                            |
+-------------------------------------------------------------+   |
|                 BACKEND SERVICE (FastAPI + Python + Uvicorn)|   |
|                                                             |   |
|  [POST /api/resume/analyze]       [POST /api/interview/...] |   |
|  - Multipart file stream reader   - /generate (Curated Bank)|   |
|  - PyPDF Text Extraction          - /evaluate (Rubric Engine|   |
|  - Keyword Taxonomy NLP Match     - Role & Difficulty Filter|   |
|  - Category ATS Scoring Algorithm - Strengths & Improvements|   |
|                                                             |   |
|  [Optional External Services via Backend Config (.env)]     |   |
|  - Google Gemini 1.5 Flash (via google-generativeai)        |   |
|  - OpenAI gpt-4o-mini (via HTTPX JSON client)               |   |
|  - Automatic Deterministic Fallback if in DEMO_MODE         |   |
+-------------------------------------------------------------+---+
```

---

## D. Resume Analyzer Workflow

### Step-by-Step Flow:
1. **User Upload:** Candidate selects a PDF file or clicks "Load Sample Candidate PDF" on `src/pages/ResumeAnalyzer.tsx`.
2. **Form Submission:** `analyzeResumeApi` (`src/services/api.ts`) packages the file and target job description into a `multipart/form-data` POST request to `/api/resume/analyze`.
3. **Backend Validation:** FastAPI route (`backend/app/routers/resume.py`) verifies the file extension (`.pdf`), MIME type, and size limit (max 10MB).
4. **Text Extraction:** `PDFService.extract_text_from_upload` (`backend/app/services/pdf_service.py`) reads the binary stream using `pypdf.PdfReader` and iterates over each page to extract raw text.
5. **Diagnostic Processing:** `AnalysisService.analyze` (`backend/app/services/analysis_service.py`) scans the extracted text against an engineering taxonomy (languages, databases, frameworks, cloud tools). If an LLM API key is present and `DEMO_MODE=False`, it queries Gemini/OpenAI; otherwise, it executes the deterministic ATS scoring algorithm.
6. **ATS Scoring:** Calculates scores across 6 distinct categories: Skills Match, Experience Relevance, Education Match, Projects Depth, Keyword Density, and Seniority Alignment.
7. **Frontend Display:** Returns structured JSON to `ResumeAnalyzer.tsx`, updating the ATS progress ring, matched vs missing skills badges, action-verb strengths, and improvement recommendations.
8. **Session Handoff:** Caches the result to `localStorage` (`hireupp_latest_resume_analysis`) so the Candidate Dashboard and Mock Interview can read candidate skills directly.

* **Primary Endpoint:** `POST /api/resume/analyze`
* **Backend Source Files:** `backend/app/routers/resume.py`, `backend/app/services/pdf_service.py`, `backend/app/services/analysis_service.py`
* **Frontend Source Files:** `src/pages/ResumeAnalyzer.tsx`, `src/services/api.ts`

---

## E. Mock Interview Workflow

### Step-by-Step Flow:
1. **Configuration Screen:** The candidate selects target role (e.g., Full Stack, Java, Python), seniority (Beginner, Intermediate, Advanced), interview type (Technical, HR, Mixed), difficulty (Easy, Medium, Hard), and question count (5, 10, 15). They can paste a job description or click **"Import from Latest Resume Scan"** to load their verified skills.
2. **Question Generation:** Calls `POST /api/interview/generate`. `InterviewService.generate_questions` selects calibrated questions from the repository, prioritizing prompts matching the candidate's skills and target difficulty. If offline, `src/services/interviewApi.ts` provides instant fallback questions.
3. **Active Interview Room:**
   * **Question Display:** Shows question topic, category, progress bar ("Question X of Y"), and live timer.
   * **Audio Readout (TTS):** Candidate can click "Read Aloud" to trigger browser `window.speechSynthesis`.
   * **Voice-to-Text (STT):** Candidate can click "Voice to Text" to activate browser `SpeechRecognition`. Recognized words stream into the textarea, where candidates can edit or type further.
   * **Optional Local Camera Preview:** Clicking "Enable Camera" invokes `navigator.mediaDevices.getUserMedia` for self-monitoring. Clicking "Stop Camera" terminates all hardware tracks. No video is recorded or sent to any server.
4. **Answer Evaluation:** Submitting answers calls `POST /api/interview/evaluate`. `InterviewService.evaluate_answers` calculates:
   * **Keyword Coverage (up to 50 pts):** Density of expected architectural terms.
   * **Completeness & Depth (up to 30 pts):** Evaluates word count and depth.
   * **Clarity & Structure (up to 20 pts):** Detects technical connectives ("for example", "trade-off", "because").
5. **Structured Feedback Report:** Generates overall score (0–100), letter grade (e.g. A, B+), rubric breakdown, question-wise matched vs missing concepts, model answers, strengths, and areas to improve.
6. **Persistence:** Saves session to `localStorage` (`hireupp_interview_sessions`) to populate the Candidate Dashboard.

* **Primary Endpoints:** `POST /api/interview/generate`, `POST /api/interview/evaluate`
* **Backend Source Files:** `backend/app/routers/interview.py`, `backend/app/services/interview_service.py`, `backend/app/models_interview.py`
* **Frontend Source Files:** `src/pages/MockInterview.tsx`, `src/services/interviewApi.ts`

---

## F. Other Platform Features

1. **Company-Wise Preparation (`src/pages/CompanyPrep.tsx`):**
   * Curated preparation tracks for 7 tier-1 organizations: **Infosys, TCS, Wipro, Accenture, Cognizant, Deloitte, and Capgemini**.
   * Each track includes company overview, indicative recruitment stages, aptitude topics, programming concepts, technical interview Q&A, HR guidance, coding exercises, and an **interactive preparation checklist** saved in `localStorage`.
   * Includes a clear disclaimer noting patterns are indicative educational guides.
2. **Structured Interview Preparation Hub (`src/pages/PreparationHub.tsx`):**
   * 15 organized modules across **Programming** (Java, Python, C, C++), **CS Fundamentals** (DSA, DBMS, OS, Computer Networks, OOP, SQL), and **Web Development** (HTML/CSS, JavaScript, React, Node.js, REST APIs).
   * Includes core concepts, code architecture examples, model Q&A, and persistent "Mark as Completed" tracking.
3. **Candidate Dashboard (`src/pages/Dashboard.tsx`):**
   * Integrates live data from the candidate's latest resume analysis (`hireupp_latest_resume_analysis`), recorded mock interview sessions (`hireupp_interview_sessions`), and curriculum completed modules (`hireupp_prep_completed_topics`).
   * Clearly marked as demo candidate profile ("Alex Morgan").
4. **Recruiter Intelligence Console (`src/pages/RecruiterHub.tsx` & `src/pages/RecruiterCandidates.tsx`):**
   * Features a realistic sample requisition: **Software Engineer — Full Stack** (React, TypeScript, Node.js, SQL, 0–2 years).
   * Displays pipeline funnel (Applied -> Screened -> Interviewed -> Shortlisted -> Offer).
   * Searchable candidate database with skill matching percentage, resume scores, profile drawer, and quick shortlisting actions.

---

## G. Important Code Snippets (From Actual Repository)

### 1. Frontend API Call (`src/services/api.ts`)
```typescript
export async function analyzeResumeApi(
  file: File,
  jobDescription: string
): Promise<ResumeAnalysisResponse> {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription.trim()) {
    formData.append('job_description', jobDescription.trim());
  }

  const res = await fetch(`${API_BASE}/api/resume/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || `Server error ${res.status}`);
  }
  return await res.json();
}
```

### 2. FastAPI Route (`backend/app/routers/resume.py`)
```python
@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    resume: UploadFile = File(..., description="PDF Resume file to analyze"),
    job_description: Optional[str] = Form(None)
):
    extracted_text, page_count = await PDFService.extract_text_from_upload(resume)
    analysis_result = await AnalysisService.analyze(
        resume_text=extracted_text,
        job_description=job_description or ""
    )
    return analysis_result
```

### 3. PDF Extraction Service (`backend/app/services/pdf_service.py`)
```python
class PDFService:
    @classmethod
    async def extract_text_from_upload(cls, upload_file: UploadFile) -> Tuple[str, int]:
        contents = await upload_file.read()
        pdf_stream = io.BytesIO(contents)
        reader = pypdf.PdfReader(pdf_stream)
        
        extracted_pages = []
        for page_idx, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            if page_text.strip():
                extracted_pages.append(page_text.strip())
                
        return "\n\n--- Page Break ---\n\n".join(extracted_pages), len(reader.pages)
```

### 4. Speech-to-Text (`src/pages/MockInterview.tsx`)
```typescript
const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRec();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.onresult = (event: any) => {
  let finalChunk = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalChunk += event.results[i][0].transcript;
    }
  }
  if (finalChunk.trim()) {
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: (prev[currentIdx] || '') + ' ' + finalChunk.trim()
    }));
  }
};
recognition.start();
```

### 5. Text-to-Speech (`src/pages/MockInterview.tsx`)
```typescript
const speakCurrentQuestion = () => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(questions[currentIdx].question);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
};
```

### 6. Transparent Rubric Scoring (`backend/app/services/interview_service.py`)
```python
# 1. Keyword coverage: up to 50 pts
kw_ratio = len(matched_kw) / max(len(pair.expected_keywords), 1)
kw_points = round(kw_ratio * 50)

# 2. Completeness / Length: up to 30 pts
if word_count < 5: length_points = 5
elif word_count < 15: length_points = 12
elif word_count < 30: length_points = 22
elif word_count <= 250: length_points = 30
else: length_points = 26

# 3. Structure & Clarity: up to 20 pts
base_clarity = 10 if word_count >= 15 else 5
structure_markers = ["for example", "because", "such as", "result", "in order to", "trade-off"]
marker_matches = sum(1 for m in structure_markers if m in ans_lower)
structure_points = min(20, base_clarity + marker_matches * 4)

q_score = min(100, max(0, kw_points + length_points + structure_points))
```

---

## H. What Is Actually Implemented vs Future Scope

| Feature / Module | Implementation Status | Technologies Used | Remaining Future Work |
| :--- | :--- | :--- | :--- |
| **PDF Resume Parsing** | Fully Implemented & Verified | Python, PyPDF, FastAPI | Multi-column layout OCR using Tesseract for scanned image PDFs |
| **ATS Compatibility Engine** | Fully Implemented & Tested | Python, NLP Taxonomy Regex, Pydantic | Multi-language resume parsing (e.g. German, French) |
| **LLM Career Diagnostic** | Optional Backend Integration with Deterministic Fallback | Google Gemini API, OpenAI API, FastAPI | Dedicated self-hosted HuggingFace open-source model |
| **AI Mock Interview Setup** | Fully Implemented & Verified | React 19, TypeScript, Tailwind | Dynamic timed countdown per question with auto-submit |
| **Voice-to-Text (STT)** | Fully Implemented & Verified | Browser Web Speech API | Whisper API integration for browsers lacking Web Speech support |
| **Text-to-Speech (TTS)** | Fully Implemented & Verified | Browser SpeechSynthesis API | Custom neural voice synthesis with adjustable accents |
| **Local Webcam Preview** | Fully Implemented & Verified | Browser `getUserMedia` | None (intentionally local-only for candidate privacy) |
| **Interview Feedback Report**| Fully Implemented & Tested | FastAPI Rubric Engine + Client Fallback | PDF export of evaluation certificate |
| **Company-Wise Preparation** | Fully Implemented (7 Companies) | React 19, LocalStorage | Community question crowdsourcing and submission portal |
| **Topic Preparation Hub** | Fully Implemented (15 Modules) | React 19, LocalStorage | Interactive in-browser code execution sandbox (e.g., Monaco Editor) |
| **Candidate Dashboard** | Fully Implemented | React 19, LocalStorage State Sync | Full database persistence (PostgreSQL / Supabase auth) |
| **Recruiter Dashboard** | Fully Implemented (Demo Mode) | React 19, TypeScript | Real multi-tenant recruiter login, ATS email integrations |

---

## I. Possible External Guide Questions & Answers

### 1. Why did you choose this project?
"Most students prepare for interviews using scattered platforms—LeetCode for coding, YouTube for HR questions, and generic word processors for resumes. HireUpp unites the entire journey: analyzing your resume against target job descriptions, diagnosing ATS deficits, and simulating the actual technical interview with voice input."

### 2. What is an ATS and why does it reject resumes?
"ATS stands for Applicant Tracking System. Enterprises use systems like Workday or Greenhouse to parse resumes into database records. If a resume has complex multi-column tables, graphics, non-standard section headers, or lacks the exact technical keywords specified in the job requisition, the ATS assigns a low match score and filters it out before human review."

### 3. What is FastAPI and why did you choose it over Flask or Django?
"FastAPI is a modern, high-performance Python web framework based on Starlette and Pydantic. It provides native asynchronous (`async/await`) execution, automatic data validation, and automatic OpenAPI Swagger documentation. It is significantly faster than Flask and much lighter than Django for building microservices."

### 4. Why use React with TypeScript on the frontend and Python on the backend?
"React with TypeScript provides component reusability, modular UI state, and compile-time type safety for complex workflows. Python is the industry standard for text parsing, natural language processing, and AI integrations. Separating them via a clean REST API allows independent deployment and scaling."

### 5. How does PDF text extraction work in your backend?
"When a PDF is uploaded, FastAPI streams the file bytes into a memory buffer (`io.BytesIO`). PyPDF's `PdfReader` parses the PDF object cross-reference tables, iterates through the document pages, and extracts the text streams, joining them cleanly while preserving line breaks."

### 6. How is the ATS score calculated in your system?
"The ATS score is a weighted composite score across 6 categories: Skills Match (30%), Experience Relevance (25%), Keyword Density (20%), Project Depth (10%), Education Match (10%), and Seniority Alignment (5%). The algorithm checks word boundaries against our technical skill taxonomy and cross-references them with the target job description."

### 7. What is RAG and is it used here?
"RAG stands for Retrieval-Augmented Generation. It retrieves external domain knowledge (like company interview questions) and injects it into an LLM prompt as context. In HireUpp, we implement curated retrieval: our backend searches our question repository matching the candidate's resume skills and target company to generate contextually relevant questions."

### 8. What is an LLM? How does HireUpp use it?
"An LLM (Large Language Model) is a deep neural network trained on vast text corpora. In HireUpp, when API keys are configured, Gemini 1.5 Flash or OpenAI GPT-4o-mini is prompted to perform deep career assessments. If keys are absent or `DEMO_MODE=True`, HireUpp gracefully falls back to its deterministic rule engine, ensuring zero downtime."

### 9. How does Speech-to-Text work in your Mock Interview?
"We utilize the browser's native Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`). When the candidate clicks 'Voice to Text', the browser requests microphone permission, streams audio to its local speech recognition engine, and delivers transcribed text chunks that append directly into the answer input area."

### 10. How does Text-to-Speech work in your Mock Interview?
"We utilize the browser's `window.speechSynthesis` API. When triggered, it creates a `SpeechSynthesisUtterance` containing the interview question and synthesizes natural audio output through the candidate's speakers or headphones."

### 11. How is the candidate's interview answer evaluated?
"Evaluation is performed via an objective rubric analyzing three pillars:
1. Technical Correctness (up to 50%): Detection of essential domain keywords.
2. Completeness (up to 30%): Evaluation of answer depth and word count.
3. Clarity & Structure (up to 20%): Presence of explanatory connectives ('for example', 'trade-off', 'because')."

### 12. What is the difference between Frontend and Backend in your project?
"The Frontend (React + Vite) runs entirely in the user's web browser, managing UI rendering, voice recognition, and local view routing. The Backend (FastAPI + Python) runs on a cloud server, executing secure PDF byte extraction, ATS calculations, and interview evaluations."

### 13. How is the application deployed?
"HireUpp is deployed on Render. The frontend is built into static HTML, CSS, and JavaScript bundles via Vite. The backend runs as a Python web service managed by Uvicorn. Both communicate over HTTPS with CORS protection."

### 14. What are the current limitations of the system?
"1. Web Speech API availability depends on browser support (Chromium-based browsers like Chrome and Edge provide native support, whereas Firefox has limited support).
2. The current database layer uses browser LocalStorage for session persistence rather than a centralized multi-tenant PostgreSQL database.
3. Scanned image PDFs without selectable text require OCR preprocessing."

### 15. What is the future scope for this project?
"1. Introducing a live in-browser coding IDE with unit test compilation.
2. Integrating Whisper API for universal cross-browser speech transcription.
3. Adding multi-tenant PostgreSQL authentication for candidates and recruiters.
4. Enabling automated recruiter video interview invitations via email."

---

## J. Presentation Demonstration Flow

### Recommended 5-Minute Evaluation Demo Sequence:
1. **Minute 1: Introduction & Homepage (0:00 - 1:00)**
   * Open [https://hireupp.onrender.com/](https://hireupp.onrender.com/).
   * State the problem: *"College candidates struggle with ATS resume rejection and lack live technical interview practice."*
   * Point out the clean dark SaaS design and candidate/recruiter mode switcher.
2. **Minute 2: Resume Analyzer Demonstration (1:00 - 2:00)**
   * Navigate to **Resume -> Deep Diagnostic** (`/resume/analyze`).
   * Click **"Load Sample PDF"** (`Alex_Morgan_Senior_SWE.pdf`).
   * Show the real-time processing stages: PyPDF text extraction -> ATS scoring -> Keyword matching.
   * Highlight the 83% ATS score, matched vs missing skills, and actionable improvement recommendations.
3. **Minute 3: AI Mock Interview Room (2:00 - 3:30)**
   * Navigate to **Mock Interview** (`/interview/mock`).
   * In Setup, click **"Import from Latest Resume Scan"** to show seamless cross-module integration.
   * Select *Full Stack Developer*, 5 questions, Medium difficulty, and click **"Begin Mock Interview"**.
   * Demonstrate **Text-to-Speech**: Click "Read Aloud" to hear the question.
   * Demonstrate **Speech-to-Text**: Click "Voice to Text", speak an answer, and show the words transcribing live into the textarea.
   * Demonstrate **Local Webcam Mirror**: Click "Enable Camera" to show the local video preview, then click "Stop Camera".
   * Click **"Submit & View AI Feedback"** to showcase the Evaluation Report (overall score, grade, matched keywords, and model answers).
4. **Minute 4: Company Playbooks & Structured Prep (3:30 - 4:15)**
   * Open **Preparation -> Target Companies** (`/preparation/companies`).
   * Show the 7 companies (TCS, Infosys, Deloitte, etc.). Show recruitment stages, model answers, and tick a checklist item.
   * Open **Preparation Hub** (`/preparation`). Show the 15 modules across Programming, CS Fundamentals, and Web Dev.
5. **Minute 5: Recruiter Console & Architecture (4:15 - 5:00)**
   * Switch the navbar toggle to **Recruiter Mode** (`/recruiter`).
   * Showcase the featured job requisition (*"Software Engineer — Full Stack"*), candidate pipeline status bar, and applicant screening table.
   * Conclude by summarizing the technology stack: *React, TypeScript, FastAPI, PyPDF, and Web Speech APIs*.

---

### 2-Minute Spoken Project Explanation (Read Aloud Script):
> *"Good morning, respected guide. Today I am presenting **HireUpp**, an AI-powered smart recruitment and interview preparation platform.
>
> In today's hiring landscape, over 75% of resumes are filtered out by automated ATS software before a recruiter ever sees them. At the same time, college students lack realistic environments to practice answering technical questions under simulated panel conditions.
>
> HireUpp solves both sides of this problem. 
> On the candidate side, our platform features an **ATS Resume Intelligence Engine**. Built using Python, FastAPI, and PyPDF, it extracts text from PDF resumes, cross-references technical taxonomies, and computes multi-category ATS compatibility scores with pinpoint missing-skill feedback.
>
> Next, our **AI Mock Interview Room** allows candidates to simulate live technical interviews. We utilize the browser's Web Speech API for real-time speech-to-text transcription, speech synthesis for audible question readouts, and an optional local video mirror. Answers are evaluated using a transparent rubric analyzing technical keywords, depth, and clarity.
>
> Furthermore, we have built **Company-Wise Preparation Playbooks** covering companies like TCS, Infosys, and Deloitte, alongside a structured **15-module CS and Web Development learning curriculum**.
>
> Finally, our **Recruiter Console** provides hiring teams with pipeline analytics and automated skill matching against requisitions.
>
> The entire frontend is built with React 19, TypeScript, and Tailwind CSS, communicating with our asynchronous FastAPI backend. The project is fully functional, deployed on Render, and ready for demonstration. Thank you."*

