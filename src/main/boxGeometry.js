
class Geometry{
}

export class BoxGeometry extends Geometry{
    constructor(width,height,depth){
        super();
        this.isBox=true;
        let widthHalf=width/2;
        let heightHalf=height/2;
        let depthHalf=depth/2;
        this.attributes={};
        let  vertices = [
            // Front face
            -widthHalf, -depthHalf, heightHalf,
            widthHalf, -depthHalf, heightHalf,
            widthHalf, depthHalf, heightHalf,
            -widthHalf, depthHalf,heightHalf,

            // Back face
            -widthHalf, -depthHalf, -heightHalf,
            -widthHalf, depthHalf, -heightHalf,
            widthHalf, depthHalf, -heightHalf,
            widthHalf, -depthHalf, -heightHalf,

            // Top face
            -widthHalf, depthHalf, -heightHalf,
            -widthHalf, depthHalf, heightHalf,
            widthHalf, depthHalf, heightHalf,
            widthHalf, depthHalf, -heightHalf,

            // Bottom face
            -widthHalf, -depthHalf, -heightHalf,
            widthHalf, -depthHalf, -heightHalf,
            widthHalf, -depthHalf, heightHalf,
            -widthHalf, -depthHalf, heightHalf,

            // Right face
            widthHalf, -depthHalf, -heightHalf,
            widthHalf, depthHalf, -heightHalf,
            widthHalf, depthHalf, heightHalf,
            widthHalf, -depthHalf, heightHalf,

            // Left face
            -widthHalf, -depthHalf, -heightHalf,
            -widthHalf, -depthHalf, heightHalf,
            -widthHalf, depthHalf, heightHalf,
            -widthHalf, depthHalf, -heightHalf,
        ];
        this.setAttribute('position',new Float32Array(vertices));

        this.cubeVertexIndices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23    // left
        ];

    }
    setAttribute(name,value){
        this.attributes[name]=value;
    }
    getAttribute(name){
        return this.attributes[name];
    }
}