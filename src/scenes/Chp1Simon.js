import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import SimonGame from '../components/SimonGame';

const Chp1Simon = () => {

    const history = useHistory();
    const canvas = useRef(null);

    const context = React.useContext(Context);

    const scene = 3;
    const instruction = "Cliquer sur les boutons du tableau de bord dans le bon ordre.";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        const threeScene = new SimonGame(history, canvas.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
        </>
    )
}

export default Chp1Simon;
