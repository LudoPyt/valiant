import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';
import { Howl } from 'howler';

import '../scss/scenes/people.scss';

const Chp3People = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const [isFinish, setIsFinish] = useState(0)

    const chap = 3.
    const scene = 9;
    const instruction = "Cliquer sur les habitants pour les écouter";

    useEffect(() => {
        if (context.state.currentChap !== chap || context.state.currentScene !== scene || context.state.instruction !== instruction) {
            context.dispatch({type: 'setCurrentChap', chap});
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);


    const AllPeople = useRef();
    const Granny = useRef();
    const Daddy = useRef();
    const Child = useRef();
    const Teenager = useRef();
    const Mommy = useRef();

    useEffect(() => {
        let isRead = false;

        let granny = new Howl({
            src:  '/assets/people/granny.mp3',
            onplay: () => {
                Granny.current.classList.add('isActive')
            },
            onend: () => {
                isRead = false
                setIsFinish(isFinish + 1)
            }
        });

        let daddy = new Howl({
            src: '/assets/people/daddy.mp3',
            onplay: () => {
                Daddy.current.classList.add('isActive')
            },
            onend: () => {
                isRead = false
                setIsFinish(isFinish + 1)
            }
        });

        let mommy = new Howl({
            src: '/assets/people/mommy.mp3',
            onplay: () => {
                Mommy.current.classList.add('isActive')
            },
            onend: () => {
                isRead = false
                setIsFinish(isFinish + 1)
            }
        });

        let teenager = new Howl({
            src: '/assets/people/teenager.mp3',
            onplay: () => {
                Teenager.current.classList.add('isActive')
            },
            onend: () => {
                isRead = false
                setIsFinish(isFinish + 1)
            }
        });

        let child = new Howl({
            src: '/assets/people/child.mp3',
            onplay: () => {
                Child.current.classList.add('isActive')
            },
            onend: () => {
                isRead = false
                setIsFinish(isFinish + 1)
            }
        });

        let timeInView = setTimeout(() => {
            AllPeople.current.classList.add('isInView');
        }, 2000)

        Granny.current.addEventListener('click', () => {
            if (!isRead){
                isRead = true
                granny.play()
            }
        } );
        Daddy.current.addEventListener('click', () => {
            if (!isRead){
                isRead = true
                daddy.play()
            }
        } );
        Child.current.addEventListener('click', () => {
            if (!isRead){
                isRead = true
                child.play()
            }
        } );
        Teenager.current.addEventListener('click', () => {
            if (!isRead){
                isRead = true
                teenager.play()
            }
        } );
        Mommy.current.addEventListener('click', () => {
            if (!isRead){
                isRead = true
                mommy.play()
            }
        } );

        return() => {
            clearTimeout(timeInView)
        }
    });

    useEffect(() => {
        if (isFinish === 5) {
            history.push('/end');
        }
    }, [isFinish, history])

    return (
        <>
            <div ref={AllPeople} className="allPeople">
                <img className="backgroundPeople" src="/assets/people/habitant_merge_decor.png" alt=""></img>
                <img ref={Granny} className="people granny" src="/assets/people/habitant_merge_mamie.png" alt=""></img>
                <img ref={Daddy} className="people daddy" src="/assets/people/habitant_merge_homme.png" alt=""></img>
                <img ref={Child} className="people child" src="/assets/people/habitant_merge_enfant.png" alt=""></img>
                <img ref={Teenager} className="people teenager" src="/assets/people/habitant_merge_ados.png" alt=""></img>
                <img ref={Mommy} className="people mommy" src="/assets/people/habitant_merge_dame.png" alt=""></img>
            </div>
        </>
    )
}

export default Chp3People;
