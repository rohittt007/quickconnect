from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.app.api.health import router as health_router
from backend.app.api.auth import router as auth_router
from backend.app.api.tickets import router as tickets_router
from backend.app.core.config import CORS_ORIGINS

app = FastAPI(title="QuickConnect Backend", version="1.0.0")

# ---------------------------------------------------------------------------
# CORS — always allow the React dev server plus anything listed in .env
# ---------------------------------------------------------------------------
_origins = list(dict.fromkeys([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    *CORS_ORIGINS,          # values from .env  (default "*")
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(tickets_router)


# ---------------------------------------------------------------------------
# Root endpoints
# ---------------------------------------------------------------------------
@app.get("/")
def root() -> JSONResponse:
    return JSONResponse({"message": "QuickConnect Python backend is running"})


@app.get("/health")
def simple_health() -> JSONResponse:
    return JSONResponse({"status": "ok"})


