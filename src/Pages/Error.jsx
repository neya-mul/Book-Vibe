import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

  .s404-root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
    background: #050510;
    font-family: 'Space Mono', monospace;
  }

  .s404-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .s-nebula {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .s-nebula span {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.13;
  }
  .s-nebula span:nth-child(1) { width: 340px; height: 340px; background: #6030cc; top: -60px; left: -80px; }
  .s-nebula span:nth-child(2) { width: 260px; height: 260px; background: #1060cc; bottom: -40px; right: -60px; }
  .s-nebula span:nth-child(3) { width: 200px; height: 180px; background: #cc3080; top: 50%; left: 60%; opacity: 0.08; }

  .s-status {
    display: flex;
    gap: 14px;
    align-items: center;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(120,100,255,0.3);
    border-radius: 2px;
    padding: 7px 16px;
    font-size: 10px;
    color: rgba(180,170,255,0.55);
    letter-spacing: 0.14em;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }
  .s-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }

  .s-planet {
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

  .s-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(96px, 20vw, 168px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -5px;
    color: transparent;
    -webkit-text-stroke: 2px rgba(160,130,255,0.9);
    position: relative;
    z-index: 2;
    animation: floatNum 6s ease-in-out infinite, glitch 7s infinite;
  }
  .s-zero {
    -webkit-text-stroke: 2px #7B8DFF;
  }

  @keyframes floatNum {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes glitch {
    0%,88%,100% { transform: translateY(var(--fy,0px)) skewX(0deg); filter: none; }
    90% { transform: translateY(calc(var(--fy,0px) - 2px)) skewX(-2deg); filter: brightness(1.3); }
    92% { transform: translateY(calc(var(--fy,0px) + 2px)) skewX(2deg);  filter: brightness(0.8); }
    94% { transform: translateY(calc(var(--fy,0px) - 1px)) skewX(1deg); }
    96% { transform: translateY(var(--fy,0px)); }
  }

  .s-tag {
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(160,150,255,0.45);
    margin: 0.6rem 0 1.4rem;
    position: relative;
    z-index: 2;
  }

  .s-msg {
    font-size: 11.5px;
    color: rgba(180,175,220,0.5);
    max-width: 330px;
    line-height: 1.95;
    position: relative;
    z-index: 2;
    margin-bottom: 2.2rem;
  }
  .s-msg code {
    color: #7B8DFF;
    font-family: 'Space Mono', monospace;
  }

  .s-btns {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  .s-btn-p {
    background: rgba(100,110,255,0.18);
    color: rgba(210,215,255,0.9);
    border: 0.5px solid rgba(120,130,255,0.5);
    padding: 10px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s, border-color 0.15s;
  }
  .s-btn-p:hover { background: rgba(100,110,255,0.32); border-color: rgba(160,170,255,0.7); }

  .s-btn-g {
    background: transparent;
    color: rgba(160,155,210,0.5);
    border: 0.5px solid rgba(120,110,200,0.22);
    padding: 10px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s;
  }
  .s-btn-g:hover { background: rgba(100,100,200,0.1); }

  .s-blink {
    animation: sblink 1.1s step-end infinite;
    color: #7B8DFF;
    font-weight: 700;
  }
  @keyframes sblink { 50% { opacity: 0; } }

  .s-orbit {
    position: absolute;
    border-radius: 50%;
    border: 0.5px solid rgba(120,130,255,0.12);
    pointer-events: none;
    z-index: 1;
    top: 50%;
    left: 50%;
    animation: spinOrbit linear infinite;
  }
  @keyframes spinOrbit {
    from { transform: translate(-50%,-50%) rotate(0deg); }
    to   { transform: translate(-50%,-50%) rotate(360deg); }
  }
  .s-sat {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(140,160,255,0.7);
    top: -2.5px;
    left: calc(50% - 2.5px);
  }
`;

function rand(a, b) { return a + Math.random() * (b - a); }

function useStarfield(canvasRef, rootRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const root   = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    let W, H, rafId;

    function resize() {
      W = canvas.width  = root.offsetWidth;
      H = canvas.height = root.offsetHeight;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const STARS = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: rand(0.3, 1.4),
      a: rand(0.3, 1),
      tw: rand(0.004, 0.018),
      td: Math.random() < 0.5 ? 1 : -1,
    }));

    const SHOOT = [];
    function spawnShoot() {
      SHOOT.push({
        x: rand(0.05, 0.85), y: rand(0.05, 0.45),
        len: rand(60, 130),
        angle: rand(0.18, 0.42),
        speed: rand(0.004, 0.009),
        progress: 0, alpha: 0.9,
        hue: Math.random() < 0.5 ? 220 : 270,
      });
    }
    spawnShoot();
    const shootTimer = setInterval(spawnShoot, 2800);

    function frame() {
      ctx.clearRect(0, 0, W, H);

      STARS.forEach(s => {
        s.a += s.tw * s.td;
        if (s.a > 1)   { s.a = 1;   s.td = -1; }
        if (s.a < 0.2) { s.a = 0.2; s.td =  1; }
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,205,255,${s.a})`;
        ctx.fill();
      });

      for (let i = SHOOT.length - 1; i >= 0; i--) {
        const s = SHOOT[i];
        s.progress += s.speed;
        if (s.progress > 1.3) { SHOOT.splice(i, 1); continue; }
        const px = s.x * W + s.progress * s.len * Math.cos(s.angle);
        const py = s.y * H + s.progress * s.len * Math.sin(s.angle);
        const alpha = Math.max(0, s.alpha * (1 - s.progress / 1.1));
        const x0 = px - Math.cos(s.angle) * s.len * 0.6;
        const y0 = py - Math.sin(s.angle) * s.len * 0.6;
        const grad = ctx.createLinearGradient(x0, y0, px, py);
        grad.addColorStop(0, `hsla(${s.hue},90%,75%,0)`);
        grad.addColorStop(1, `hsla(${s.hue},90%,85%,${alpha})`);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(shootTimer);
      ro.disconnect();
    };
  }, [canvasRef, rootRef]);
}

export default function NotFound404() {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);
  const rootRef   = useRef(null);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    setTimeout(() => setVisible(true), 50);
    return () => document.head.removeChild(tag);
  }, []);

  useStarfield(canvasRef, rootRef);

  return (
    <div
      ref={rootRef}
      className="s404-root"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s" }}
    >
      <canvas ref={canvasRef} className="s404-canvas" />

      {/* Nebula blobs */}
      <div className="s-nebula">
        <span /><span /><span />
      </div>

      {/* Orbiting rings */}
      <div className="s-orbit" style={{ width: 280, height: 280, animationDuration: "22s" }}>
        <div className="s-sat" />
      </div>
      <div className="s-orbit" style={{ width: 370, height: 370, animationDuration: "38s", animationDirection: "reverse" }}>
        <div className="s-sat" style={{ background: "rgba(180,140,255,0.6)", width: 4, height: 4, top: -2, left: "calc(50% - 2px)" }} />
      </div>
      <div className="s-orbit" style={{ width: 460, height: 460, animationDuration: "54s", borderColor: "rgba(100,110,255,0.07)" }}>
        <div className="s-sat" style={{ background: "rgba(120,180,255,0.5)", width: 3, height: 3, top: -1.5, left: "calc(50% - 1.5px)" }} />
      </div>

      {/* Planet — top right */}
      <div className="s-planet" style={{ top: 18, right: 24, opacity: 0.55 }}>
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
          <circle cx="27" cy="27" r="18" fill="url(#pg1)" />
          <ellipse cx="27" cy="27" rx="26" ry="7" stroke="rgba(160,140,255,0.35)" strokeWidth="1" fill="none" />
          <defs>
            <radialGradient id="pg1" cx="38%" cy="35%">
              <stop offset="0%"   stopColor="#8878e8" />
              <stop offset="100%" stopColor="#1a1060" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Planet — bottom left */}
      <div className="s-planet" style={{ bottom: 28, left: 20, opacity: 0.4 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" fill="url(#pg2)" />
          <defs>
            <radialGradient id="pg2" cx="35%" cy="32%">
              <stop offset="0%"   stopColor="#5090e0" />
              <stop offset="100%" stopColor="#0a1840" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Status bar */}
      <div className="s-status">
        <span className="s-dot" style={{ background: "#E24B4A" }} />
        <span className="s-dot" style={{ background: "#EF9F27" }} />
        <span className="s-dot" style={{ background: "#639922" }} />
        <span style={{ marginLeft: 4 }}>HTTP 404 — resource not found</span>
        <span className="s-blink">_</span>
      </div>

      {/* Big number */}
      <div className="s-num">
        4<span className="s-zero">0</span>4
      </div>

      <p className="s-tag">page not found</p>

      <p className="s-msg">
        The page you requested doesn&apos;t exist,<br />
        was moved, or drifted into deep space.<br />
        <br />
        Error: <code>ROUTE_NOT_MATCHED</code><br />
        Path: <code>/this/page/is/gone</code>
      </p>

      <div className="s-btns">
        <button className="s-btn-p" onClick={() => (window.location.href = "/")}>
          Go home →
        </button>
        <button className="s-btn-g" onClick={() => window.history.back()}>
          Go back
        </button>
      </div>
    </div>
  );
}