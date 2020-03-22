import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';
import { DragControls } from '../lib/DragControls';

const Alaska1 = () => {

    const history = useHistory();

    useEffect(() => {
        let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);

        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        let scene = new THREE.Scene();

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshNormalMaterial();
        let cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = true;

        var objects = [];
        objects.push(cube);

        scene.add(cube);

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        scene.add(lightPoint);

        var controls = new DragControls(objects, camera, renderer.domElement);

        controls.addEventListener( 'dragstart', function(event) {
            // event.object.material.emissive.set( 0xaaaaaa );
        });

        controls.addEventListener( 'dragend', function(event) {
            // event.object.material.emissive.set( 0xff0000 );
            history.push('/story2');
        });

        function renderScene() {

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);

            requestAnimationFrame(renderScene);
        };

        requestAnimationFrame(renderScene);

    }, [history]);

    return (
        <>
            <canvas id='canvas'></canvas>
            <h2>Drag the cube</h2>
        </>
    )
}

export default Alaska1;
