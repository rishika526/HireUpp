import asyncio
import os
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    print("\n--- 1. Testing GET /api/health ---")
    response = client.get("/api/health")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    print("Health response:", data)
    assert data["status"] == "ok"
    assert "HireUpp" in data["service"]
    print("PASSED: Health check verified.")

def test_resume_analyze_endpoint():
    print("\n--- 2. Testing POST /api/resume/analyze (Valid PDF + Job Description) ---")
    sample_pdf_path = os.path.join(os.path.dirname(__file__), "samples", "Alex_Morgan_Senior_SWE.pdf")
    assert os.path.exists(sample_pdf_path), f"Sample file not found at {sample_pdf_path}"

    job_description = """
    We are seeking a Senior Backend & Distributed Systems Engineer.
    Required Skills:
    - 4+ years software development experience with TypeScript, Node.js, and Python
    - Strong database design in PostgreSQL and Redis distributed caching
    - Experience in Docker, AWS (ECS / S3), and Microservices architecture
    - Nice to have: Apache Kafka and Kubernetes cluster deployment
    """

    with open(sample_pdf_path, "rb") as f:
        files = {"resume": ("Alex_Morgan_Senior_SWE.pdf", f, "application/pdf")}
        data = {"job_description": job_description}
        response = client.post("/api/resume/analyze", files=files, data=data)

    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    result = response.json()
    print(f"ATS Compatibility Score: {result['ats_score']}%")
    print(f"Summary: {result['summary'][:120]}...")
    print(f"Category Scores: {result['category_scores']}")
    print(f"Matched Skills ({len(result['matched_skills'])}): {result['matched_skills']}")
    print(f"Missing Skills ({len(result['missing_skills'])}): {result['missing_skills']}")
    print(f"Strengths ({len(result['strengths'])}): {[s['title'] for s in result['strengths']]}")
    print(f"Improvements ({len(result['improvements'])}): {[i['title'] for i in result['improvements']]}")
    print(f"Demo Mode: {result['is_demo_mode']}, Provider: {result['provider_used']}")

    assert result["ats_score"] > 50, "ATS score should be realistic and > 50"
    assert len(result["matched_skills"]) > 0, "Should have matched skills"
    assert "TypeScript" in result["matched_skills"] or "Node.js" in result["matched_skills"]
    assert "Kafka" in result["missing_skills"] or "Kubernetes" in result["missing_skills"]
    print("PASSED: Resume Analysis end-to-end endpoint verified.")

def test_resume_analyze_invalid_file():
    print("\n--- 3. Testing POST /api/resume/analyze (Invalid file error handling) ---")
    files = {"resume": ("malicious.txt", b"This is not a PDF file", "text/plain")}
    response = client.post("/api/resume/analyze", files=files)
    assert response.status_code == 400, f"Expected 400 Bad Request, got {response.status_code}"
    print(f"Error caught as expected: {response.json()['detail']}")
    print("PASSED: File validation error handling verified.")

def test_resume_analyze_empty_file():
    print("\n--- 4. Testing POST /api/resume/analyze (Empty PDF error handling) ---")
    files = {"resume": ("empty.pdf", b"", "application/pdf")}
    response = client.post("/api/resume/analyze", files=files)
    assert response.status_code == 400, f"Expected 400 Bad Request, got {response.status_code}"
    print(f"Error caught as expected: {response.json()['detail']}")
    print("PASSED: Empty file validation error handling verified.")

if __name__ == "__main__":
    test_health_endpoint()
    test_resume_analyze_endpoint()
    test_resume_analyze_invalid_file()
    test_resume_analyze_empty_file()
    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY! Ready for frontend integration.")
