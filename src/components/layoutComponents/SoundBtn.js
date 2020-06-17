import React, { useState } from 'react';
import { Howler } from 'howler';

import '../../scss/layout/btnSound.scss';

const SoundBtn = () => {

    const [isChanged, setIsChanged] = useState(true)

    const muteSound = () => {
        setIsChanged(!isChanged)
        Howler.mute(isChanged)
    }

    return (
        <button onClick={muteSound} className={isChanged ? 'sound-btn' : 'sound-btn muted'}>
            <img src="/assets/ux/icon-sound.png" alt="sound"/>
        </button>
    )
};

export default SoundBtn;
