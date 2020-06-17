import React from 'react';
import { Link } from 'react-router-dom';

const StoryElement = (props) => (
    <section id={ props.data.id } className="story__element" style={{backgroundColor: props.data.backgroundColor}}>
        <div className="story__element-content">
            <img className="story__element-content-img" src={`/assets/story/${props.data.imgSrc}`} alt={ props.data.imgAlt }/>
            <Link className="story__element-content-link" to={ props.data.link }>
                <div className="storyPlayer__container"><div className="storyPlayer"></div></div>
            </Link>
            <h2 className="story__element-content-title">{ props.data.title }</h2>
        </div>
        <p className="story__element-subtitle">{ props.data.subtitle }</p>
    </section>
)

export default StoryElement;
