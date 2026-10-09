import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, ArrowRight, ArrowLeft, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface Electron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface CopperIon {
  id: number;
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  radius: number;
}

type FlowMode = 'real' | 'conventional';
type BatteryPolarity = 'normal' | 'reversed'; // normal: (-) left, (+) right; reversed: (+) left, (-) right

export const WireElectronSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flowing, setFlowing] = useState<boolean>(true);
  const [mode, setMode] = useState<FlowMode>('real');
  const [polarity, setPolarity] = useState<BatteryPolarity>('normal');
  const [speed, setSpeed] = useState<number>(2); // 1 = slow, 2 = normal, 3.5 = fast

  // Refs for requestAnimationFrame loop
  const flowingRef = useRef(flowing);
  flowingRef.current = flowing;

  const modeRef = useRef(mode);
  modeRef.current = mode;

  const polarityRef = useRef(polarity);
  polarityRef.current = polarity;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  // Direction: +1 means moving left-to-right, -1 means moving right-to-left
  // Real electrons always go towards (+).
  // Conventional charges always go from (+) towards (-).
  const currentDirection = (polarity === 'normal')
    ? (mode === 'real' ? 1 : -1)
    : (mode === 'real' ? -1 : 1);

  const directionRef = useRef(currentDirection);
  directionRef.current = currentDirection;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let copperIons: CopperIon[] = [];
    let electrons: Electron[] = [];

    const initEntities = (w: number, h: number) => {
      width = w;
      height = h;

      // 2 rows of fixed copper ions
      copperIons = [];
      const cols = Math.max(5, Math.floor(w / 80));
      const colSpacing = w / (cols + 1);
      const row1Y = h * 0.32;
      const row2Y = h * 0.68;

      let ionId = 0;
      for (let i = 1; i <= cols; i++) {
        const x1 = i * colSpacing;
        const y1 = row1Y + (i % 2 === 0 ? 4 : -4);
        copperIons.push({
          id: ionId++,
          anchorX: x1,
          anchorY: y1,
          x: x1,
          y: y1,
          radius: 16,
        });

        const x2 = i * colSpacing + colSpacing * 0.45;
        const y2 = row2Y + (i % 2 === 0 ? -4 : 4);
        copperIons.push({
          id: ionId++,
          anchorX: x2,
          anchorY: y2,
          x: x2,
          y: y2,
          radius: 16,
        });
      }

      // Free mobile electrons
      electrons = [];
      const electronCount = Math.max(16, Math.floor(w / 35));
      for (let i = 0; i < electronCount; i++) {
        const randAngle = Math.random() * Math.PI * 2;
        electrons.push({
          x: Math.random() * w,
          y: 20 + Math.random() * (h - 40),
          vx: Math.cos(randAngle) * 0.8,
          vy: Math.sin(randAngle) * 0.8,
          radius: 9,
        });
      }
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      initEntities(rect.width, rect.height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    // Animation Loop
    let time = 0;
    const render = () => {
      if (!ctx || width === 0 || height === 0) return;
      time += 1;

      const isFlowing = flowingRef.current;
      const currentSpeed = speedRef.current;
      const dir = directionRef.current;
      const currentMode = modeRef.current;
      const driftSpeed = currentSpeed * 1.6;

      // 1. Draw copper cable background
      const cableGrad = ctx.createLinearGradient(0, 0, 0, height);
      cableGrad.addColorStop(0, '#9a471b');
      cableGrad.addColorStop(0.15, '#c76e39');
      cableGrad.addColorStop(0.5, '#e08a54');
      cableGrad.addColorStop(0.85, '#c76e39');
      cableGrad.addColorStop(1, '#8f3d14');

      ctx.fillStyle = cableGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle metallic highlights
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.22);
      ctx.lineTo(width, height * 0.22);
      ctx.moveTo(0, height * 0.78);
      ctx.lineTo(width, height * 0.78);
      ctx.stroke();

      // Cable borders (casing)
      ctx.fillStyle = '#612408';
      ctx.fillRect(0, 0, width, 5);
      ctx.fillRect(0, height - 5, width, 5);

      // 2. Draw Copper Ions (Cu²⁺) - FIXED in the lattice with subtle thermal vibration
      copperIons.forEach((ion) => {
        // Subtle thermal vibration around anchor
        ion.x = ion.anchorX + Math.sin(time * 0.08 + ion.id) * 0.6;
        ion.y = ion.anchorY + Math.cos(time * 0.08 + ion.id) * 0.6;

        const ionGrad = ctx.createRadialGradient(
          ion.x - 3,
          ion.y - 3,
          2,
          ion.x,
          ion.y,
          ion.radius
        );
        ionGrad.addColorStop(0, '#fde68a');
        ionGrad.addColorStop(0.5, '#d97706');
        ionGrad.addColorStop(1, '#92400e');

        ctx.beginPath();
        ctx.arc(ion.x, ion.y, ion.radius, 0, Math.PI * 2);
        ctx.fillStyle = ionGrad;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Ion text Cu²⁺
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cu²⁺', ion.x, ion.y);
      });

      // 3. Update & Draw Mobile Particles (Electrons e⁻ or Conventional Charges +)
      electrons.forEach((e) => {
        if (isFlowing) {
          // Ordered drift in direction `dir` (+1 = right, -1 = left)
          e.x += dir * driftSpeed + (Math.random() - 0.5) * 0.4;
          e.y += e.vy * 0.4 + (Math.random() - 0.5) * 0.5;

          // Keep in vertical bounds
          if (e.y < 16) {
            e.y = 16;
            e.vy = Math.abs(e.vy);
          } else if (e.y > height - 16) {
            e.y = height - 16;
            e.vy = -Math.abs(e.vy);
          }

          // Wrap-around across borders depending on direction
          if (dir > 0) {
            // Moving to the right: wrap from right to left
            if (e.x > width + e.radius) {
              e.x = -e.radius;
              e.y = 18 + Math.random() * (height - 36);
            }
          } else {
            // Moving to the left: wrap from left to right
            if (e.x < -e.radius) {
              e.x = width + e.radius;
              e.y = 18 + Math.random() * (height - 36);
            }
          }
        } else {
          // Chaotic thermal Brownian motion (no net drift)
          e.x += e.vx;
          e.y += e.vy;

          if (e.y < 16) {
            e.y = 16;
            e.vy = -e.vy;
          } else if (e.y > height - 16) {
            e.y = height - 16;
            e.vy = -e.vy;
          }

          if (e.x < 12) {
            e.x = 12;
            e.vx = -e.vx;
          } else if (e.x > width - 12) {
            e.x = width - 12;
            e.vx = -e.vx;
          }
        }

        // Particle Styling based on Mode
        ctx.save();
        if (currentMode === 'real') {
          // Real electrons (Blue / Cyan, negative)
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;

          const eleGrad = ctx.createRadialGradient(
            e.x - 2,
            e.y - 2,
            1,
            e.x,
            e.y,
            e.radius
          );
          eleGrad.addColorStop(0, '#e0f2fe');
          eleGrad.addColorStop(0.4, '#38bdf8');
          eleGrad.addColorStop(1, '#0284c7');

          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fillStyle = eleGrad;
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();

          // Text label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('e⁻', e.x, e.y);
        } else {
          // Conventional Current (Warm Red / Coral, positive charges)
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 8;

          const eleGrad = ctx.createRadialGradient(
            e.x - 2,
            e.y - 2,
            1,
            e.x,
            e.y,
            e.radius
          );
          eleGrad.addColorStop(0, '#ffe4e6');
          eleGrad.addColorStop(0.4, '#f43f5e');
          eleGrad.addColorStop(1, '#be123c');

          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fillStyle = eleGrad;
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();

          // Text label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', e.x, e.y);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // Labels for Left and Right poles depending on battery polarity
  const leftPole = polarity === 'normal'
    ? { name: 'Pol (-)', color: 'bg-blue-600', text: 'text-blue-200', note: mode === 'real' ? 'Repel·leix e⁻' : 'Arribada (+)' }
    : { name: 'Pol (+)', color: 'bg-red-600', text: 'text-red-200', note: mode === 'real' ? 'Atrau e⁻' : 'Sortida (+)' };

  const rightPole = polarity === 'normal'
    ? { name: 'Pol (+)', color: 'bg-red-600', text: 'text-red-200', note: mode === 'real' ? 'Atrau e⁻' : 'Sortida (+)' }
    : { name: 'Pol (-)', color: 'bg-blue-600', text: 'text-blue-200', note: mode === 'real' ? 'Repel·leix e⁻' : 'Arribada (+)' };

  const isMovingRight = currentDirection > 0;

  return (
    <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-5 space-y-4">
      {/* Title & Controls header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <span className="text-xs font-bold text-stone-700 block">
            Model microscòpic del pas d'electrons dins d'un fil de coure:
          </span>
          <span className="text-[11px] text-stone-500">
            Compara el sentit real dels electrons lliures amb el sentit convencional utilitzat en esquemes elèctrics.
          </span>
        </div>

        {/* Buttons Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Play/Pause */}
          <button
            onClick={() => setFlowing(!flowing)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
              flowing
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {flowing ? <Pause size={14} /> : <Play size={14} />}
            <span>{flowing ? 'Aturar corrent (OFF)' : 'Activar corrent (ON)'}</span>
          </button>

          {/* Mode Switcher: Real vs Conventional */}
          <div className="inline-flex rounded-xl border border-stone-300 bg-white p-0.5 shadow-xs">
            <button
              onClick={() => setMode('real')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                mode === 'real'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🔵 Sentit Real (e⁻)</span>
            </button>
            <button
              onClick={() => setMode('conventional')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                mode === 'conventional'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🔴 Sentit Convencional (I)</span>
            </button>
          </div>

          {/* Invert Polarity */}
          <button
            onClick={() => setPolarity(polarity === 'normal' ? 'reversed' : 'normal')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 flex items-center gap-1.5 transition"
            title="Gira la pila per invertir els pols positiu i negatiu"
          >
            <RotateCw size={13} className="text-amber-600" />
            <span>Girar Pila (+/-)</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Container with Terminals */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 shadow-inner bg-stone-900">
        {/* Left Pole Indicator */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-stone-900/95 via-stone-900/60 to-transparent flex flex-col justify-center items-start pl-3 pointer-events-none transition-all">
          <span className={`px-2 py-0.5 rounded ${leftPole.color} text-white text-[10px] font-mono font-bold tracking-wider shadow`}>
            {leftPole.name}
          </span>
          <span className={`text-[9px] ${leftPole.text} mt-1 font-semibold`}>
            {leftPole.note}
          </span>
        </div>

        {/* Right Pole Indicator */}
        <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-stone-900/95 via-stone-900/60 to-transparent flex flex-col justify-center items-end pr-3 pointer-events-none transition-all">
          <span className={`px-2 py-0.5 rounded ${rightPole.color} text-white text-[10px] font-mono font-bold tracking-wider shadow`}>
            {rightPole.name}
          </span>
          <span className={`text-[9px] ${rightPole.text} mt-1 font-semibold`}>
            {rightPole.note}
          </span>
        </div>

        {/* Direction Arrow Overlay on top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-full max-w-md px-2 flex justify-center">
          {flowing ? (
            mode === 'real' ? (
              <div className="bg-sky-950/90 text-sky-200 border border-sky-400 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                {isMovingRight ? (
                  <>
                    <span>Sentit Real dels electrons (e⁻): cap a la dreta (cap al Pol +)</span>
                    <ArrowRight size={14} className="text-sky-300 animate-pulse" />
                  </>
                ) : (
                  <>
                    <ArrowLeft size={14} className="text-sky-300 animate-pulse" />
                    <span>Sentit Real dels electrons (e⁻): cap a l'esquerra (cap al Pol +)</span>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-rose-950/90 text-rose-200 border border-rose-400 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                {isMovingRight ? (
                  <>
                    <span>Sentit Convencional (I): cap a la dreta (de + a -)</span>
                    <ArrowRight size={14} className="text-rose-300 animate-pulse" />
                  </>
                ) : (
                  <>
                    <ArrowLeft size={14} className="text-rose-300 animate-pulse" />
                    <span>Sentit Convencional (I): cap a l'esquerra (de + a -)</span>
                  </>
                )}
              </div>
            )
          ) : (
            <div className="bg-stone-900/90 text-stone-300 border border-stone-600 px-3 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md">
              ⏸️ Circuit Obert: Moviment tèrmic caòtic a l'atzar (Flux net = 0 A)
            </div>
          )}
        </div>

        {/* The HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-36 block cursor-pointer"
          onClick={() => setFlowing(!flowing)}
          title="Fes clic per pausar o reprendre el moviment"
        />
      </div>

      {/* Speed Slider & Legend */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600 pt-1">
        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5" title="Àtoms fixos del metall">
            <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 border border-white shadow-sm flex items-center justify-center text-[7px] font-bold text-white">
              Cu
            </span>
            <span className="text-[11px]">
              <strong>Àtoms de Coure (Cu²⁺):</strong> Fixos a la xarxa (només vibren)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-4 h-4 rounded-full border border-white shadow-sm flex items-center justify-center text-[8px] font-bold text-white ${
                mode === 'real' ? 'bg-sky-500' : 'bg-rose-500'
              }`}
            >
              {mode === 'real' ? 'e⁻' : '+'}
            </span>
            <span className="text-[11px]">
              {mode === 'real' ? (
                <span><strong>Electrons lliures:</strong> Partícules amb càrrega negativa</span>
              ) : (
                <span><strong>Càrregues convencionals:</strong> Càrrega positiva fictícia</span>
              )}
            </span>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-stone-500">Velocitat de deriva:</span>
          <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5 shadow-sm">
            {[
              { val: 1, label: 'Lenta' },
              { val: 2, label: 'Normal' },
              { val: 3.5, label: 'Ràpida' },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.val)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                  speed === s.val
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Didactic explanation box */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-950 leading-relaxed space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Sparkles size={14} className="text-amber-700" />
          <span>Explicació física del moviment:</span>
        </div>
        <p>
          {mode === 'real' ? (
            <span>
              🔬 <strong>Sentit Real (física real):</strong> La matèria està plena d'electrons lliures amb càrrega negativa (\(e^-\)). Quan s'aplica una diferència de potencial, el pol negatiu (\(-\)) els <strong>repel·leix</strong> i el pol positiu (\(+\)) els <strong>atrau</strong>. Per tant, els electrons es mouen físicament <strong>de \(-\) cap a \(+\)</strong> esquivant els àtoms de coure fixos.
            </span>
          ) : (
            <span>
              📜 <strong>Sentit Convencional (enginyeria i circuits):</strong> Al segle XVIII, Benjamin Franklin va suposar que l'electricitat era un fluid invisible que viatjava <strong>de \(+\) cap a \(-\)</strong>. Quan dècades després es va descobrir l'electró, es va mantenir aquesta convenció per comoditat en tots els esquemes i fletxes de corrent \(I\).
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
