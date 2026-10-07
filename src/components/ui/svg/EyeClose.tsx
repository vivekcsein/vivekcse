const EyeClose = () => {
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
      {/* Eye shape */}
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: 60,
          animation: "drawEye 0.6s ease forwards",
        }}
      />

      {/* Slash line */}
      <path
        d="M3 3l18 18"
        style={{
          strokeDasharray: 30,
          strokeDashoffset: 30,
          animation: "drawSlash 0.4s ease 0.3s forwards",
        }}
      />

      {/* Pupil (fades out) */}
      <circle
        cx="12"
        cy="12"
        r="3"
        style={{
          opacity: 0,
          animation: "fadeOut 0.3s ease forwards",
        }}
      />

      <style>
        {`
          @keyframes drawEye {
            to { stroke-dashoffset: 0; }
          }

          @keyframes drawSlash {
            to { stroke-dashoffset: 0; }
          }

          @keyframes fadeOut {
            to { opacity: 0.2; }
          }
        `}
      </style>
    </svg>
  );
};

export default EyeClose;
