import React from 'react';
import { Context } from '../Provider';

import '../../scss/layout/timeline.scss';

const Timeline = () => (
    <Context.Consumer>
        {({ state }) => (
            <footer>
                <h2 id="instruction" className="instruction">{ state.instruction }</h2>
                <div className="timeline">
                    <span className="fill" style={{width: state.currentScene * 11 + '%'}} />
                    <div className="container">
                        <div className="item">
                            <p id="1">chapitre 1</p>
                        </div>
                        <div className="item">
                            <p id="2">chapitre 2</p>
                        </div>
                        <div className="item">
                            <p id="3">chapitre 3</p>
                        </div>
                        <div className="item">
                            <p>fin</p>
                        </div>
                    </div>
                </div>
            </footer>
        )}
    </Context.Consumer>
);

export default Timeline;
