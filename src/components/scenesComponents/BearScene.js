import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from '../../lib/DragControls';
import { TextureAnimator } from '../animationComponents/textureAnimator';
import { Howl } from 'howler';

class BearScene {
    constructor(history, canvas, bezierCurvePoints, pathToAssets, pathToNextPage, fixLighterUX, fixPathStartUX, fixPathEndUX){
        this.history = history;
        this.canvas = canvas;
        this.bezierCurvePoints = bezierCurvePoints;
        this.pathToAssets = pathToAssets;
        this.nextPage = pathToNextPage;
        this.fixLighterUX = fixLighterUX;
        this.fixPathStartUX = fixPathStartUX;
        this.fixPathEndUX = fixPathEndUX;

        this._clickOnLighter = this._clickOnLighter.bind(this)

        this._init();
    }

    _init() {
        this.needDestroy = false
        this.raf = 0;

        this.loader = new GLTFLoader();

        this.clock = new THREE.Clock();

        this.dragArray = [];

        this.startPoint = this.bezierCurvePoints.start;
        this.firstControlPoint = this.bezierCurvePoints.firstControl;
        this.secondControlPoint = this.bezierCurvePoints.secondControl;
        this.endPoint = this.bezierCurvePoints.end;

        this.showSparkles = false;
        this.showFlames = false;
        this.throwFirecracker = false;
        this.showExplosion = false;
        this.showPathUX = true;

        this._setScene();
        this._addBackground();
        this._addPath();
        this._addLighter();
        this._addFirecracker();
        this._addExplosion();
        this._addSound();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this._render();
    }

    _addBackground() {
        let background = new THREE.TextureLoader().load(this.pathToAssets + 'background.png');
        this.scene.background = background;
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

    _addLighter() {
        let loader = new THREE.TextureLoader();
        let material = new THREE.MeshLambertMaterial({
            map: loader.load(this.pathToAssets + 'lighter.png'),
            transparent: true
        });
        let geometry = new THREE.PlaneGeometry(1.5, 1);
        this.lighter = new THREE.Mesh(geometry, material);
        this.lighter.castShadow = true;
        this.lighter.receiveShadow = true;

        this.lighter.name = "lighter";
        this.lighter.position.x = -this.startPoint.x;
        this.lighter.position.y = this.startPoint.y;
        this.lighter.position.z = 0.2;


        let flamesTexture = new THREE.TextureLoader().load(this.pathToAssets + 'flames-sprite.png');
        this.flamesAnim = new TextureAnimator(flamesTexture, 26, 1, 26, 100); // texture, #horiz, #vert, #total, duration.
        let flamesMaterial = new THREE.MeshBasicMaterial( {map: flamesTexture, transparent: true} );
        let flamesGeometry = new THREE.PlaneGeometry(1.1, 1.65);
        this.flames = new THREE.Mesh(flamesGeometry, flamesMaterial);
        this.flames.position.x = -0.5;
        this.flames.position.y = 1.25;
        this.flames.position.z = 0.2;
        this.flames.rotation.z = 0.1;

        this.lighter.add(this.flames);

        this.scene.add(this.lighter);
    }

    _addFirecracker() {
        let loader = new THREE.TextureLoader();
        let material = new THREE.MeshLambertMaterial({
            map: loader.load(this.pathToAssets + 'firecracker.png'),
            transparent: true
        });
        let geometry = new THREE.PlaneGeometry(1.5, 1.3);
        this.firecracker = new THREE.Mesh(geometry, material);
        this.firecracker.castShadow = true;
        this.firecracker.receiveShadow = true;
        this.firecracker.name = "firecracker";
        this.firecracker.position.x = this.startPoint.x;
        this.firecracker.position.y = this.startPoint.y;
        this.firecracker.position.z = 0.2;

        let sparklesTexture = new THREE.TextureLoader().load(this.pathToAssets + 'sparkles-sprite.png');
        this.sparklesAnim = new TextureAnimator(sparklesTexture, 16, 1, 16, 150); // texture, #horiz, #vert, #total, duration.
        let sparklesMaterial = new THREE.MeshBasicMaterial( {map: sparklesTexture, transparent: true} );
        let sparklesGeometry = new THREE.PlaneGeometry(0.7, 0.85);
        this.sparkles = new THREE.Mesh(sparklesGeometry, sparklesMaterial);
        this.sparkles.position.x = 0.6;
        this.sparkles.position.y = 0.7;
        this.sparkles.position.z = 0.2;

        this.firecracker.add(this.sparkles);

        this.dragArray.push(this.firecracker);

        this.scene.add(this.firecracker);
    }

    _addExplosion() {
        let explosionTexture = new THREE.TextureLoader().load(this.pathToAssets + 'explosion-sprite.png');
        this.explosionAnim = new TextureAnimator(explosionTexture, 13, 1, 13, 100); // texture, #horiz, #vert, #total, duration.
        let explosionMaterial = new THREE.MeshBasicMaterial( {map: explosionTexture, transparent: true} );
        let explosionGeometry = new THREE.PlaneGeometry(2, 2);
        this.explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
        this.explosion.position.x = this.endPoint.x + 0.1;
        this.explosion.position.y =this.endPoint.y - 0.1;
        this.explosion.position.z = 0.2;

        this.scene.add(this.explosion);
    }

    _addUXElements() {
        let loader = new THREE.TextureLoader();

        let lighterUXMaterial = new THREE.MeshLambertMaterial({
            map: loader.load('/assets/ux/icon-clic.png'),
            transparent: true
        });
        let lighterUXGeometry = new THREE.PlaneGeometry(0.3, 0.3);
        this.lighterUX = new THREE.Mesh(lighterUXGeometry, lighterUXMaterial);
        this.lighterUX.castShadow = true;
        this.lighterUX.receiveShadow = true;
        this.lighterUX.position.x = -this.startPoint.x + this.fixLighterUX.x;
        this.lighterUX.position.y = this.startPoint.y + this.fixLighterUX.y;
        this.lighterUX.position.z = 0.3;

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

        this.scene.add(this.lighterUX);
    }

    _addSound(){
        this.bearSound = new Howl({
            src: this.pathToAssets + 'bear.mp3',
            loop: true,
        });

        this.bearSound.play();

        this.lighterSound = new Howl({
            src: this.pathToAssets + 'lighter.mp3'
        });

        this.sparklesSound = new Howl({
            src: this.pathToAssets + 'sparkles.mp3',
            volume: 0.7,
            onend: () => {
                this.showSparkles = false;
                this.throwFirecracker = false
            }
        });

        this.explosionSound = new Howl({
            src: this.pathToAssets + 'explosion.mp3',
            volume: 1,
            onplay: () => document.querySelector('.bear').classList.add('back'),
            onend: () => {
                this.endVoice.play();
                this.bearSound.pause();
            }
        });

        this.beginVoice = new Howl({
            src: this.pathToAssets + 'voiceBegin.mp3',
            onend: () => this._userCanInteract()
        });

        this.beginVoice.play();

        this.endVoice = new Howl({
            src: this.pathToAssets + 'voiceEnd.mp3',
            onend: () => {
                this.history.push(this.nextPage);
            }
        });
    }

    _setupClickEventListerner() {
        document.addEventListener('click', this._clickOnLighter, false);
    }

    _userCanInteract() {
        this._setupClickEventListerner();
        this._addUXElements();
    }

    _clickOnLighter(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersect = this.raycaster.intersectObjects(this.scene.children , true);

        this.intersect.map(elem => {
            if (elem.object.name === 'lighter') {
                this.showFlames = true;
                this.lighterSound.play();
                this.timeoutLighterClicked = setTimeout(() => {
                    this.lighterUX.material.opacity = 0;
                    this.showSparkles = true;
                    this.sparklesSound.play();
                    this.throwFirecracker = true;
                    this.dragControls = new DragControls(this.dragArray, this.camera, this.renderer.domElement);
                    this.scene.add(this.pathStartUX, this.pathEndUX);
                    this._setupDragEventListerner();
                    this.showFlames = false;
                    document.getElementById('instruction').innerHTML = "Lancer le pétard pour éloigner l'ours";
                }, 2600)
            }
            return elem;
        })
    }

    _setupDragEventListerner() {

        if (this.throwFirecracker) {

            window.addEventListener('mousemove', (event) => {
                if (event.x > this.pathScreenEnd && event.x < this.pathScreenStart) {
                    this.mouseX = event.x
                } else if (event.x < this.pathScreenEnd) {
                    this.mouseX = this.pathScreenEnd
                } else if (event.x > this.pathScreenStart) {
                    this.mouseX = this.pathScreenStart
                }
            });

            this.dragControls.addEventListener('drag', () => {
                let percentOfCurve = (this.mouseX - this.pathScreenStart)*100/(this.pathScreenEnd - this.pathScreenStart)

                this.pathStartUX.material.opacity = 0;

                if (percentOfCurve > 99 && this.throwFirecracker) {
                    this.pathStartUX.material.opacity = 0;
                    this.pathEndUX.material.opacity = 0;
                    this.showPathUX = false
                    this.firecracker.position.x = this.endPoint.x;
                    this.firecracker.position.y = this.endPoint.y;
                    this.firecracker.material.opacity = 0;
                    this.sparkles.material.opacity = 0;
                    this.showExplosion = true;
                    this.timeoutStopExplosion = setTimeout(() => {
                        this.showExplosion = false;
                    }, 1300)
                } else if (percentOfCurve < 1) {
                    this.firecracker.position.x = this.startPoint.x;
                    this.firecracker.position.y = this.startPoint.y;
                } else {
                    this.firecracker.position.x = this.pathPoints[Math.round(percentOfCurve)].x
                    this.firecracker.position.y = this.pathPoints[Math.round(percentOfCurve)].y
                    this.firecracker.scale.x = 1 - (percentOfCurve*0.005);
                    this.firecracker.scale.y = 1 - (percentOfCurve*0.005);
                    this.firecracker.rotation.z += (percentOfCurve*0.002)
                }
            });

            this.dragControls.addEventListener('dragend', () => {
                if (this.showPathUX) this.pathStartUX.material.opacity = 1;
                this.firecracker.position.x = this.startPoint.x;
                this.firecracker.position.y = this.startPoint.y;
                this.firecracker.scale.x = 1;
                this.firecracker.scale.y = 1;
                this.firecracker.rotation.z = 0;
                if (this.showExplosion) {
                    this.sparklesSound.stop();
                    this.explosionSound.play();
                }
            });

        }

    }

    _setScene() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        // this.renderer.setClearColor(0x000000);
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

        let delta = this.clock.getDelta();

        if (this.showSparkles) {
            this.sparklesAnim.update(delta * 1000);
        } else {
            this.sparklesAnim.update(0);
        }
        if (this.showFlames) this.flamesAnim.update(delta * 1000);
        if (this.showExplosion) this.explosionAnim.update(delta * 1000);

        if (!this.needDestroy) {
            requestAnimationFrame(this._render.bind(this));
        }
        this.renderer.render(this.scene, this.camera);
    }

    destroyRaf() {
        document.removeEventListener('click', this._clickOnLighter, false);
        clearTimeout(this.timeoutLighterClicked);
        clearTimeout(this.timeoutStopExplosion);
        clearInterval(this.interval);
        this.needDestroy = true
        window.cancelAnimationFrame(this.raf)
    }

}

export default BearScene;
