import { Object3D } from "./object3D.js";
import { Matrix4 } from "./Matrix4.js";

export class Camera extends Object3D{
    constructor(){
        super();
        this.projectionMatrix=new Matrix4();
        this.projectionMatrixInverse=new Matrix4();
    }
}

export class PerspectiveCamera extends Camera{
    constructor(fov, aspect, near, far){
        super();
        this.fov=fov||30;
        this.aspect=aspect;
        this.near=near;
        this.far=far;
        this.zoom=1;
        this.view=null;
        this.filmOffset = 0;
        this.filmGauge = 35;
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix () {

		const near = this.near;
		let top = near * Math.tan( Math.PI / 180 * 0.5 * this.fov ) / this.zoom;
		let height = 2 * top;
		let width = this.aspect * height;
		let left = - 0.5 * width;
		const view = this.view;

		if ( this.view !== null && this.view.enabled ) {

			const fullWidth = view.fullWidth,
				fullHeight = view.fullHeight;

			left += view.offsetX * width / fullWidth;
			top -= view.offsetY * height / fullHeight;
			width *= view.width / fullWidth;
			height *= view.height / fullHeight;

		}

		const skew = this.filmOffset;
		if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

		this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

		this.projectionMatrixInverse.getInverse( this.projectionMatrix );

    }
    getFilmWidth() {

		// film not completely covered in portrait format (aspect < 1)
		return this.filmGauge * Math.min( this.aspect, 1 );
	}
}