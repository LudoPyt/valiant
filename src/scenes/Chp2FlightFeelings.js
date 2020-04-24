import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Chp2FlightFeelings = () => {

    const history = useHistory();

    useEffect(() => {
        document.getElementById('flight').addEventListener("ended", () => {history.push('/story3');});
    }, [history])

    return (
        <>
            <video id="flight" className="flight" autoPlay width="250">
                <source src="/flight/flight.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
            <h2>Flight start, pilote's feelings</h2>
        </>
    )
}

export default Chp2FlightFeelings;
