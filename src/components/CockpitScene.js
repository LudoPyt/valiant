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
        this.video = video;

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

        //video
        this._setVideo();
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
          
          let pX = gui.addFolder('pivotX');
          pX.add(this.pivotX.position, 'x', -100, 100).listen();
          pX.add(this.pivotX.position, 'y', -100, 100).listen();
          pX.add(this.pivotX.position, 'z', -100, 100).listen();
          pX.add(this.pivotX.rotation, 'x', -1, 1).listen();
          pX.add(this.pivotX.rotation, 'y', -2, 2).listen();
          pX.add(this.pivotX.rotation, 'z', -1, 1).listen();
          pX.open();
      
          
          let pY = gui.addFolder('pivotY');
          pY.add(this.pivotY.position, 'x', -100, 100).listen();
          pY.add(this.pivotY.position, 'y', -100, 100).listen();
          pY.add(this.pivotY.position, 'z', -100, 100).listen();
          pY.add(this.pivotY.rotation, 'x', -2, 2).listen();
          pY.add(this.pivotY.rotation, 'y', -2, 2).listen();
          pY.add(this.pivotY.rotation, 'z', -2, 2).listen();
          pY.open();

          let cam = gui.addFolder('camera');
          cam.add(this.camera.position, 'x', -100, 100).listen();
          cam.add(this.camera.position, 'y', -100, 100).listen();
          cam.add(this.camera.position, 'z', -100, 100).listen();
          cam.add(this.camera.rotation, 'x', -2, 2).listen();
          cam.add(this.camera.rotation, 'y', -2, 2).listen();
          cam.add(this.camera.rotation, 'z', -2, 2).listen();
          cam.open();

          gui.add(options, 'reset');
    }

    _setupEventListener() {
        this.video.addEventListener('canplaythrough', () => {
            if (!this.isStarted){
                this.isStarted = true

                this._setScene();
                this._addSky();
                this._addFloor();

                this._addCameraPivotY();
                this._addCameraPivotX();

                this._addCockpit();

                // this._setTextureVideo();
                // this._addWallLeft(this.textureVideo);
                // this._addWallRight(this.textureVideo);

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
        if (this.helices){
            this.helices.rotation.z += 10 * this.delta
        }

        if (
            (this.pivotY.rotation.y <= -0.3 && !this.soundRead) ||
            (this.pivotY.rotation.y >= 0.3 && !this.soundRead)
        ) {
            this.sound.play();
            // this.video.play();
            this.soundRead = true;
        }

        if (this.pivotY.rotation.y >= -0.3 && this.pivotY.rotation.y <= 0.3) {
            this.soundRead = false;
            this.sound.stop();
            // this.video.pause();
            // this.video.currentTime = 0;
        }

        if (this.arrow.directions.forward && this.camera.rotation.x <= 0) {
            this.cockpit.rotation.x += this.speedRot * this.delta;
            this.camera.rotation.x += this.speedRot * this.delta;
        }
        if (this.arrow.directions.backward) {
            this.cockpit.rotation.x += -this.speedRot * this.delta;
            this.camera.rotation.x += -this.speedRot * this.delta;
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

        this._moveLeft()
        this._moveRight()

        if (!this.needDestroy) {
            this.raf = requestAnimationFrame(this._render.bind(this));
        }

        this.renderer.render(this.scene, this.camera);
        this.delta = this.clock.getDelta();
    }

    _addCockpit(){
        this.loader.load('Cockpit3D/scene.gltf', (object) => { 
            this.gltf = object.scene
            this.gltf.traverse((child) => {
                if (child.name === 'Hydravion' ){
                    this.cockpit = child
                    this.cockpit.scale.set(.04, .04, .04);
                    this.cockpit.position.set(0, 0, 0);
                    this.scene.add(this.cockpit)
                    this._setGUI();
                }
                if (child.name === 'Helices' ){
                    this.helices = child
                }
                if (child.name === 'Manche'){
                    this._addStick(child)
                }
            })
        })
    }
    _addWallRight(texture) {
        let wallPivot = new THREE.Object3D()
        wallPivot.position.set(40, -32, -10);
        wallPivot.rotation.set(0, -1.5, 0);
        let wallRightGeometry = new THREE.PlaneGeometry(30,25);
        let wallRightMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallRight = new THREE.Mesh(wallRightGeometry, wallRightMaterial);
        wallPivot.add(this.wallRight)
        this.wallRight.rotation.set(-.8, .2, 0);
        this.wallRight.position.set(0,2,-13)
        this.scene.add(wallPivot)

    }
    _addWallLeft(texture) {
        this.wallPivot = new THREE.Object3D()
        this.wallPivot.position.set(-40, -32, -10);
        this.wallPivot.rotation.set(0, 1.5, 0);
        let wallLeftGeometry = new THREE.PlaneGeometry(40, 30);
        let wallLeftMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallLeft = new THREE.Mesh(wallLeftGeometry, wallLeftMaterial);
        this.wallPivot.add(this.wallLeft)
        this.wallLeft.rotation.set(0, 0, 0);
        this.wallLeft.position.set(0,2,-13)
        this.scene.add(this.wallPivot)

    }
    _addSky() {
        var texture = new THREE.TextureLoader().load( "images/ciel-cockpit.png" );
        let skyGeometry = new THREE.PlaneGeometry(2000, 2000);
        let skyMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.sky.position.set(0,0,-500)
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

    _addFloor() {
        let floorGeometry = new THREE.PlaneGeometry(50, 1000, 5, 32);
        let floorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
        });
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.floor.rotation.x += Math.PI / 2;
        this.floor.position.set(0, -50,0);
        this.scene.add(this.floor);

    }

    _setVideo() {
        this.video.src = "video_test.mp4";
        this.video.crossOrigin = 'anonymous';
        this.video.preload = 'auto'; 
        this.video.autoload = true;
        this.video.load();
    }

    _moveLeft() {
        if (this.arrow.directions.left && this.stick.rotation.z < this.maxRotation) {
            this._leftCameraPivot()
            // this.cockpit.rotateZ(this.speedRot * this.delta)
            // this.camera.rotateZ(this.speedRot * this.delta)
            this.stick.rotateZ(this.speedRot * this.delta);
        }
        
    }
    _moveRight() {
        if (this.arrow.directions.right && this.stick.rotation.z> -this.maxRotation) {
            this._rightCameraPivot()
            // this.camera.rotateZ(-this.speedRot * this.delta)
            // this.cockpit.rotateZ(-this.speedRot * this.delta)
            this.stick.rotateZ(-this.speedRot * this.delta);
        }
    }
    _leftCameraPivot() {
        let pivotYPosX = lerp(this.pivotY.position.x, -46 , this.lerpEasing )
        let pivotYRotY = lerp( this.pivotY.rotation.y , .8 , this.lerpEasing )
        let pivotXRotZ = lerp( this.pivotX.rotation.z , .1 , this.lerpEasing )

        this.pivotY.position.x = pivotYPosX 
        this.pivotY.rotation.y = pivotYRotY
        this.pivotX.rotation.z = pivotXRotZ

    }
    _rightCameraPivot() {
        let pivotPosX = lerp(this.pivotY.position.x, 46 , this.lerpEasing )
        let pivotRotY = lerp( this.pivotY.rotation.y , -0.8 , this.lerpEasing )
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