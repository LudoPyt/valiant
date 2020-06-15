import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import { Howl } from 'howler';


import '../scss/lakehood/lakehood.scss';


const Chp1LakeHood = () => {

    const history = useHistory();
    const context = React.useContext(Context);

    const scene = 2;
    const instruction = "Cliquer sur le bon hydravion";
    const ambiantSound = 1;

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
    }, [context]);


    const Beaver = useRef();
    const Mike = useRef();
    const Green = useRef();
    const [canInteract, setCanInteract] = useState(false)
    const [isRead, setIsRead] = useState(false)
    const voice = new Howl({
        src: '/lakehood/voice.mp3',
        onend: () => {
            setIsRead(false)
            setCanInteract(true)
        }
    });
    const wrong = new Howl({
        src:  '/lakehood/wrong.mp3',
        onend: () => setIsRead(false)
    });
    const mike = new Howl({
        src: '/lakehood/mike.mp3',
        onend: () => setIsRead(false)
    });

    useEffect(() => {
        if (!canInteract) voice.play()

        if (canInteract && !isRead) {
            Beaver.current.addEventListener('click', () => {history.push('/simon');});

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
            <img src="/lakehood/lakehood.png" alt="" />
        </>
    )
}

export default Chp1LakeHood;
