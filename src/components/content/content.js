import React from 'react';
import './content.css';
import {useSelector, useDispatch} from "react-redux";
import VaultDropzone from "../dropzone/dropzone";
import UploadedFile from "../dropzone/uploadedfile";
import DecryptView from "../decryptview/decryptview";

import axios from "axios";
import cryptoRandomString from "crypto-random-string";
import {Cypher} from "../../modules/Cypher";
import {SET_FILE_DATA, SET_KEY, RESET} from "../../actions";
import {AiFillFile} from "react-icons/ai";

const Translate = require('react-redux-i18n').Translate;

const Content = () => {

    const dispatch = useDispatch();
    //const config = useSelector(state => state.config);
    const currentFile = useSelector(state => state.file);
    console.log(currentFile);

    async function encryptMessage(message) {
        let randomKey = cryptoRandomString(32)
        const cypher = new Cypher(randomKey);

        dispatch(SET_KEY({
            key: randomKey
        }));

        cypher.encrypt(message).then((result) => {
            dispatch(SET_FILE_DATA({
                encryptedData: result
            }))

            let data = {
                fileData: result,
                fileName: currentFile.name,
                fileSize: currentFile.size,
                fileMime: currentFile.mime
            };

            console.log(data);

            let headers = {
                'Content-Type': 'application/json',
            }

            axios.post(currentFile.uploadUrl, data, {headers: headers})
                .then((e) => {
                    dispatch(SET_FILE_DATA({
                        uuid: e.data.uuid,
                        uploaded: true
                    }))

                })
                .catch((e) => {
                    console.error('Error', e);
                    //todo: display error message
                })

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
            if (currentFile.fileRef !== null) {
                reader.readAsBinaryString(currentFile.fileRef);
            }

        } catch (e) {
            console.log(e);
            //todo: display error message
        }
    }

    const OnFileUpload = (e) => {
        readFromFile();
    }

    const OnFileDownload = (e) => {
        dispatch(RESET());
        dispatch(SET_FILE_DATA({
            downloading: true
        }))
    }

    return (
        <div className="container content">
            <div className="row justify-content-center">
                {/* app title */}
                <div className="App-header">
                    <h2><Translate value="application.app_title" /></h2>
                </div>
                {/* app hint */}
                {!currentFile.uploaded && !currentFile.downloading &&
                <section>
                    <div className="App-hint">
                        <h6><Translate value="application.app_hint" /></h6>
                    </div>
                    <VaultDropzone />
                </section>
                }

                {currentFile.uploaded &&
                <section>
                    <div className="uploaded-file-box">
                        <AiFillFile className="file-icon" />
                        <p>{currentFile.name}</p>
                    </div>
                    <UploadedFile />
                </section>
                }

                {!currentFile.uploaded && !currentFile.downloading &&
                <div className="row justify-content-center">
                    <div className="col-10">
                        <button className="selector btn btn-sm btn-info margin-10" onClick={OnFileUpload}>
                            <Translate value="button_encrypt"/>
                        </button>
                        <button className="selector btn btn-sm btn-primary" onClick={OnFileDownload}>
                            <Translate value="button_decrypt"/>
                        </button>
                    </div>
                </div>
                }

                {currentFile.downloading &&
                <DecryptView />
                }
            </div>
        </div>
    );
}

export default Content;