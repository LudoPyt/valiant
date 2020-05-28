import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp3Bear = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 8;
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/people');});
    }, [history])

    return (
        <>
            <img src="/bear/bear.png" alt="" />
            <div className="fire"></div>
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3Bear;
