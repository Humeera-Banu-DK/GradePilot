import { useEffect, useState, useRef } from "react";
import apiClient from "../api/apiClient";

function CGPA() {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState({});
  const [previousCGPA, setPreviousCGPA] = useState("");
  const [cgpa, setCgpa] = useState(null);
  const [notSupported, setNotSupported] = useState(false);

  const resultRef = useRef(null);

  // 🔹 Fetch subjects for logged-in student
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await apiClient.get("/subjects");

        if (res.data.length === 0) {
          setNotSupported(true);
        } else {
          setSubjects(res.data);
          setNotSupported(false);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load subjects");
      }
    };

    fetchSubjects();
  }, []);

  // ✅ Detect semester safely
  const semester = subjects.length > 0 ? subjects[0].semester : null;

  const handleGradeChange = (code, value) => {
    setGrades((prev) => ({
      ...prev,
      [code]: value
    }));
  };

  const calculateCGPA = async () => {
    // 🔒 Mandatory check ONLY for semester > 1
    if (semester > 1 && previousCGPA === "") {
      alert("Please enter your previous CGPA to calculate CGPA");
      return;
    }

    try {
      const res = await apiClient.post("/grades/cgpa", {
        previousCGPA: semester > 1 ? Number(previousCGPA) : undefined,
        grades
      });

      setCgpa(res.data.cgpa);

      // 🎯 Auto-scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "CGPA calculation failed");
    }
  };

  // 🚫 NOT SUPPORTED MESSAGE
  if (notSupported) {
    return (
      <div style={styles.container}>
        <div style={styles.notSupportedBox}>
          <h2 style={styles.notSupportedTitle}>
            Estimation Not Available
          </h2>
          <p style={styles.notSupportedText}>
            CGPA estimation is currently supported only for
            <strong> CSE – R23</strong>.
          </p>
          <p style={styles.notSupportedSubText}>
            Support for other branches and regulations will be added soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>CGPA Estimation</h1>

      {/* 🔹 Show previous CGPA ONLY if semester > 1 */}
      {semester > 1 && (
        <div style={styles.inputBox}>
          <label style={styles.label}>Previous CGPA</label>
          <input
            type="number"
            step="0.01"
            value={previousCGPA}
            onChange={(e) => setPreviousCGPA(e.target.value)}
            placeholder="Enter previous CGPA"
            style={styles.input}
          />
        </div>
      )}

      {subjects.map((sub) => (
        <div key={sub.subjectCode} style={styles.row}>
          <div style={styles.subject}>
            <strong>{sub.subjectCode}</strong>
            <span>{sub.subjectName}</span>
            {sub.credits === 0 && (
              <em style={styles.nonCredit}>(Non-Credit)</em>
            )}
          </div>

          <select
            value={grades[sub.subjectCode] || ""}
            onChange={(e) =>
              handleGradeChange(sub.subjectCode, e.target.value)
            }
            style={styles.select}
          >
            <option value="">Select Grade</option>

            {sub.credits === 0 ? (
              <>
                <option value="S">Satisfactory (SA)</option>
                <option value="US">Unsatisfactory (US)</option>
              </>
            ) : (
              <>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </>
            )}
          </select>
        </div>
      ))}

      <button onClick={calculateCGPA} style={styles.button}>
        Calculate CGPA
      </button>

      {cgpa && (
        <div ref={resultRef} style={styles.result}>
          <h3>Your CGPA</h3>
          <p>{cgpa}</p>
        </div>
      )}
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
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    padding: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#ffffff"
  },
  subject: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  nonCredit: {
    fontSize: "13px",
    color: "#64748b"
  },
  select: {
    padding: "8px 12px",
    width: "170px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc"
  },
  inputBox: {
    marginBottom: "25px"
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
    marginTop: "30px",
    padding: "14px 28px",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer"
  },
  result: {
    marginTop: "30px",
    padding: "24px",
    background: "#fff7ed",
    borderRadius: "12px",
    border: "1px solid #fed7aa"
  },
  notSupportedBox: {
    padding: "60px",
    textAlign: "center",
    background: "#fff7ed",
    borderRadius: "18px",
    border: "1px solid #fed7aa"
  },
  notSupportedTitle: {
    fontSize: "26px",
    fontWeight: 700,
    marginBottom: "14px"
  },
  notSupportedText: {
    fontSize: "16px",
    color: "#475569"
  },
  notSupportedSubText: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#64748b"
  }
};

export default CGPA;
