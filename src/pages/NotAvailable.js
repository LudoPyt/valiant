import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../scss/pages/not-available.scss';

import { Context } from '../components/Provider';

const NotAvailable = () => {

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
        document.querySelector('.menu__button').style.display = "block";
        document.querySelector('.header__logo').style.display = "none";
    }, [])

    return (
        <main>
            <div className="not-available">
                <p className="not-available__heading">Cette histoire n'est pas disponible pour le moment.</p>
                <Link to="/">
                    <button className="not-available__button">Revenir à la page d'accueil</button>
                </Link>
            </div>
        </main>
    )
}

export default NotAvailable;
