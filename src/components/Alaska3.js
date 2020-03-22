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



        let mouse = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();

        let timerID;
        let counter = 0;
        let pressHoldDuration = 100;

        document.addEventListener("mousedown", pressingDown, false);
        document.addEventListener("mouseup", notPressingDown, false);
        document.addEventListener("mouseleave", notPressingDown, false);

        document.addEventListener("touchstart", pressingDown, false);
        document.addEventListener("touchend", notPressingDown, false);

        let intersect;
        let disappear = [];

        function pressingDown(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObjects(scene1.children , true);
            if (intersect.length > 0) {
                requestAnimationFrame(timer);
            }
        }

        function notPressingDown() {
            cancelAnimationFrame(timerID);
            counter = 0;
        }

        function timer() {
            if (counter < pressHoldDuration && intersect[0].object.material.opacity > 0.05) {
                switch(intersect[0].object.name) {
                    case 'cube0':
                        intersect[0].object.material.opacity -= Math.abs(Math.sin(new Date().getSeconds() * .001));
                        break;
                    case 'cube1':
                        intersect[0].object.material.opacity -= Math.abs(Math.sin(new Date().getSeconds() * .001));
                        break;
                    case 'cube2':
                        intersect[0].object.material.opacity -= Math.abs(Math.sin(new Date().getSeconds() * .001));
                        break;
                    default:
                        break;
                }
                timerID = requestAnimationFrame(timer);
                counter++;
            } else if (intersect[0].object.material.opacity <= 0.06) {
                if (disappear.length >= 3) {
                    history.push('/story2');
                } else {
                    disappear.push(intersect[0].object.name)
                }
            }
        }

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
