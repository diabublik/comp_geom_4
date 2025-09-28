// 02.js

"use strict";

// Imports.
import {getShader} from './libs/prepShader.js';
import {initShaders} from './libs/cuon-utils.js';

let squareVAO;

async function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('webgl-canvas');

  // Get the rendering context for WebGL
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Read shaders and create shader program executable.
  const vertexShader = await getShader("Shaders/vertexShader.glsl");
  const fragmentShader = await getShader("Shaders/fragmentShader.glsl");

   // Initialize shaders
  if (!initShaders(gl, vertexShader, fragmentShader)) {
     console.log('Failed to intialize shaders.');
     return;
   }

  // Write the positions of vertices to a vertex shader
  const n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Bind the VAO
  gl.bindVertexArray(squareVAO);

  // Draw three points
  gl.drawArrays(gl.Points, 0, n);


  // Clean
  gl.bindVertexArray(null);
}

function initVertexBuffers(gl) {
    const n = 3; 
    
    const verticesSizes = new Float32Array([  
        10.0, 0.0, 0.5,   // Первая точка
        20, -0.5, -0.5, // Вторая точка  
        30, 0.5, -0.5   // Третья точка
    ]);
    const FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    // Create VAO
    squareVAO = gl.createVertexArray();
    gl.bindVertexArray(squareVAO);

    // Create buffer
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind and fill buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

    // Атрибут для позиции (2 компонента: x, y)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, FSIZE * 3, FSIZE * 1);
    gl.enableVertexAttribArray(0);

    // Атрибут для размера точки (1 компонент: size)
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(1);

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}

window.onload = main;