import re
from typing import List, Dict, Any


class ResumeChunk:
    def __init__(self, section: str, text: str, metadata: Dict[str, Any] = None):
        self.section = section
        self.text = text
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "section": self.section,
            "text": self.text,
            "metadata": self.metadata,
        }


class ChunkingService:
    """
    RAG Pre-processing boundary:
    Prepares extracted document text by semantic sections for downstream vector database indexing (e.g. Qdrant / Pinecone / Chroma).
    """

    KNOWN_SECTION_HEADERS = [
        "education",
        "experience",
        "work experience",
        "employment history",
        "projects",
        "technical projects",
        "skills",
        "technical skills",
        "certifications",
        "awards",
        "summary",
        "professional summary",
    ]

    @classmethod
    def chunk_resume_text(cls, raw_text: str, chunk_size: int = 500) -> List[Dict[str, Any]]:
        """
        Splits resume into semantic section chunks suitable for vector embeddings.
        """
        lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
        chunks: List[ResumeChunk] = []

        current_section = "general"
        current_buffer = []

        for line in lines:
            normalized_line = re.sub(r"[^\w\s]", "", line.lower()).strip()
            
            # Check if this line is a section header
            if normalized_line in cls.KNOWN_SECTION_HEADERS or any(
                normalized_line == h for h in cls.KNOWN_SECTION_HEADERS
            ):
                if current_buffer:
                    chunk_text = " ".join(current_buffer)
                    chunks.append(ResumeChunk(section=current_section, text=chunk_text, metadata={"length": len(chunk_text)}))
                    current_buffer = []
                current_section = normalized_line
            else:
                current_buffer.append(line)
                if len(" ".join(current_buffer)) >= chunk_size:
                    chunk_text = " ".join(current_buffer)
                    chunks.append(ResumeChunk(section=current_section, text=chunk_text, metadata={"length": len(chunk_text)}))
                    current_buffer = []

        if current_buffer:
            chunk_text = " ".join(current_buffer)
            chunks.append(ResumeChunk(section=current_section, text=chunk_text, metadata={"length": len(chunk_text)}))

        return [c.to_dict() for c in chunks]
