import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import TakeOffAndLandingDrag from '../components/TakeOffAndLandingDrag';

const Chp3Landing = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const bezierCurvePoints = {
        start: {x: -4, y: 2},
        firstControl: {x: 0, y: 2},
        secondControl: {x: 0, y: -2},
        end:{x: 4, y: -2}
    };
    const pathToAssets = '/landing/';
    const pathToNextPage = '/bear';

    const context = React.useContext(Context);

    const scene = 7;
    const instruction = "Faire glisser l'avion pour le faire amerrir.";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        const threeScene = new TakeOffAndLandingDrag(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history, bezierCurvePoints])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <img className="plants" src="/landing/plants.png" alt="plants"></img>
            <h2>Drag the beaver to the lake</h2>
        </>
    )
}

export default Chp3Landing;
