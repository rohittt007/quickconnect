from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json()['service'] == 'quickconnect-backend'


def test_overview_endpoint():
    response = client.get('/api/overview')
    assert response.status_code == 200
    assert 'message' in response.json()
