import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp1Photo = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/map');});
    }, [history])

    return (
        <>
            <img src="/context/photo.png" alt="" />
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp1Photo;
