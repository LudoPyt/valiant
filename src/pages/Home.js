import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../scss/pages/home.scss';

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
        document.querySelector('.header__logo').style.display = "none";
    }, [])

    return (
        <main>
            <div className="home">
                <img className="home__logo" src="/assets/logo.png" alt=""></img>
                <h1 className="home__heading">Le dernier lien vers l'inconnu</h1>
                <Link to="/story">
                    <button className="button home__button">
                        <span className="button__text">Découvrir</span>
                        <span className="line button__line-right"></span>
                        <span className="line button__line-top"></span>
                        <span className="line button__line-left"></span>
                        <span className="line button__line-bottom"></span>
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default Home;
