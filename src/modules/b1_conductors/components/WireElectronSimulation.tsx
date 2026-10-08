import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Info, Gauge } from 'lucide-react';

interface Electron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface CopperIon {
  x: number;
  y: number;
  radius: number;
}

export const WireElectronSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flowing, setFlowing] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(2); // 1 = slow, 2 = normal, 3 = fast
  const [showConventional, setShowConventional] = useState<boolean>(false);

  // Keep references to state inside animation loop
  const flowingRef = useRef(flowing);
  flowingRef.current = flowing;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Fixed copper ions
    let copperIons: CopperIon[] = [];
    // Free electrons
    let electrons: Electron[] = [];

    const initEntities = (w: number, h: number) => {
      width = w;
      height = h;

      // 2 rows of copper ions
      copperIons = [];
      const cols = Math.max(5, Math.floor(w / 80));
      const colSpacing = w / (cols + 1);
      const row1Y = h * 0.32;
      const row2Y = h * 0.68;

      for (let i = 1; i <= cols; i++) {
        copperIons.push({
          x: i * colSpacing,
          y: row1Y + (i % 2 === 0 ? 4 : -4),
          radius: 16,
        });
        copperIons.push({
          x: i * colSpacing + colSpacing * 0.45,
          y: row2Y + (i % 2 === 0 ? -4 : 4),
          radius: 16,
        });
      }

      // 24 free electrons scattered
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

    // Animation loop
    const render = () => {
      if (!ctx || width === 0 || height === 0) return;

      const isFlowing = flowingRef.current;
      const currentSpeed = speedRef.current;
      const driftSpeed = currentSpeed * 1.5;

      // 1. Draw copper cable background
      const cableGrad = ctx.createLinearGradient(0, 0, 0, height);
      cableGrad.addColorStop(0, '#9a471b');
      cableGrad.addColorStop(0.15, '#c76e39');
      cableGrad.addColorStop(0.5, '#e08a54');
      cableGrad.addColorStop(0.85, '#c76e39');
      cableGrad.addColorStop(1, '#8f3d14');

      ctx.fillStyle = cableGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle metallic highlight lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.25);
      ctx.lineTo(width, height * 0.25);
      ctx.moveTo(0, height * 0.5);
      ctx.lineTo(width, height * 0.5);
      ctx.stroke();

      // Cable borders (casing)
      ctx.fillStyle = '#612408';
      ctx.fillRect(0, 0, width, 5);
      ctx.fillRect(0, height - 5, width, 5);

      // 2. Draw Copper Ions (Cu²⁺ crystal lattice)
      copperIons.forEach((ion) => {
        // Ion body
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

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Ion text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cu²⁺', ion.x, ion.y);
      });

      // 3. Update & Draw Electrons
      electrons.forEach((e) => {
        if (isFlowing) {
          // Ordered drift to the right (towards +)
          // Add small thermal jiggle to look realistic
          e.x += driftSpeed + (Math.random() - 0.5) * 0.4;
          e.y += e.vy * 0.4 + (Math.random() - 0.5) * 0.5;

          // Keep in vertical bounds
          if (e.y < 16) {
            e.y = 16;
            e.vy = Math.abs(e.vy);
          } else if (e.y > height - 16) {
            e.y = height - 16;
            e.vy = -Math.abs(e.vy);
          }

          // Loop seamlessly across horizontal boundary
          if (e.x > width + e.radius) {
            e.x = -e.radius;
            e.y = 18 + Math.random() * (height - 36);
          }
        } else {
          // Chaotic thermal Brownian motion (no net drift)
          e.x += e.vx;
          e.y += e.vy;

          // Bounce off vertical boundaries
          if (e.y < 16) {
            e.y = 16;
            e.vy = -e.vy;
          } else if (e.y > height - 16) {
            e.y = height - 16;
            e.vy = -e.vy;
          }

          // Bounce off horizontal boundaries
          if (e.x < 12) {
            e.x = 12;
            e.vx = -e.vx;
          } else if (e.x > width - 12) {
            e.x = width - 12;
            e.vx = -e.vx;
          }
        }

        // Draw electron glow & body
        ctx.save();
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

        // Electron label e⁻
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('e⁻', e.x, e.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-5 space-y-4">
      {/* Title & Controls header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-xs font-bold text-stone-700 block">
            Model microscòpic del pas d'electrons dins d'un fil de coure:
          </span>
          <span className="text-[11px] text-stone-500">
            Observa com responen els electrons lliures quan s'aplica una tensió elèctrica.
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFlowing(!flowing)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
              flowing
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {flowing ? <Pause size={14} /> : <Play size={14} />}
            <span>{flowing ? 'Aturar corrent (Pila OFF)' : 'Activar corrent (Pila ON)'}</span>
          </button>

          <button
            onClick={() => setShowConventional(!showConventional)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              showConventional
                ? 'bg-red-50 text-red-800 border-red-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
            title="Alterna entre sentit real dels electrons i sentit convencional dels circuits"
          >
            {showConventional ? '🔄 Veient: Sentit Convencional' : '🔄 Veient: Sentit Real'}
          </button>
        </div>
      </div>

      {/* Main Canvas Container with Terminals */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 shadow-inner bg-stone-900">
        {/* Left Pole Indicator */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent flex flex-col justify-center items-start pl-3 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-mono font-bold tracking-wider shadow">
            Pol (-)
          </span>
          <span className="text-[9px] text-blue-200 mt-1 font-semibold">
            Repel·leix e⁻
          </span>
        </div>

        {/* Right Pole Indicator */}
        <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-stone-900/90 via-stone-900/60 to-transparent flex flex-col justify-center items-end pr-3 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold tracking-wider shadow">
            Pol (+)
          </span>
          <span className="text-[9px] text-red-200 mt-1 font-semibold">
            Atrau e⁻
          </span>
        </div>

        {/* Direction Arrow Overlay on top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          {flowing ? (
            !showConventional ? (
              <div className="bg-sky-950/85 text-sky-200 border border-sky-500/60 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow backdrop-blur-sm animate-pulse">
                <span>Sentit Real dels electrons (e⁻): de (-) a (+)</span>
                <ArrowRight size={13} className="text-sky-400" />
              </div>
            ) : (
              <div className="bg-rose-950/85 text-rose-200 border border-rose-500/60 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow backdrop-blur-sm animate-pulse">
                <ArrowLeft size={13} className="text-rose-400" />
                <span>Sentit Convencional del corrent (històric): de (+) a (-)</span>
              </div>
            )
          ) : (
            <div className="bg-stone-900/85 text-stone-300 border border-stone-600 px-3 py-1 rounded-full text-[11px] font-bold shadow backdrop-blur-sm">
              ⏸️ Circuit Obert: Moviment tèrmic caòtic (Sense corrent net)
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
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 border border-white shadow-sm flex items-center justify-center text-[8px] font-bold text-white">
              Cu
            </span>
            <span className="text-[11px]"><strong>Àtoms de Coure (Cu²⁺):</strong> Fixos a la xarxa</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-sky-500 border border-white shadow-sm flex items-center justify-center text-[8px] font-bold text-white">
              e⁻
            </span>
            <span className="text-[11px]"><strong>Electrons lliures:</strong> Partícules mòbils</span>
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
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-950 leading-relaxed">
        💡 <strong>Què estàs veient?</strong>
        {flowing ? (
          <span>
            {' '}En connectar la pila, s'estableix un camp elèctric al llarg del cable. El pol negatiu <strong>repel·leix</strong> els electrons i el pol positiu els <strong>atrau</strong>. Els electrons avancen ordenadament esquivant els àtoms fixos de coure. Aquest desplaçament continu és el <strong>corrent elèctric</strong>!
          </span>
        ) : (
          <span>
            {' '}Sense pila, els electrons no estan quiets: tenen agitació tèrmica i es mouen en totes direccions a l'atzar. Com que n'hi ha tants cap a la dreta com cap a l'esquerra, el <strong>flux net és zero</strong> i no hi ha corrent elèctric.
          </span>
        )}
      </div>
    </div>
  );
};
