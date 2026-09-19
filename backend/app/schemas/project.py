from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    biome: str
    status: Optional[str] = "Active"
    target_carbon_tco2e: float

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    owner_id: Optional[str] = None
    created_at: datetime
    sites_count: Optional[int] = 0

    class Config:
        from_attributes = True
