"use client";

import { useEffect, useRef } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";
import "./Prism.css";

interface PrismProps {
  height?: number;
  baseWidth?: number;
  animationType?: "rotate" | "hover" | "3drotate";
  glow?: number;
  offset?: { x?: number; y?: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
}

export default function Prism({
  height = 3.5,
  baseWidth = 5.5,
  animationType = "rotate",
  glow = 1,
  offset,
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5,
}: PrismProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const offX = offset?.x ?? 0;
  const offY = offset?.y ?? 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const H      = Math.max(0.001, height);
    const BW     = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW   = Math.max(0, glow);
    const NOISE  = Math.max(0, noise);
    const SAT    = transparent ? 1.5 : 1;
    const SCALE  = Math.max(0.001, scale);
    const HUE    = hueShift || 0;
    const CFREQ  = Math.max(0, colorFrequency || 1);
    const BLOOM  = Math.max(0, bloom || 1);
    const TS     = reduced ? 0 : Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT  = Math.max(0, Math.min(1, inertia || 0.12));

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const renderer = new Renderer({ dpr, alpha: transparent, antialias: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gl = renderer.gl as any;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: "absolute", inset: "0",
      width: "100%", height: "100%", display: "block",
    });
    container.appendChild(gl.canvas);

    const vertex = /* glsl */`
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragment = /* glsl */`
      precision highp float;
      uniform vec2  iResolution; uniform float iTime;
      uniform float uHeight; uniform float uBaseHalf; uniform mat3 uRot;
      uniform int   uUseBaseWobble; uniform float uGlow; uniform vec2 uOffsetPx;
      uniform float uNoise; uniform float uSaturation; uniform float uScale;
      uniform float uHueShift; uniform float uColorFreq; uniform float uBloom;
      uniform float uCenterShift; uniform float uInvBaseHalf; uniform float uInvHeight;
      uniform float uMinAxis; uniform float uPxScale; uniform float uTimeScale;

      vec4 tanh4(vec4 x){ vec4 e=exp(2.0*x); return (e-1.0)/(e+1.0); }
      float rand(vec2 c){ return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453); }

      float sdOctaAnisoInv(vec3 p){
        vec3 q=vec3(abs(p.x)*uInvBaseHalf,abs(p.y)*uInvHeight,abs(p.z)*uInvBaseHalf);
        return (q.x+q.y+q.z-1.0)*uMinAxis*0.5773502691896258;
      }
      float sdPyramidUpInv(vec3 p){ return max(sdOctaAnisoInv(p),-p.y); }

      mat3 hueRot(float a){
        float c=cos(a),s=sin(a);
        mat3 W=mat3(.299,.587,.114,.299,.587,.114,.299,.587,.114);
        mat3 U=mat3(.701,-.587,-.114,-.299,.413,-.114,-.300,-.588,.886);
        mat3 V=mat3(.168,-.331,.500,.328,.035,-.500,-.497,.296,.201);
        return W+U*c+V*s;
      }

      void main(){
        vec2 f=(gl_FragCoord.xy-0.5*iResolution.xy-uOffsetPx)*uPxScale;
        float z=5.0,d=0.0; vec3 p; vec4 o=vec4(0.0);
        mat2 wob=mat2(1.0);
        if(uUseBaseWobble==1){
          float t=iTime*uTimeScale;
          wob=mat2(cos(t),cos(t+33.0),cos(t+11.0),cos(t));
        }
        for(int i=0;i<100;i++){
          p=vec3(f,z); p.xz=p.xz*wob; p=uRot*p;
          vec3 q=p; q.y+=uCenterShift;
          d=0.1+0.2*abs(sdPyramidUpInv(q)); z-=d;
          o+=(sin((p.y+z)*uColorFreq+vec4(0.0,1.0,2.0,3.0))+1.0)/d;
        }
        o=tanh4(o*o*(uGlow*uBloom)/1e5);
        vec3 col=o.rgb;
        col+=(rand(gl_FragCoord.xy+vec2(iTime))-.5)*uNoise;
        col=clamp(col,0.0,1.0);
        float L=dot(col,vec3(.2126,.7152,.0722));
        col=clamp(mix(vec3(L),col,uSaturation),0.0,1.0);
        if(abs(uHueShift)>0.0001) col=clamp(hueRot(uHueShift)*col,0.0,1.0);
        gl_FragColor=vec4(col,o.a);
      }
    `;

    const geometry   = new Triangle(gl);
    const iResBuf    = new Float32Array(2);
    const offsetBuf  = new Float32Array(2);
    const rotBuf     = new Float32Array(9);

    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        iResolution:   { value: iResBuf },
        iTime:         { value: 0 },
        uHeight:       { value: H },
        uBaseHalf:     { value: BASE_HALF },
        uUseBaseWobble:{ value: 1 },
        uRot:          { value: new Float32Array([1,0,0, 0,1,0, 0,0,1]) },
        uGlow:         { value: GLOW },
        uOffsetPx:     { value: offsetBuf },
        uNoise:        { value: NOISE },
        uSaturation:   { value: SAT },
        uScale:        { value: SCALE },
        uHueShift:     { value: HUE },
        uColorFreq:    { value: CFREQ },
        uBloom:        { value: BLOOM },
        uCenterShift:  { value: H * 0.25 },
        uInvBaseHalf:  { value: 1 / BASE_HALF },
        uInvHeight:    { value: 1 / H },
        uMinAxis:      { value: Math.min(BASE_HALF, H) },
        uPxScale:      { value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE) },
        uTimeScale:    { value: TS },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const u = program.uniforms as Record<string, { value: any }>;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0]   = gl.drawingBufferWidth;
      iResBuf[1]   = gl.drawingBufferHeight;
      offsetBuf[0] = offX * dpr;
      offsetBuf[1] = offY * dpr;
      u.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const setMat3 = (yY: number, pX: number, rZ: number) => {
      const [cy,sy] = [Math.cos(yY), Math.sin(yY)];
      const [cx,sx] = [Math.cos(pX), Math.sin(pX)];
      const [cz,sz] = [Math.cos(rZ), Math.sin(rZ)];
      rotBuf[0]=cy*cz+sy*sx*sz; rotBuf[1]=cx*sz;  rotBuf[2]=-sy*cz+cy*sx*sz;
      rotBuf[3]=-cy*sz+sy*sx*cz; rotBuf[4]=cx*cz; rotBuf[5]=sy*sz+cy*sx*cz;
      rotBuf[6]=sy*cx;            rotBuf[7]=-sx;   rotBuf[8]=cy*cx;
      return rotBuf;
    };

    let raf = 0;
    const t0 = performance.now();
    const startRAF = () => { if (!raf) raf = requestAnimationFrame(render); };
    const stopRAF  = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    const wX  = 0.3 + Math.random() * 0.6;
    const wY  = 0.2 + Math.random() * 0.7;
    const wZ  = 0.1 + Math.random() * 0.5;
    const phX = Math.random() * Math.PI * 2;
    const phZ = Math.random() * Math.PI * 2;
    let yaw = 0, pitch = 0, roll = 0, targetYaw = 0, targetPitch = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const pointer = { x: 0, y: 0, inside: true };
    const onLeave = () => { pointer.inside = false; };
    const onBlur  = () => { pointer.inside = false; };
    let onPointerMove: ((e: PointerEvent) => void) | null = null;

    if (animationType === "hover") {
      onPointerMove = (e: PointerEvent) => {
        const ww = Math.max(1, window.innerWidth);
        const wh = Math.max(1, window.innerHeight);
        pointer.x = Math.max(-1, Math.min(1, (e.clientX - ww * 0.5) / (ww * 0.5)));
        pointer.y = Math.max(-1, Math.min(1, (e.clientY - wh * 0.5) / (wh * 0.5)));
        pointer.inside = true;
        startRAF();
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onBlur);
      u.uUseBaseWobble.value = 0;
    } else if (animationType === "3drotate") {
      u.uUseBaseWobble.value = 0;
    }

    const render = (t: number) => {
      const time = (t - t0) * 0.001;
      u.iTime.value = time;
      let cont = true;

      if (animationType === "hover") {
        targetYaw   = (pointer.inside ? -pointer.x : 0) * 0.6 * HOVSTR;
        targetPitch = (pointer.inside ?  pointer.y : 0) * 0.6 * HOVSTR;
        yaw   = lerp(yaw,   targetYaw,   INERT);
        pitch = lerp(pitch, targetPitch, INERT);
        roll  = lerp(roll,  0, 0.1);
        u.uRot.value = setMat3(yaw, pitch, roll);
        if (Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4)
          cont = NOISE >= 1e-6;
      } else if (animationType === "3drotate") {
        const ts = time * TS;
        u.uRot.value = setMat3(ts * wY, Math.sin(ts * wX + phX) * 0.6, Math.sin(ts * wZ + phZ) * 0.5);
        if (TS < 1e-6) cont = false;
      } else {
        rotBuf.fill(0); rotBuf[0] = rotBuf[4] = rotBuf[8] = 1;
        u.uRot.value = rotBuf;
        if (TS < 1e-6) cont = false;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderer.render({ scene: mesh as any });
      raf = cont ? requestAnimationFrame(render) : 0;
    };

    let suspendIO: IntersectionObserver | null = null;
    if (suspendWhenOffscreen) {
      suspendIO = new IntersectionObserver((entries) => {
        entries.some((e) => e.isIntersecting) ? startRAF() : stopRAF();
      });
      suspendIO.observe(container);
    }
    startRAF();

    return () => {
      stopRAF();
      ro.disconnect();
      suspendIO?.disconnect();
      if (animationType === "hover") {
        if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("blur", onBlur);
      }
      const canvas = gl.canvas as HTMLCanvasElement;
      if (canvas.parentElement === container) container.removeChild(canvas);
    };
  }, [height, baseWidth, animationType, glow, noise, offX, offY, scale,
      transparent, hueShift, colorFrequency, timeScale, hoverStrength,
      inertia, bloom, suspendWhenOffscreen]);

  return <div className="prism-container" ref={containerRef} />;
}
