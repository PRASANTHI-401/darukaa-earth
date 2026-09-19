from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class SiteCreate(BaseModel):
    project_id: str
    name: str
    description: Optional[str] = None
    geometry_geojson: Dict[str, Any] = Field(..., description="GeoJSON Polygon object")
    biome_type: Optional[str] = None

class SiteResponse(BaseModel):
    id: str
    project_id: str
    name: str
    description: Optional[str] = None
    area_hectares: float
    geometry_geojson: Dict[str, Any]
    biome_type: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
