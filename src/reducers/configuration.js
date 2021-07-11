import {config} from '../config/config';

const configurationReducer = (state = {config}, action) => {
    switch (action.type) {
        case "SET_CONFIG":
            state = action.payload.config;
            console.log(state);
            return state;

        case "SWITCH_LANG_TO":
            state.app.currentLang = action.payload;
            return state;

        default:
            return state;
    }
};

export default configurationReducer;