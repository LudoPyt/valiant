import React from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

class Alaska2 extends React.Component {
  componentDidMount() {
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
      300,
      10000
    );
    camera.lookAt(scene.position);

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var lightPoint = new THREE.PointLight(0xffffff, 0.5);
    scene.add(lightPoint);

    //sphere
    var sphereGeometry = new THREE.SphereGeometry(20, 6, 6);
    var sphereMaterial = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, -120, -1000);
    //cylindre
    var cylinderGeometry = new THREE.CylinderGeometry(20, 20, 120, 12);
    var cylinderMaterial = new THREE.MeshNormalMaterial({ color: 0xf3ffe2 });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, -200, -1000);

    //floor
    var floorGeometry = new THREE.PlaneGeometry(20, 20, 120, 12);
    var floorMaterial = new THREE.MeshBasicMaterial({ color: 0xf3ffe2 });
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -200, -1000);

    scene.add(sphere, cylinder, floor);

    var options = {
      velx: 0,
      vely: 0,
      enableOrbitControl: false,
      camera: {
        speed: 0.0001
      },
      reset: function() {
        camera.position.z = 75;
        camera.position.x = 0;
        camera.position.y = 0;
        floor.scale.x = 10;
        floor.scale.y = 1;
        floor.scale.z = 1;
      }
    };
    var gui = new dat.GUI();

    var cam = gui.addFolder('Camera');
    cam.add(options, 'enableOrbitControl').listen();
    cam.add(camera.position, 'y', -200, 200).listen();
    cam.add(camera.position, 'x', -200, 200).listen();
    cam.add(camera.position, 'z', -200, 200).listen();
    cam.open();

    var box = gui.addFolder('Cube');
    box
      .add(floor.scale, 'x', 0, 2000)
      .name('Width')
      .listen();
    box
      .add(floor.scale, 'y', 0, 2000)
      .name('Height')
      .listen();
    box
      .add(floor.scale, 'z', 0, 2000)
      .name('Length')
      .listen();
    box.open();

    gui.add(options, 'reset');

    requestAnimationFrame(render);

    function render() {
      // mesh.rotation.x = -50;
      // mesh.rotation.y += 0.05;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

  render() {
    return <canvas id="myCanvas"></canvas>;
  }
}

export default Alaska2;
