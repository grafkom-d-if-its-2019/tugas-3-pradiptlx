(function () {
    /** @type {HTMLCanvasElement} */

    glUtils.SL.init({
        callback: function () {
            main();
        }
    });

    var canvas, gl, program, program2;
    var theta = 0, thetaLoc, mag, magLoc, scaleX, scaleXLoc, scaleY, scaleYLoc, scaleLoc, scale = 1,
        melebar, n;
    var lineVertices, cubeVertices, cuvePoints, cubeColors, cubeNormals;

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    function initGlSize() {
        var width = canvas.getAttribute("width"),
            height = canvas.getAttribute("height");
        // Fullscreen if not set
        if (width) {
            gl.maxWidth = width;
        }
        if (height) {
            gl.maxHeight = height;
        }
    }

    function initBuffers(vertices) {
        var vPosition, vColor;

        // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        vPosition = gl.getAttribLocation(program, 'vPosition');
        vColor = gl.getAttribLocation(program, 'vColor');
        
        // Cube
        var vNormal = gl.getAttribLocation(program2, 'vNormal');

        if (vPosition < 0) {
            console.log('Failed to get the storage location of vPosition');
            return -1;
        }

        gl.vertexAttribPointer(
            vPosition, // variabel yang memegang posisi attribute di shader
            2, // jumlah elemen per atribut
            gl.FLOAT, // tipe data atribut
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
            0 // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE,
            9 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
        

        // return n;
    }

    function render() {
        // renderer info
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        drawCube();

        requestAnimationFrame(render);
    }

    function quad(a, b, c, d) {
        var indices = [a, b, c, a, c, d];
        for (var i = 0; i < indices.length; i++) {
            for (var j = 0; j < 3; j++) {
                cubeVertices.push(cubePoints[indices[i]][j]);
            }
            for (var j = 0; j < 3; j++) {
                cubeVertices.push(cubeColors[a][j]);
            }
            for (var j = 0; j < 3; j++) {
                cubeVertices.push(cubeNormals[a][j]);
            }
        }
    }

    function drawA() {
        lineVertices = [
            -.58, +0.4, 0.0, 1.0, 1.0,
            -.22, +0.4, 1.0, 1.0, 0.0,

            -.58, +0.4, 0.0, 1.0, 1.0,
            -.58, -.4, 1.0, 1.0, 0.0,

            -.22, +.4, 1.0, 1.0, 0.0,
            -.22, +.3, 1.0, 1.0, 0.0,

            -.5, +.3, 1.0, 1.0, 0.0,
            -.22, +.3, 1.0, 0.0, 0.0,

            -.5, +.3, 1.0, 1.0, 0.0,
            -.5, +.14, 1.0, 0.0, 0.0,

            -.5, +.14, 1.0, 1.0, 0.0,
            -.22, +.14, 1.0, 0.0, 0.0,

            -.22, +.14, 1.0, 1.0, 0.0,
            -.22, +.04, 1.0, 0.0, 1.0,

            -.5, +.14, 1.0, 1.0, 0.0,
            -.22, +.14, 0.0, 1.0, 1.0,

            -.5, +.04, 1.0, 1.0, 0.0,
            -.22, +.04, 0.0, 1.0, 1.0,

            -.5, +.04, 1.0, 1.0, 0.0,
            -.5, -.46, 0.0, 1.0, 1.0,
        ];

        cubeVertices = [
        ];

        cubePoints = [
            [-0.5, -0.5, 0.5],
            [-0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5],
            [0.5, -0.5, 0.5],
            [-0.5, -0.5, -0.5],
            [-0.5, 0.5, -0.5],
            [0.5, 0.5, -0.5],
            [0.5, -0.5, -0.5]
        ];
        cubeColors = [
            [],
            [1.0, 0.0, 0.0], // merah
            [0.0, 1.0, 0.0], // hijau
            [0.0, 0.0, 1.0], // biru
            [1.0, 1.0, 1.0], // putih
            [1.0, 0.5, 0.0], // oranye
            [1.0, 1.0, 0.0], // kuning
            []
        ];

        cubeNormals = [
            [],
            [0.0, 0.0, 1.0], // depan
            [1.0, 0.0, 0.0], // kanan
            [0.0, -1.0, 0.0], // bawah
            [0.0, 0.0, -1.0], // belakang
            [-1.0, 0.0, 0.0], // kiri
            [0.0, 1.0, 0.0], // atas
            []
        ];

        quad(1, 0, 3, 2);
        quad(2, 3, 7, 6);
        quad(3, 0, 4, 7);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
        quad(6, 5, 1, 2);

        // var newVertices = new Float32Array(cubeVertices.concat(lineVertices))
        initBuffers(new Float32Array(lineVertices))
        thetaLoc = gl.getUniformLocation(program, 'theta');
        theta = 0;
        // Draw
        // drawCube();
        // drawFont();
        render();
    }

    function drawCube(){
        // gl.uniform1f(thetaLoc, theta);
        gl.drawArrays(gl.LINES, 0, lineVertices.length/5);
    }

    function drawFont(){

    }

    function main() {
        window.addEventListener('resize', resizer);
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
        initGlSize();

        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader, fragmentShader);

        drawA();
        // requestAnimationFrame(draw);
        resizer();
    }
})();