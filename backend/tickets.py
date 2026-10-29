from fastapi import APIRouter, Form, UploadFile, File, HTTPException
from typing import Optional
import os

router = APIRouter()

# Uploads save karne ke liye folder paths create karna
UPLOAD_DIR = "uploads/tickets"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/create")
async def create_support_ticket(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    category: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    bookingId: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    # Agar user ne file attach ki hai, toh use local folder me save karna
    file_path = None
    if file:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

    # 📥 DATA RECIEVED: Yeh data aap directly yahan se database me save kar sakte hain
    ticket_payload = {
        "name": name,
        "email": email,
        "phone": phone,
        "category": category,
        "subject": subject,
        "message": message,
        "booking_id": bookingId,
        "attachment_path": file_path
    }
    
    print("New Ticket Received for Admin:", ticket_payload)
    
    # Live Response return karna admin status ke liye
    return {"status": "success", "message": "Ticket successfully sent to Admin Dashboard", "data": ticket_payload}
