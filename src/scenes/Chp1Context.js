import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import { Howl } from 'howler';

const Chp1Context = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const contextVideo = useRef();

    const chap = 1;
    const scene = 1;
    const instruction = "";
    const ambiantSound = 0;

    useEffect(() => {
        if (context.state.currentChap !== chap || context.state.currentScene !== scene || context.state.instruction !== instruction || context.state.ambiantSound !== ambiantSound) {
            context.dispatch({type: 'setCurrentChap', chap});
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);

    useEffect(() => {
        const sound = new Howl({
            src: '/assets/context/context.mp3',
        });
        sound.play();
        contextVideo.current.addEventListener("ended", () => {history.push('/lakehood');});
    }, [history])

    return (
        <div className="container">
            <video ref={contextVideo} id="context" className="context" autoPlay width="250">
                <source src="/assets/context/context.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
    )
}

export default Chp1Context;
