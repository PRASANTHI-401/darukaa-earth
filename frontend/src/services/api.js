// Darukaa.Earth REST Client
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback local projects data:", err);
    return null;
  }
}

export async function fetchSiteAnalytics(siteId) {
  try {
    const res = await fetch(`${API_BASE}/api/analytics/site/${siteId}`);
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return await res.json();
  } catch (err) {
    return null;
  }
}
