import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp1LakeHood = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('btn').addEventListener('click', () => {history.push('/simon');});
    }, [history])

    return (
        <>
            <img src="/lakehood/lakehood.png" alt="" />
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp1LakeHood;
