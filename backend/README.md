# QuickConnect Python Backend

## Run locally

1. Create and activate a virtual environment.
2. Install dependencies:
   `pip install -r requirements.txt`
3. Start the server:
   `uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000`

## Endpoints

- GET /api/health
- GET /api/overview
- GET /
- GET /health
