from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.site import Site
from app.models.analytics import AnalyticsMetric
from app.schemas.analytics import SiteAnalyticsResponse, MetricPoint

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/site/{site_id}", response_model=SiteAnalyticsResponse)
def get_site_analytics(site_id: str, db: Session = Depends(get_db)):
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")

    metrics = db.query(AnalyticsMetric).filter(AnalyticsMetric.site_id == site_id).all()
    
    ts_points = [
        MetricPoint(
            quarter=m.quarter,
            carbon_stored_tco2e=m.carbon_stored_tco2e,
            carbon_target_tco2e=m.carbon_target_tco2e,
            biodiversity_score=m.biodiversity_score,
            ndvi_index=m.ndvi_index,
            canopy_density_pct=m.canopy_density_pct,
            soil_organic_carbon_tc_ha=m.soil_organic_carbon_tc_ha
        )
        for m in metrics
    ]

    latest_carbon = ts_points[-1].carbon_stored_tco2e if ts_points else 0.0
    latest_bio = ts_points[-1].biodiversity_score if ts_points else 0.0
    latest_ndvi = ts_points[-1].ndvi_index if ts_points else 0.0
    credits_val = latest_carbon * 8.0  # $8.00 per ton CO2e credit valuation

    return SiteAnalyticsResponse(
        site_id=site.id,
        site_name=site.name,
        area_hectares=site.area_hectares,
        latest_carbon=latest_carbon,
        latest_biodiversity=latest_bio,
        latest_ndvi=latest_ndvi,
        estimated_credits_value_usd=round(credits_val, 2),
        time_series=ts_points
    )
