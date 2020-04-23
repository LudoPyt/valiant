import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp1Map = () => {

    const history = useHistory();

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
