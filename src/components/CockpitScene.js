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
          
          let pivotY = gui.addFolder('cockpit');
          pivotY.add(this.pivot.position, 'x', -100, 100).listen();
          pivotY.add(this.pivot.position, 'y', -100, 100).listen();
          pivotY.add(this.pivot.position, 'z', -100, 100).listen();
          pivotY.add(this.pivot.rotation, 'x', -1, 1).listen();
          pivotY.add(this.pivot.rotation, 'y', -2, 2).listen();
          pivotY.add(this.pivot.rotation, 'z', -1, 1).listen();
          pivotY.open();
      
          
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
                // this.controls = new OrbitControls( this.camera, this.renderer.domElement)
                // this.scene.add( this.axesHelper );

                this._addFloor();

                this._addCameraPivot();

                this._addCockpit();

                this._setTextureVideo();
                this._addWallLeft(this.textureVideo);
                this._addWallRight(this.textureVideo);

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
            (this.pivot.rotation.y <= -0.3 && !this.soundRead) ||
            (this.pivot.rotation.y >= 0.3 && !this.soundRead)
        ) {
            this.sound.play();
            this.video.play();
            this.soundRead = true;
        }

        if (this.pivot.rotation.y >= -0.3 && this.pivot.rotation.y <= 0.3) {
            this.soundRead = false;
            this.sound.stop();
            this.video.pause();
            this.video.currentTime = 0;
        }

        if (this.arrow.directions.forward) {
            this.cockpit.rotation.x += this.speedRot * this.delta;
            this.camera.rotation.x += this.speedRot * this.delta;
        }
        if (this.arrow.directions.backward) {
            this.cockpit.rotation.x += -this.speedRot * this.delta;
            this.camera.rotation.x += -this.speedRot * this.delta;
        }

        this._moveLeft()
        this._moveRight()
        
        //avancé
        this.floor.position.z += 0.5;

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
                    console.log(this.stick)
                }
            })
        })
    }
    _addWallRight(texture) {
        let wallRightGeometry = new THREE.PlaneGeometry(50, 50);
        let wallRightMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallRight = new THREE.Mesh(wallRightGeometry, wallRightMaterial);
        this.wallRight.position.set(91, 0, -93);
        this.wallRight.rotation.set(0, -0.4, 0);
        this.scene.add(this.wallRight)

    }
    _addWallLeft(texture) {
        let wallLeftGeometry = new THREE.PlaneGeometry(50, 50);
        let wallLeftMaterial = new THREE.MeshBasicMaterial({map: texture});
        this.wallLeft = new THREE.Mesh(wallLeftGeometry, wallLeftMaterial);
        this.wallLeft.position.set(-91, 0, -93);
        this.wallLeft.rotation.set(0, 0.4, 0);
        this.scene.add(this.wallLeft)

    }

    _addStick(child) {
        this.stick = child


    }

    _addCameraPivot(){
        this.pivot = new THREE.Object3D()
        this.pivot.add(this.camera)
        this.scene.add(this.pivot)
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
        if (this.arrow.directions.left && this.cockpit.rotation.z < this.maxRotation) {
            this._leftCameraPivot()
            this.cockpit.rotateZ(this.speedRot * this.delta)
            this.camera.rotateZ(this.speedRot * this.delta)
            this.stick.rotateZ(this.speedRot * this.delta);

           
        }
    }
    _moveRight() {
        if (this.arrow.directions.right && this.cockpit.rotation.z> -this.maxRotation) {
            this._rightCameraPivot()
            this.camera.rotateZ(-this.speedRot * this.delta)
            this.cockpit.rotateZ(-this.speedRot * this.delta)
            this.stick.rotateZ(-this.speedRot * this.delta);

            
        }
    }
    _leftCameraPivot() {
        let pivotPosX = lerp(this.pivot.position.x, -24 , 0.05 )
        let pivotPosY = lerp(this.pivot.position.y, 9 , 0.05 )
        let pivotRotY = lerp( this.pivot.rotation.y , 1 , 0.05 )

        this.pivot.position.x = pivotPosX 
        this.pivot.position.y = pivotPosY

        this.pivot.rotation.y = pivotRotY

        if (this.camera.rotation.z > .07 && this.arrow.directions.left ){
            let cameraRotX = lerp( this.camera.rotation.x , -1, 0.05 )
            this.camera.rotation.x = cameraRotX
        }
        if (this.camera.rotation.z < .07 && this.arrow.directions.left ){
            let cameraRotX = lerp( this.camera.rotation.x , 0, 0.05 )
            this.camera.rotation.x = cameraRotX
        }
    }
    _rightCameraPivot() {
        let pivotPosX = lerp(this.pivot.position.x, 24 , 0.05 )
        let pivotPosY = lerp(this.pivot.position.y, 9 , 0.05 )
        let pivotRotY = lerp( this.pivot.rotation.y , - 1 , 0.05 )

        this.pivot.position.x = pivotPosX
        this.pivot.position.y = pivotPosY

        this.pivot.rotation.y = pivotRotY

        if (this.camera.rotation.z < -0.07 && this.arrow.directions.right){
            let cameraRotX = lerp( this.camera.rotation.x , -1 , 0.05 )
            this.camera.rotation.x = cameraRotX
        }
        if (this.camera.rotation.z > -0.07 && this.arrow.directions.right){
            let cameraRotX = lerp( this.camera.rotation.x , 0, 0.05 )
            this.camera.rotation.x = cameraRotX
        }
    }

    destroyRaf() {
        this.needDestroy = true;
        window.cancelAnimationFrame(this.raf)
    }
}
export default CockpitScene;