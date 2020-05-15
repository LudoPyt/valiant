import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
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

    const context = React.useContext(Context);
    const chapter = 2;
    const scene = 1;

    useEffect(() => {
        if (context.state.currentChapter !== chapter || context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChapter', chapter});
            context.dispatch({type: 'setCurrentScene', scene});
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
            <img className="take-off-plants" src="/takeoff/plants.png" alt="plants"></img>
            <h2>Drag the beaver to the sky</h2>
        </>
    )
}

export default Chp2TakeOff;
