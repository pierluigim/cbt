import React from 'react';
import './style.css';

const Translate = require('react-redux-i18n').Translate;

const Footer = () => {
    return (
        <div className="fixed-bottom">
            <p><Translate value="application.app_footer" /></p>
        </div>
    );
}

export default Footer;