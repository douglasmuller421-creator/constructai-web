"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { HardHat, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@construction.com");
  const [password, setPassword] = useState("Password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ width: 400, background: "white", borderRadius: 16, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: "#1e40af", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HardHat size={22} color="white" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>ConstructAI</span>
          </div>
          <p style={{ fontSize: 13, color: "#64748b" }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "#dc2626" }}>{error}</p>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#334155", display: "block", marginBottom: 6 }}>Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 12, top: 12, color: "#94a3b8" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{ width: "100%", height: 42, paddingLeft: 40, paddingRight: 14, borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#334155", display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 12, top: 12, color: "#94a3b8" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", height: 42, paddingLeft: 40, paddingRight: 14, borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 8,
              background: "#1e40af",
              color: "white",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748b" }}>
          Don&apos;t have an account?{" "}
          <a href="/register" style={{ color: "#1e40af", fontWeight: 500, textDecoration: "none" }}>
            Sign up
          </a>
        </p>

        <div style={{ marginTop: 24, padding: 12, background: "#f8fafc", borderRadius: 8, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#94a3b8" }}>Demo: demo@construction.com / Password123</p>
        </div>
      </div>
    </div>
  );
}
