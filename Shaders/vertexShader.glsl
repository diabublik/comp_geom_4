#version 300 es
layout(location = 0) in vec4 aPosition;
layout(location = 1) in float aPointSize;

void main() {
    gl_Position = aPosition;
    gl_PointSize = aPointSize;
}