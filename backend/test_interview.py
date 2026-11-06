from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_generate_interview_questions():
    print("\n--- Testing POST /api/interview/generate ---")
    payload = {
        "role": "Java Developer",
        "experience_level": "Intermediate",
        "interview_type": "Technical",
        "question_count": 5,
        "difficulty": "Medium",
        "resume_context": "Hands on with Spring Boot, Java collections, and PostgreSQL query tuning.",
        "job_description": "Looking for a Java developer experienced in JVM performance and microservices."
    }
    response = client.post("/api/interview/generate", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    print("Session ID:", data["session_id"])
    print(f"Generated {len(data['questions'])} questions for {data['role']}")
    assert len(data["questions"]) == 5
    assert data["role"] == "Java Developer"
    for q in data["questions"]:
        print(f"  [{q['id']}] ({q['category']}/{q['topic']}) {q['question'][:70]}...")
        assert len(q["expected_keywords"]) > 0
    print("PASSED: Question generation verified.")

def test_evaluate_interview_answers():
    print("\n--- Testing POST /api/interview/evaluate ---")
    eval_payload = {
        "session_id": "test-session-123",
        "role": "Java Developer",
        "interview_type": "Technical",
        "difficulty": "Medium",
        "qa_pairs": [
            {
                "question_id": 1,
                "question": "Explain the difference between HashMap and ConcurrentHashMap.",
                "category": "Technical",
                "expected_keywords": ["synchronized", "thread-safe", "bucket-level locking", "concurrency"],
                "candidate_answer": "ConcurrentHashMap is thread-safe and utilizes bucket-level locking or synchronized segments so multiple threads can read and write concurrently without locking the entire table."
            },
            {
                "question_id": 2,
                "question": "Explain the JVM memory model, particularly Heap vs Stack.",
                "category": "Technical",
                "expected_keywords": ["heap", "stack", "garbage collection", "thread", "object references"],
                "candidate_answer": "Stack memory stores local primitive variables and method execution frames per thread, while Heap memory stores objects and instances managed by the garbage collector."
            }
        ]
    }
    response = client.post("/api/interview/evaluate", json=eval_payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    print("Overall Score:", data["overall_score"], data["score_grade"])
    print("Category Scores:", data["category_scores"])
    print("Strengths:", data["strengths"])
    print("Areas for improvement:", data["areas_for_improvement"])
    assert data["overall_score"] > 60
    assert len(data["question_evaluations"]) == 2
    assert data["is_demo_mode"] is True
    print("PASSED: Answer evaluation verified.")

if __name__ == "__main__":
    test_generate_interview_questions()
    test_evaluate_interview_answers()
    print("\nALL INTERVIEW BACKEND TESTS PASSED SUCCESSFULLY!")

