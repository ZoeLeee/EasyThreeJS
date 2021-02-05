import { Matrix4 } from "./Matrix4.js";

export class Object3D {
    constructor() {
        this.matrix = new Matrix4();
        this.children = [];
        this.isObject3D = true;
        this.parent = null;
    }
    applyMatrix4(matrix) {
        this.matrix.premultiply( matrix );
    }
    add(object) {

        if (arguments.length > 1) {

            for (let i = 0; i < arguments.length; i++) {

                this.add(arguments[i]);

            }

            return this;

        }

        if (object === this) {

            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;

        }

        if ((object && object.isObject3D)) {

            if (object.parent !== null) {

                object.parent.remove(object);

            }

            object.parent = this;
            this.children.push(object);
        } else {

            console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);

        }

        return this;

    }
}