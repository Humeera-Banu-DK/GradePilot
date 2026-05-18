import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp } from "lucide-react";

function Estimate() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Estimation Portal</h1>
      <p style={styles.subtitle}>
        Choose what you want to calculate
      </p>

      <div style={styles.actions}>
        {/* SGPA */}
        <div
          style={styles.card}
          onClick={() => navigate("/sgpa")}
        >
          <div style={styles.iconBox}>
            <Calculator size={28} color="#fff" />
          </div>
          <h3 style={styles.cardTitle}>SGPA Estimation</h3>
          <p style={styles.cardText}>
            Estimate your semester performance
          </p>
        </div>

        {/* CGPA */}
        <div
          style={styles.card}
          onClick={() => navigate("/cgpa")}
        >
          <div style={styles.iconBox}>
            <TrendingUp size={28} color="#fff" />
          </div>
          <h3 style={styles.cardTitle}>CGPA Estimation</h3>
          <p style={styles.cardText}>
            Estimate your overall academic score
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "80px 20px",
    textAlign: "center",
    fontFamily: "Inter, system-ui, sans-serif",
    background: "linear-gradient(135deg,#fff7ed,#fffbeb,#ffffff)"
  },
  title: {
    fontSize: "36px",
    fontWeight: 800,
    marginBottom: "10px",
    color: "#0f172a"
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "50px"
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },
  card: {
    width: "260px",
    padding: "32px 24px",
    background: "#ffffff",
    borderRadius: "18px",
    cursor: "pointer",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
    border: "1px solid #f1f5f9"
  },
  iconBox: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#fb923c,#fbbf24)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 10px 25px rgba(251,146,60,0.4)"
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#0f172a"
  },
  cardText: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.5
  }
};

export default Estimate;
