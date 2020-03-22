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

        let scene1 = new THREE.Scene();

        let geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
        let material1 = new THREE.MeshNormalMaterial();
        let cube1 = new THREE.Mesh( geometry1, material1 );
        cube1.castShadow = true;
        cube1.receiveShadow = true;

        var objects = [];
        objects.push(cube1);

        scene1.add(cube1);

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene1.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        scene1.add(lightPoint);

        var controls = new DragControls(objects, camera, renderer.domElement);

        controls.addEventListener( 'dragstart', function(event) {
            // event.object.material.emissive.set( 0xaaaaaa );
        });

        controls.addEventListener( 'dragend', function(event) {
            // event.object.material.emissive.set( 0xff0000 );
            history.push('/story3');
        });

        function renderScene() {

            cube1.rotation.x += 0.01;
            cube1.rotation.y += 0.01;

            renderer.render(scene1, camera);

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
