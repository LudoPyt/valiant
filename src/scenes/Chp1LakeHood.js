import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import { Howl } from 'howler';

import '../scss/scenes/lakehood.scss';

const Chp1LakeHood = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const chap = 1;
    const scene = 2;
    const instruction = "Cliquer sur le bon hydravion";
    const ambiantSound = 1;

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChap', chap});
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);


    const Beaver = useRef();
    const Mike = useRef();
    const Green = useRef();
    const [canInteract, setCanInteract] = useState(false)
    const [isRead, setIsRead] = useState(false)


    useEffect(() => {
        const voice = new Howl({
            src: '/assets/lakehood/voice.mp3',
            onend: () => {
                setIsRead(false)
                setCanInteract(true)
            }
        });
        const wrong = new Howl({
            src:  '/assets/lakehood/wrong.mp3',
            onend: () => setIsRead(false)
        });
        const mike = new Howl({
            src: '/assets/lakehood/mike.mp3',
            onend: () => setIsRead(false)
        });

        if (!canInteract) voice.play()

        if (canInteract && !isRead) {
            Beaver.current.addEventListener('click', () => {history.push('/before-take-off');});

            Mike.current.addEventListener('click', () => {
                setIsRead(true)
                mike.play()
            });

            Green.current.addEventListener('click', () => {
                setIsRead(true)
                wrong.play()
            });
        }
    }, [history, canInteract, isRead]);

    return (
        <>
            <div ref={Beaver} className="lakehood-beaver"></div>
            <div ref={Mike} className="lakehood-mike"></div>
            <div ref={Green} className="lakehood-green"></div>
            <img src="/assets/lakehood/lakehood.png" alt="" />
        </>
    )
}

export default Chp1LakeHood;
