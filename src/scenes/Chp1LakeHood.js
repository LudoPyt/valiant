import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp1LakeHood = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('beaver').addEventListener('click', () => {history.push('/simon');});
    }, [history])

    return (
        <>
            <img src="/lakehood/background.png" alt="" />
            <img class="lakehood-plants" src="/lakehood/plants.png" alt="" />
            <img id="beaver" class="lakehood-beaver" src="/lakehood/yellow-beaver.png" alt="" />
            <img class="lakehood-beaver-x2" src="/lakehood/beaver-x2.png" alt="" />
            <button id="btn" className="skip">Skip ></button>
        </>
    )
}

export default Chp1LakeHood;
