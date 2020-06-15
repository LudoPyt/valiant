import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import lerp from '../utils/lerp';

import AssetsLoader from '../components/AssetsLoader';

import ArrowMove from './animationComponents/arrowMove';
import { Howl } from 'howler';

class CockpitScene {
    constructor(history, canvas, seaVideo, skyVideo){
        this.history = history
        this.canvas = canvas;
        this.seaVideo = seaVideo;
        this.skyVideo = skyVideo;

        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;
        this.speedRot = THREE.Math.degToRad(45);
        this.maxRotation = .5;
        this.soundRead = false;
        this.clock = new THREE.Clock();
        this.delta = 0;
        this.arrow = new ArrowMove();
        this.loader = new GLTFLoader();
        this.axesHelper = new THREE.AxesHelper( 5 );
        this.lerpEasing = 0.1
        this.right = false;
        this.left = false;

        this.crackle = false;
        this.int = 0;
        this.interval = setInterval(() => {
            this.crackle = !this.crackle
        }, this.int)

        this._setupEventListener();
    }

    _setupEventListener() {
        this._setScene();
        this._addSound();

        this._addCockpit();
        this._addForest();

        this._setVideoSea();
        this._setVideoSky();

        this._addCameraPivotY();
        this._addCameraPivotX();

        this._render();
    }

    _setScene() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            30000
        );

        let light = new THREE.AmbientLight(0xffffff, .5);
        this.scene.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, .9);
        this.scene.add(lightPoint)
    }

    _addSound(){
        this.voiceRight = new Howl({
            src: '/assets/duringFlight/voiceRight.mp3'
        });

        this.voiceDown = new Howl({
            src: '/assets/duringFlight/voiceDown.mp3'
        });

        this.voiceLeft = new Howl({
            src: '/assets/duringFlight/voiceLeft.mp3',
            onend: () => {
                this.timeoutVoiceDown = setTimeout(() => {
                    this.voiceDown.play()
                }, 2000)
            }
        });

        this.whale = new Howl({
            src: '/assets/duringFlight/baleines.mp3',
            volume: 0.3,
        });

    }

    _setVideoSea() {
        let video = AssetsLoader.getVideos('tex_eau');
        this.seaVideo = video[0].content;
        this.seaVideo.crossOrigin = 'anonymous';
        this.seaVideo.autoload = true;

        this.textureSea = new THREE.VideoTexture( this.seaVideo );
        this.textureSea.needsUpdate = true;
        this.textureSea.minFilter = THREE.LinearFilter;
        this.textureSea.magFilter = THREE.LinearFilter;
        this.textureSea.format = THREE.RGBFormat;

        let seaGeometry = new THREE.PlaneGeometry(3000, 1000, 5, 32);
        let seaMaterial = new THREE.MeshBasicMaterial({map: this.textureSea});
        this.sea = new THREE.Mesh(seaGeometry, seaMaterial);
        this.sea.rotation.x -= Math.PI / 2;
        this.sea.position.set(0, -103, 0);
        this.scene.add(this.sea);
    }

    _setVideoSky() {
        let video = AssetsLoader.getVideos('tex_ciel');
        this.skyVideo = video[0].content;
        this.skyVideo.crossOrigin = 'anonymous';
        this.skyVideo.autoload = true;
        this.skyVideo.loop = true
        this.skyVideo.load();

        this.textureSky = new THREE.VideoTexture( this.skyVideo );
        this.textureSky.needsUpdate = true;
        this.textureSky.minFilter = THREE.LinearFilter;
        this.textureSky.magFilter = THREE.LinearFilter;
        this.textureSky.format = THREE.RGBFormat;

        let skyGeometry = new THREE.PlaneGeometry(10000, 1500);
        let skyMaterial = new THREE.MeshBasicMaterial({map: this.textureSky});
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.sky.position.set(0,500,-1000)
        this.scene.add(this.sky)

        this.skyVideo.play()
    }

    _addCockpit(){
        let object = AssetsLoader.getModels('hydravion')
        this.gltf = object[0].content.scene.clone()
        this.gltf.traverse((child) => {
            switch (child.name) {
                case 'Hydravion':
                    this.cockpit = child
                    this.cockpit.scale.set(.04, .04, .04);
                    this.cockpit.position.set(0, 1, 0);
                    this.scene.add(this.cockpit)
                    break;
                case 'Helices':
                    this.helices = child
                    break;
                case 'Manche':
                    this.stick = child
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
    }

    _addForest(){
        let object = AssetsLoader.getModels('forest')
        this.forest = object[0].content.scene
        this.forest.scale.set(.8, .8, .8);
        this.forest.position.set(500, -100, -100)
        this.scene.add(this.forest)
    }

    _addCameraPivotY(){
        this.pivotY = new THREE.Object3D()
        this.pivotY.add(this.camera)
        this.scene.add(this.pivotY)
    }

    _addCameraPivotX(){
        this.pivotX = new THREE.Object3D()
        this.pivotX.add(this.pivotY)
        this.scene.add(this.pivotX)
    }

    _moveLeft() {
        if (this.arrow.directions.left && this.stick.rotation.z < this.maxRotation) {
            this._leftCameraPivot()
            this.stick.rotateZ(this.speedRot * this.delta);
            if (this.stick.rotation.z >= this.maxRotation){
                document.querySelector('.adviceLeft').classList.remove('isActive')
                document.querySelector('.adviceDown').classList.add('isActive')
                this.left = true
                this.voiceLeft.play();
                document.getElementById('instruction').innerHTML = "Commencer la descente sur Tenakee Springs"
            }
        }
    }

    _moveRight() {
        if (this.arrow.directions.right && this.stick.rotation.z > -this.maxRotation) {
            this._rightCameraPivot()
            this.stick.rotateZ(-this.speedRot * this.delta);
            if (this.stick.rotation.z <= -this.maxRotation && !this.left){
                document.querySelector('.adviceRight').classList.add('isUnActive')
                document.querySelector('.adviceLeft').classList.add('isActive')
                this.right = true
                this.voiceRight.play();
                document.getElementById('instruction').innerHTML = "Observer à gauche"
            }
        }
    }

    _leftCameraPivot() {
        let pivotYPosX = lerp(this.pivotY.position.x, -30 , this.lerpEasing )
        let pivotYRotY = lerp( this.pivotY.rotation.y , .55 , this.lerpEasing )
        let pivotXRotZ = lerp( this.pivotX.rotation.z , .1 , this.lerpEasing )

        this.pivotY.position.x = pivotYPosX
        this.pivotY.rotation.y = pivotYRotY
        this.pivotX.rotation.z = pivotXRotZ

    }

    _rightCameraPivot() {
        let pivotPosX = lerp(this.pivotY.position.x, 30 , this.lerpEasing )
        let pivotRotY = lerp( this.pivotY.rotation.y , -0.55 , this.lerpEasing )
        let pivotXRotZ = lerp( this.pivotX.rotation.z , -.1 , this.lerpEasing )

        this.pivotY.position.x = pivotPosX
        this.pivotY.rotation.y = pivotRotY
        this.pivotX.rotation.z = pivotXRotZ

    }

    _render() {
        if (this.helices){
            this.helices.rotation.z += 7 * this.delta
        }

        if  (this.pivotY.rotation.y >= 0.3 && !this.soundRead) {
            this.seaVideo.play()
            this.soundRead = true;
        }

        if  (this.pivotY.rotation.y <= -0.3 && !this.soundRead) {
            this.seaVideo.play()
            this.soundRead = true;
        }

        if (this.pivotY.rotation.y >= -0.3 && this.pivotY.rotation.y <= 0.3) {
            this.soundRead = false;
            if (this.whale && this.voiceLeft && this.voiceRight){
                this.whale.stop();
                this.voiceLeft.stop();
                this.voiceRight.stop();
            }
            this.seaVideo.pause();
            this.seaVideo.currentTime = 0;
        }

        if (this.arrow.directions.backward && this.left) {
            this.cockpit.rotation.x += -0.2 * this.delta;
            this.camera.rotation.x += -0.2 * this.delta;
            if (this.camera.rotation.x <= -0.2) {
                this.history.push('/landing')
            }
        }

        if (this.pivotY.position.x > -10 && this.pivotY.position.x < 10 && this.stick) {
            let pivotYPosX = lerp(this.pivotY.position.x, 0 , this.lerpEasing )
            let pivotYRotY = lerp( this.pivotY.rotation.y , 0 , this.lerpEasing )
            let pivotXRotZ = lerp( this.pivotX.rotation.z , 0 , this.lerpEasing )

            this.pivotY.position.x = pivotYPosX
            this.pivotY.rotation.y = pivotYRotY
            this.pivotX.rotation.z = pivotXRotZ

            let stickRotZ = lerp( this.stick.rotation.z , 0 , this.lerpEasing )
            this.stick.rotation.z = stickRotZ
        }

        // animate needles on dashboard
        this.int = Math.round(Math.random() * 3000)

        if (this.needleTopL && this.needleTopR && this.needleL) {
            if (this.crackle) {
                this.needleTopL.rotation.z -= 1 * this.delta
                this.needleTopR.rotation.z -= 1 * this.delta
                this.needleL.rotation.z += 1 * this.delta

            } else {
                this.needleTopL.rotation.z += 1 * this.delta
                this.needleTopR.rotation.z += 1 * this.delta
                this.needleL.rotation.z -= 1 * this.delta
            }
        }

        this._moveRight()

        if (this.right) {
            this._moveLeft()
        }

        if (!this.needDestroy) {
            this.raf = requestAnimationFrame(this._render.bind(this));
        }

        this.renderer.render(this.scene, this.camera);
        this.delta = this.clock.getDelta();

        if (this.forest){
            this.forest.position.z += 5 * this.delta
        }
    }

    destroyRaf() {
        clearInterval(this.interval);
        clearTimeout(this.timeoutVoiceDown);
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }
}

export default CockpitScene;