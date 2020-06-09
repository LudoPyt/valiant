import React, { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
    }, [])

    return (
        <main>
            <div className="about">
                PAGE A PROPOS
            </div>
        </main>
    )
}

export default About;
