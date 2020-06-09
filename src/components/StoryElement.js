import React from 'react';
import { Link } from 'react-router-dom';

const StoryElement = (props) => (
    <section className="story__element" style={{backgroundColor: props.imgSrc}}>
        <h2>{ props.title }</h2>
        <p>{ props.subtitle }</p>
        <p>{ props.duration } min</p>
        <Link to={ props.link }>Alaska</Link>
    </section>
)

export default StoryElement;
