import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / '.env')

PORT = int(os.getenv('PORT', '8000'))
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
