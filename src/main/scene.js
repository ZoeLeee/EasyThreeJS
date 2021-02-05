import { Object3D } from "./object3D.js";

export class Scene extends Object3D{
    constructor(){
        super();
        this.type="Scene";
    }
}