import React from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import ArrowMove from './animationComponents/arrowMove';
import { Howl, Howler } from 'howler';

class Alaska2 extends React.Component {
  componentDidMount() {
    let speedRot = THREE.Math.degToRad(45);
    let newCameraPosition = new THREE.Vector3();
    let maxRotation = 0.5;
    let soundRead = false;

    let clock = new THREE.Clock();
    let delta = 0;
    let arrow = new ArrowMove();

    let renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('myCanvas'),
      antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.lookAt(scene.position);

    let light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    let lightPoint = new THREE.PointLight(0xffffff, 0.5);
    scene.add(lightPoint);

    //son
    const sound = new Howl({
      src: 'test-voix.mp3'
    });

    console.log(sound);

    //walls
    let wallLeftGeometry = new THREE.PlaneGeometry(50, 50);
    let wallLeftMaterial = new THREE.MeshNormalMaterial();
    let wallLeft = new THREE.Mesh(wallLeftGeometry, wallLeftMaterial);
    wallLeft.position.set(-91, -12, -93);
    wallLeft.rotation.set(0, 0.4, 0);

    let wallRightGeometry = new THREE.PlaneGeometry(50, 50);
    let wallRightMaterial = new THREE.MeshNormalMaterial();
    let wallRight = new THREE.Mesh(wallRightGeometry, wallRightMaterial);
    wallRight.position.set(91, -12, -93);
    wallRight.rotation.set(0, -0.4, 0);

    //cylindre
    let cylinderGeometry = new THREE.CylinderGeometry(5, 5, 50, 12);
    cylinderGeometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(0, 50 / 2, 0)
    );
    let cylinderMaterial = new THREE.MeshNormalMaterial();
    let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    camera.position.set(0, 100, 150);
    camera.rotation.set(-0.3, 0, 0);
    cylinder.add(camera);
    cylinder.position.set(0, -75, -100);
    newCameraPosition.y = cylinder.position.y;
    newCameraPosition.z = cylinder.position.z;

    //floor
    let floorGeometry = new THREE.PlaneGeometry(50, 1000, 5, 32);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x += Math.PI / 2;
    floor.position.set(0, -75, cylinder.position.z - 500);

    scene.add(cylinder, floor, wallLeft, wallRight);

    let options = {
      camera: {
        speed: 0.0001
      },
      reset: function() {
        camera.position.z = 20;
        camera.position.x = 0;
        camera.position.y = 0;
        floor.scale.x = 10;
        floor.scale.y = 10000;
      }
    };
    let gui = new dat.GUI();

    let cam = gui.addFolder('camera');
    cam.add(camera.position, 'y', -20, 20).listen();
    cam.add(camera.position, 'x', -150, 0).listen();
    cam.add(camera.position, 'z', -150, 0).listen();
    cam.add(camera.rotation, 'y', -5, 5).listen();
    cam.add(camera.rotation, 'x', -5, 5).listen();
    cam.add(camera.rotation, 'z', -5, 5).listen();
    cam.open();

    let ground = gui.addFolder('Ground');
    ground
      .add(floor.scale, 'x', 0, 10)
      .name('Width')
      .listen();
    ground
      .add(floor.scale, 'y', 0, 10)
      .name('Height')
      .listen();
    ground
      .add(floor.scale, 'z', 0, 10)
      .name('Length')
      .listen();
    ground.open();

    gui.add(options, 'reset');

    requestAnimationFrame(render);

    function render() {
      if (
        (camera.rotation.y <= -0.3 && !soundRead) ||
        (camera.rotation.y >= 0.3 && !soundRead)
      ) {
        sound.play();
        soundRead = true;
      }

      if (camera.rotation.y >= -0.3 && camera.rotation.y <= 0.3) {
        soundRead = false;
        sound.stop();
      }
      if (arrow.directions.forward) {
        camera.rotation.x += speedRot * delta;
      }
      if (arrow.directions.backward) {
        camera.rotation.x += -speedRot * delta;
      }
      if (arrow.directions.left && camera.rotation.y < maxRotation) {
        camera.rotateY(speedRot * delta);
        // cylinder.rotateZ((speedRot * delta) / 2);
        cylinder.rotateZ(speedRot * delta);
      }
      if (arrow.directions.right && camera.rotation.y > -maxRotation) {
        camera.rotateY(-speedRot * delta);
        // cylinder.rotateZ((-speedRot * delta) / 2);
        cylinder.rotateZ(-speedRot * delta);
      }

      //avancé
      newCameraPosition.z -= 0.5;

      cylinder.position.copy(newCameraPosition);

      wallLeft.position.z -= 0.5;
      wallRight.position.z -= 0.5;

      requestAnimationFrame(render);
      renderer.render(scene, camera);
      delta = clock.getDelta();
    }
  }

  render() {
    return <canvas id="myCanvas"></canvas>;
  }
}

export default Alaska2;
