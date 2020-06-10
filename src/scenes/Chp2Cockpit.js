import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import CockpitScene from '../components/CockpitScene';

import '../scss/cockpit/cockpit.scss';

const Chp2Cockpit = () => {

    const history = useHistory();
    const canvas = useRef(null);
    const seaVideo = useRef(null);
    const skyVideo = useRef(null);

    const context = React.useContext(Context);

    const scene = 6;

    const instruction = "Observer à gauche // Regarder vers la droite // Commencer la descente/Décourvrir Tenakee Springs";

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        const threeScene = new CockpitScene(canvas.current, seaVideo.current, skyVideo.current );
        document.getElementById('btn').addEventListener('click', () => {history.push('/landing');});

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <video className="video" ref={seaVideo}></video>
            <video className="video" ref={skyVideo} autoPlay></video>
            <canvas ref={canvas}></canvas>
            <div className="adviceRight"><div class="arrow-right"></div></div>
            <div className="adviceLeft"><div class="arrow-left"></div></div>
            <div className="adviceDown"><div class="arrow-down"></div></div>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp2Cockpit;
