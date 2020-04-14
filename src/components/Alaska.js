import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';

const Alaska = () => {

    const history = useHistory();

    let camera;
    let scene;
    let mouse;
    let raycaster;

    let intersect;
    let objects = [];

    let moves = [];
    let solution = ["cube0", "cube1", "cube2"];

    const reset = () => {
        console.log('reseeet')
        moves = []
        for (let i = 0; i < objects.length; i++) {
            objects[i].material.opacity = 1;
        }
    }

    const isRight = () => {
        moves.map((value, key) => {
            if (value === solution[key]) {
                console.log('GOOD JOOOB');
                history.push('/story1');
            } else {
                console.log('WROOONG')
                reset();
            }
        });
    }

    const pressingDown = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersect = raycaster.intersectObjects(scene.children , true);

        if (intersect.length > 0 && moves.length === 2) {
            intersect[0].object.material.opacity = 0.5;
            moves.push(intersect[0].object.name)
            isRight();
        } else if (intersect.length > 0 && moves.length < 2) {
            intersect[0].object.material.opacity = 0.5;
            moves.push(intersect[0].object.name)
        } else if (intersect.length > 0) {
            moves = []
            moves.push(intersect[0].object.name)
        }

    }

    useEffect(() => {

        let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        scene = new THREE.Scene();

        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material1 = new THREE.MeshNormalMaterial();
        let material2 = new THREE.MeshNormalMaterial();
        let material3 = new THREE.MeshNormalMaterial();

        let materials = [material1, material2, material3];

        for(let i = 0; i < 3; i++) {
            let cube = new THREE.Mesh(geometry, materials[i]);
            if (i === 0) {
                cube.position.x = -2;
            } else if (i === 1) {
                cube.position.x = 0;
            } else {
                cube.position.x = 2;
            }
            cube.name = "cube" + i.toString();
            cube.material.transparent = true;
            objects.push(cube);
            scene.add(cube);
        }

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        let lightPoint = new THREE.PointLight(0xffffff, 0.5);
        scene.add(lightPoint);


        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();


        document.addEventListener("click", pressingDown);

        const renderScene = () => {
            objects[0].rotation.x += 0.01;
            objects[0].rotation.y += 0.01;
            objects[1].rotation.x -= 0.01;
            objects[1].rotation.y -= 0.01;
            objects[2].rotation.x += 0.01;
            objects[2].rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        };

        requestAnimationFrame(renderScene);

    }, [history]);


    return (
        <>
            <canvas id='canvas' ref={camera}></canvas>
            <h2>SIMON GAME: find the right combinaison
                <button onClick={reset}>reset/restart</button>
            </h2>
        </>
    )
}

export default Alaska;
