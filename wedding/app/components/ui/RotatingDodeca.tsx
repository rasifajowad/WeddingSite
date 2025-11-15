"use client";

import React from "react";

const brand = {
  line: "#c3c2c0",
  green: "#284135",
};

export default function RotatingDodeca(
  { size = 78, speedSec = 10 }: { size?: number; speedSec?: number }
) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 234 234"
        className="absolute inset-0"
        style={{ animation: `spin ${speedSec}s linear infinite` }}
      >
        <polygon
          points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
          fill="none"
          stroke={brand.line}
          strokeWidth={1}
        />
      </svg>
      <svg viewBox="0 0 234 234" className="absolute inset-0">
        <polygon
          points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
          fill="none"
          stroke={brand.green}
          strokeWidth={1}
          opacity={0.7}
        />
      </svg>
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
