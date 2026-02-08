from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str
    image_url: str
    additional_images: List[str] = []
    material: str
    dimensions: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str
    image_url: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Seed data
CATEGORIES = [
    {
        "id": "cat-wallets",
        "name": "Leather Wallets",
        "slug": "wallets",
        "description": "Handcrafted leather wallets made from the finest full-grain leather",
        "image_url": "https://customer-assets.emergentagent.com/job_quality-finds-3/artifacts/snvvv549_DSC1311-min%20%281%29.jpg"
    }
]

PRODUCTS = [
    {
        "id": "prod-1",
        "name": "Handcrafted Leather Wallet",
        "description": "A beautifully handcrafted leather wallet featuring premium full-grain leather with natural grain patterns. Hand-stitched with precision for exceptional durability. Each piece develops a unique patina over time, making it truly one-of-a-kind.",
        "price": 189.00,
        "category": "wallets",
        "image_url": "https://customer-assets.emergentagent.com/job_quality-finds-3/artifacts/snvvv549_DSC1311-min%20%281%29.jpg",
        "additional_images": [
            "https://customer-assets.emergentagent.com/job_quality-finds-3/artifacts/dij8pqar_DSC1313-min%20%281%29.jpg",
            "https://customer-assets.emergentagent.com/job_quality-finds-3/artifacts/t0nsp5pt_DSC1310-min.jpg"
        ],
        "material": "Full-grain Leather",
        "dimensions": "11cm x 9cm x 1.5cm",
        "is_featured": True
    }
]

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Quality Finds API"}

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    return CATEGORIES

@api_router.get("/categories/{slug}")
async def get_category(slug: str):
    for cat in CATEGORIES:
        if cat["slug"] == slug:
            return cat
    raise HTTPException(status_code=404, detail="Category not found")

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None):
    result = PRODUCTS
    if category:
        result = [p for p in result if p["category"] == category]
    if featured is not None:
        result = [p for p in result if p["is_featured"] == featured]
    return result

@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    for prod in PRODUCTS:
        if prod["id"] == product_id:
            return prod
    raise HTTPException(status_code=404, detail="Product not found")

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    msg_dict = input.model_dump()
    msg_obj = ContactMessage(**msg_dict)
    doc = msg_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg_obj

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
