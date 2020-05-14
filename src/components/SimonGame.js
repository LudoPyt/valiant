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

        this.isOkey = [];

        this.intersect = [];
        this.btnTab = [];
        this.moves = [];
        this.solution = ["btn_interrupteur_haut", "btn_interrupteur_bas", "btn_pull", "btn_rotatif_haut", "btn_press"];

        this.helSpeed = 0;
        this.needleLSpeed = 0;
        this.needlesSpeed = 0;
        this.crackle = false;

        this.int = 0;
        this.interval = setInterval(() => {
            this.crackle = !this.crackle
        }, this.int)

        this._setScene();
        this._addBackground();
        this._addCockpit();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this._setupEventListerner();
        this._render();
    }

    _reset() {
        console.log('reseeet')
        this.isOkey = [];
        this.intersect = [];
        this.moves = [];
        this.needleTopL.rotation.z = -0.6953570287343984
        this.needleTopR.rotation.z = -0.7890085819315339
        this.needleL.rotation.z = -1.585403998531092
        this.helices.rotation.z = 0
        this.btnTab.map(e => {
            switch (e.name) {
                case 'btn_interrupteur_haut':
                    e.rotation.x = 1.7320882859168714
                    break;
                case 'btn_interrupteur_bas':
                    e.rotation.x = 1.7320882859168714
                    break;
                case 'btn_pull':
                    e.children[0].material.color = {r:1, g:1, b:1}
                    break;
                case 'btn_rotatif_haut':
                    e.rotation.x = -1.3962007387367295
                    break;
                case 'btn_press':
                    e.position.z = -1366.0050048828125
                    break;
                default:
            }
            return e;
        })
    }

    _isRight() {
        for (let i = 0; i < this.solution.length; i++) {
            if (this.solution[i] === this.moves[i]) {
                this.isOkey.push(true)
            } else {
                this.isOkey.push(false)
            }
        }

        if (this.isOkey.every(value => value === true)) {
            setTimeout(() => {
                return this.history.push('/takeoff');
            }, 1000)
        } else {
            this._reset();
        }
    }

    _pressingDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersect = this.raycaster.intersectObjects(this.scene.children , true);
        console.log(this.intersect)

        this.intersect.map(elem => {
            return this.btnTab.map(e => {
                if (e.name === elem.object.parent.name && !this.moves.includes(e.name)) this.moves.push(e.name)

                switch (elem.object.parent.name) {
                    case 'btn_interrupteur_haut':
                        elem.object.parent.rotation.x = elem.object.parent.rotation.y - 3
                        break;
                    case 'btn_interrupteur_bas':
                        elem.object.parent.rotation.x = elem.object.parent.rotation.y - 3
                        break;
                    case 'btn_pull':
                        elem.object.parent.children[0].material.color = {r:3, g:1, b:1}
                        break;
                    case 'btn_rotatif_haut':
                        if (elem.object.parent.rotation.x !== -31.39620073873673) elem.object.parent.rotation.x = elem.object.parent.rotation.x - 2
                        break;
                    case 'btn_press':
                        if (elem.object.parent.position.z !== -1426.0050048828125) elem.object.parent.position.z = elem.object.parent.position.z - 6
                        break;
                    default:
                }

                return this.moves
            })
        })

        console.log(this.moves)

        if (this.moves.length === 5) {
            this._isRight();
        }
    }

    _setupEventListerner() {
        document.addEventListener("click", (event) => {this._pressingDown(event)});
    }

    _addBackground() {
        let background = new THREE.TextureLoader().load('before-take-off/background.png');
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
                        this._createTab(child)
                        break;
                    case 'btn_interrupteur_bas':
                        this._createTab(child)
                        break;
                    case 'btn_pull':
                        this._createTab(child)
                        break;
                    case 'btn_rotatif_haut':
                        this._createTab(child)
                        break;
                    case 'btn_press':
                        this._createTab(child)
                        console.log(child)
                        break;
                    case 'aiguille_left':
                        this.needleL = child
                        break;
                    case 'aiguille_top_l':
                        this.needleTopL = child
                        break;
                    case 'aiguille_top_r':
                        this.needleTopR = child
                        break;
                    default:
                }
            })
            console.log('btnTab : ', this.btnTab)
        })
    }

    _createTab(elem) {
        elem.children[0].material.transparent = true;
        this.btnTab.push(elem);
    }


    _render() {

        this.int = Math.round(Math.random() * 3000)

        if (this.moves.length >= 1 && this.needleTopL && this.needleTopR) {
            if (this.crackle) {
                this.needleTopL.rotation.z -= 1 * this.delta
                this.needleTopR.rotation.z -= 1 * this.delta
            } else {
                this.needleTopL.rotation.z += 1 * this.delta
                this.needleTopR.rotation.z += 1 * this.delta
            }
        }

        if (this.moves.length >= 2 && this.needleL) {
            if (this.crackle) {
                this.needleL.rotation.z += 1 * this.delta
            } else {
                this.needleL.rotation.z -= 1 * this.delta
            }
        }

        if (this.moves.length >= 3 && this.helices) {
            this.helices.rotation.z += 3 * this.delta
        }

        if (this.moves.length >= 4 && this.helices) {
            this.helices.rotation.z += 10 * this.delta
        }

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

export default SimonGame;
