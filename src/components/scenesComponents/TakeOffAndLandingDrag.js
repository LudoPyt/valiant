import * as THREE from 'three';
import { DragControls } from '../../lib/DragControls';
import { Howl, Howler } from 'howler';


class TakeOffAndLandingDrag {
    constructor(history, canvas, bezierCurvePoints, pathToAssets, pathToNextPage, fixPathStartUX, fixPathEndUX, voiceOff) {
        this.history = history;
        this.canvas = canvas;
        this.bezierCurvePoints = bezierCurvePoints;
        this.pathToAssets = pathToAssets;
        this.nextPage = pathToNextPage;
        this.fixPathStartUX = fixPathStartUX;
        this.fixPathEndUX = fixPathEndUX;
        this.voiceOff = voiceOff;

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
        this._addSound();
        this._render();
    }

    _userCanInteract() {
        this.dragControls = new DragControls(this.dragArray, this.camera, this.renderer.domElement);
        this._setupEventListerner();
        this._addUXElements();
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
            let percentOfCurve = (this.mouseX - this.pathScreenStart)*100/(this.pathScreenEnd - this.pathScreenStart);

            this.pathStartUX.material.opacity = 0;

            if (percentOfCurve > 99) {
                this.beaver.position.x = this.endPoint.x;
                this.beaver.position.y = this.endPoint.y;
                this.history.push(this.nextPage);
                this.planeSound.stop()
            } else if (percentOfCurve < 1) {
                this.beaver.position.x = this.startPoint.x;
                this.beaver.position.y = this.startPoint.y;
            } else {
                this.beaver.position.x = this.pathPoints[Math.round(percentOfCurve)].x
                this.beaver.position.y = this.pathPoints[Math.round(percentOfCurve)].y
                this.beaver.scale.x = 1 - (percentOfCurve*0.005);
                this.beaver.scale.y = 1 - (percentOfCurve*0.005);
            }
        });

        this.dragControls.addEventListener('dragend', () => {
            this.pathStartUX.material.opacity = 1;
            this.beaver.position.x = this.startPoint.x;
            this.beaver.position.y = this.startPoint.y;
            this.beaver.scale.x = 1;
            this.beaver.scale.y = 1;
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

    _addSound() {
        this.planeSound = new Howl({
            src: '/assets/takeOffAndLanding/plane.mp3',
            autoplay: true,
            loop: true,
            volume: 0.5
        });

        this.voice = new Howl({
            src: this.voiceOff,
            onplay: () => {
                Howler.volume(0.7)
                this.voice.volume(1)
            },
            onend: () => {
                Howler.volume(1);
                this._userCanInteract();
            }
        });

        this.timeoutPlayVoice = setTimeout(() => {
            this.voice.play();
        }, 2000)
    }

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
        let material = new THREE.LineDashedMaterial({
            color: 0xffffff,
            scale: .1,
            dashSize: .001,
            gapSize: .001
        });
        let line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        line.position.z = 0.1
        this.scene.add(line);
    }

    _addBeaver() {
        let loader = new THREE.TextureLoader();
        let material = new THREE.MeshLambertMaterial({
            map: loader.load('/assets/takeOffAndLanding/beaver.png'),
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

    _addUXElements() {
        let loader = new THREE.TextureLoader();

        let pathStartUXMaterial = new THREE.MeshLambertMaterial({
            map: loader.load('/assets/ux/icon-clic.png'),
            transparent: true
        });
        let pathStartUXGeometry = new THREE.PlaneGeometry(0.3, 0.3);
        this.pathStartUX = new THREE.Mesh(pathStartUXGeometry, pathStartUXMaterial);
        this.pathStartUX.castShadow = true;
        this.pathStartUX.receiveShadow = true;
        this.pathStartUX.position.x = this.startPoint.x + this.fixPathStartUX.x;
        this.pathStartUX.position.y = this.startPoint.y + this.fixPathStartUX.y;
        this.pathStartUX.position.z = 0.3;

        let pathEndUXMaterial = new THREE.MeshLambertMaterial({
            map: loader.load('/assets/ux/icon-drop.png'),
            transparent: true
        });
        let pathEndUXGeometry = new THREE.PlaneGeometry(0.5, 0.5);
        this.pathEndUX = new THREE.Mesh(pathEndUXGeometry, pathEndUXMaterial);
        this.pathEndUX.castShadow = true;
        this.pathEndUX.receiveShadow = true;
        this.pathEndUX.position.x = this.endPoint.x - this.fixPathEndUX.x;
        this.pathEndUX.position.y = this.endPoint.y - this.fixPathEndUX.y;
        this.pathEndUX.position.z = 0.3;

        this.scene.add(this.pathStartUX, this.pathEndUX);
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
        clearTimeout(this.timeoutPlayVoice)
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }

}

export default TakeOffAndLandingDrag;
