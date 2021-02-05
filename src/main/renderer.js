import { initShaderProgram, initBuffers } from './utils.js'

export class WebGlRenderer {
    constructor({ canvas }) {
        if (!canvas)
            canvas = document.createElement('canvas');

        this.domElement = canvas;
        this.gl = this.domElement.getContext("webgl");
    }
    clear() {
        const gl = this.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Clear the canvas before we start drawing on it.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    setClearColor(color) {
        this.gl.clearColor(color[0], color[1], color[2], 1.0);
    }
    render(scene, camera) {
        this.clear();
        const gl = this.gl;

        const projectionMatrix = camera.projectionMatrix;

        for (let obj of scene.children) {
            let modelMatrix = obj.matrix;
            console.log('modelMatrix: ', modelMatrix);
            if (obj.geometry && obj.material) {
                const geometry = obj.geometry;
                const positionBuffer = initBuffers(gl, geometry.getAttribute('position'));
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

                const material = obj.material;
                const shaderProgram = initShaderProgram(gl, material.vsSource, material.fsSource);
                gl.useProgram(shaderProgram);

                const programInfo = {
                    program: shaderProgram,
                    attribLocations: {
                        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
                    },
                    uniformLocations: {
                        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                    },
                };

                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    3,
                    gl.FLOAT,
                    false,
                    0,
                    0);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);

                gl.uniformMatrix4fv(
                    programInfo.uniformLocations.projectionMatrix,
                    false,
                    new Float32Array(projectionMatrix.toArray()));
                gl.uniformMatrix4fv(
                    programInfo.uniformLocations.modelViewMatrix,
                    false,
                    new Float32Array(modelMatrix.toArray()));
                // if(geometry.isBox){
                const cubeVerticesIndexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(obj.geometry.cubeVertexIndices), gl.STATIC_DRAW);
                // }
                gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
            }
        }
    }
}