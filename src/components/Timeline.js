import React from 'react';
import { Context } from './Provider';

const Timeline = () => (
    <Context.Consumer>
        {({state}) => (
            <div className="timeline">TIMELINE, chap {state.currentChapter}, scene {state.currentScene}</div>
        )}
    </Context.Consumer>
);

export default Timeline
