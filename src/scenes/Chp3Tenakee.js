import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp3Tenakee = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const videoTenakee = useRef();

    const scene = 7;
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
        videoTenakee.current.addEventListener("ended", () => {history.push('/bear');});
    }, [history])

    return (
        <>
            <video ref={videoTenakee} id="tenakee" className="tenakee" autoPlay width="250">
                <source src="/tenakee/tenakee.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}

export default Chp3Tenakee;
