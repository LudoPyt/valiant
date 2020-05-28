import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import SimonGame from '../components/SimonGame';

const Chp1Simon = () => {

    const history = useHistory();
    const canvas = useRef(null);

    const context = React.useContext(Context);

    const scene = 3;
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
        }
    }, [context]);

    useEffect(() => {
        const threeScene = new SimonGame(history, canvas.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <img src="/before-take-off/background.png" alt="" />
            <h2>SIMON GAME: find the right combinaison</h2>
        </>
    )
}

export default Chp1Simon;
