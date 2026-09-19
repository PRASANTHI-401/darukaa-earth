import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Site(Base):
    __tablename__ = "sites"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    area_hectares = Column(Float, nullable=False)
    geometry_geojson = Column(JSON, nullable=False)  # GeoJSON Polygon coordinates
    biome_type = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="sites")
    analytics = relationship("AnalyticsMetric", back_populates="site", cascade="all, delete-orphan")
