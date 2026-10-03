from fastapi import APIRouter
from app.models import HealthResponse

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint for HireUpp Resume Intelligence Service.
    """
    return HealthResponse(
        status="ok",
        service="HireUpp Resume Intelligence",
        version="1.0.0",
        mode="active"
    )
