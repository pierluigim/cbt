import React, {Component} from 'react';
import './style.css';
import axios from "axios";
import {Cypher} from '../../modules/Cypher';
import cryptoRandomString from 'crypto-random-string';
import {useDispatch, useSelector} from "react-redux";
import DataRow from "./datarow";
import {GET_KEY, RESET, SET_FILE_DATA, SET_KEY} from "../../actions";
import crypto from "../../reducers/crypto";

const Translate = require('react-redux-i18n').Translate;
const I18n = require('react-redux-i18n').I18n;

const DecryptView = () => {

    const dispatch = useDispatch();
    const config = useSelector(state => state.config);
    const currentFile = useSelector(state => state.file);
    const cypher = useSelector(state => state.crypto);

    console.log(cypher);

    currentFile.findUrl = currentFile.findUrl ?? config.find.serverUrl;
    currentFile.downloadUrl = currentFile.downloadUrl ?? config.download.serverUrl;

    const OnSearch = (e) => {
        e.preventDefault();

        if (currentFile.uuid !== null) {

            // try upload
            axios.post(currentFile.findUrl, {
                fileUuid: currentFile.uuid,
            })
                .then((e) => {
                    if (e.data) {
                        dispatch(SET_FILE_DATA({
                            uuid : e.data.fileUuid,
                            name : e.data.fileName,
                            size : e.data.fileSize,
                            mime : e.data.fileMime,
                            found : true
                        }))

                    } else {
                        //todo: display not found message
                        console.log('File not found');
                    }
                })
                .catch((e) => {
                    //todo: display error message
                    console.error('Error', e);

                })
        }
    }

    async function decryptAndDownload() {
        let cypherTool = new Cypher(cypher.keyPlain);
        try {
            return currentFile.plainData = await cypherTool.decrypt(currentFile.encryptedData);

        } catch (err) {
            //todo: display error message
            console.log(err);
        }

    }

    async function OnDownload(e) {
        e.preventDefault();

        axios.post(currentFile.downloadUrl, {
            fileUuid: currentFile.uuid,
        })
            .then((e) => {

                if (e.data) {
                    try {
                        let plainKey = atob(cypher.keyBase64);
                        dispatch(SET_KEY({
                            key: plainKey
                        }));

                    } catch (e) {
                        //todo: display error message
                        console.log('invalid base64 key');
                    }

                    currentFile.encryptedData = e.data.encryptedFileData;

                    decryptAndDownload().then((value) => {
                        if (value) {
                            let data = new Blob([value], {type: currentFile.mime});
                            let csvURL = window.URL.createObjectURL(data);
                            let tempLink = document.createElement('a');
                            tempLink.href = csvURL;
                            tempLink.setAttribute('download', currentFile.name);
                            tempLink.click();
                        }
                    });

                    dispatch(RESET);
                }
            })
            .catch((e) => {
                // todo: display error message
                console.error('Error', e);

            })
    }

    return (
        <section>
            {!currentFile.found &&
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label className="mb-3" id="file-id-label"><Translate value="download.hint" /></label>
                        <input type="text" className="form-control input-dark" onChange={(e) => dispatch(SET_FILE_DATA({uuid: e.target.value}))}/>
                    </div>
                    <div className="form-group">
                        <button className="btn color-orange standard-button" type="submit" onClick={OnSearch}>
                            <Translate value="button_getfile" />
                        </button>
                    </div>

                </div>
            </div>
            }
            {currentFile.found &&
            <div>
                <div>
                    <DataRow label="download.label_fileid" value={currentFile.uuid} />
                    <DataRow label="download.label_filename" value={currentFile.name} />
                    <DataRow label="download.label_filesize" value={currentFile.size} />
                    <DataRow label="download.label_filemime" value={currentFile.mime} />

                    <div className="row">
                        <form>
                            <div className="form-group mb-4">
                                <label className="mb-3 text-small"><Translate value="download.label_encKey" /></label>
                                <input type="text" className="form-control input-dark" onChange={(e) => dispatch(GET_KEY({key: e.target.value}))}/>
                            </div>
                            <div className="form-group form-inline mb-4">
                                <button className="btn color-orange standard-button" type="submit" onClick={OnDownload}>
                                    <Translate value="download.button_decrypt" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </section>

    );
}

export default DecryptView;


/*
constructor(props) {
    super(props);


    this.currentFileUuid = null;
    this.currentFileName = null;
    this.currentFileSize = null;
    this.currentFileMime = null;
    this.currentEncryptedFileData = null;
    this.currentDecryptedFileData = null;
    this.decryptionKey = null;

    this.state = {
        tool: 0,
        fileToFind: null
    }
}
*/
/*

async function processFile(file) {
    try {
        await (async () => {
            this.currentDecryptedFileData = await this.cypher.decrypt(this.currentEncryptedFileData);
            console.log(this.currentDecryptedFileData);
        })()

    } catch (err) {
        console.log(err);
    }
}

onInputChange = (e) => {
    this.setState({fileToFind: e.target.value});
}

searchForFileUUID = (e) => {
    e.preventDefault();

    if (this.state.fileToFind != null) {
// try upload
        axios.post(this.serverUrlFind, {
            fileUuid: this.state.fileToFind,
        })
            .then((e) => {

                if (e.data) {
                    this.currentFileUuid = e.data.fileUuid;
                    this.currentFileName = e.data.fileName;
                    this.currentFileSize = e.data.fileSize;
                    this.currentFileMime = e.data.fileMime;
                    this.setState({tool: 1});
                }
            })
            .catch((e) => {
                console.error('Error', e);

            })
    }
}

async decryptAndDownload() {
    let cypher = new Cypher(atob(this.decryptionKey));
    try {
        return this.currentDecryptedFileData = await cypher.decrypt(this.currentEncryptedFileData);

    } catch (err) {
        console.log(err);
    }

}

getFile = (e) => {
    e.preventDefault();

    axios.post(this.serverUrlGet, {
        fileUuid: this.state.fileToFind,
    })
        .then((e) => {

            if (e.data) {
                this.currentEncryptedFileData = e.data.encryptedFileData;
                this.decryptAndDownload().then((value) => {
                    let data = new Blob([value], {type: this.currentFileMime});
                    let csvURL = window.URL.createObjectURL(data);
                    let tempLink = document.createElement('a');
                    tempLink.href = csvURL;
                    tempLink.setAttribute('download', this.currentFileName);
                    tempLink.click();

                });

                this.setState({tool: 3});
            }
        })
        .catch((e) => {
            console.error('Error', e);

        })
}

updateKey = (e) => {
    this.decryptionKey = e.target.value;
}
*/