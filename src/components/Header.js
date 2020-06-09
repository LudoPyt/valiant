import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import menuImageAnimation from '../components/animationComponents/menuImageAnimation';

import '../scss/layout/header.scss';

const Header = () => {

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const menuButton = document.querySelector('.menu__button');

        menuButton.addEventListener('click', () => {
            if (navbar.classList.contains('isActive')){
                navbar.classList.remove('isActive');
                menuButton.classList.remove('isOpen')
            }
            else {
                navbar.classList.add('isActive');
                menuButton.classList.add('isOpen')
            }
        });

        new menuImageAnimation()
    }, [])

    return (
        <header className="header">
            <button className="menu__button">
                <div className="button__line-up"></div>
                <div className="button__line-middle"></div>
                <div className="button__line-down"></div>
            </button>
            <div className="menu__image-container">
                <div className="menu__images current-image">
                    <img className="menu__image" src="" alt=""></img>
                </div>
                <div className="menu__images next-image">
                    <img className="menu__image" src="" alt=""></img>
                </div>
            </div>
            <nav className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__list-item"><Link to="/about">À propos</Link></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-alaska.jpg">Alaska</li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-kerguelen.jpg">Kerguelen</li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-syrie.jpg">Syrie</li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-norvege.jpg">Norvège</li>
                    <li className="navbar__list-item"><Link to="/credits">Crédits</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
