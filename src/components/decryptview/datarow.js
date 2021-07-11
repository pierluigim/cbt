import React, {Component} from 'react';
import './style.css';

const Translate = require('react-redux-i18n').Translate;

const DataRow = (props) => {

    return (
        <div className="row mb-2">
            <div className="col-3 text-end my-auto">
                <h6 className="text-small"><Translate value={props.label} /></h6>
            </div>
            <div className="col-9">
                <input type="text" className="form-control input-dark" value={props.value} readOnly/>
            </div>
        </div>
    )
}

export default DataRow;