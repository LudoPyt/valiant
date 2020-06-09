import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
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
        document.getElementById('btn').addEventListener('click', () => {history.push('/people');});
    }, [history])

    useEffect(() => {
        const threeScene = new BearScene(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history, bezierCurvePoints])

    return (
        <>
            <canvas style={{zIndex: 3}} ref={canvas}></canvas>
            <img style={{zIndex: 2}} className="plants" src="/bear/plants.png" alt="plants"></img>
            <div style={{zIndex: 2}} className="bear"></div>
            <div style={{zIndex: 2}} id="explosionBox" className="explosion"></div>
            <div style={{zIndex: 2}} id="fireBox" className="fire"></div>
            <img style={{zIndex: 1}} className="background" src="/bear/background.png" alt="background"></img>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3Bear;
