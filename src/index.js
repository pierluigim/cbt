import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {translations} from "./locale/translations";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// redux
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";

import rootReducer from "./reducers";
import { loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';

const store = createStore(rootReducer, applyMiddleware(thunk));

syncTranslationWithStore(store);

store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('en'));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);