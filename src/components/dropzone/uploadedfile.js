import "./style.css";

import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Dataview from "../dataview/dataview";

const Translate = require('react-redux-i18n').Translate;
const I18n = require('react-redux-i18n').I18n;

const UploadedFile = () => {
    const dispatch = useDispatch();

    const config = useSelector(state => state.config);
    const currentFile = useSelector(state => state.file);
    const cypher = useSelector(state => state.crypto);

    return (
        <section>
            <div className="row justify-content-center">
                <Dataview value={currentFile.uuid} textLabel="dataview_fileid"/>
                <Dataview value={cypher.keyBase64} textLabel="dataview_b64key"/>
            </div>
        </section>
    )
}

export default UploadedFile;