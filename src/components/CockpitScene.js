import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import lerp from '../utils/lerp';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import ArrowMove from './animationComponents/arrowMove';
import { Howl } from 'howler';

class CockpitScene{
    constructor(canvas, video){
        this.canvas = canvas;
        this.seaVideo = video;

        this._init();
    }

    _init() {
        this.needDestroy = false
        this.isStarted = false
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


        this.crackle = false;
        this.int = 0;
        this.interval = setInterval(() => {
            this.crackle = !this.crackle
        }, this.int)


        //video
        this._setVideoSea();
        //son
        this._addSound();

        this._setupEventListener();

    }

    _setGUI(){
        let options = {

            reset: () => {
              this.camera.position.z = 0;
              this.camera.position.x = 0;
              this.camera.position.y = 0;
            }
          };
          let gui = new dat.GUI();

          let mer = gui.addFolder('sea');
          mer.add(this.sea.position, 'x', 0, 500).listen();
          mer.add(this.sea.position, 'y', -200, 0).listen();
          mer.add(this.sea.position, 'z', -200, 200).listen();
          mer.add(this.sea.rotation, 'x', -1, 1).listen();
          mer.add(this.sea.rotation, 'y', -2, 2).listen();
          mer.add(this.sea.rotation, 'z', -1, 1).listen();
          mer.open();

          gui.add(options, 'reset');
    }

    _setupEventListener() {
        this.seaVideo.addEventListener('canplaythrough', () => {
            if (!this.isStarted){
                this.isStarted = true

                this._setScene();
                this._setTextureVideo();

                this._addSky();
                this._addSea(this.textureVideo);

                this._addCameraPivotY();
                this._addCameraPivotX();

                this._addCockpit();
                this._addForest();


                this._render();
            }
        })
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

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        this.scene.add(lightPoint)
    }

    _addSound(){
        this.sound = new Howl({
            src: 'test-voix.mp3'
        });
    }
    _setTextureVideo(){
        this.textureVideo = new THREE.VideoTexture( this.seaVideo );
        this.textureVideo.needsUpdate = true;
        this.textureVideo.minFilter = THREE.LinearFilter;
        this.textureVideo.magFilter = THREE.LinearFilter;
        this.textureVideo.format = THREE.RGBFormat;
    }

    _render() {
        if (this.helices){
            this.helices.rotation.z += 10 * this.delta

        }

        if  (this.pivotY.rotation.y >= 0.3 && !this.soundRead) {
            this.seaVideo.play()
            this.sound.play();
            this.soundRead = true;
        }

        if  (this.pivotY.rotation.y <= -0.3 && !this.soundRead) {
            this.seaVideo.play()
            this.sound.play();
            this.soundRead = true;
        }

        if (this.pivotY.rotation.y >= -0.3 && this.pivotY.rotation.y <= 0.3) {
            this.soundRead = false;
            this.sound.stop();
            this.seaVideo.pause();
            this.seaVideo.currentTime = 0;
        }

        if (this.arrow.directions.forward && this.camera.rotation.x <= 0) {
            this.cockpit.rotation.x += this.speedRot * this.delta;
            this.camera.rotation.x += this.speedRot * this.delta;
        }
        if (this.arrow.directions.backward) {
            this.cockpit.rotation.x += -0.2 * this.delta;
            this.camera.rotation.x += -0.2 * this.delta;
        }

        if (this.pivotY.position.x > -10 && this.pivotY.position.x < 10 && this.stick){
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



        this._moveLeft()
        this._moveRight()



        if (!this.needDestroy) {
            this.raf = requestAnimationFrame(this._render.bind(this));
        }

        this.renderer.render(this.scene, this.camera);
        this.delta = this.clock.getDelta();
        if(this.forest){

            this.forest.position.z += 5 * this.delta
        }

    }

    _addCockpit(){
        this.loader.load('model/hydravion/scene.gltf', (object) => {
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
                    case 'Manche':
                        this._addStick(child)
                        break;
                    case 'aiguille_left':
                        this.needleL = child
                        console.log(this.needleL)
                        break;
                    case 'aiguille_top_l':
                        this.needleTopL = child
                        console.log(this.needleTopL)
                        break;
                    case 'aiguille_top_r':
                        this.needleTopR = child
                        console.log(this.needleTopR)
                        break;
                    default:
                }
            })
        })
    }
    _addForest(){
        this.loader.load('model/forest/scene.gltf', (object) => {
            this.forest = object.scene
            this.forest.scale.set(.8, .8, .8);
            this.forest.position.set(500, -100, -100)
            this.scene.add(this.forest)
            this._setGUI();
        })
    }

    _addSky() {
        var texture = new THREE.TextureLoader().load( "decor_cockpit/tex_ciel.jpg" );
        let skyGeometry = new THREE.PlaneGeometry(10000, 1500);
        let skyMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.sky.position.set(0,500,-1000)
        this.scene.add(this.sky)

    }

    _addStick(child) {
        this.stick = child
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

    _addSea(texture) {
        let seaGeometry = new THREE.PlaneGeometry(3000, 1000, 5, 32);
        let seaMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.sea = new THREE.Mesh(seaGeometry, seaMaterial);
        this.sea.rotation.x -= Math.PI / 2;
        this.sea.position.set(0, -103, 0);
        this.scene.add(this.sea);

    }

    _setVideoSea() {
        this.seaVideo.src = "decor_cockpit/tex_eau.mp4";
        this.seaVideo.crossOrigin = 'anonymous';
        this.seaVideo.preload = 'auto';
        this.seaVideo.autoload = true;
        this.seaVideo.load();
    }

    _moveLeft() {
        if (this.arrow.directions.left && this.stick.rotation.z < this.maxRotation) {
            this._leftCameraPivot()
            this.stick.rotateZ(this.speedRot * this.delta);
        }

    }
    _moveRight() {
        if (this.arrow.directions.right && this.stick.rotation.z> -this.maxRotation) {
            this._rightCameraPivot()
            this.stick.rotateZ(-this.speedRot * this.delta);
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

    destroyRaf() {
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }
}
export default CockpitScene;