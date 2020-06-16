import { Howl } from 'howler';

export const initialState = {
    currentScene: 0,
    instruction: "",
    ambiantSound: "",
};


let sound1 = new Howl({
    src: '/assets/ambiantSound/ambiance_1.mp3',
    volume: 0.7,
});

let sound2 = new Howl({
    src: '/assets/ambiantSound/ambiance_2.mp3',
    volume: 0.7,
});

let sound3 = new Howl({
    src: '/assets/ambiantSound/ambiance_3.mp3',
    volume: 0.7,
});

let sound4 = new Howl({
    src: '/assets/ambiantSound/ambiance_4.mp3',
    volume: 0.7,
});

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrentChap' :
            document.querySelectorAll('.timeline__item p').forEach(item => item.classList.remove('active'))
            document.getElementById(action.chap).classList.add('active')
            break;
        case 'setCurrentScene' :
            return {...state, currentScene : action.scene}
        case 'setInstruction' :
            return {...state, instruction : action.instruction}
        case 'setAmbiantSound':
            switch(action.ambiantSound) {
                case 0 :
                    sound1.stop();
                    sound2.stop();
                    sound3.stop();
                    sound4.stop();
                    break;
                case 1 :
                    sound2.stop();
                    sound3.stop();
                    sound4.stop();
                    sound1.play();
                    break;
                case 2 :
                    sound1.stop();
                    sound3.stop();
                    sound4.stop();
                    sound2.play();
                    break;
                case 3 :
                    sound1.stop();
                    sound2.stop();
                    sound4.stop();
                    sound3.play();
                    break;
                case 4 :
                    sound1.stop();
                    sound2.stop();
                    sound3.stop();
                    sound4.play();
                    break;
                default :
                    sound1.stop();
                    sound2.stop();
                    sound3.stop();
                    sound4.stop();
                    break;
            }
            return {...state, ambiantSound : action.ambiantSound}
        default:
            return state;
    }
}
