import { useState } from "react";
import Welcome from "./components/Welcome";
import { VulnerabilityDemo } from "./components/VulnerableComponent";

function App() {
  const [showVulnerabilities, setShowVulnerabilities] = useState(false);

  return (
    <>
      <Welcome />

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "2px solid #ff6b6b",
        }}
      >
        <h2>🚨 보안 취약점 데모 (SonarQube 분석용)</h2>
        <p style={{ color: "#d63031" }}>
          <strong>경고:</strong> 이 섹션은 교육 목적으로만 사용되며, 실제
          프로덕션에서는 절대 사용하지 마세요!
        </p>
        <button
          onClick={() => setShowVulnerabilities(!showVulnerabilities)}
          style={{
            backgroundColor: showVulnerabilities ? "#d63031" : "#00b894",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showVulnerabilities ? "취약점 숨기기" : "취약점 보기"}
        </button>

        {showVulnerabilities && <VulnerabilityDemo />}
      </div>
    </>
  );
}

export default App;
