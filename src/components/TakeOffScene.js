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
        this._addBackground();
        this._addPath();
        this._addBeaver();
        this.dragControls = new DragControls(this.dragArray, this.camera, this.renderer.domElement);
        this._setupEventListerner();
        this._render();
    }

    _setupEventListerner() {
        window.addEventListener('mousemove', (event) => {
            if (event.x > this.pathScreenStart && event.x < this.pathScreenEnd) {
                this.mouseX = event.x
            } else if (event.x < this.pathScreenStart) {
                this.mouseX = this.pathScreenStart - this.beaverHalfWidth
            } else if (event.x > this.pathScreenEnd) {
                this.mouseX = this.pathScreenEnd - this.beaverHalfWidth
            }
        });

        console.log('window:', window.innerWidth)
        console.log('pathstart:', this.pathScreenStart)
        console.log('pathend:', this.pathScreenEnd)
        console.log('beaverwidth:', this.beaverWidth, this.beaverHalfWidth)

        this.dragControls.addEventListener('drag', () => {
            let screenPercent = this.mouseX*100/(this.pathScreenEnd - this.pathScreenStart - this.beaverHalfWidth)
            let curvePercent = (this.pathPoints.length*(screenPercent)/100) - (this.pathScreenEnd*100/this.renderer.domElement.offsetWidth)
            console.log('screenpercent:', screenPercent, '         curvepercent:', curvePercent)

            if (curvePercent > 95) {
                this.beaver.position.x = 3;
                this.beaver.position.y = 2;
                this.history.push('/flight');
            } else if (curvePercent < 5) {
                this.beaver.position.x = -3;
                this.beaver.position.y = -2;
            } else {
                this.beaver.position.x = this.pathPoints[Math.round(curvePercent)].x
                this.beaver.position.y = this.pathPoints[Math.round(curvePercent)].y
            }
        });
    }

    _toScreenPosition(obj, camera) {
        let vector = new THREE.Vector3();

        let widthHalf = 0.5*this.renderer.context.canvas.width;

        obj.updateMatrixWorld();
        vector.setFromMatrixPosition(obj.matrixWorld);
        camera.updateMatrixWorld();
        vector.project(camera);

        vector.x = ((vector.x * widthHalf) + widthHalf)/2;

        return vector.x;
    };

    _addPath() {
        let pointGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
        let startPoint = new THREE.Mesh(pointGeometry);
        startPoint.position.x = -3;
        startPoint.position.y = -2;
        let endPoint = new THREE.Mesh(pointGeometry);
        endPoint.position.x = 3;
        endPoint.position.y = 2;
        this.pathScreenStart = this._toScreenPosition(startPoint, this.camera)
        this.pathScreenEnd = this._toScreenPosition(endPoint, this.camera)

        let path = new THREE.Path();
        path.moveTo(-3, -2);
        path.bezierCurveTo(0, -2, 0, 2, 3, 2);
        this.pathPoints = path.getPoints(100);

        let geometry = new THREE.BufferGeometry().setFromPoints(this.pathPoints);
        let material = new THREE.LineBasicMaterial({
            color: 0xf76263,
            linewidth: 100
        });
        let line = new THREE.Line(geometry, material);
        line.position.z = 0.1
        this.scene.add(line);
    }

    _addBeaver() {
        let loader = new THREE.TextureLoader();
        let material = new THREE.MeshLambertMaterial({
            map: loader.load('/takeoff/beaver.png'),
            transparent: true
        });
        let geometry = new THREE.PlaneGeometry(2, 0.75);
        this.beaver = new THREE.Mesh(geometry, material);
        this.beaver.castShadow = true;
        this.beaver.receiveShadow = true;

        let pointGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
        let startPoint = new THREE.Mesh(pointGeometry);
        startPoint.position.x = -4;
        let endPoint = new THREE.Mesh(pointGeometry);
        endPoint.position.x = -2;
        this.beaverScreenStart = this._toScreenPosition(startPoint, this.camera)
        this.beaverScreenEnd = this._toScreenPosition(endPoint, this.camera)
        this.beaverWidth = this.beaverScreenEnd - this.beaverScreenStart;
        this.beaverHalfWidth = this.beaverWidth/2;

        this.dragArray.push(this.beaver);

        this.beaver.position.x = -3;
        this.beaver.position.y = -2;
        this.beaver.position.z = 0.2;
        this.scene.add(this.beaver);
    }

    _addBackground() {
        let sky = new THREE.TextureLoader().load('/takeoff/sky.png');
        this.scene.background = sky;

        let loader3 = new THREE.TextureLoader();
        let material3 = new THREE.MeshLambertMaterial({
            map: loader3.load('/takeoff/3rd-plan.png'),
            transparent: true
        });
        let geometry3 = new THREE.PlaneGeometry(13.8, 2.1);
        this.thirdPlan = new THREE.Mesh(geometry3, material3);
        this.thirdPlan.position.y = -0.7;


        let loader2 = new THREE.TextureLoader();
        let material2 = new THREE.MeshLambertMaterial({
            map: loader2.load('/takeoff/2nd-plan.png'),
            transparent: true
        });
        let geometry2 = new THREE.PlaneGeometry(13.8, 2.14);
        this.secondPlan = new THREE.Mesh(geometry2, material2);
        this.secondPlan.position.y = -2.8;


        this.scene.add(this.thirdPlan, this.secondPlan);
    }

    _setScene() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
            });
        this.renderer.setClearColor(0xffffff);
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

        let light = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(light);
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
