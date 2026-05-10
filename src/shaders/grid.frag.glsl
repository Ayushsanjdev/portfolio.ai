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