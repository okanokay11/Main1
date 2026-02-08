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
        "image_url": "https://images.unsplash.com/photo-1755541608566-0340d4efca0d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwd2FsbGV0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTM2MzcyfDA&ixlib=rb-4.1.0&q=85"
    },
    {
        "id": "cat-jewelry",
        "name": "Silver Jewellery",
        "slug": "jewelry",
        "description": "Exquisite handcrafted silver jewellery with timeless elegance",
        "image_url": "https://images.unsplash.com/photo-1653587893403-b99e27c13dd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxoYW5kY3JhZnRlZCUyMHNpbHZlciUyMGpld2VscnklMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcwNTM2Mzc3fDA&ixlib=rb-4.1.0&q=85"
    },
    {
        "id": "cat-bags",
        "name": "Leather Bags",
        "slug": "bags",
        "description": "Timeless leather bags crafted for the modern connoisseur",
        "image_url": "https://images.unsplash.com/photo-1556304044-0699e31c6a34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwYmFnJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzA1MzYzODZ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
        "id": "cat-belts",
        "name": "Leather Belts",
        "slug": "belts",
        "description": "Premium leather belts with artisanal buckles",
        "image_url": "https://images.unsplash.com/photo-1668954443591-ea2072a6b4b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwYmVsdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MDUzNjM5OXww&ixlib=rb-4.1.0&q=85"
    },
    {
        "id": "cat-watches",
        "name": "Watches",
        "slug": "watches",
        "description": "Elegant timepieces with leather straps and minimalist design",
        "image_url": "https://images.unsplash.com/photo-1594120665604-953402382256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2F0Y2glMjBkYXJrJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzcwNTM2NDAzfDA&ixlib=rb-4.1.0&q=85"
    }
]

PRODUCTS = [
    # Wallets
    {
        "id": "prod-1",
        "name": "Heritage Bifold Wallet",
        "description": "A classic bifold wallet crafted from premium full-grain leather. Features 6 card slots, 2 bill compartments, and a hidden pocket. Hand-stitched with waxed thread for durability.",
        "price": 189.00,
        "category": "wallets",
        "image_url": "https://images.unsplash.com/photo-1755541608566-0340d4efca0d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwd2FsbGV0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTM2MzcyfDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [
            "https://images.unsplash.com/photo-1763674292700-317879c2038c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwd2FsbGV0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTM2MzcyfDA&ixlib=rb-4.1.0&q=85"
        ],
        "material": "Full-grain Italian Leather",
        "dimensions": "11cm x 9cm x 1.5cm",
        "is_featured": True
    },
    {
        "id": "prod-2",
        "name": "Slim Card Holder",
        "description": "Minimalist card holder designed for the essentialist. Holds up to 8 cards with a central cash pocket. Burnished edges reveal the natural leather beneath.",
        "price": 129.00,
        "category": "wallets",
        "image_url": "https://images.unsplash.com/photo-1763674292700-317879c2038c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwd2FsbGV0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTM2MzcyfDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Vegetable-tanned Leather",
        "dimensions": "10cm x 7cm x 0.5cm",
        "is_featured": False
    },
    {
        "id": "prod-3",
        "name": "Executive Long Wallet",
        "description": "A sophisticated long wallet for those who appreciate the finer things. Features a zip compartment, multiple card slots, and a transparent ID window.",
        "price": 259.00,
        "category": "wallets",
        "image_url": "https://images.unsplash.com/photo-1755541608110-3440a0f168ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBsZWF0aGVyJTIwd2FsbGV0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTM2MzcyfDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Bridle Leather",
        "dimensions": "19cm x 10cm x 2cm",
        "is_featured": True
    },
    # Jewelry
    {
        "id": "prod-4",
        "name": "Artisan Silver Ring",
        "description": "Hand-forged sterling silver ring with a hammered texture. Each piece is unique, bearing the marks of the craftsman's hammer. Oxidized finish for depth.",
        "price": 175.00,
        "category": "jewelry",
        "image_url": "https://images.unsplash.com/photo-1653587893403-b99e27c13dd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxoYW5kY3JhZnRlZCUyMHNpbHZlciUyMGpld2VscnklMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcwNTM2Mzc3fDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "925 Sterling Silver",
        "dimensions": "Sizes 6-12 available",
        "is_featured": True
    },
    {
        "id": "prod-5",
        "name": "Chain Link Bracelet",
        "description": "Bold chain link bracelet in polished sterling silver. A statement piece that transitions seamlessly from day to night. Lobster clasp closure.",
        "price": 295.00,
        "category": "jewelry",
        "image_url": "https://images.unsplash.com/photo-1739697075140-59b5eee5b786?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxoYW5kY3JhZnRlZCUyMHNpbHZlciUyMGpld2VscnklMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcwNTM2Mzc3fDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "925 Sterling Silver",
        "dimensions": "Length: 19cm, Width: 1cm",
        "is_featured": False
    },
    {
        "id": "prod-6",
        "name": "Minimalist Pendant Necklace",
        "description": "A delicate pendant necklace featuring a geometric silver charm on a fine chain. Perfect for layering or worn alone as a subtle accent.",
        "price": 145.00,
        "category": "jewelry",
        "image_url": "https://images.unsplash.com/photo-1696533700445-9cc60ac4a651?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxoYW5kY3JhZnRlZCUyMHNpbHZlciUyMGpld2VscnklMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcwNTM2Mzc3fDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "925 Sterling Silver",
        "dimensions": "Chain length: 45cm",
        "is_featured": True
    },
    # Bags
    {
        "id": "prod-7",
        "name": "Artisan Tote Bag",
        "description": "A spacious tote bag crafted from vegetable-tanned leather that develops a rich patina over time. Features an interior zip pocket and magnetic closure.",
        "price": 425.00,
        "category": "bags",
        "image_url": "https://images.unsplash.com/photo-1556304044-0699e31c6a34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwYmFnJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzA1MzYzODZ8MA&ixlib=rb-4.1.0&q=85",
        "additional_images": [
            "https://images.unsplash.com/photo-1702326626601-74d2e86922b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwYmFnJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzA1MzYzODZ8MA&ixlib=rb-4.1.0&q=85"
        ],
        "material": "Vegetable-tanned Leather",
        "dimensions": "40cm x 35cm x 12cm",
        "is_featured": True
    },
    {
        "id": "prod-8",
        "name": "Messenger Crossbody",
        "description": "Classic messenger bag with modern proportions. Features an adjustable strap, front flap with hidden magnetic closure, and organized interior.",
        "price": 365.00,
        "category": "bags",
        "image_url": "https://images.unsplash.com/photo-1702326626601-74d2e86922b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwYmFnJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzA1MzYzODZ8MA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Full-grain Leather",
        "dimensions": "30cm x 25cm x 8cm",
        "is_featured": False
    },
    {
        "id": "prod-9",
        "name": "Weekender Duffle",
        "description": "The perfect travel companion. Spacious duffle bag with leather handles, detachable shoulder strap, and brass hardware. Canvas-lined interior.",
        "price": 545.00,
        "category": "bags",
        "image_url": "https://images.unsplash.com/photo-1711113456416-7d96c9bc31fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBsZWF0aGVyJTIwYmFnJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzA1MzYzODZ8MA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Bridle Leather",
        "dimensions": "55cm x 28cm x 30cm",
        "is_featured": True
    },
    # Belts
    {
        "id": "prod-10",
        "name": "Classic Dress Belt",
        "description": "A timeless dress belt with a polished silver buckle. Made from single-piece construction for exceptional durability. Will age beautifully with use.",
        "price": 145.00,
        "category": "belts",
        "image_url": "https://images.unsplash.com/photo-1763674292700-317879c2038c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwYmVsdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MDUzNjM5OXww&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Full-grain Leather",
        "dimensions": "Width: 3.5cm, Sizes 30-42",
        "is_featured": True
    },
    {
        "id": "prod-11",
        "name": "Casual Suede Belt",
        "description": "A relaxed suede belt perfect for casual occasions. Features a brass roller buckle and contrast stitching. Pairs beautifully with denim.",
        "price": 125.00,
        "category": "belts",
        "image_url": "https://images.unsplash.com/photo-1668954443591-ea2072a6b4b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWF0aGVyJTIwYmVsdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MDUzNjM5OXww&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Suede Leather",
        "dimensions": "Width: 4cm, Sizes 30-42",
        "is_featured": False
    },
    # Watches
    {
        "id": "prod-12",
        "name": "Classic Chronograph",
        "description": "Elegant chronograph watch with a clean dial and leather strap. Japanese quartz movement with date display. Water-resistant to 50 meters.",
        "price": 495.00,
        "category": "watches",
        "image_url": "https://images.unsplash.com/photo-1594120665604-953402382256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2F0Y2glMjBkYXJrJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzcwNTM2NDAzfDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "Stainless Steel Case, Leather Strap",
        "dimensions": "Case diameter: 42mm",
        "is_featured": True
    },
    {
        "id": "prod-13",
        "name": "Minimalist Automatic",
        "description": "Ultra-thin automatic watch with a sun-ray dial. Swiss movement visible through sapphire crystal caseback. The epitome of understated elegance.",
        "price": 695.00,
        "category": "watches",
        "image_url": "https://images.unsplash.com/photo-1764243910471-4161c42fd29c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2F0Y2glMjBkYXJrJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzcwNTM2NDAzfDA&ixlib=rb-4.1.0&q=85",
        "additional_images": [],
        "material": "316L Stainless Steel, Alligator Leather Strap",
        "dimensions": "Case diameter: 40mm, Thickness: 8mm",
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
