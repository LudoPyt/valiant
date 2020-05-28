export const initialState = {
    currentScene: 0,
    instruction: ""
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrentScene' :
            return {...state, currentScene : action.scene}
        case 'setInstruction' :
            return {...state, instruction : action.instruction}
        default:
            return state;
    }
}
