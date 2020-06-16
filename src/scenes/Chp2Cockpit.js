import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import CockpitScene from '../components/scenesComponents/CockpitScene';

import '../scss/scenes/cockpit.scss';

const Chp2Cockpit = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const canvas = useRef(null);
    const seaVideo = useRef(null);
    const skyVideo = useRef(null);

    const scene = 6;
    const instruction = "Regarder vers la droite";
    const ambiantSound = 3;

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
        const threeScene = new CockpitScene(history, canvas.current, seaVideo.current, skyVideo.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <video className="video" ref={seaVideo}></video>
            <video className="video" ref={skyVideo}></video>
            <canvas ref={canvas}></canvas>
            <div className="adviceRight"><div className="arrow-right"></div></div>
            <div className="adviceLeft"><div className="arrow-left"></div></div>
            <div className="adviceDown"><div className="arrow-down"></div></div>
        </>
    )
}

export default Chp2Cockpit;
