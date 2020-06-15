import React, { useEffect } from 'react';

import '../scss/layout/credits.scss';

const Credits = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "block";
    }, [])

    return (
        <main>
            <div className="credits">
                <h2 className="credits__heading">Crédits</h2>
                <ul className="credits__list">
                    <li className="credits__list-item">
                        <h3 className="credits-list-item__heading">Designers</h3>
                        <p className="credits-list-item__content">Élodie DESHAYES</p>
                        <p className="credits-list-item__content">Karine DIEP</p>
                    </li>
                    <li className="credits__list-item">
                        <h3 className="credits-list-item__heading">Creatives developers</h3>
                        <p className="credits-list-item__content">Morgane SAUNEUF</p>
                        <p className="credits-list-item__content">Ludovic POUYAUT</p>
                    </li>
                    <li className="credits__list-item">
                        <h3 className="credits-list-item__heading">Sound</h3>
                        <p className="credits-list-item__content">Karine DIEP</p>
                        <p className="credits-list-item__content">Élodie DESHAYES</p>
                        <p className="credits-list-item__content">Morgane SAUNEUF</p>
                    </li>
                    <li className="credits__list-item">GOBELINS, l'école de l'image | CCI Paris Île-de-France</li>
                </ul>
            </div>
        </main>
    )
}

export default Credits;
