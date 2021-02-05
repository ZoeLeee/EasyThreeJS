import { Object3D } from "./object3D.js";

export class Mesh extends Object3D{
    constructor(geo,material){
        super();
        this.geometry=geo;
        this.material=material;
    }
}