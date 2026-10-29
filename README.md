<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# QuickConnect

This project now uses a Python FastAPI backend under the backend folder while the React frontend stays intact.

## Run Locally

### Frontend
1. Install Node dependencies:
   `npm install`
2. Start the Vite dev server:
   `npm run dev`

### Backend
1. Install Python dependencies:
   `pip install -r backend/requirements.txt`
2. Start the FastAPI server:
   `python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000`

### API endpoints
- GET /api/health
- GET /api/overview
