import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import TakeOffAndLandingScene from './TakeOffAndLandingScene';

const AlaskaLanding = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const bezierCurvePoints = {
        start: {x: -4, y: 2},
        firstControl: {x: 0, y: 2},
        secondControl: {x: 0, y: -2},
        end:{x: 4, y: -2}
    };
    const pathToAssets = '/landing/';
    const pathToNextPage = '/';

    useEffect(() => {
        const threeScene = new TakeOffAndLandingScene(history, canvas.current, bezierCurvePoints, pathToAssets, pathToNextPage);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history, bezierCurvePoints])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <h2>Drag the beaver to the lake</h2>
        </>
    )
}

export default AlaskaLanding;
