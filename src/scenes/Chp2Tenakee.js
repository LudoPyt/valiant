import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp2Tenakee = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 6;
    const instruction = "";
    const ambiantSound = 0;
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
    }, [context]);

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        document.getElementById('tenakee').addEventListener("ended", () => {history.push('/landing');});
    }, [history])

    return (
        <>
            <video id="tenakee" className="tenakee" autoPlay width="250">
                <source src="/tenakee/tenakee.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}

export default Chp2Tenakee;
