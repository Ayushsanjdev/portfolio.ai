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