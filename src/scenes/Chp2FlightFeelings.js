import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp2FlightFeelings = () => {

    const history = useHistory();

    const context = React.useContext(Context);

    const scene = 5;
    const instruction = "";
    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
        }
    }, [context]);

    useEffect(() => {
        document.getElementById('flight').addEventListener("ended", () => {history.push('/cockpit');});
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
