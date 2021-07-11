import React from 'react';
import img_logo from "../../images/Logo.png";
import {useSelector, useDispatch} from "react-redux";
import {setLocale} from "react-redux-i18n";
const Translate = require('react-redux-i18n').Translate;

const Navbar = (websiteRef) => {

    const config = useSelector(state => state.config);
    const dispatch = useDispatch();

    console.log(config);

    const OnClick = (e, language) => {
        e.preventDefault();
        dispatch(setLocale(language));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={img_logo} alt="Cubbit.io"/>
                </a>
                <form className="form-inline my-2 my-lg-0">
                    <div className="row language-switcher">
                        <div className="col-6">
                            <button className="btn active" onClick={(e) => OnClick(e, 'encrypted')}><Translate value="encrypted" /></button>
                        </div>
                        <div className="col-6">
                            <button className="btn" onClick={(e) => OnClick(e, 'en')}><Translate value="english" /></button>
                        </div>
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;