import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp3Bear = () => {

    const history = useHistory();
    // const canvas = useRef(null);
    // const bezierCurvePoints = {
    //     start: {x: -4, y: 2},
    //     firstControl: {x: 0, y: 2},
    //     secondControl: {x: 0, y: -2},
    //     end:{x: 4, y: -2}
    // };
    // const pathToAssets = '/landing/';
    // const pathToNextPage = '/bear';

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

    // useEffect(() => {
        // const threeScene = new TakeOffAndLandingDrag(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage);

    //     return () => {
    //         threeScene.destroyRaf();
    //     }
    // }, [history, bezierCurvePoints])

    return (
        <>
            {/* <canvas ref={canvas}></canvas> */}
            {/* mettre le background sur le canvas */}
            <img src="/bear/background.png" alt="" />
            <img className="plants" src="/bear/plants.png" alt="plants"></img>
            <div className="fire"></div>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3Bear;
