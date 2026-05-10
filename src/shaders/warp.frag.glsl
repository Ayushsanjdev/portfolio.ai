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