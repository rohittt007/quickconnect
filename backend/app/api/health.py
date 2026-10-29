from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter(prefix='/api', tags=['health'])


@router.get('/health')
def health() -> JSONResponse:
    return JSONResponse({'status': 'ok', 'service': 'quickconnect-backend'})


@router.get('/overview')
def overview() -> JSONResponse:
    from pathlib import Path

    data_path = Path(__file__).resolve().parents[3] / 'src' / 'data' / 'sampleData.js'
    try:
        data = data_path.read_text(encoding='utf-8')
    except FileNotFoundError:
        return JSONResponse(status_code=500, content={'error': 'Unable to load sample data'})

    return JSONResponse({'message': 'Sample data available', 'size': len(data)})
