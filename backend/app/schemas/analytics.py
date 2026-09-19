from pydantic import BaseModel
from typing import Optional, List

class MetricPoint(BaseModel):
    quarter: str
    carbon_stored_tco2e: float
    carbon_target_tco2e: float
    biodiversity_score: float
    ndvi_index: float
    canopy_density_pct: float
    soil_organic_carbon_tc_ha: float

class SiteAnalyticsResponse(BaseModel):
    site_id: str
    site_name: str
    area_hectares: float
    latest_carbon: float
    latest_biodiversity: float
    latest_ndvi: float
    estimated_credits_value_usd: float
    time_series: List[MetricPoint]
