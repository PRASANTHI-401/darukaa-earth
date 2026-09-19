import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_auth_and_projects():
    # 1. Login with seeded admin
    login_resp = client.post("/api/auth/login", json={
        "email": "admin@darukaa.earth",
        "password": "Admin@Darukaa2024"
    })
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    assert token is not None

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get me
    me_resp = client.get("/api/auth/me", headers=headers)
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "admin@darukaa.earth"

    # 3. List projects
    proj_resp = client.get("/api/projects")
    assert proj_resp.status_code == 200
    projects = proj_resp.json()
    assert len(projects) >= 1

    # 4. Create new project
    create_resp = client.post("/api/projects", headers=headers, json={
        "name": "Nilgiri Test Basin",
        "description": "Preservation patch for endemic sholas.",
        "biome": "Montane Shola",
        "status": "Active",
        "target_carbon_tco2e": 12000.0
    })
    assert create_resp.status_code == 200
    assert create_resp.json()["name"] == "Nilgiri Test Basin"
