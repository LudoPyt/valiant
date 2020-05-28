import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp1Context = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 1;
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('context').addEventListener("ended", () => {history.push('/lakehood');});
    }, [history])

    return (
        <>
            <video id="context" className="context" autoPlay width="250">
                <source src="/context/context.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}

export default Chp1Context;
