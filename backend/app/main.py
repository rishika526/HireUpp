import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import health, resume

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("hireupp.main")

app = FastAPI(
    title="HireUpp AI — Resume Intelligence API",
    description="Backend microservice for HireUpp: ATS compatibility evaluation, PDF neural parsing, and LLM career insights.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if settings.CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(health.router)
app.include_router(resume.router)


@app.get("/")
async def root():
    return {
        "product": "HireUpp",
        "service": "AI Resume Intelligence & ATS Compatibility Engine",
        "status": "online",
        "demo_mode": settings.DEMO_MODE,
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
