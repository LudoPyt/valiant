import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SimonScene from './SimonScene';

const Alaska = () => {

    const history = useHistory();
    const canvas = useRef(null);

    useEffect(() => {
        const threeScene = new SimonScene(history, canvas.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <h2>SIMON GAME: find the right combinaison</h2>
        </>
    )
}

export default Alaska;
