import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import BearScene from '../components/BearScene';

const Chp3Bear = () => {

    const history = useHistory();
    const canvas = useRef(null);
    // const bezierCurvePoints = {
    //     start: {x: -4, y: 2},
    //     firstControl: {x: 0, y: 2},
    //     secondControl: {x: 0, y: -2},
    //     end:{x: 4, y: -2}
    // };
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
        const threeScene = new BearScene(history, canvas.current, pathToAssets, pathToNextPage);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <img className="plants" src="/bear/plants.png" alt="plants"></img>
            <div className="fire"></div>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3Bear;
