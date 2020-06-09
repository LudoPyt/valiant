import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import * as THREE from 'three';
import TakeOffAndLandingDrag from '../components/TakeOffAndLandingDrag';

const Chp2TakeOff = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const bezierCurvePoints = {
        start: {x: -4, y: -2},
        firstControl: {x: 0, y: -2},
        secondControl: {x: 0, y: 2},
        end:{x: 4, y: 2}
    };
    const pathToAssets = '/takeoff/';
    const pathToNextPage = '/flight-feelings';
    const fixPathStartUX = new THREE.Vector2(0.15, 0.08);
    const fixPathEndUX = new THREE.Vector2(0.15, 0.05);

    const context = React.useContext(Context);

    const scene = 4;
    const instruction = "Faire glisser l'avion pour le faire décoller.";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        const threeScene = new TakeOffAndLandingDrag(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage, fixPathStartUX, fixPathEndUX);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history, bezierCurvePoints, fixPathStartUX, fixPathEndUX])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <img className="plants" src="/takeoff/plants.png" alt="plants"></img>
        </>
    )
}

export default Chp2TakeOff;
