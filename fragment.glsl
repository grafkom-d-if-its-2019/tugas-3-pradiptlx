precision mediump float;

varying vec3 fColor;

void main() {
  gl_FragColor = vec4(fColor, 1.0);
  // gl_FragColor = vec4(0.2, 0.5, 0.6, 1.0);
}