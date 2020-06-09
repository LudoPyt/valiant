import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../scss/home/home.scss';
import Logo from '../assets/images/logo.png'


const Home = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "block";
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
