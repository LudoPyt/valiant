import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import CockpitScene from '../components/CockpitScene';

const Chp2Cockpit = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const video = useRef(null);

    const context = React.useContext(Context);

    const scene = 6;
    const instruction = "JE SAIS PAS QUOI METTRE";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        const threeScene = new CockpitScene(canvas.current, video.current);
        document.getElementById('btn').addEventListener('click', () => {history.push('/landing');});

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <video className="video" ref={video}></video>
            <canvas ref={canvas}></canvas>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp2Cockpit;
