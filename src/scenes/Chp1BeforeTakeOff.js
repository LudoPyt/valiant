import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import BeforeTakeOffScene from '../components/scenesComponents/BeforeTakeOffScene';

const Chp1BeforeTakeOff = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const canvas = useRef(null);

    const scene = 3;
    const instruction = "Reproduiser l'enchaînement en cliquant sur les boutons du tableau de bord";
    const ambiantSound = 2;

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);

    useEffect(() => {
        const threeScene = new BeforeTakeOffScene(history, canvas.current);

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

export default Chp1BeforeTakeOff;
