import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Calculator,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const onStartEstimation = () => {
    if (!isAuthenticated) navigate("/login", { state: { from: "/estimate" } });
    else navigate("/estimate");
  };

  const onAccessNotes = () => {
    if (!isAuthenticated) navigate("/login", { state: { from: "/notes" } });
    else navigate("/notes");
  };

  const features = [
    {
      icon: Calculator,
      title: "Accurate CGPA & SGPA Estimation",
      description:
        "Calculate your academic performance based on your actual regulation, semester, subjects, and credits — without confusion or manual calculations."
    },
    {
      icon: BookOpen,
      title: "Student Notes Sharing",
      description:
        "Access subject-wise notes prepared by students and contribute your own notes to help others learn better."
    },
    {
      icon: Sparkles,
      title: "Personalized Experience",
      description:
        "The portal adapts to your branch, semester, and curriculum to show only the relevant subjects and grading rules."
    }
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff" }}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />

        <div style={styles.heroContent}>
          <span style={styles.badge}>
            Welcome to Student Academic Portal
          </span>

          <h1 style={styles.heroTitle}>
            Calculate Your Academic Success
          </h1>

          <p style={styles.heroSubtitle}>
            A powerful platform to estimate your CGPA & SGPA accurately and
            access quality academic notes shared by students.
          </p>

          <div style={styles.heroActions}>
            <button
  style={styles.primaryBtn}
  onClick={onStartEstimation}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
    e.currentTarget.style.boxShadow =
      "0 30px 60px rgba(249,115,22,0.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.15)";
  }}
>
  Start Estimation <ArrowRight size={18} />
</button>


            <button
  style={styles.outlineBtn}
  onClick={onAccessNotes}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.background = "#ffffff";
    e.currentTarget.style.color = "#f97316";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#ffffff";
  }}
>
  Access Notes
</button>

            <div style={styles.heroGlow1}></div>
<div style={styles.heroGlow2}></div>

          </div>
        </div>

        {/* WAVE */}
        <svg viewBox="0 0 1440 120" style={styles.wave}>
          <path
            fill="#ffffff"
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H0Z"
          />
        </svg>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Everything You Need</h2>
        <p style={styles.sectionSubtitle}>
          Powerful features designed specifically for students
        </p>

        {features.map((f, i) => (
          <div
            key={i}
            style={{
              ...styles.featureRow,
              flexDirection: i % 2 === 0 ? "row" : "row-reverse"
            }}
          >
            <div style={styles.featureText}>
              <div style={styles.iconBox}>
                <f.icon color="white" size={28} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>

            <div style={styles.featureGraphic}>
              <f.icon size={120} color="#fb923c33" />
              <div style={styles.check}>
                <CheckCircle color="white" size={28} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* STATS */}
      <section style={styles.stats}>
  <div>
    <h3 style={{ color: "#fb923c", fontSize: "36px", fontWeight: 800 }}>
      Accurate
    </h3>
    <p style={{ opacity: 0.85 }}>
      Calculation Based on Regulation
    </p>
  </div>

  <div>
    <h3 style={{ color: "#fb923c", fontSize: "36px", fontWeight: 800 }}>
      Fast
    </h3>
    <p style={{ opacity: 0.85 }}>
      Results in Seconds
    </p>
  </div>

  <div>
    <h3 style={{ color: "#fb923c", fontSize: "36px", fontWeight: 800 }}>
      Free
    </h3>
    <p style={{ opacity: 0.85 }}>
      No Hidden Charges
    </p>
  </div>
</section>



      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Plan Better. Study Smarter.
        </h2>

        <p style={styles.ctaText}>
          Make informed academic decisions with a tool designed specifically
          for students.
        </p>

        <button style={styles.ctaButton} onClick={onStartEstimation}>
          Get Started Now <ArrowRight size={18} />
        </button>
      </section>

    </div>
  );
}

const styles = {
 hero: {
  position: "relative",
  background: "linear-gradient(135deg,#f97316,#fb923c,#facc15)",
  padding: "140px 20px 0",
  textAlign: "center",
  overflow: "hidden"
},

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top left,rgba(255,255,255,0.2),transparent 60%)"
  },
  heroGlow1: {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(255,255,255,0.25)",
  filter: "blur(120px)",
  top: "-80px",
  left: "-80px"
},
heroGlow2: {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(255,255,255,0.2)",
  filter: "blur(140px)",
  bottom: "-100px",
  right: "-80px"
},

  heroContent: {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#fff"
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.25)",
    fontSize: "14px"
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: 800,
    margin: "20px 0"
  },
  heroSubtitle: {
    fontSize: "18px",
    maxWidth: "650px",
    margin: "0 auto 30px"
  },
  heroActions: {
    display: "flex",
    gap: "16px",
    justifyContent: "center"
  },
  primaryBtn: {
    background: "#fff",
    color: "#f97316",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
  },
  outlineBtn: {
    background: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  wave: { width: "100%", display: "block", marginTop: "80px" },

  features: {
    padding: "100px 20px",
    maxWidth: "1100px",
    margin: "0 auto"
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "40px",
    fontWeight: 700
  },
  sectionSubtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "80px"
  },
  featureRow: {
    display: "flex",
    alignItems: "center",
    gap: "60px",
    marginBottom: "100px",
    flexWrap: "wrap"
  },
  featureText: { flex: 1 },
 iconBox: {
  width: 70,
  height: 70,
  borderRadius: 18,
  background: "linear-gradient(135deg,#f97316,#facc15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 18,
  boxShadow: "0 20px 40px rgba(249,115,22,0.45)"
},

 featureGraphic: {
  position: "relative",
  width: 280,
  height: 280,
  background: "linear-gradient(135deg,#fff7ed,#ffedd5)",
  borderRadius: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
 // boxShadow: "0 30px 60px rgba(251,146,60,0.25)"
},

 check: {
  position: "absolute",
  top: -18,
  right: -18,
  width: 72,
  height: 72,
  borderRadius: 18,
  background: "linear-gradient(135deg,#f97316,#facc15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // boxShadow: "0 20px 40px rgba(249,115,22,0.45)"
},

stats: {
  background: "linear-gradient(135deg,#020617,#020617,#020617)",
  color: "#ffffff",
  padding: "100px 20px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  textAlign: "center"
},


  statItem: {
    minWidth: "220px"
  },

  statTitle: {
    fontSize: "44px",
    fontWeight: "800",
    color: "#fb923c", // ORANGE
    marginBottom: "10px"
  },

  statText: {
    fontSize: "16px",
    color: "#ffffff", // WHITE
    opacity: 0.9
  },


  cta: {
    padding: "120px 20px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto"
  },

  ctaTitle: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#0f172a"
  },

  ctaText: {
    fontSize: "18px",
    color: "#475569",
    maxWidth: "650px",
    margin: "0 auto 40px",
    lineHeight: "1.6"
  },

 ctaButton: {
  background: "linear-gradient(135deg,#f97316,#facc15)",
  color: "#ffffff",
  padding: "18px 42px",
  borderRadius: "16px",
  border: "none",
  fontSize: "18px",
  fontWeight: "700",
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  boxShadow: "0 25px 50px rgba(249,115,22,0.45)",
  transition: "transform 0.2s ease"
}


};

export default Landing;
