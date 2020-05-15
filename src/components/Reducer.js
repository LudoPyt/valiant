export const initialState = {
    currentChapter : null,
    currentScene: null
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrentChapter':
            return {...state, currentChapter : action.chapter}
        case 'setCurrentScene':
            return {...state, currentScene : action.scene}
        default:
            return state;
    }
}
