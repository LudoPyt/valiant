import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import { Howl } from 'howler';

import '../scss/peopleScene/people.scss';

const Chp3People = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 9;
    const instruction = "Cliquer sur les habitants pour les écouter";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        let isRead = false;

        let granny = new Howl({
            src:  '/people/granny.mp3',
            onplay: () => {
                document.querySelector('.granny').classList.add('isActive')
            },
            onend: () => {
                console.log(isRead)
                isRead = false
                console.log(isRead)
            }
        });

        let daddy = new Howl({
            src: '/people/daddy.mp3',
            onplay: () => {
                document.querySelector('.daddy').classList.add('isActive')
            },
            onend: () => {
                isRead = false
            }
        });

        let mommy = new Howl({
            src: '/people/mommy.mp3',
            onplay: () => {
                document.querySelector('.mommy').classList.add('isActive')
            },
            onend: () => {
                isRead = false
            }
        });

        let teenager = new Howl({
            src: '/people/teenager.mp3',
            onplay: () => {
                document.querySelector('.teenager').classList.add('isActive')
            },
            onend: () => {
                isRead = false
            }
        });

        let child = new Howl({
            src: '/people/child.mp3',
            onplay: () => {
                document.querySelector('.child').classList.add('isActive')
            },
            onend: () => {
                isRead = false
            }
        });

        setTimeout(() => {
            document.querySelector('.allPeople').classList.add('isInView');
        }, 3000)
            document.querySelector('.granny').addEventListener('click', () => { 
                if (!isRead){
                    isRead = true
                    granny.play() 
                }
            } );
            document.querySelector('.daddy').addEventListener('click', () => { 
                if (!isRead){
                    isRead = true
                    daddy.play()

                }
            } );
            document.querySelector('.child').addEventListener('click', () => {
                if (!isRead){
                    isRead = true
                    child.play()
                }
            } );
            document.querySelector('.teenager').addEventListener('click', () => {
                if (!isRead){
                    isRead = true
                    teenager.play()
                }
            } );
            document.querySelector('.mommy').addEventListener('click', () => {
                if (!isRead){
                    isRead = true
                    mommy.play()
                }
            } );
    });

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

        document.getElementById('btn').addEventListener('click', () => {history.push('/');});
    }, [history])

    return (
        <>
            <div className="allPeople">
                <img className="backgroundPeople" src="/people/habitant_merge_decor.png" alt=""></img>
                <img className="people granny" src="/people/habitant_merge_mamie.png" alt=""></img>
                <img className="people daddy" src="/people/habitant_merge_homme.png" alt=""></img>
                <img className="people child" src="/people/habitant_merge_enfant.png" alt=""></img>
                <img className="people teenager" src="/people/habitant_merge_ados.png" alt=""></img>
                <img className="people mommy" src="/people/habitant_merge_dame.png" alt=""></img>
            </div>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3People;
