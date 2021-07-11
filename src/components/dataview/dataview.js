import React, {Component} from "react";
import './style.css';

const Translate = require('react-redux-i18n').Translate;
const I18n = require('react-redux-i18n').I18n;


const Dataview = (props) => {

    const OnCopy = (e) => {
        let copying = document.createElement("textarea");
        document.body.appendChild(copying);
        copying.value = props.value;
        copying.select();
        document.execCommand("copy");
        document.body.removeChild(copying);
    }

    return (
        <div className="row justify-content-center mb-2">
            <label className="mb-3"><Translate value={props.textLabel} /></label>
            <div className="col-lg-10 mb-3">
                <div className="input-group dataview">
                    <input type="text" className="form-control" value={props.value} readOnly/>
                    <div className="input-group-prepend">
                        <input onClick={OnCopy} value={I18n.t('button_copy')} className="btn btn-primary btn-sm rounded-3" id="inputGroupPrepend2" readOnly />
                    </div>
                </div>
            </div>
        </div>

        )
}

export default Dataview;

/*

            */