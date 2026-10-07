const EyeOpen = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Eye outline */}
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: 60,
          animation: "drawEyeOpen 0.5s ease forwards",
        }}
      />

      {/* Pupil */}
      <circle
        cx="12"
        cy="12"
        r="3"
        style={{
          opacity: 0,
          transform: "scale(0.6)",
          transformOrigin: "center",
          animation: "pupilIn 0.35s ease 0.3s forwards",
        }}
      />

      <style>
        {`
          @keyframes drawEyeOpen {
            to { stroke-dashoffset: 0; }
          }

          @keyframes pupilIn {
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </svg>
  );
};

export default EyeOpen;
