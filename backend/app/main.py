from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.routers import auth, projects, sites, analytics
from app.seed import seed_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize schema tables
    Base.metadata.create_all(bind=engine)
    # Seed default projects & sites
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Geospatial Carbon & Biodiversity Analytics REST API for Darukaa.Earth",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(sites.router)
app.include_router(analytics.router)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Darukaa.Earth Geospatial API",
        "version": "1.0.0",
        "spatial_engine": "PostGIS / Shapely"
    }
