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
            return {
                keyPlain: atob(action.payload.key),
                keyBase64: action.payload.key
            }

        default:
            return state;
    }
};

export default cryptoReducer;