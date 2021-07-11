import './App.css';

import React from 'react';
import {useDispatch} from "react-redux";
import {SET_CONFIG} from "./actions";
import {config} from "./config/config";

import Navbar from "./components/navbar/navbar";
import Content from "./components/content/content";
import Footer from "./components/footer/footer";


// main class App
const App = () => {

    const dispatch = useDispatch();

    dispatch(SET_CONFIG({
        config: config
    }))

    return (
        <div className="App fill">
            <Navbar />
            <Content />
            <Footer />
        </div>
    );
}

export default App;

