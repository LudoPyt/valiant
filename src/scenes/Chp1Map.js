import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp1Map = () => {

    const history = useHistory();

    const context = React.useContext(Context);
    const chapter = 1;
    const scene = 1;

    useEffect(() => {
        if (context.state.currentChapter !== chapter || context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChapter', chapter});
            context.dispatch({type: 'setCurrentScene', scene});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/lakehood');});
    }, [history])

    return (
        <>
            <img src="/context/map.png" alt="" />
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp1Map;
