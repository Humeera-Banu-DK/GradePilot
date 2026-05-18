import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { UserPlus } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ NEW
  const [branch, setBranch] = useState("");
  const [regulation, setRegulation] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CSM", "CAD"];
  const regulations = ["R23", "R20"];
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !branch ||
      !regulation ||
      !semester
    ) {
      alert("Please fill all fields");
      return;
    }

    // ✅ PASSWORD MATCH CHECK
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("/auth/signup", {
        email,
        password,
        branch,
        regulation,
        semester
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <UserPlus size={26} color="#fff" />
        </div>

        <h2 style={styles.title}>Create Student Account</h2>
        <p style={styles.subtitle}>Enter your details to get started</p>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="cse@git.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* ✅ CONFIRM PASSWORD */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* BRANCH */}
          <div style={styles.field}>
            <label style={styles.label}>Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* REGULATION */}
          <div style={styles.field}>
            <label style={styles.label}>Regulation</label>
            <select
              value={regulation}
              onChange={(e) => setRegulation(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select regulation</option>
              {regulations.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* SEMESTER */}
          <div style={styles.field}>
            <label style={styles.label}>Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select semester</option>
              {semesters.map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Creating Account..." : "Sign up Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

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

export default Signup;
