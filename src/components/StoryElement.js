import React from 'react';
import { Link } from 'react-router-dom';

const StoryElement = (props) => (
    <section className="story__element" style={{backgroundColor: props.data.backgroundColor}}>
        <h2>{ props.data.title }</h2>
        <p>{ props.data.subtitle }</p>
        <p>{ props.data.duration } min</p>
        <img src={ props.data.imgSrc } alt={ props.data.imgAlt }/>
        <Link to={ props.data.link }>Alaska</Link>
    </section>
)

export default StoryElement;
