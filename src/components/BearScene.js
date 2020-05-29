import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class BearScene {
    constructor(history, canvas, pathToAssets, pathToNextPage){
        this.history = history;
        this.canvas = canvas;
        this.pathToAssets = pathToAssets;
        this.nextPage = pathToNextPage;
        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;

        this.loader = new GLTFLoader();

        this.clock = new THREE.Clock();
        this.delta = 0;

        this._setScene();
        this._addBackground();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this._setupEventListerner();
        this._render();
    }

    _setupEventListerner() {
        // document.addEventListener("click", this._pressingDown.bind(this));
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
        this.camera.position.z = -10;

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
        this.delta = this.clock.getDelta();
    }

    destroyRaf() {
        clearInterval(this.interval)
        this.needDestroy = true
        window.cancelAnimationFrame(this.raf)
    }

}

export default BearScene;
