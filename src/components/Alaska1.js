import React from 'react';
import * as THREE from 'three';

class Alaska1 extends React.Component {

    componentDidMount() {
        let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0 );
        renderer.setPixelRatio(window.devicePixelRatio);

        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        let scene1 = new THREE.Scene();

        let light = new THREE.AmbientLight(0xffffff, 0.5);
        scene1.add(light);

        let geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
        let material1 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        let cube1 = new THREE.Mesh( geometry1, material1 );

        scene1.add(cube1);

        function renderScene() {

            cube1.rotation.x += 0.01;
            cube1.rotation.y += 0.01;

            renderer.render(scene1, camera);

            requestAnimationFrame(renderScene);
        };

        requestAnimationFrame(renderScene);

    }

    render() {
        return (
            <canvas id='canvas'></canvas>
        )
    }

};

export default Alaska1;
