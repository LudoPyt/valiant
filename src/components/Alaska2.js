import React from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import ArrowMove from './animationComponents/arrowMove';

class Alaska2 extends React.Component {
  componentDidMount() {
    let speedRot = THREE.Math.degToRad(45);

    var clock = new THREE.Clock();
    var delta = 0;
    let arrow = new ArrowMove();

    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('myCanvas'),
      antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var lightPoint = new THREE.PointLight(0xffffff, 0.5);
    scene.add(lightPoint);

    //sphere
    // var sphereGeometry = new THREE.SphereGeometry(20, 6, 6);
    // var sphereMaterial = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.position.set(0, -120, -1000);

    //cylindre
    var cylinderGeometry = new THREE.CylinderGeometry(5, 5, 50, 12);
    var cylinderMaterial = new THREE.MeshNormalMaterial();
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 0, -100);

    //floor
    var floorGeometry = new THREE.PlaneGeometry(20, 20);
    var floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x += Math.PI / 2;
    floor.position.y = -25;
    floor.position.z = cylinder.position.z;

    var camHolder = new THREE.Group();
    camHolder.add(camera);
    camHolder.position.set(0, 10, 20);

    scene.add(cylinder, floor, camHolder);

    var options = {
      camera: {
        speed: 0.0001
      },
      reset: function() {
        camera.position.z = 20;
        camera.position.x = 0;
        camera.position.y = 0;
        floor.scale.x = 10;
        floor.scale.y = 10;
        floor.scale.z = 10;
      }
    };
    var gui = new dat.GUI();

    var cam = gui.addFolder('Camera');
    cam.add(camera.position, 'y', -200, 200).listen();
    cam.add(camera.position, 'x', -200, 200).listen();
    cam.add(camera.position, 'z', -200, 200).listen();
    cam.open();

    var ground = gui.addFolder('Ground');

    ground
      .add(floor.position, 'y', 0, 100)
      .name('Width')
      .listen();
    ground
      .add(floor.scale, 'x', 0, 100)
      .name('Width')
      .listen();
    ground
      .add(floor.scale, 'y', 0, 100)
      .name('Height')
      .listen();
    ground
      .add(floor.scale, 'z', 0, 100)
      .name('Length')
      .listen();
    ground.open();

    gui.add(options, 'reset');

    requestAnimationFrame(render);

    function render() {
      if (arrow.directions.forward) {
        console.log(floor.position.z);
        console.log(cylinder.position.z);
        camera.rotation.x += speedRot * delta;
      }
      if (arrow.directions.backward) {
        camera.rotation.x += -speedRot * delta;
      }
      if (arrow.directions.left) {
        camHolder.rotateY(speedRot * delta);
      }
      if (arrow.directions.right) {
        camHolder.rotateY(-speedRot * delta);
      }
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
