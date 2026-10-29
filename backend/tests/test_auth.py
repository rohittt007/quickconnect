from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_signup_creates_account_and_login_returns_token():
    signup_response = client.post(
        '/api/auth/signup',
        json={
            'name': 'New Customer',
            'email': 'new.customer@example.com',
            'phone': '+91 90000 00000',
            'password': 'StrongPassword123',
        },
    )

    assert signup_response.status_code == 201
    payload = signup_response.json()
    assert payload['user']['email'] == 'new.customer@example.com'
    assert payload['token']

    login_response = client.post(
        '/api/auth/login',
        json={
            'email': 'new.customer@example.com',
            'password': 'StrongPassword123',
        },
    )

    assert login_response.status_code == 200
    assert login_response.json()['user']['email'] == 'new.customer@example.com'


def test_login_rejects_invalid_credentials():
    response = client.post(
        '/api/auth/login',
        json={
            'email': 'missing@example.com',
            'password': 'wrong-password',
        },
    )

    assert response.status_code == 401
    assert 'Invalid' in response.json()['detail']
