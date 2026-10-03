import os
from typing import List
from dotenv import load_dotenv

# Load from .env file if available
load_dotenv()


class Settings:
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS
    raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000")
    CORS_ORIGINS: List[str] = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    
    # LLM Settings
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "gemini").lower()
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Demo Mode: Enabled if explicitly true or if no API keys are configured
    DEMO_MODE: bool = os.getenv("DEMO_MODE", "true").lower() in ("true", "1", "yes") or (
        not os.getenv("GEMINI_API_KEY") and not os.getenv("OPENAI_API_KEY")
    )
    
    # Max PDF Upload Size (MB)
    MAX_PDF_SIZE_MB: int = int(os.getenv("MAX_PDF_SIZE_MB", "10"))
    MAX_PDF_SIZE_BYTES: int = MAX_PDF_SIZE_MB * 1024 * 1024


settings = Settings()
