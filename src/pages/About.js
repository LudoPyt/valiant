import React, { useEffect } from 'react';

import '../scss/layout/about.scss';

const About = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "block";
        document.querySelector('.header__logo').style.display = "block";
    }, [])

    return (
        <main>
            <div className="about">
                <h2 className="about__heading">À propos</h2>
                <p className="about__content">Avez-vous déjà observé des baleines depuis un hydravion ou fait face à un ours pour décharger une cargaison ?</p>
                <p className="about__content">Si vous êtes à la recherche du frisson de l’ailleurs, Valiant est fait pour vous. Nous y avons rassemblé les récits des ravitaillements vers les zones les plus reculées de notre planète. </p>
                <p className="about__content">Valiant est une expérience immersive qui vous plonge dans ces récits interactifs. Vous allez incarner des personnages phares, qui permettent à ces lieux isolés de garder le lien avec le reste du monde.</p>
            </div>
        </main>
    )
}

export default About;
