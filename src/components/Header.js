import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import menuImageAnimation from '../components/animationComponents/menuImageAnimation';

import '../scss/layout/header.scss';
import Logo from '../assets/images/logo.png';

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

        const items = document.querySelectorAll('.navbar__list-item')
        const itemsTab = Object.entries(items)

        for (let i = 0; i < itemsTab.length; i++) {
            itemsTab[i][1].addEventListener('click', () => {
                document.querySelector('.navbar').classList.remove('isActive');
                document.querySelector('.menu__button').classList.remove('isOpen');
                document.querySelector('.menu__button').style.display = "block";
            })
        }

        new menuImageAnimation()
    }, [])

    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={`${Logo}`} alt=""></img>
            </Link>
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
                    <li className="navbar__list-item" data-image="/menuBurger/illu-alaska.png"><a href="/story#alaska">Alaska</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-kerguelen.png"><a href="/story#kerguelen">Kerguelen</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-syrie.png"><a href="/story#syrie">Syrie</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-norvege.png"><a href="/story#norvege">Norvège</a></li>
                    <li className="navbar__list-item"><Link to="/credits">Crédits</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
