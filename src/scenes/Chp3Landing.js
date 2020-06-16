import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import * as THREE from 'three';
import TakeOffAndLandingDrag from '../components/scenesComponents/TakeOffAndLandingDrag';

const Chp3Landing = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const canvas = useRef(null);

    const chap = 3;
    const scene = 7;
    const instruction = "Faire glisser l'avion pour amerrir";
    const ambiantSound = 1;

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChap', chap});
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);

    useEffect(() => {
        const bezierCurvePoints = {
            start: {x: -4, y: 2},
            firstControl: {x: 0, y: 2},
            secondControl: {x: 0, y: -2},
            end:{x: 4, y: -2}
        };
        const pathToAssets = '/assets/takeOffAndLanding/landing/';
        const pathToNextPage = '/tenakee';
        const fixPathStartUX = new THREE.Vector2(0.15, -0.08);
        const fixPathEndUX = new THREE.Vector2(0.15, -0.07);
        const voiceOff = '/assets/takeOffAndLanding/voiceLanding.mp3';
        const threeScene = new TakeOffAndLandingDrag(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage, fixPathStartUX, fixPathEndUX, voiceOff);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <img className="plants" src="/assets/takeOffAndLanding/landing/plants.png" alt="plants"></img>
        </>
    )
}

export default Chp3Landing;
