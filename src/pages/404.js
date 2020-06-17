import React, { useEffect } from 'react';

const NoMatch = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "none";
        document.querySelector('.header__logo').style.display = "none";
    }, [])

    return (
        <main>
            <div className="error">
                <img className="error__logo" src="/assets/logo.png" alt="logo"/>
                <p className="error__text">
                Cette page n'existe pas.
                </p>
            </div>
        </main>
    )
}

export default NoMatch;
