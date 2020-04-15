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

        let path = new THREE.Path();
        path.moveTo(-3, -2);
        path.bezierCurveTo(0, -2, 0, 2, 3, 2);
        let points = path.getPoints(100);

        let geometry1 = new THREE.BufferGeometry().setFromPoints(points);
        let material1 = new THREE.LineBasicMaterial({color: 0xffffff});
        let line = new THREE.Line(geometry1, material1);
        scene.add(line);

        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        let material = new THREE.MeshNormalMaterial();
        let cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = true;

        let objects = [];
        objects.push(cube);

        cube.position.x = -3;
        cube.position.y = -2;
        scene.add(cube);

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        scene.add(lightPoint);

        let mouseX;

        window.addEventListener('mousemove', (event) => {
            mouseX = event.x
        })

        let dragControls = new DragControls(objects, camera, renderer.domElement);

        dragControls.addEventListener('drag', function() {
            let screenPercent = mouseX*100/window.innerWidth
            let curvePercent = points.length*screenPercent/100

            if (Math.round(curvePercent) === points.length) {
                history.push('/story2');
            } else if (curvePercent < 0.5) {
                cube.position.x = -3;
                cube.position.y = -2;
            } else {
                cube.position.x = points[Math.round(curvePercent-1)].x
                cube.position.y = points[Math.round(curvePercent-1)].y
            }
        });

        function renderScene() {
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        };

        requestAnimationFrame(renderScene);

    }, [history]);

    return (
        <>
            <canvas id='canvas'></canvas>
            <h2>Drag the cube to the sky</h2>
        </>
    )
}

export default Alaska1;
