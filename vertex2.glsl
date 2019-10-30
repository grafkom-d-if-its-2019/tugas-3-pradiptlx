precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta, mag;
uniform float scaleX, scaleY, scale;

void main() {
  fColor = vColor;

  vec2 transform = vec2(-0.5, 0.5);

  mat4 to_origin = mat4(
    1.0, 0.0, 0.0, -.46,
    0.0, 1.0, 0.0, -.04,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translation = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, -1.0, 0.0,
    0.0, 0.0, 1.0, 1.0
  );

  mat4 rotate = mat4(
    cos(theta), sin(theta), 0, 0,
    -sin(theta), cos(theta), 0, 0,
    0, 0, 1.0, 0,
    0, 0, 0, 1.0
  );

  mat4 scaled = mat4(
    scale, 0, 0, 0,
    0, 1.0, 0, 0,
    0, 0, 1.0, 0,
    0, 0, 0, 1.0
  );

  mat4 inv_origin = mat4(
    1.0, 0.0, 0.0, +.46,
    0.0, 1.0, 0.0, +.04,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  // gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4(vPosition, 1.0);
  // gl_Position = vec4(vPosition, 0.0, 1.0)*to_origin;
  // gl_Position = gl_Position*scaled;
  // gl_Position = gl_Position*inv_origin;
  gl_Position = vec4(vPosition, 0.0, 1.0);

}