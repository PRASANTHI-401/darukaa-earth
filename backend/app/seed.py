from sqlalchemy.orm import Session
from app.models.user import User
from app.models.project import Project
from app.models.site import Site
from app.models.analytics import AnalyticsMetric
from app.utils.security import get_password_hash

def seed_database(db: Session):
    # Check if admin already exists
    if db.query(User).filter(User.email == "admin@darukaa.earth").first():
        return

    print("Seeding Darukaa.Earth database with initial project & geospatial data...")

    # 1. Create Default Admin User
    admin = User(
        email="admin@darukaa.earth",
        full_name="MRV Administrator",
        hashed_password=get_password_hash("Admin@Darukaa2024"),
        role="Administrator"
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # 2. Create Projects
    proj1 = Project(
        name="Western Ghats Afforestation",
        description="Restoring contiguous biological corridors for endemic canopy flora and fauna.",
        biome="Tropical Wet Evergreen",
        status="Active",
        target_carbon_tco2e=65000.0,
        owner_id=admin.id
    )
    proj2 = Project(
        name="Sundarbans Blue Carbon Restoration",
        description="Deep sediment blue carbon sequestration through tidal mudflat mangrove afforestation.",
        biome="Mangrove Estuary",
        status="Verified",
        target_carbon_tco2e=45000.0,
        owner_id=admin.id
    )
    proj3 = Project(
        name="Aravalli Biodiversity Corridor",
        description="Re-wilding native xerophytic scrub to arrest desertification and create leopard transits.",
        biome="Semi-Arid Dry Deciduous",
        status="Active",
        target_carbon_tco2e=25000.0,
        owner_id=admin.id
    )
    db.add_all([proj1, proj2, proj3])
    db.commit()

    # 3. Create Geospatial Sites with Real GeoJSON Polygons
    site1 = Site(
        project_id=proj1.id,
        name="Kudremukh Ridge (Site A)",
        description="High elevation shola buffer zone with dense endemic arboreal presence.",
        area_hectares=420.5,
        biome_type="Tropical Wet Evergreen",
        geometry_geojson={
            "type": "Polygon",
            "coordinates": [
                [
                    [75.250, 13.210],
                    [75.290, 13.230],
                    [75.310, 13.190],
                    [75.270, 13.170],
                    [75.250, 13.210]
                ]
            ]
        }
    )
    site2 = Site(
        project_id=proj1.id,
        name="Agumbe Rainforest Basin",
        description="Core rainforest sanctuary flank supporting King Cobra and Malabar giant squirrel populations.",
        area_hectares=380.2,
        biome_type="Tropical Wet Evergreen",
        geometry_geojson={
            "type": "Polygon",
            "coordinates": [
                [
                    [75.090, 13.510],
                    [75.120, 13.530],
                    [75.140, 13.490],
                    [75.100, 13.480],
                    [75.090, 13.510]
                ]
            ]
        }
    )
    site3 = Site(
        project_id=proj2.id,
        name="Gosaba Tidal Mudflat",
        description="Intertidal Rhizophora mangrove nursery sequestering deep anaerobic carbon.",
        area_hectares=520.0,
        biome_type="Mangrove Estuary",
        geometry_geojson={
            "type": "Polygon",
            "coordinates": [
                [
                    [88.800, 22.160],
                    [88.840, 22.180],
                    [88.860, 22.140],
                    [88.810, 22.130],
                    [88.800, 22.160]
                ]
            ]
        }
    )
    db.add_all([site1, site2, site3])
    db.commit()

    # 4. Generate Longitudinal Time-Series Analytics
    quarters = ["Q1 23", "Q2 23", "Q3 23", "Q4 23", "Q1 24", "Q2 24", "Q3 24", "Q4 24"]
    carbon_seq = [28000.0, 31400.0, 35600.0, 41000.0, 44800.0, 48200.0, 52000.0, 56000.0]
    carbon_tgt = [26000.0, 29500.0, 33500.0, 38000.0, 42500.0, 46500.0, 50500.0, 55000.0]
    bio_scores = [74.0, 78.0, 82.0, 85.0, 89.0, 92.6, 94.0, 96.0]
    ndvi_scores = [0.55, 0.60, 0.65, 0.71, 0.74, 0.78, 0.81, 0.83]

    for i in range(len(quarters)):
        metric = AnalyticsMetric(
            site_id=site1.id,
            quarter=quarters[i],
            carbon_stored_tco2e=carbon_seq[i],
            carbon_target_tco2e=carbon_tgt[i],
            biodiversity_score=bio_scores[i],
            ndvi_index=ndvi_scores[i],
            canopy_density_pct=72.0 + i * 2.8,
            soil_organic_carbon_tc_ha=84.2 + i * 1.5
        )
        db.add(metric)
    db.commit()
    print("Seeding completed successfully!")
