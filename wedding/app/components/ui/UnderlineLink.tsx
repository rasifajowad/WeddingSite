"use client";

import React from "react";

export default function UnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="relative inline-block" target="_blank" rel="noreferrer">
      <span className="relative z-[1]">{children}</span>
      <span
        aria-hidden
        className="absolute left-0 right-0 bottom-[0.25rem] h-[2px] underline-accent"
      />
    </a>
  );
}

