import os

def create_sample_resume_pdf(output_path: str):
    """
    Creates an exact byte-aligned valid PDF resume with selectable text.
    """
    content = """BT
/F1 18 Tf
50 740 Td
(ALEX MORGAN) Tj
/F1 11 Tf
0 -24 Td
(Senior Full-Stack & Distributed Systems Engineer | alex.morgan@hireupp.io) Tj
0 -18 Td
(-----------------------------------------------------------------------------------------------------) Tj
/F1 14 Tf
0 -24 Td
(PROFESSIONAL SUMMARY) Tj
/F1 10 Tf
0 -16 Td
(Senior Software Engineer with 4.5+ years experience building distributed backends and high-volume APIs.) Tj
0 -14 Td
(Expert in TypeScript, Node.js, Python, PostgreSQL, Docker, Redis, and Amazon Web Services (AWS).) Tj
/F1 14 Tf
0 -24 Td
(WORK EXPERIENCE) Tj
/F1 11 Tf
0 -18 Td
(Staff Senior Software Engineer | CloudScale Systems (2022 - Present)) Tj
/F1 10 Tf
0 -15 Td
(- Architected and deployed 6 microservices on AWS ECS, reducing p99 response times by 38% for 450K DAU.) Tj
0 -14 Td
(- Optimized database indexing and PostgreSQL query plans, decreasing query latency by 42%.) Tj
0 -14 Td
(- Implemented Redis distributed caching layer handling 15,000 requests per second with 99.99% availability.) Tj
/F1 11 Tf
0 -18 Td
(Software Engineer | NextGen Technologies (2020 - 2022)) Tj
/F1 10 Tf
0 -15 Td
(- Built REST and GraphQL endpoints in Node.js and TypeScript, supporting cross-platform web and mobile clients.) Tj
0 -14 Td
(- Designed automated CI/CD pipeline in Docker and GitHub Actions, cutting release cycles from 3 days to 4 hours.) Tj
/F1 14 Tf
0 -24 Td
(EDUCATION) Tj
/F1 10 Tf
0 -16 Td
(Bachelor of Technology in Computer Science & Engineering | University Institute of Technology (2016 - 2020)) Tj
/F1 14 Tf
0 -24 Td
(TECHNICAL SKILLS) Tj
/F1 10 Tf
0 -16 Td
(Languages: TypeScript, JavaScript, Python, SQL, Go) Tj
0 -14 Td
(Backend & Web: Node.js, Express, FastAPI, React, Next.js, GraphQL, REST APIs) Tj
0 -14 Td
(Database & Cloud: PostgreSQL, Redis, MongoDB, AWS S3, AWS ECS, Docker, CI/CD, Git) Tj
0 -14 Td
(Methodologies: Distributed Systems, System Design, Microservices, Unit Testing, Agile) Tj
ET"""

    header = b"%PDF-1.4\n"
    
    obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    obj2 = b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
    obj3 = b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n"
    obj4 = b"4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
    
    content_bytes = content.encode("utf-8")
    obj5 = f"5 0 obj\n<< /Length {len(content_bytes)} >>\nstream\n".encode("utf-8") + content_bytes + b"\nendstream\nendobj\n"

    offsets = []
    current_offset = len(header)
    
    offsets.append(current_offset)
    current_offset += len(obj1)
    
    offsets.append(current_offset)
    current_offset += len(obj2)
    
    offsets.append(current_offset)
    current_offset += len(obj3)
    
    offsets.append(current_offset)
    current_offset += len(obj4)
    
    offsets.append(current_offset)
    current_offset += len(obj5)

    xref_offset = current_offset

    xref = f"xref\n0 6\n0000000000 65535 f \n"
    for off in offsets:
        xref += f"{off:010d} 00000 n \n"
    
    trailer = f"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n"

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(header)
        f.write(obj1)
        f.write(obj2)
        f.write(obj3)
        f.write(obj4)
        f.write(obj5)
        f.write(xref.encode("utf-8"))
        f.write(trailer.encode("utf-8"))

    print(f"Sample resume PDF created successfully at: {output_path}")

if __name__ == "__main__":
    import sys
    out = sys.argv[1] if len(sys.argv) > 1 else "Alex_Morgan_Senior_SWE.pdf"
    create_sample_resume_pdf(out)
