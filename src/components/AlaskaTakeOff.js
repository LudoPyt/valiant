import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import TakeOffScene from './TakeOffScene';

const AlaskaTakeOff = () => {

    const history = useHistory();
    const canvas = useRef(null);

    useEffect(() => {
        const threeScene = new TakeOffScene(history, canvas.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <h2>Drag the cube to the sky</h2>
        </>
    )
}

export default AlaskaTakeOff;
