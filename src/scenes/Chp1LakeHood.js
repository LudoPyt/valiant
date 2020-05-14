import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp1LakeHood = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('beaver').addEventListener('click', () => {history.push('/simon');});
    }, [history])

    return (
        <>
            <div id="beaver" class="lakehood-beaver"></div>
            <img src="/lakehood/lakehood.png" alt="" />
        </>
    )
}

export default Chp1LakeHood;
