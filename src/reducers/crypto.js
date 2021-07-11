const key = {
    keyPlain: null,
    keyBase64: null
}

const cryptoReducer = (state = key, action) => {
    switch (action.type) {
        case "SET_KEY":
            return {
                keyPlain: action.payload.key,
                keyBase64: btoa(action.payload.key)
            }

        case "GET_KEY":
            try {
                state.keyBase64 = action.payload.key;
                state.keyPlain = atob(action.payload.key);
            } catch (e) {

            }

            return state;

        default:
            return state;
    }
};

export default cryptoReducer;