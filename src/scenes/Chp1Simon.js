import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SimonGame from '../components/SimonGame';

const Chp1Simon = () => {

    const history = useHistory();
    const canvas = useRef(null);

    useEffect(() => {
        const threeScene = new SimonGame(history, canvas.current);

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

export default Chp1Simon;
