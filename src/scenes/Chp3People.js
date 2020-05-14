import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp3People = () => {

    const history = useHistory();

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
