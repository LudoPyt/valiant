import React, { useEffect } from 'react';
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
    }, []);
    
    useEffect(() => {
        let isRead = true;
        let wrong = new Howl({
            src:  '/lakehood/wrong.mp3',
            onend: () => {
                isRead = false
            }
        });

        let mike = new Howl({
            src: '/lakehood/mike.mp3',
            onend: () => {
                isRead = false
            }
        });

        let voice = new Howl({
            src: '/lakehood/voice.mp3',
            autoplay: true,
            onend: () => {
                isRead = false
            }
        });

        document.querySelector('.lakehood-mike').addEventListener('click', () => { 
            if (!isRead){
                isRead = true
                mike.play() 
            }
        } );
        document.querySelector('.lakehood-green').addEventListener('click', () => { 
            if (!isRead){
                isRead = true
                wrong.play()

            }
        } );
    });
    
    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        document.getElementById('beaver').addEventListener('click', () => {history.push('/simon');});
    }, [history])

    return (
        <>
            <div id="beaver" className="lakehood-beaver"></div>
            <div id="beaver" className="lakehood-mike"></div>
            <div id="beaver" className="lakehood-green"></div>
            <img src="/lakehood/lakehood.png" alt="" />
        </>
    )
}

export default Chp1LakeHood;
