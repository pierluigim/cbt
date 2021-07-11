import {combineReducers} from "redux";
import {i18nReducer} from "react-redux-i18n";
import configurationReducer from "./configuration";
import fileReducer from "./file";
import uploadReducer from "./upload";
import cryptoReducer from "./crypto";

const rootReducer = combineReducers({
    i18n: i18nReducer,
    config: configurationReducer,
    file: fileReducer,
    upload: uploadReducer,
    crypto: cryptoReducer
});

export default rootReducer;