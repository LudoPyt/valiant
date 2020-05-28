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
    useEffect(() => {
        if (context.state.currentScene !== scene) {
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
            <img className="landing-plants" src="/landing/plants.png" alt="plants"></img>
            {/* <img className="take-off-and-landing-left-plants" src="/landing/left-plants.png" alt="plants"></img> */}
            {/* <img className="take-off-and-landing-right-plants" src="/landing/right-plants.png" alt="plants"></img> */}
            <h2>Drag the beaver to the lake</h2>
        </>
    )
}

export default Chp3Landing;
