import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';

const Alaska3 = () => {

    const history = useHistory();

    useEffect(() => {
        let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0 );
        renderer.setPixelRatio(window.devicePixelRatio);

        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        let scene1 = new THREE.Scene();

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material1 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        let material2 = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        let material3 = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
        let materials = [material1, material2, material3];

        var objects = [];

        for(let i = 0; i < 3; i++) {
            let cube = new THREE.Mesh(geometry, materials[i]);
            cube.position.x = i;
            cube.name = "cube" + i.toString();
            cube.material.transparent = true;
            objects.push(cube);
            scene1.add(cube);
        }

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene1.add(light);



        var mouse = new THREE.Vector2();
        var raycaster = new THREE.Raycaster();

        var timerID;
        var counter = 0;
        var pressHoldDuration = 100;

        document.addEventListener("mousedown", pressingDown, false);
        document.addEventListener("mouseup", notPressingDown, false);
        document.addEventListener("mouseleave", notPressingDown, false);

        document.addEventListener("touchstart", pressingDown, false);
        document.addEventListener("touchend", notPressingDown, false);

        var intersect;

        function pressingDown(event) {
        // Start the timer
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObjects(scene1.children , true);
            if (intersect.length > 0) {
                requestAnimationFrame(timer);
                event.preventDefault();
                console.log("Pressing!");
            }
        }

        function notPressingDown(e) {
            // Stop the timer
            cancelAnimationFrame(timerID);
            counter = 0;
            console.log("Not pressing!");
        }

        function timer() {
            if (counter < pressHoldDuration && intersect[0].object.material.opacity > 0.05) {
                // console.log("DISAPPEAR", counter, intersect);
                    switch(intersect[0].object.name) {
                        case 'cube0':
                            intersect[0].object.material.opacity = 1 + Math.sin(new Date().getTime() * .001);
                            break;
                        case 'cube1':
                            intersect[0].object.material.opacity = 1 + Math.sin(new Date().getTime() * .001);
                            break;
                        case 'cube2':
                            intersect[0].object.material.opacity = 1 + Math.sin(new Date().getTime() * .001);
                            break;
                        default:
                            break;
                    }
                console.log(intersect[0].object.material.opacity)
                timerID = requestAnimationFrame(timer);
                counter++;
            }
        }

        // history.push('/story2');

        function renderScene() {

            renderer.render(scene1, camera);

            requestAnimationFrame(renderScene);
        };

        requestAnimationFrame(renderScene);

    }, [history]);

    return (
        <canvas id='canvas'></canvas>
    )
}

export default Alaska3;
