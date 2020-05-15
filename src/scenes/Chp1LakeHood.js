import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp1LakeHood = () => {

    const history = useHistory();

    const context = React.useContext(Context);
    const chapter = 1;
    const scene = 2;

    useEffect(() => {
        if (context.state.currentChapter !== chapter || context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChapter', chapter});
            context.dispatch({type: 'setCurrentScene', scene});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('beaver').addEventListener('click', () => {history.push('/simon');});
    }, [history])

    return (
        <>
            <div id="beaver" className="lakehood-beaver"></div>
            <img src="/lakehood/lakehood.png" alt="" />
        </>
    )
}

export default Chp1LakeHood;
