import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import * as THREE from 'three';
import BearScene from '../components/BearScene';

const Chp3Bear = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const bezierCurvePoints = {
        start: {x: -0.6, y: -2},
        firstControl: {x: -0.5, y: 0.5},
        secondControl: {x: -1.5, y: 2},
        end:{x: -2.5, y: 1}
    };
    const pathToAssets = '/bear/';
    const pathToNextPage = '/people';
    const fixLighterUX = new THREE.Vector2(0.25, 0);
    const fixPathStartUX = new THREE.Vector2(0.02, 0.08);
    const fixPathEndUX = new THREE.Vector2(-0.1, 0.05);

    const context = React.useContext(Context);

    const scene = 8;
    const instruction = "Allumer puis lancer le pétard pour éloigner l'ours.";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        const threeScene = new BearScene(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage, fixLighterUX, fixPathStartUX, fixPathEndUX);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history, bezierCurvePoints, fixLighterUX, fixPathStartUX, fixPathEndUX])

    return (
        <>
            <canvas style={{zIndex: 3}} ref={canvas}></canvas>
            <img style={{zIndex: 2}} className="plants" src="/bear/plants.png" alt="plants"></img>
            <div style={{zIndex: 2}} className="bear"></div>
            <img style={{zIndex: 1}} className="background" src="/bear/background.png" alt="background"></img>
        </>
    )
}

export default Chp3Bear;
