from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    results = []
    for p in projects:
        p_dict = {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "biome": p.biome,
            "status": p.status,
            "target_carbon_tco2e": p.target_carbon_tco2e,
            "owner_id": p.owner_id,
            "created_at": p.created_at,
            "sites_count": len(p.sites)
        }
        results.append(p_dict)
    return results

@router.post("", response_model=ProjectResponse)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = Project(
        name=project_in.name,
        description=project_in.description,
        biome=project_in.biome,
        status=project_in.status or "Active",
        target_carbon_tco2e=project_in.target_carbon_tco2e,
        owner_id=current_user.id
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return {
        "id": project.id,
        "name": project.name,
        "description": project.description,
        "biome": project.biome,
        "status": project.status,
        "target_carbon_tco2e": project.target_carbon_tco2e,
        "owner_id": project.owner_id,
        "created_at": project.created_at,
        "sites_count": 0
    }
