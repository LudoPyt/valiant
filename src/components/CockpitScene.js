import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import ArrowMove from './animationComponents/arrowMove';
import { Howl } from 'howler';

class CockpitScene{
    constructor(canvas, video){
        this.canvas = canvas;
        this.video = video;

        this._init();
    }

    _init() {
        this.needDestroy = false
        this.isStarted = false
        this.raf = 0;
        this.speedRot = THREE.Math.degToRad(45);
        this.maxRotation = 0.5;
        this.soundRead = false;
        this.clock = new THREE.Clock();
        this.delta = 0;
        this.arrow = new ArrowMove();
        this.loader = new GLTFLoader();

        //video
        this._setVideo();
        //son
        this._addSound();



        this._setupEventListerner();
        
    }

    _setGUI(object){
        let options = {
            
            reset: () => {
              this.camera.position.z = 0;
              this.camera.position.x = 0;
              this.camera.position.y = 0;
            }
          };
          let gui = new dat.GUI();
      
          let cock = gui.addFolder('cockpit');
          cock.add(object.position, 'y', -400, -100).listen();
          cock.add(object.position, 'x', -100, 100).listen();
          cock.add(object.position, 'z', -100, 100).listen();
          cock.add(object.rotation, 'y', -2, 2).listen();
          cock.add(object.rotation, 'x', -180, 180).listen();
          cock.add(object.rotation, 'z', -180, 180).listen();
          cock.open();
      
          
          let cam = gui.addFolder('camera');
          cam.add(this.camera.position, 'y', -100, 200).listen();
          cam.add(this.camera.position, 'x', -100, 100).listen();
          cam.add(this.camera.position, 'z', -100, 200).listen();
          cam.add(this.camera.rotation, 'y', -2, 2).listen();
          cam.add(this.camera.rotation, 'x', -10, 10).listen();
          cam.add(this.camera.rotation, 'z', -10, 10).listen();
          cam.open();
      
          gui.add(options, 'reset');
    }

    _setupEventListerner() {
        this.video.addEventListener('canplaythrough', () => {
            if (!this.isStarted){
                this.isStarted = true
                this._setScene();
                this.controls = new OrbitControls( this.camera, this.renderer.domElement)
                //manche
                this._addStick();

                //floor
                this._addFloor();

                //cokcpit
                this._addCockpit();

                this._setTextureVideo();
                this._addWallLeft(this.textureVideo);
                this._addWallRight(this.textureVideo);
                this.scene.add(this.stick, this.floor);
                this.scene.add(this.wallLeft, this.wallRight)
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
            1000
        );
        this.camera.lookAt(this.scene.position);

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
        this.textureVideo = new THREE.VideoTexture( this.video );
        this.textureVideo.needsUpdate = true;
        this.textureVideo.minFilter = THREE.LinearFilter;
        this.textureVideo.magFilter = THREE.LinearFilter;
        this.textureVideo.format = THREE.RGBFormat;
    }

    _render() {
        if (
            (this.camera.rotation.y <= -0.3 && !this.soundRead) ||
            (this.camera.rotation.y >= 0.3 && !this.soundRead)
        ) {
            this.sound.play();
            this.video.play();
            this.soundRead = true;
        }

        if (this.camera.rotation.y >= -0.3 && this.camera.rotation.y <= 0.3) {
            this.soundRead = false;
            this.sound.stop();
            this.video.pause();
            this.video.currentTime = 0;
        }
        if (this.arrow.directions.forward) {
            this.camera.rotation.x += this.speedRot * this.delta;
        }
        if (this.arrow.directions.backward) {
            this.camera.rotation.x += -this.speedRot * this.delta;
        }
        if (this.arrow.directions.left && this.camera.rotation.y < this.maxRotation) {
            this.camera.rotateY(this.speedRot * this.delta);
            // this.stick.rotateZ((this.speedRot * this.delta) / 2);
            this.stick.rotateZ(this.speedRot * this.delta);
        }
        if (this.arrow.directions.right && this.camera.rotation.y > -this.maxRotation) {
            this.camera.rotateY(-this.speedRot * this.delta);
            // this.stick.rotateZ((-this.speedRot * this.delta) / 2);
            this.stick.rotateZ(-this.speedRot * this.delta);
        }

        //avancé

        this.floor.position.z += 0.5;
        

        if (!this.needDestroy) {
            requestAnimationFrame(this._render.bind(this));
        }

        this.renderer.render(this.scene, this.camera);
        this.delta = this.clock.getDelta();
    }

    _addCockpit(){
        this.loader.load('Cockpit3D/scene.gltf', (object) => { 
            
            object.scene.scale.set(.04, .04, .04);
            console.log(this)
            object.scene.position.set(64, -300, -50);
            this._setGUI(object.scene);
          
            this.scene.add(object.scene)
        })
    }
    _addWallRight(texture) {
        let wallRightGeometry = new THREE.PlaneGeometry(50, 50);
        let wallRightMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallRight = new THREE.Mesh(wallRightGeometry, wallRightMaterial);
        this.wallRight.position.set(91, -12, -93);
        this.wallRight.rotation.set(0, -0.4, 0);
    }
    _addWallLeft(texture) {
        let wallLeftGeometry = new THREE.PlaneGeometry(50, 50);
        let wallLeftMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallLeft = new THREE.Mesh(wallLeftGeometry, wallLeftMaterial);
        this.wallLeft.position.set(-91, -12, -93);
        this.wallLeft.rotation.set(0, 0.4, 0);
    }

    _addStick() {
        let stickGeometry = new THREE.CylinderGeometry(5, 5, 50, 12);
        stickGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 50 / 2, 0));
        let stickMaterial = new THREE.MeshNormalMaterial();
        this.stick = new THREE.Mesh(stickGeometry, stickMaterial);
        this.camera.position.set(0, 100, 100);
        this.camera.rotation.set(-0.3, 0, 0);
        this.stick.add(this.camera);
        this.stick.position.set(0, -75, -100);

    }
    _addFloor() {
        let floorGeometry = new THREE.PlaneGeometry(50, 1000, 5, 32);
        let floorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
        });
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.floor.rotation.x += Math.PI / 2;
        this.floor.position.set(0, -75, this.stick.position.z - 500);
    }

    _setVideo() {
        this.video.src = "video_test.mp4";
        this.video.crossOrigin = 'anonymous';
        this.video.preload = 'auto'; 
        this.video.autoload = true;
        this.video.load();
    }

    destroyRaf() {
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }
}
export default CockpitScene;