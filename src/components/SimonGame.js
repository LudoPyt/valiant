import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class SimonGame {
    constructor(history, canvas){
        this.history = history;
        this.canvas = canvas;

        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;

        this.loader = new GLTFLoader();

        this.clock = new THREE.Clock();
        this.delta = 0;

        this.intersect = [];
        this.objects = [];
        this.moves = [];
        this.solution = ["cube0", "cube1", "cube2"];

        this._setScene();
        this._addCockpit();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this._createCubes();
        this._setupEventListerner();
        this._render();
    }

    _createCubes() {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material1 = new THREE.MeshNormalMaterial();
        let material2 = new THREE.MeshNormalMaterial();
        let material3 = new THREE.MeshNormalMaterial();

        let materials = [material1, material2, material3];

        for(let i = 0; i < 3; i++) {
            let cube = new THREE.Mesh(geometry, materials[i]);
            if (i === 0) {
                cube.position.x = -2;
            } else if (i === 1) {
                cube.position.x = 0;
            } else {
                cube.position.x = 2;
            }
            cube.name = "cube" + i.toString();
            cube.material.transparent = true;
            this.objects.push(cube);
            this.scene.add(cube);
        }
    }

    _reset() {
        console.log('reseeet')
        this.intersect = [];
        this.moves = [];
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].material.opacity = 1;
        }
    }

    _isRight() {
        let isRight = [];

        this.moves.map((value, key) => {
            if (value !== this.solution[key]) {
                return isRight.push(false);
            } else {
                return isRight.push(true)
            }
        });

        if (isRight[0] === true && isRight[1] === true && isRight[2] === true) {
            return this.history.push('/takeoff');
        } else {
            this._reset();
        }
    }

    _pressingDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersect = this.raycaster.intersectObjects(this.scene.children , true);

        if (this.intersect.length > 0 && this.moves.length === 2) {
            this.intersect[0].object.material.opacity = 0.5;
            this.moves.push(this.intersect[0].object.name)
            this._isRight();
        } else if (this.intersect.length > 0 && this.moves.length < 2) {
            this.intersect[0].object.material.opacity = 0.5;
            this.moves.push(this.intersect[0].object.name)
        } else if (this.intersect.length > 0) {
            this.moves = []
            this.moves.push(this.intersect[0].object.name)
        }
    }

    _setupEventListerner() {
        document.addEventListener("click", (event) => {this._pressingDown(event)});
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

    _addCockpit(){
        this.loader.load('before-take-off/scene.gltf', (object) => {
            this.gltf = object.scene
            this.gltf.traverse((child) => {
                switch (child.name) {
                    case 'Hydravion':
                        this.cockpit = child
                        this.cockpit.scale.set(.04, .04, .04);
                        this.cockpit.position.set(0, 0, 0);
                        this.scene.add(this.cockpit)
                        break;
                    case 'Helices':
                        this.helices = child
                        break;
                    case 'btn_interrupteur_haut':
                        console.log('founded')
                        break;
                    case 'btn_interrupteur_bas':
                        console.log('founded')
                        break;
                    case 'btn_pull':
                        console.log('founded')
                        break;
                    case 'btn_rotatif_haut':
                        console.log('founded')
                        break;
                    case 'btn_rotatif_bas':
                        console.log('founded')
                        break;
                    case 'btn_press':
                        console.log('founded')
                        break;
                    default:
                  }
            })
        })
    }

    _render() {
        if (this.helices){
            this.helices.rotation.z += 10 * this.delta
        }

        if (!this.needDestroy) {
            requestAnimationFrame(this._render.bind(this));
        }
        this.renderer.render(this.scene, this.camera);
        this.delta = this.clock.getDelta();
    }

    destroyRaf() {
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }

}

export default SimonGame;
