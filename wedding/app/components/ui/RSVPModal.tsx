"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  brand: { green: string; paper: string; line: string; gray: string };
};

export default function RSVPModal({ open, onClose, brand }: Props) {
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [additionalGuests, setAdditionalGuests] = useState<number>(0);
  const [bringingDriver, setBringingDriver] = useState(false);
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
    }
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSending(true);
      setError(null);
      const resp = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          additionalGuests,
          bringingDriver,
          attendance,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Submission failed. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setSubmitted(false);
    onClose();
  };

  if (!open) return null;

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div ref={overlayRef} onClick={onOverlayClick} className="rsvp-overlay" role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
      <div className="rsvp-modal">
        <div className="rsvp-head">
          <h3 id="rsvp-title">RSVP</h3>
          <button className="rsvp-close" aria-label="Close" onClick={close}>
            ✕
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={onSubmit} className="rsvp-form">
            {error ? <div className="rsvp-error" role="alert">{error}</div> : null}
            <label className="rsvp-label">
              <span>Your Name</span>
              <input
                ref={firstFieldRef}
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="rsvp-label">
              <span>Additional Guests</span>
              <input
                type="number"
                min={0}
                max={10}
                value={additionalGuests}
                onChange={(e) => setAdditionalGuests(Number(e.target.value))}
              />
            </label>

            <label className="rsvp-check">
              <input
                type="checkbox"
                checked={bringingDriver}
                onChange={(e) => setBringingDriver(e.target.checked)}
              />
              <span>Bringing a Driver</span>
            </label>

            <fieldset className="rsvp-fieldset">
              <legend>Attendance</legend>
              <label className="rsvp-radio">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === "yes"}
                  onChange={() => setAttendance("yes")}
                  required
                />
                <span>I’m attending</span>
              </label>
              <label className="rsvp-radio">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === "no"}
                  onChange={() => setAttendance("no")}
                />
                <span>Sorry, I cannot attend</span>
              </label>
            </fieldset>

            <div className="rsvp-actions">
              <button type="submit" className="rsvp-submit" disabled={sending}>
                {sending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <div className="rsvp-thanks">
            <p>Thank you for your response.</p>
            <button className="rsvp-submit" onClick={close}>Close</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .rsvp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.22);
          display: grid;
          place-items: center;
          z-index: 50;
          padding: 4vw;
        }
        .rsvp-modal {
          width: min(560px, 92vw);
          background: ${brand.paper};
          color: ${brand.green};
          border: 1px solid ${brand.line};
          border-radius: 0; /* square */
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          padding: 20px;
        }
        .rsvp-head { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${brand.line}; padding-bottom: 10px; margin-bottom: 16px; }
        .rsvp-head h3 { margin: 0; font-family: var(--brand-serif, serif); font-weight: 700; letter-spacing: -0.01em; }
        .rsvp-close { border: 1px solid ${brand.green}; background: transparent; color: ${brand.green}; padding: 4px 8px; cursor: pointer; border-radius: 0; }
        .rsvp-close:hover { background: ${brand.green}; color: ${brand.paper}; }

        .rsvp-form { display: grid; gap: 14px; }
        .rsvp-error { background: #ffe8e6; color: #941b0c; border: 1px solid #f2b8b5; padding: 8px 10px; }
        .rsvp-label { display: grid; gap: 6px; }
        .rsvp-label span { font-size: 0.92rem; color: ${brand.gray}; }
        .rsvp-label input[type="text"], .rsvp-label input[type="number"] {
          padding: 10px 12px; border: 1px solid ${brand.line}; border-radius: 0; background: white; color: ${brand.green};
          outline: none;
        }
        .rsvp-label input:focus { border-color: ${brand.green}; box-shadow: 0 0 0 2px rgba(40,65,53,0.12); }

        .rsvp-check { display: inline-flex; gap: 10px; align-items: center; margin-top: 4px; }

        .rsvp-fieldset { border: 1px solid ${brand.line}; padding: 10px 12px; margin: 6px 0; }
        .rsvp-fieldset legend { padding: 0 6px; color: ${brand.gray}; }
        .rsvp-radio { display: flex; gap: 10px; align-items: center; margin: 6px 0; }

        .rsvp-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
        .rsvp-submit { border-radius: 0; border: 1px solid ${brand.green}; background: ${brand.green}; color: ${brand.paper}; padding: 10px 16px; font-weight: 700; cursor: pointer; }
        .rsvp-submit:hover { filter: brightness(0.96); }

        .rsvp-thanks { text-align: center; padding: 24px 10px; }
        .rsvp-thanks p { margin-bottom: 16px; }
      `}</style>
    </div>
  );
}
