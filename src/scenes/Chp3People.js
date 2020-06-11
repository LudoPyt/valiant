import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

import '../scss/peopleScene/people.scss';

const Chp3People = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 9;
    const instruction = "Survoler les habitants pour les écouter";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        let persons = document.querySelectorAll('.people');
        for ( let i = 0; i < persons.length; i++){
            persons[i].addEventListener('click', () => {
                persons[i].classList.add('isActive')
            })
        }

        setTimeout(() => {
            document.querySelector('.allPeople').classList.add('isInView');
        }, 3000)

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
