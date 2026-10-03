import io
from typing import Tuple
from fastapi import HTTPException, UploadFile, status
from pypdf import PdfReader
from pypdf.errors import PdfReadError
from app.config import settings


class PDFService:
    @staticmethod
    async def extract_text_from_upload(file: UploadFile) -> Tuple[str, int]:
        """
        Validates the uploaded file and safely extracts text from PDF pages.
        Returns:
            Tuple of (extracted_text, page_count)
        Raises:
            HTTPException with detailed 400 Bad Request error if validation fails.
        """
        # 1. Check content type & extension
        filename = (file.filename or "").lower()
        content_type = (file.content_type or "").lower()

        if not filename.endswith(".pdf") and "application/pdf" not in content_type:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file format. HireUpp Resume Intelligence requires a valid PDF (.pdf) document."
            )

        # 2. Read bytes with file size limit protection
        try:
            content = await file.read()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to read uploaded resume file stream: {str(e)}"
            )

        # 3. Check for empty file
        if not content or len(content) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The uploaded resume file is empty (0 bytes). Please upload a valid resume PDF."
            )

        # 4. Check for oversized file
        if len(content) > settings.MAX_PDF_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Resume file size exceeds the allowed limit of {settings.MAX_PDF_SIZE_MB}MB."
            )

        # 5. Extract text safely via pypdf
        try:
            pdf_stream = io.BytesIO(content)
            reader = PdfReader(pdf_stream)
        except PdfReadError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Corrupted or invalid PDF structure: {str(e)}. Please re-export or upload an uncorrupted PDF."
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unable to parse PDF document: {str(e)}"
            )

        page_count = len(reader.pages)
        if page_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The uploaded PDF contains 0 pages. Please upload a valid document."
            )

        extracted_text_chunks = []
        for idx, page in enumerate(reader.pages):
            try:
                page_text = page.extract_text() or ""
                extracted_text_chunks.append(page_text.strip())
            except Exception as e:
                # Page extraction error handling
                continue

        full_text = "\n\n".join(filter(None, extracted_text_chunks)).strip()

        # 6. Check if extractable text is present (e.g. not a scanned image with 0 text)
        if not full_text or len(full_text) < 30:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No readable text could be extracted from this PDF. Please ensure the document is not an image-only scan and contains selectable text."
            )

        return full_text, page_count
