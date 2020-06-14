import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../scss/home/home.scss';
import Logo from '../assets/images/logo.png';

import { Context } from '../components/Provider';

const Home = () => {

    const context = React.useContext(Context);

    const ambiantSound = 0;
    useEffect(() => {
        if (context.state.ambiantSound !== ambiantSound) {
            context.dispatch({type: 'setAmbiantSound', ambiantSound});
        }
    }, [context]);

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "none";
    }, [])

    return (
        <main>
            <div className="home">
                <img className="home__logo" src={`${Logo}`} alt=""></img>
                <h1 className="home__heading">Le dernier lien vers l'inconnu</h1>
                <Link to="/story">
                    <button className="home__button">Découvrir</button>
                </Link>
            </div>
        </main>
    )
}

export default Home;
