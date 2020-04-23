import * as THREE from 'three';
import { DragControls } from '../lib/DragControls';

class TakeOffAndLandingScene {
    constructor(history, canvas, bezierCurvePoints, pathToAssets, pathToNextPage){
        this.history = history;
        this.canvas = canvas;
        this.bezierCurvePoints = bezierCurvePoints;
        this.pathToAssets = pathToAssets;
        this.nextPage = pathToNextPage;
        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;
        this.mouseX = 0;
        this.dragArray = [];

        this.startPoint = this.bezierCurvePoints.start;
        this.firstControlPoint = this.bezierCurvePoints.firstControl;
        this.secondControlPoint = this.bezierCurvePoints.secondControl;
        this.endPoint = this.bezierCurvePoints.end;

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
                this.mouseX = this.pathScreenStart
            } else if (event.x > this.pathScreenEnd) {
                this.mouseX = this.pathScreenEnd
            }
        });

        this.dragControls.addEventListener('drag', () => {
            let percentOfCurve = (this.mouseX - this.pathScreenStart)*100/(this.pathScreenEnd - this.pathScreenStart)

            if (percentOfCurve > 99) {
                this.beaver.position.x = this.endPoint.x;
                this.beaver.position.y = this.endPoint.y;
                this.history.push(this.nextPage);
            } else if (percentOfCurve < 1) {
                this.beaver.position.x = this.startPoint.x;
                this.beaver.position.y = this.startPoint.y;
            } else {
                this.beaver.position.x = this.pathPoints[Math.round(percentOfCurve)].x
                this.beaver.position.y = this.pathPoints[Math.round(percentOfCurve)].y
            }
        });

        this.dragControls.addEventListener('dragend', () => {
            this.beaver.position.x = this.startPoint.x;
            this.beaver.position.y = this.startPoint.y;
        } );
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
        startPoint.position.x = this.startPoint.x;
        startPoint.position.y = this.startPoint.y;
        let endPoint = new THREE.Mesh(pointGeometry);
        endPoint.position.x = this.endPoint.x;
        endPoint.position.y = this.endPoint.y;
        this.pathScreenStart = this._toScreenPosition(startPoint, this.camera)
        this.pathScreenEnd = this._toScreenPosition(endPoint, this.camera)

        let path = new THREE.Path();
        path.moveTo(this.startPoint.x, this.startPoint.y);
        path.bezierCurveTo(this.firstControlPoint.x, this.firstControlPoint.y, this.secondControlPoint.x, this.secondControlPoint.y, this.endPoint.x, this.endPoint.y);
        this.pathPoints = path.getPoints(100);

        let geometry = new THREE.BufferGeometry().setFromPoints(this.pathPoints);
        let material = new THREE.LineBasicMaterial({
            color: 0xf76263,
            linewidth: 10
        });
        let line = new THREE.Line(geometry, material);
        line.position.z = 0.1
        this.scene.add(line);
    }

    _addBeaver() {
        let loader = new THREE.TextureLoader();
        let material = new THREE.MeshLambertMaterial({
            map: loader.load(this.pathToAssets + 'beaver.png'),
            transparent: true
        });
        let geometry = new THREE.PlaneGeometry(2, 0.75);
        this.beaver = new THREE.Mesh(geometry, material);
        this.beaver.castShadow = true;
        this.beaver.receiveShadow = true;

        this.dragArray.push(this.beaver);

        this.beaver.position.x = this.startPoint.x;
        this.beaver.position.y = this.startPoint.y;
        this.beaver.position.z = 0.2;
        this.scene.add(this.beaver);
    }

    _addBackground() {
        let background = new THREE.TextureLoader().load(this.pathToAssets + 'background.png');
        this.scene.background = background;
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

export default TakeOffAndLandingScene;
