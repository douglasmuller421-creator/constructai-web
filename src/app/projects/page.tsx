export default function ProjectsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>Projects</h1>
      <p style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
        Manage your construction projects
      </p>
      <div
        style={{
          marginTop: 24,
          padding: 40,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <p style={{ color: "#64748b" }}>No projects yet. Create your first project to get started.</p>
      </div>
    </div>
  );
}
