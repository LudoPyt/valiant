import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecoElement from '../components/storiesComponents/RecoElement';
import { data } from "../datas/datasStories";
import { Howl } from 'howler';

import '../scss/pages/end.scss';

const EndStory = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
        document.querySelector('.menu__button').style.display = "block";
        document.querySelector('.header__logo').style.display = "block";

        let plane = new Howl({
            src:  '/assets/endStory/plane.mp3',
        });
        plane.play();
    }, [])

    return (
        <main>
            <div className="end">
                <div className="end__over">
                    <h1 className="end__over-title">Partir pour une nouvelle aventure :</h1>
                    <div className="end__over-container">
                    {
                        data.map(elem => (
                            elem.title !== "Alaska" ? (
                                <RecoElement key={elem.title} data={elem} />
                            ) : null
                        ))
                    }
                    </div>
                    <Link to="/">
                        <button className="end__over-btn">Revenir à l'accueil</button>
                    </Link>
                </div>
                <div className="end__under">
                    <video id="end" className="end__under-video" autoPlay width="250">
                        <source src="/assets/endStory/beaver.mp4" type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </div>
            </div>
        </main>
    )
}

export default EndStory;
