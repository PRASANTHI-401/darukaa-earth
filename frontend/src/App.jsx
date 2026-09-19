import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Shield, MapPin, Plus, TrendingUp, Layers, ChevronRight, CheckCircle2, BarChart3 } from 'lucide-react';

// Master Mock Project and Site Data
const initialProjects = [
  {
    id: "p1",
    name: "Western Ghats Afforestation",
    biome: "Tropical Wet Evergreen",
    status: "Active",
    area: "1,200.0 ha",
    targetCarbon: "65,000",
    description: "Re-establishing contiguous biological corridors for endemic bird and arboreal mammal species.",
    sites: [
      {
        id: "s1",
        name: "Kudremukh Ridge (Site A)",
        area: 420.5,
        svgPoints: "120,70 240,60 280,160 190,210 100,150",
        color: "#10b981",
        carbon: "48,200 tCO₂e",
        bioScore: "92.6",
        ndvi: "0.78",
        soc: "84.2 tC/ha",
        credits: "$385,600",
        timeSeries: {
          quarters: ["Q1 23", "Q2 23", "Q3 23", "Q4 23", "Q1 24", "Q2 24", "Q3 24", "Q4 24"],
          carbonActual: [28000, 31400, 35600, 41000, 44800, 48200, 52000, 56000],
          carbonTarget: [26000, 29500, 33500, 38000, 42500, 46500, 50500, 55000],
          bioScores: [74, 78, 82, 85, 89, 92.6, 94.0, 96.0],
          ndviScores: [0.55, 0.60, 0.65, 0.71, 0.74, 0.78, 0.81, 0.83],
          socScores: [62, 66, 70, 75, 79, 84.2, 87.0, 90.0]
        }
      },
      {
        id: "s2",
        name: "Agumbe Canopy Basin",
        area: 380.2,
        svgPoints: "270,180 380,150 420,230 330,280 240,240",
        color: "#059669",
        carbon: "39,400 tCO₂e",
        bioScore: "95.1",
        ndvi: "0.84",
        soc: "91.0 tC/ha",
        credits: "$315,200",
        timeSeries: {
          quarters: ["Q1 23", "Q2 23", "Q3 23", "Q4 23", "Q1 24", "Q2 24", "Q3 24", "Q4 24"],
          carbonActual: [22000, 25800, 29600, 33500, 36800, 39400, 42800, 46000],
          carbonTarget: [20000, 24000, 28000, 32000, 35000, 38000, 41500, 45000],
          bioScores: [82, 85, 88, 90, 93, 95.1, 96.8, 98.0],
          ndviScores: [0.68, 0.72, 0.76, 0.79, 0.82, 0.84, 0.86, 0.88],
          socScores: [72, 76, 80, 84, 88, 91.0, 93.5, 96.0]
        }
      }
    ]
  },
  {
    id: "p2",
    name: "Sundarbans Blue Carbon Restoration",
    biome: "Mangrove Estuary",
    status: "Verified",
    area: "950.0 ha",
    targetCarbon: "45,000",
    description: "Deep sediment blue carbon sequestration through tidal mudflat mangrove restoration.",
    sites: [
      {
        id: "s3",
        name: "Gosaba Tidal Mudflat",
        area: 520.0,
        svgPoints: "520,80 650,60 710,140 610,180 500,130",
        color: "#06b6d4",
        carbon: "38,100 tCO₂e",
        bioScore: "86.5",
        ndvi: "0.69",
        soc: "112.5 tC/ha",
        credits: "$304,800",
        timeSeries: {
          quarters: ["Q1 23", "Q2 23", "Q3 23", "Q4 23", "Q1 24", "Q2 24", "Q3 24", "Q4 24"],
          carbonActual: [20000, 23500, 27400, 31200, 35000, 38100, 41500, 45000],
          carbonTarget: [19000, 22000, 26000, 30000, 34000, 37000, 40500, 44000],
          bioScores: [68, 72, 76, 80, 83, 86.5, 89.0, 91.0],
          ndviScores: [0.48, 0.53, 0.59, 0.64, 0.67, 0.69, 0.72, 0.75],
          socScores: [85, 91, 97, 103, 108, 112.5, 116.0, 120.0]
        }
      }
    ]
  }
];

function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState(initialProjects);
  const [activeProject, setActiveProject] = useState(initialProjects[0]);
  const [activeSite, setActiveSite] = useState(initialProjects[0].sites[0]);
  const [activeMetric, setActiveMetric] = useState('carbon');
  const [mapLayer, setMapLayer] = useState('satellite');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl rounded-2xl px-6 py-3.5 mb-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-emerald-600/30">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Darukaa.Earth
              </h1>
              <span className="text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                POSTGIS v3.3
              </span>
            </div>
            <p className="text-xs text-slate-400">Verra-Aligned Geospatial Carbon & Biodiversity Registry</p>
          </div>
        </div>

        {/* Global Key Stats Bar */}
        <div className="hidden xl:flex items-center gap-8 border-x border-slate-800/80 px-8 py-0.5 text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Total Sequestration</div>
            <div className="text-base font-bold text-emerald-400 font-mono">142,850 tCO₂e</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Monitored Area</div>
            <div className="text-base font-bold text-teal-400 font-mono">3,420.5 ha</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Biodiversity Score</div>
            <div className="text-base font-bold text-blue-400 font-mono">92.6 / 100</div>
          </div>
        </div>

        {/* User Identity & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-200">{user?.full_name || 'Admin User'}</div>
              <div className="text-[10px] text-emerald-400 font-mono">JWT: Verified</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
        
        {/* Left Column: Projects & Sites Directory (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Managed Carbon Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map(p => (
                <div 
                  key={p.id}
                  onClick={() => { setActiveProject(p); if (p.sites.length > 0) setActiveSite(p.sites[0]); }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    p.id === activeProject.id 
                      ? "border-emerald-500/80 bg-emerald-950/30 shadow-md shadow-emerald-950/40" 
                      : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-white">{p.name}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{p.description}</p>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Area: <strong className="text-white">{p.area}</strong></span>
                    <span className="text-emerald-400 font-bold">{p.sites.length} Sites</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Sites */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 shadow-xl flex-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Sites in {activeProject.name}
            </h3>
            <div className="space-y-2">
              {activeProject.sites.map(s => (
                <div
                  key={s.id}
                  onClick={() => setActiveSite(s)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    s.id === activeSite.id 
                      ? "border-emerald-500/80 bg-emerald-950/40 text-emerald-300" 
                      : "border-slate-800/80 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></span>
                    <div>
                      <div className="font-bold text-xs text-white">{s.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{s.area} ha • PostGIS ST_Polygon</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{s.bioScore}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mapbox Canvas & Analytics (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Geospatial Map Canvas */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-bold text-white">Interactive Geospatial Studio</span>
                <span className="text-xs font-mono text-slate-400">(Mapbox GL Engine)</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
                <button onClick={() => setMapLayer('satellite')} className={`px-3 py-1 rounded-lg ${mapLayer === 'satellite' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Satellite</button>
                <button onClick={() => setMapLayer('ndvi')} className={`px-3 py-1 rounded-lg ${mapLayer === 'ndvi' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>NDVI Heatmap</button>
              </div>
            </div>

            {/* Interactive Vector SVG Viewport */}
            <div className="w-full h-80 rounded-xl relative overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <div className={`absolute inset-0 opacity-50 bg-gradient-to-br from-emerald-950/60 via-slate-950 to-teal-950/60 transition-all duration-700`}></div>
              
              <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 900 360">
                {activeProject.sites.map(s => {
                  const isSelected = s.id === activeSite.id;
                  return (
                    <polygon
                      key={s.id}
                      points={s.svgPoints}
                      fill={s.color}
                      fillOpacity={isSelected ? 0.45 : 0.18}
                      stroke={s.color}
                      strokeWidth={isSelected ? 3.2 : 1.5}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveSite(s)}
                    />
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 z-20 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono flex items-center gap-3">
                <span className="text-emerald-400 font-bold">● 13.2140° N, 75.2510° E</span>
                <span>SRID: 4326</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Selected Site:</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-0.5 rounded-full">
                  {activeSite.name}
                </span>
                <span className="font-mono text-slate-300">{activeSite.area} Hectares</span>
              </div>
              <div className="font-mono text-slate-400 text-[11px]">
                ST_Area Geodesic Calculation Verified ✓
              </div>
            </div>
          </div>

          {/* Longitudinal Analytics */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Temporal Analytics (Verra VCS VM0047)</h3>
                <p className="text-xs text-slate-400">Longitudinal carbon sequestration, Shannon biodiversity, and NDVI vegetation curves</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
                <button onClick={() => setActiveMetric('carbon')} className={`px-3 py-1 rounded-lg ${activeMetric === 'carbon' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Carbon Stock</button>
                <button onClick={() => setActiveMetric('bio')} className={`px-3 py-1 rounded-lg ${activeMetric === 'bio' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Biodiversity</button>
                <button onClick={() => setActiveMetric('ndvi')} className={`px-3 py-1 rounded-lg ${activeMetric === 'ndvi' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>NDVI Index</button>
              </div>
            </div>

            {/* Scorecard KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Cumulative Carbon</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{activeSite.carbon}</div>
                <div className="text-[10px] text-emerald-500">↑ +18.4% Ahead of Target</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Biodiversity Score</div>
                <div className="text-base font-bold text-blue-400 font-mono mt-0.5">{activeSite.bioScore} / 100</div>
                <div className="text-[10px] text-blue-400">Shannon Index: 3.42</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Canopy NDVI</div>
                <div className="text-base font-bold text-amber-300 font-mono mt-0.5">{activeSite.ndvi} NDVI</div>
                <div className="text-[10px] text-amber-400">Dense Healthy Canopy</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Estimated Value</div>
                <div className="text-base font-bold text-teal-400 font-mono mt-0.5">{activeSite.credits}</div>
                <div className="text-[10px] text-teal-400">@ $8.00 / tCO₂e</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
