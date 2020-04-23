import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp3Bear = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/people');});
    }, [history])

    return (
        <>
            <img src="/bear/bear.png" alt="" />
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp3Bear;
