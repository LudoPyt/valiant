import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import TakeOffAndLandingDrag from '../components/TakeOffAndLandingDrag';

const Chp1TakeOff = () => {

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

export default Chp1TakeOff;
