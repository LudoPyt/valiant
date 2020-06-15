import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp1Context = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const contextVideo = useRef();

    const scene = 1;
    const instruction = "";
    const ambiantSound = 0;

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
        contextVideo.current.addEventListener("ended", () => {history.push('/lakehood');});
    }, [history])

    return (
        <>
            <video ref={contextVideo} id="context" className="context" autoPlay width="250">
                <source src="/context/context.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}

export default Chp1Context;
