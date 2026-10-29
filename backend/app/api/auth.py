import hashlib
import time
from typing import Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix='/api/auth', tags=['auth'])


class SignupPayload(BaseModel):
    name: str
    email: str
    phone: str
    password: str


class LoginPayload(BaseModel):
    email: str
    password: str


class AuthUser(BaseModel):
    id: str
    name: str
    email: str
    phone: str


class AuthResponse(BaseModel):
    user: AuthUser
    token: str


users_db: Dict[str, Dict[str, str]] = {}


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def _build_user(email: str, name: str, phone: str) -> AuthUser:
    return AuthUser(id=f"user-{int(time.time() * 1000)}", name=name, email=email, phone=phone)


@router.post('/signup', response_model=AuthResponse, status_code=201)
def signup(payload: SignupPayload) -> AuthResponse:
    normalized_email = payload.email.strip().lower()
    if not payload.name.strip():
        raise HTTPException(status_code=400, detail='Name is required.')
    if not normalized_email or '@' not in normalized_email or '.' not in normalized_email:
        raise HTTPException(status_code=400, detail='Please enter a valid email address.')
    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail='Password must be at least 6 characters long.')
    if normalized_email in users_db:
        raise HTTPException(status_code=409, detail='An account with this email already exists.')

    user = _build_user(normalized_email, payload.name.strip(), payload.phone.strip())
    users_db[normalized_email] = {
        'name': payload.name.strip(),
        'phone': payload.phone.strip(),
        'password': _hash_password(payload.password),
        'id': user.id,
    }

    token = f"token-{user.id}-{int(time.time())}"
    return AuthResponse(user=user, token=token)


@router.post('/login', response_model=AuthResponse)
def login(payload: LoginPayload) -> AuthResponse:
    normalized_email = payload.email.strip().lower()
    stored_user = users_db.get(normalized_email)
    if not stored_user or stored_user['password'] != _hash_password(payload.password):
        raise HTTPException(status_code=401, detail='Invalid email or password.')

    user = AuthUser(
        id=stored_user['id'],
        name=stored_user['name'],
        email=normalized_email,
        phone=stored_user['phone'],
    )
    token = f"token-{user.id}-{int(time.time())}"
    return AuthResponse(user=user, token=token)
