import React from "react";
import assistantIcon from "../../assets/assistant_icon.svg";

export default function AnimatedAssistantIcon() {
  return (
    <span style={{ display: "inline-block", position: "relative", width: 28, height: 28 }}>
      <img
        src={assistantIcon}
        alt="Assistant"
        style={{
          width: 28,
          height: 28,
          filter: "drop-shadow(0 0 8px #ffb30088)",
          animation: "assistant-bounce 1.2s infinite cubic-bezier(.68,-0.55,.27,1.55)",
        }}
      />
      <style>{`
        @keyframes assistant-bounce {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px) scale(1.08); }
          60% { transform: translateY(2px) scale(0.96); }
        }
      `}</style>
    </span>
  );
}
