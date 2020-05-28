import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp3People = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 9;
    const instruction = "Écouter ce que chaque habitant veut nous dire.";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/');});
    }, [history])

    return (
        <>
            <h3>Tenakee Springs's people testimonies</h3>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3People;
