import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient.post("/auth/login", {
        email,
        password
      });

      // ✅ Save token & update auth state
      login(res.data.token, email);

      // ✅ Redirect after login
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <LogIn size={26} color="#fff" />
        </div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.field}>
            <div style={styles.passwordRow}>
              <label style={styles.label}>Password</label>
              <span style={styles.forgot}>Forgot password?</span>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={styles.link}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES (UNCHANGED UI) ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fff7ed,#fffbeb,#ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "Inter, system-ui, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "36px 32px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  iconCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px"
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "6px"
  },
  subtitle: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "28px"
  },
  field: {
    marginBottom: "18px",
    textAlign: "left"
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block"
  },
  input: {
    width: "100%",
    height: "44px",
    padding: "0 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    background: "#f8fafc",
    boxSizing: "border-box"
  },
  passwordRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  forgot: {
    fontSize: "13px",
    color: "#fb923c",
    cursor: "pointer"
  },
  button: {
    width: "100%",
    height: "46px",
    marginTop: "10px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer"
  },
  footerText: {
    marginTop: "22px",
    fontSize: "14px",
    color: "#64748b"
  },
  link: {
    color: "#fb923c",
    fontWeight: 600,
    cursor: "pointer"
  }
};

export default Login;
