import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../components/Provider';

const Chp2FlightFeelings = () => {

    const context = React.useContext(Context);
    const history = useHistory();

    const videoFlight = useRef();

    const chap = 2;
    const scene = 5;
    const instruction = "";
    const ambiantSound = 0;

    useEffect(() => {
        if (context.state.currentScene !== scene) {
            context.dispatch({type: 'setCurrentChap', chap});
            context.dispatch({type: 'setCurrentScene', scene});
            context.dispatch({type: 'setInstruction', instruction});
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "block";
    }, [context]);

    useEffect(() => {
        videoFlight.current.addEventListener("ended", () => {history.push('/cockpit');});
    }, [history])

    return (
        <>
            <video ref={videoFlight} id="flight" className="flight" autoPlay width="250">
                <source src="/assets/flightFeelings/flight.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}

export default Chp2FlightFeelings;
