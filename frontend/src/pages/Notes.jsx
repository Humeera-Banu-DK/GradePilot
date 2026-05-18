import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await apiClient.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load notes");
      }
    };

    fetchNotes();
  }, []);

  const BASE_URL = "http://localhost:5000/";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Notes Repository</h1>

      {notes.map((note) => {
        // Convert Windows path → browser path
        const fileUrl =
          BASE_URL + note.filePath.replace(/\\/g, "/");

        return (
          <div key={note._id} style={styles.card}>
            <div>
              <h3 style={styles.subjectCode}>{note.subjectCode}</h3>
              <p style={styles.title}>{note.title}</p>
            </div>

            <div style={styles.actions}>
              {/* VIEW */}
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.viewBtn}
              >
                View
              </a>

              {/* DOWNLOAD */}
              <a
                href={fileUrl}
                download
                style={styles.downloadBtn}
              >
                Download
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    padding: "60px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    marginBottom: "15px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#ffffff"
  },
  subjectCode: {
    margin: 0,
    fontWeight: "600"
  },
  title: {
    margin: "6px 0 0",
    color: "#475569"
  },
  actions: {
    display: "flex",
    gap: "12px"
  },
  viewBtn: {
    padding: "8px 18px",
    background: "#1e3a8a",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  downloadBtn: {
    padding: "8px 18px",
    background: "#e5e7eb",
    color: "#000000",
    textDecoration: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Notes;
