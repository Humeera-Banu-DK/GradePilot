import { useState } from "react";
import apiClient from "../api/apiClient";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

function UploadNotes() {
  const [title, setTitle] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ---------------- FILE HANDLER ---------------- */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // Max 10MB
    if (selected.size > 10 * 1024 * 1024) {
      setError("File size should not exceed 10MB");
      setFile(null);
      return;
    }

    setFile(selected);
    setError("");
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subjectCode || !file) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subjectCode", subjectCode);
      formData.append("file", file);

      await apiClient.post("/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSuccess("Note uploaded successfully 🎉");

      // Reset form
      setTitle("");
      setSubjectCode("");
      setFile(null);
      document.getElementById("fileInput").value = "";

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.iconCircle}>
          <Upload size={34} color="#fff" />
        </div>
        <h1 style={styles.title}>Upload Notes</h1>
        <p style={styles.subtitle}>
          Share your study materials with fellow students
        </p>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Note Details</h2>
        <p style={styles.cardSub}>
          Fill in the information and upload the file
        </p>

        {/* ALERTS */}
        {success && (
          <div style={{ ...styles.alert, ...styles.success }}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div style={{ ...styles.alert, ...styles.error }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              style={styles.input}
              placeholder="Types of Queries"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* SUBJECT CODE */}
          <div style={styles.field}>
            <label style={styles.label}>Subject Code *</label>
            <input
              style={styles.input}
              placeholder="23CSE201"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>

          {/* FILE */}
          <div style={styles.field}>
            <label style={styles.label}>Upload File *</label>

            <div style={styles.fileBox}>
              <FileText size={42} color="#94a3b8" />
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
              {file && (
                <div style={styles.fileInfo}>
                  <strong>{file.name}</strong>
                  <span>
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              )}
            </div>

            <small style={styles.hint}>
              PDF, DOC, DOCX, PPT, PPTX, PNG, JPG ,JPEG(Max 10MB)
            </small>
          </div>

          {/* BUTTONS */}
          <div style={styles.actions}>
            <button
              type="submit"
              style={{
                ...styles.primaryBtn,
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Note"}
            </button>

            <button
              type="button"
              style={styles.resetBtn}
              onClick={() => {
                setTitle("");
                setSubjectCode("");
                setFile(null);
                setError("");
                setSuccess("");
                document.getElementById("fileInput").value = "";
              }}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fff7ed,#fffbeb,#ffffff)",
    padding: "60px 20px",
    fontFamily: "Inter, system-ui, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  iconCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 20px 40px rgba(251,146,60,.35)"
  },
  title: {
    fontSize: "36px",
    fontWeight: 800
  },
  subtitle: {
    color: "#64748b",
    marginTop: "6px"
  },
  card: {
    maxWidth: "760px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "36px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
  },
  cardTitle: {
    fontSize: "26px",
    fontWeight: 700
  },
  cardSub: {
    color: "#64748b",
    marginBottom: "28px"
  },
  field: {
    marginBottom: "22px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600
  },
  input: {
    width: "100%",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    padding: "0 14px",
    background: "#f8fafc"
  },
  fileBox: {
    border: "2px dashed #cbd5f5",
    borderRadius: "14px",
    padding: "26px",
    textAlign: "center"
  },
  fileInfo: {
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px"
  },
  hint: {
    fontSize: "13px",
    color: "#64748b"
  },
  actions: {
    display: "flex",
    gap: "14px",
    marginTop: "30px"
  },
  primaryBtn: {
    flex: 1,
    height: "46px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },
  resetBtn: {
    height: "46px",
    padding: "0 24px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer"
  },
  alert: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px"
  },
  success: {
    background: "#ecfdf5",
    color: "#065f46"
  },
  error: {
    background: "#fef2f2",
    color: "#991b1b"
  }
};

export default UploadNotes;
