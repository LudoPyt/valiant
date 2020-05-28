export const initialState = {
    currentScene: 0
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrentScene' :
            return {...state, currentScene : action.scene}
        default:
            return state;
    }
}
