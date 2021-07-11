const uploadReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_FILE":
            return state.file = state;

        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

export default uploadReducer;