import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

  .page-404 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
    background: #fff;
    font-family: 'Space Mono', monospace;
  }

  .dark .page-404 {
    background: #0e0e0e;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .dark .grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  }

  .status-bar {
    display: flex;
    gap: 16px;
    align-items: center;
    background: #f5f5f5;
    border: 0.5px solid #ddd;
    border-radius: 2px;
    padding: 8px 16px;
    font-size: 11px;
    color: #888;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .dark .status-bar {
    background: #1a1a1a;
    border-color: #333;
    color: #666;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }

  .big-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(100px, 22vw, 180px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -6px;
    color: transparent;
    -webkit-text-stroke: 2px #111;
    position: relative;
    z-index: 1;
  }

  .dark .big-num {
    -webkit-text-stroke: 2px #fff;
  }

  .zero-accent {
    -webkit-text-stroke: 2px #378ADD;
  }

  .tag-line {
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
    margin: 0.5rem 0 1.5rem;
    position: relative;
    z-index: 1;
  }

  .msg {
    font-size: 13px;
    color: #666;
    max-width: 340px;
    line-height: 1.9;
    position: relative;
    z-index: 1;
    margin-bottom: 2.5rem;
  }

  .dark .msg {
    color: #888;
  }

  .msg code {
    color: #378ADD;
    font-family: 'Space Mono', monospace;
  }

  .btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .btn-primary {
    background: #111;
    color: #fff;
    border: none;
    padding: 10px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    cursor: pointer;
    border-radius: 2px;
    transition: opacity 0.15s;
  }

  .dark .btn-primary {
    background: #fff;
    color: #111;
  }

  .btn-primary:hover {
    opacity: 0.75;
  }

  .btn-ghost {
    background: transparent;
    color: #666;
    border: 0.5px solid #ccc;
    padding: 10px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s;
  }

  .dark .btn-ghost {
    color: #888;
    border-color: #333;
  }

  .btn-ghost:hover {
    background: #f5f5f5;
  }

  .dark .btn-ghost:hover {
    background: #1a1a1a;
  }

  @keyframes glitch {
    0%, 90%, 100% { transform: translate(0); filter: none; }
    92% { transform: translate(-3px, 1px); filter: brightness(1.2); }
    94% { transform: translate(3px, -1px); filter: brightness(0.9); }
    96% { transform: translate(-2px, 2px); }
    98% { transform: translate(2px, -2px); }
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .glitch {
    animation: glitch 4s infinite;
  }

  .blink {
    animation: blink 1.1s step-end infinite;
    color: #378ADD;
    font-weight: 700;
  }
`;

export default function NotFound404() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    setTimeout(() => setVisible(true), 50);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div className="page-404" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s" }}>
      <div className="grid-bg" />

      {/* Status bar */}
      <div className="status-bar">
        <span className="dot" style={{ background: "#E24B4A" }} />
        <span className="dot" style={{ background: "#EF9F27" }} />
        <span className="dot" style={{ background: "#639922" }} />
        <span style={{ marginLeft: 4 }}>HTTP 404 — resource not found</span>
        <span className="blink">_</span>
      </div>

      {/* Big number */}
      <div className="big-num glitch">
        4<span className="zero-accent">0</span>4
      </div>

      <p className="tag-line">page not found</p>

      <p className="msg">
        The page you requested doesn&apos;t exist,
        <br />
        was moved, or never existed at all.
        <br />
        <br />
        Error: <code>ROUTE_NOT_MATCHED</code>
        <br />
        Path: <code>/this/page/is/gone</code>
      </p>

      <div className="btn-row">
        <button className="btn-primary" onClick={() => window.location.href = "/"}>
          Go home →
        </button>
        <button className="btn-ghost" onClick={() => window.history.back()}>
          Go back
        </button>
      </div>
    </div>
  );
}