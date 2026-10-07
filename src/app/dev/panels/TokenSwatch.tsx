"use client";

import { useState } from "react";

type TokenSwatchProps = {
  name: string;
  cssVar: string;
};

const TokenSwatch = ({ name, cssVar }: TokenSwatchProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${cssVar})`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="dev-token-swatch">
      <div
        className="dev-token-color"
        style={{ background: `var(${cssVar})` }}
      />
      <div className="dev-token-meta">
        <span className="dev-token-name">{name}</span>
        <button type="button" className="dev-token-value" onClick={handleCopy}>
          {copied ? "copied!" : `var(${cssVar})`}
        </button>
      </div>
    </div>
  );
};

export default TokenSwatch;
