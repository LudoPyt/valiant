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
        if (context.state.currentChap !== chap || context.state.currentScene !== scene || context.state.instruction !== instruction || context.state.ambiantSound !== ambiantSound) {
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
    
    
    useEffect(() => {
        let isRead = false

        const voice = new Howl({
            src: '/assets/lakehood/voice.mp3',
            onend: () => {
                isRead = false
                setCanInteract(true)
            }
        });
        const wrong = new Howl({
            src:  '/assets/lakehood/wrong.mp3',
            onend: () => isRead = false
        });
        const mike = new Howl({
            src: '/assets/lakehood/mike.mp3',
            onend: () => isRead = false
        });

        if (!canInteract) voice.play()

        if (canInteract) {
            Beaver.current.addEventListener('click', () => {history.push('/before-take-off');});

            Mike.current.addEventListener('click', () => {
                if (!isRead){
                    isRead = true
                    mike.play()
                }
            });

            Green.current.addEventListener('click', () => {
                if (!isRead){
                    isRead = true
                    wrong.play()
                }
            });
        }
    }, [history, canInteract]);

    return (
        <div className="container">
            <div ref={Beaver} className="lakehood-beaver"></div>
            <div ref={Mike} className="lakehood-mike"></div>
            <div ref={Green} className="lakehood-green"></div>
            <img className="lakehood__image" src="/assets/lakehood/lakehood.png" alt="" />
        </div>
    )
}

export default Chp1LakeHood;
