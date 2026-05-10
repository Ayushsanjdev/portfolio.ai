'use client'

import React, { useEffect, useRef } from 'react'

interface HeroShaderProps {
  palette: {
    c1: number[]
    c2: number[]
    c3: number[]
    c4: number[]
  }
  intensity: number
  variant: string
}

const HeroShader: React.FC<HeroShaderProps> = ({ palette, intensity, variant }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    })
    if (!gl) return

    // Shaders
    const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

    const FRAG_WARP = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;
uniform float u_intensity;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
  vec3 n = h*h*h*h * vec3(dot(a, hash2(i)), dot(b, hash2(i+o)), dot(c, hash2(i+1.0)));
  return dot(n, vec3(70.0));
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.05; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.07 * u_intensity;
  vec2 m = (u_mouse / u_res) * 2.0 - 1.0;
  m.x *= u_res.x / u_res.y;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7 + m.x * 0.6, 9.2)),
                fbm(p + 4.0 * q + vec2(8.3, 2.8 - m.y * 0.6)));
  float f = fbm(p + 4.0 * r);

  vec3 col = mix(u_c4, u_c1, smoothstep(-0.4, 0.6, f));
  col = mix(col, u_c2, smoothstep(0.2, 0.9, length(q)));
  col = mix(col, u_c3, smoothstep(0.4, 1.0, length(r) * 0.7));

  // mouse glow
  float d = length(uv - (u_mouse / u_res));
  col += u_c2 * smoothstep(0.35, 0.0, d) * 0.18;

  // vignette
  float vig = smoothstep(1.2, 0.4, length(uv - 0.5));
  col *= mix(0.78, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

    const FRAG_GRID = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3; uniform vec3 u_c4;
uniform float u_intensity;
void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.18 * u_intensity;
  vec2 m = (u_mouse / u_res) * 2.0 - 1.0;
  m.x *= u_res.x / u_res.y;
  // perspective grid
  float pers = 1.0 / (p.y + 1.4);
  vec2 g = vec2(p.x * pers * 6.0, (p.y * pers * 6.0) + t);
  vec2 gf = abs(fract(g) - 0.5);
  float line = smoothstep(0.48, 0.5, max(gf.x, gf.y));
  vec3 base = mix(u_c4 * 0.05, u_c1, smoothstep(-0.6, 0.6, p.y));
  vec3 col = mix(base, u_c2, line);
  // sun
  float sun = smoothstep(0.4, 0.0, length(p - vec2(m.x * 0.3, 0.4)));
  col = mix(col, u_c3, sun * 0.7);
  // scan
  col += u_c2 * 0.05 * sin(uv.y * 800.0);
  gl_FragColor = vec4(col, 1.0);
}
`

    const FRAG_BLOBS = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3; uniform vec3 u_c4;
uniform float u_intensity;
void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.4 * u_intensity;
  vec2 m = (u_mouse / u_res) * 2.0 - 1.0;
  m.x *= u_res.x / u_res.y;

  vec3 col = u_c4 * 0.85;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 c = vec2(sin(t + fi * 1.7) * 0.7, cos(t * 0.8 + fi * 2.3) * 0.6);
    c += m * 0.15 * sin(fi);
    float d = length(p - c);
    float r = 0.55 + 0.1 * sin(t * 1.3 + fi);
    float k = smoothstep(r, r - 0.5, d);
    vec3 cc = (mod(fi, 3.0) < 0.5) ? u_c1 : (mod(fi, 3.0) < 1.5 ? u_c2 : u_c3);
    col = mix(col, cc, k * 0.6);
  }
  // grain
  col += (fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.04;
  gl_FragColor = vec4(col, 1.0);
}
`

    const fragSrc = variant === "grid" ? FRAG_GRID : variant === "blobs" ? FRAG_BLOBS : FRAG_WARP

    const compileShader = (gl: WebGLRenderingContext, type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("shader err", gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("link err", gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes = gl.getUniformLocation(prog, "u_res")
    const uMouse = gl.getUniformLocation(prog, "u_mouse")
    const uC1 = gl.getUniformLocation(prog, "u_c1")
    const uC2 = gl.getUniformLocation(prog, "u_c2")
    const uC3 = gl.getUniformLocation(prog, "u_c3")
    const uC4 = gl.getUniformLocation(prog, "u_c4")
    const uInt = gl.getUniformLocation(prog, "u_intensity")

    let mouse = { x: 0.5, y: 0.5 }
    let mouseT = { x: 0.5, y: 0.5 }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lowPower = window.innerWidth < 760 || window.devicePixelRatio > 1.5
    const maxDpr = lowPower ? 1 : 1.25
    const frameInterval = prefersReducedMotion ? Infinity : lowPower ? 1000 / 24 : 1000 / 30

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseT.x = (e.clientX - r.left) / r.width
      mouseT.y = 1.0 - (e.clientY - r.top) / r.height
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    let rafId = 0
    let hidden = document.visibilityState === "hidden"
    let visible = true
    let lastFrame = 0

    const render = (t: number) => {
      if (hidden || !visible) {
        return
      }
      if (!prefersReducedMotion && t - lastFrame < frameInterval) {
        rafId = requestAnimationFrame(render)
        return
      }
      lastFrame = t
      mouse.x += (mouseT.x - mouse.x) * 0.05
      mouse.y += (mouseT.y - mouse.y) * 0.05

      gl.uniform1f(uTime, t * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height)
      gl.uniform3f(uC1, palette.c1[0], palette.c1[1], palette.c1[2])
      gl.uniform3f(uC2, palette.c2[0], palette.c2[1], palette.c2[2])
      gl.uniform3f(uC3, palette.c3[0], palette.c3[1], palette.c3[2])
      gl.uniform3f(uC4, palette.c4[0], palette.c4[1], palette.c4[2])
      gl.uniform1f(uInt, intensity)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render)
      }
    }

    const start = () => {
      cancelAnimationFrame(rafId)
      if (!hidden && visible) {
        rafId = requestAnimationFrame(render)
      }
    }

    const onVisibility = () => {
      hidden = document.visibilityState === "hidden"
      start()
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) {
        cancelAnimationFrame(rafId)
        return
      }
      start()
    }, { threshold: 0.02 })

    const resizeObserver = new ResizeObserver(() => {
      resize()
      start()
    })

    resize()
    window.addEventListener("mousemove", onMouse)
    document.addEventListener("visibilitychange", onVisibility)
    visibilityObserver.observe(canvas)
    resizeObserver.observe(canvas)
    start()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouse)
      document.removeEventListener("visibilitychange", onVisibility)
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [palette, intensity, variant])

  return <canvas ref={canvasRef} className="hero-canvas" />
}

export default HeroShader
