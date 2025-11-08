"use client";

import React from "react";

export default function Entitled({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="entitled uppercase font-medium">
        {children}
      </div>
    </div>
  );
}

