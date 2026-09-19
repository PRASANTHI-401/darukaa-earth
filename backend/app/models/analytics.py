import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class AnalyticsMetric(Base):
    __tablename__ = "analytics_metrics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    site_id = Column(String, ForeignKey("sites.id"), nullable=False)
    quarter = Column(String, nullable=False)  # e.g., "Q1 2023", "Q2 2023"
    carbon_stored_tco2e = Column(Float, nullable=False)
    carbon_target_tco2e = Column(Float, nullable=False)
    biodiversity_score = Column(Float, nullable=False)  # 0 to 100
    ndvi_index = Column(Float, nullable=False)          # 0.00 to 1.00
    canopy_density_pct = Column(Float, nullable=False)  # 0 to 100%
    soil_organic_carbon_tc_ha = Column(Float, default=75.0)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    site = relationship("Site", back_populates="analytics")
