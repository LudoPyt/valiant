import * as THREE from 'three';
import { DragControls } from '../lib/DragControls';

class DecollageScene {
    constructor(history, canvas){
        this.history = history;
        this.canvas = canvas;
        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;
        this.mouseX = 0;
        this.dragArray = [];

        this._setScene();
        this._addPath();
        this._addPlane();
        this.dragControls = new DragControls(this.dragArray, this.camera, this.renderer.domElement);
        this._setupEventListerner();
        this._render();
    }

    _setupEventListerner() {
        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.x
        });

        this.dragControls.addEventListener('drag', () => {
            let screenPercent = this.mouseX*100/window.innerWidth
            let curvePercent = this.pathPoints.length*screenPercent/100

            if (Math.round(curvePercent) === this.pathPoints.length) {
                this.history.push('/story3');
            } else if (curvePercent < 0.5) {
                this.plane.position.x = -3;
                this.plane.position.y = -2;
            } else {
                this.plane.position.x = this.pathPoints[Math.round(curvePercent-1)].x
                this.plane.position.y = this.pathPoints[Math.round(curvePercent-1)].y
            }
        });
    }

    _addPath() {
        let path = new THREE.Path();
        path.moveTo(-3, -2);
        path.bezierCurveTo(0, -2, 0, 2, 3, 2);
        this.pathPoints = path.getPoints(100);

        let geometry = new THREE.BufferGeometry().setFromPoints(this.pathPoints);
        let material = new THREE.LineBasicMaterial({color: 0xffffff});
        let line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }

    _addPlane() {
        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        let material = new THREE.MeshNormalMaterial();
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.castShadow = true;
        this.plane.receiveShadow = true;

        this.dragArray.push(this.plane);

        this.plane.position.x = -3;
        this.plane.position.y = -2;
        this.scene.add(this.plane);
    }

    _setScene() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
            });
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        let light = new THREE.AmbientLight(0xffffff, .5);
        this.scene.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        this.scene.add(lightPoint)
    }

    _render() {
        if (!this.needDestroy) {
            requestAnimationFrame(this._render.bind(this));
        }
        this.renderer.render(this.scene, this.camera);
    }

    destroyRaf() {
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }

}

export default DecollageScene;
