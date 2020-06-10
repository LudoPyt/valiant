import React from 'react';
import { Link } from 'react-router-dom';

const StoryElement = (props) => (
    <section className="story__element" style={{backgroundColor: props.data.backgroundColor}}>
        <div className="story__element-content">
            <img className="story__element-content-img" src={ props.data.imgSrc } alt={ props.data.imgAlt }/>
            <Link className="story__element-content-link" to={ props.data.link }>
                <img className="story__element-content-link-img" src="icon-play.png" alt="button play" />
            </Link>
            <h2 className="story__element-content-title">{ props.data.title }</h2>
            <p className="story__element-duration">{ props.data.duration } min</p>
        </div>
        <p className="story__element-subtitle">{ props.data.subtitle }</p>

    </section>
)

export default StoryElement;
