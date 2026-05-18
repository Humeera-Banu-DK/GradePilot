import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>CGPA & SGPA Estimator</h1>
      <p>Based on SRIT R23 Regulation</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/sgpa">
          <button style={{ marginRight: "20px" }}>
            SGPA Calculator
          </button>
        </Link>

        <Link to="/cgpa">
          <button>
            CGPA Calculator
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
