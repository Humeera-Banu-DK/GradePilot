import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Edit,
  Upload
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch logged-in user details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        setUser(res.data);
        setSemester(res.data.semester);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Update semester
  const updateSemester = async () => {
    try {
      setLoading(true);

      await apiClient.put("/auth/update-semester", {
        semester
      });

      alert("Semester updated successfully");

    } catch (err) {
      console.error(err);
      alert("Failed to update semester");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p style={{ padding: "60px" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        <User size={28} style={{ marginRight: "10px" }} />
        My Profile
      </h1>

      {/* PROFILE CARD */}
      <div style={styles.card}>
        <div style={styles.row}>
          <div style={styles.label}>
            <Mail size={18} />
            Email
          </div>
          <span>{user.email}</span>
        </div>

        <div style={styles.row}>
          <div style={styles.label}>
            <GraduationCap size={18} />
            Branch
          </div>
          <span>{user.branch}</span>
        </div>

        <div style={styles.row}>
          <div style={styles.label}>
            <BookOpen size={18} />
            Regulation
          </div>
          <span>{user.regulation}</span>
        </div>

        <div style={styles.row}>
          <div style={styles.label}>
            <Edit size={18} />
            Semester
          </div>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={styles.select}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={updateSemester}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Updating..." : "Update Semester"}
        </button>
      </div>

      {/* UPLOAD NOTES SECTION */}
      <div style={styles.uploadBox}>
        <div style={styles.uploadHeader}>
          <Upload size={22} />
          <h3>Upload Notes</h3>
        </div>

        <p style={styles.uploadText}>
          Share your notes with other students and help them learn better.
        </p>

        <button
          onClick={() => navigate("/upload-notes")}
          style={styles.uploadBtn}
        >
          Go to Upload Page
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "60px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Inter, system-ui, sans-serif"
  },
  heading: {
    display: "flex",
    alignItems: "center",
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "30px"
  },
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    border: "1px solid #e5e7eb",
    marginBottom: "40px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
    color: "#334155"
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc"
  },
  button: {
    marginTop: "10px",
    padding: "12px 24px",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer"
  },
  uploadBox: {
    padding: "30px",
    borderRadius: "18px",
    background: "#fff7ed",
    border: "1px solid #fed7aa"
  },
  uploadHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px"
  },
  uploadText: {
    color: "#475569",
    marginBottom: "14px"
  },
  uploadBtn: {
    padding: "12px 24px",
    background: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default Profile;
