import "./style.css";

import React from 'react';
import Dropzone from 'react-dropzone';
import {useSelector, useDispatch} from "react-redux";

import {Cypher} from "../../modules/Cypher";
import cryptoRandomString from 'crypto-random-string';

import {AiFillFile} from 'react-icons/ai';
import {SET_FILE_DATA, SET_KEY} from "../../actions";

const Translate = require('react-redux-i18n').Translate;

const VaultDropzone = () => {
    const dispatch = useDispatch();

    const config = useSelector(state => state.config);
    const currentFile = useSelector(state => state.file);
    //const currentCypher = useSelector(state => state.crypto);

    /*
    async function encryptMessage(message) {
        let randomKey = cryptoRandomString(32)
        const cypher = new Cypher(randomKey);

        dispatch(SET_KEY({
            key: randomKey
        }));

        cypher.encrypt(message).then((result) => {
            dispatch(SET_FILE_DATA({
                encryptedData: result //cypher.encrypt(message)
            }))
        })
    }

    async function readFromFile() {
        let reader = new FileReader();
        reader.onload = (e) => {

            let contents = e.target.result;
            dispatch(SET_FILE_DATA({
                plainData: contents
            }));
            encryptMessage(contents);
        };
        try {
            reader.readAsBinaryString(currentFile.fileRef);

        } catch (e) {
            console.log(e);
        }
    }*/

    const OnDrop = (files) => {
        dispatch(SET_FILE_DATA({
            name: files[0].name,
            size: files[0].size,
            mime: files[0].type,
            fileRef: files[0],
            uploadUrl: currentFile.uploadUrl ?? config.upload.serverUrl
        }));
    }



    return (
        <Dropzone onDrop={OnDrop}>
            {({getRootProps, getInputProps}) => (
                <section className="container margin-none" >
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <div id="dropzone-rectangle">

                            <input type="file" className="input-file"/>
                            <div className="row justify-content-center h-100" id="dropzone-rectangle-inside">
                                {currentFile.name === null &&
                                <div className="col-3 col-sm-4 dropzone-input">
                                    <div className="input-group mb-3 file-selector">
                                        <span className="input-group-text file-selector">
                                            <AiFillFile className="file-icon fa-2x" size={24}/>
                                        </span>
                                        <input className="form-select" placeholder="file"/>
                                    </div>
                                    <h5><Translate value="upload.hint" /></h5>
                                </div>
                                }
                                {currentFile.name &&
                                <div className="col-3 dropzone-input">
                                    <AiFillFile className="file-icon" />
                                    <p>{currentFile.name}</p>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    );
}

export default VaultDropzone;