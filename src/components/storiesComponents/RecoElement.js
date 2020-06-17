import React from 'react';
import { Link } from 'react-router-dom';

const RecoElement = (props) => (
        <div className="reco__element">
            <img className="reco__element-img" src={`/assets/story/${props.data.imgSrc}`} alt={ props.data.imgAlt }/>
            <Link className="reco__element-link" to={ props.data.link }>
                <div className="storyPlayer__container endPlayer__container"><div className="storyPlayer endPlayer"></div></div>
            </Link>
            <h2 className="reco__element-title">{ props.data.title }</h2>
        </div>
)

export default RecoElement;
