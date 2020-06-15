import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import menuImageAnimation from '../components/animationComponents/menuImageAnimation';

import '../scss/layout/header.scss';
import Logo from '../assets/images/logo.png';

const Header = () => {

    const NavBar = useRef();
    const MenuButton = useRef();

    useEffect(() => {

        MenuButton.current.addEventListener('click', () => {
            if (NavBar.current.classList.contains('isActive')){
                NavBar.current.classList.remove('isActive');
                MenuButton.current.classList.remove('isOpen')
            }
            else {
                NavBar.current.classList.add('isActive');
                MenuButton.current.classList.add('isOpen')
            }
        });

        const items = document.querySelectorAll('.navbar__list-item')
        const itemsTab = Object.entries(items)

        for (let i = 0; i < itemsTab.length; i++) {
            itemsTab[i][1].addEventListener('click', () => {
                NavBar.current.classList.remove('isActive');
                MenuButton.current.classList.remove('isOpen');
                MenuButton.current.style.display = "block";
            })
        }

        new menuImageAnimation()
    }, [])

    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={`${Logo}`} alt=""></img>
            </Link>
            <button ref={MenuButton} className="menu__button">
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
            <nav ref={NavBar} className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__list-item"><a href="/about">À propos</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-alaska.png"><a href="/story#alaska">Alaska</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-kerguelen.png"><a href="/story#kerguelen">Kerguelen</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-syrie.png"><a href="/story#syrie">Syrie</a></li>
                    <li className="navbar__list-item" data-image="/menuBurger/illu-norvege.png"><a href="/story#norvege">Norvège</a></li>
                    <li className="navbar__list-item"><a to="/credits">Crédits</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
