import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    biome = Column(String, nullable=False)
    status = Column(String, default="Active")  # Active, Verified, Planning
    target_carbon_tco2e = Column(Float, default=50000.0)
    owner_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sites = relationship("Site", back_populates="project", cascade="all, delete-orphan")
