"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Plus, Search, FolderKanban, MapPin, DollarSign, MoreVertical } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  location: string;
  budget: number;
  cost_count: number;
  total_cost: number;
  log_count: number;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: "#eff6ff", text: "#1e40af" },
  PLANNING: { bg: "#fefce8", text: "#854d0e" },
  ON_HOLD: { bg: "#fef2f2", text: "#dc2626" },
  COMPLETED: { bg: "#f0fdf4", text: "#16a34a" },
  CANCELLED: { bg: "#f1f5f9", text: "#64748b" },
};

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", location: "", budget: "", status: "PLANNING" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, budget: parseFloat(formData.budget) || 0 }),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ name: "", description: "", location: "", budget: "", status: "PLANNING" });
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
        <div style={{ width: 32, height: 32, border: "3px solid #e2e8f0", borderTopColor: "#1e40af", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>Projects</h1>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Manage your construction projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{ height: 40, padding: "0 16px", borderRadius: 8, background: "#1e40af", color: "white", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", borderRadius: 12, padding: 24, width: 480, maxWidth: "90vw" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Create New Project</h2>
            <form onSubmit={createProject}>
              <input
                placeholder="Project Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 12 }}
              />
              <input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 12 }}
              />
              <input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 12 }}
              />
              <input
                type="number"
                placeholder="Budget (£)"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 12 }}
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 20 }}
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ height: 40, padding: "0 16px", borderRadius: 8, background: "#f1f5f9", border: "none", fontSize: 14, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ height: 40, padding: "0 16px", borderRadius: 8, background: "#1e40af", color: "white", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {projects.map((project) => {
          const statusColor = statusColors[project.status] || statusColors.PLANNING;
          const budgetUsed = project.budget > 0 ? Math.round((project.total_cost / project.budget) * 100) : 0;

          return (
            <div key={project.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FolderKanban size={18} color="#1e40af" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{project.name}</h3>
                    {project.location && (
                      <p style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <MapPin size={12} />
                        {project.location}
                      </p>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: statusColor.bg, color: statusColor.text }}>
                  {project.status}
                </span>
              </div>

              {project.description && (
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16, lineHeight: 1.5 }}>{project.description}</p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <p style={{ fontSize: 11, color: "#94a3b8" }}>Budget</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{formatCurrency(project.budget)}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 11, color: "#94a3b8" }}>Spent ({budgetUsed}%)</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: budgetUsed > 90 ? "#dc2626" : "#0f172a" }}>{formatCurrency(project.total_cost)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, background: "white", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <FolderKanban size={40} color="#94a3b8" style={{ margin: "0 auto 16px" }} />
          <p style={{ color: "#64748b" }}>No projects yet. Create your first project to get started.</p>
        </div>
      )}
    </div>
  );
}
