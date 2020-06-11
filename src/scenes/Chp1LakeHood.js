import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

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
    }, [context]);

    useEffect(() => {
        document.querySelector('.menu__button').style.display = "none";

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
