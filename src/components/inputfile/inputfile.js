import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Cypher} from '../../modules/Cypher';
import cryptoRandomString from 'crypto-random-string';
import axios from "axios";
import './dropzone.css';
//import {useDropzone} from "react-dropzone";
import Dataview from "../dataview/dataview";

const Inputfile = () => {
    const prova = useSelector(state => state.config);
    console.log(prova);
    return;

    //const base64key = useDispatch(state.crypto, )
    /*
    constructor(props) {
        super(props);

        this.maxFileSize = 1048756;
        this.serverUrl = '//localhost:8000/upload';
        this.currentKey = cryptoRandomString(32);
        this.base64currentKey = btoa(this.currentKey);
        this.cypher = new Cypher(this.currentKey);
        //this.file_plainData = null;
        this.file_encryptedData = null;
        this.file_decryptedData = null;
        this.file_name = null;
        this.file_mime = null;
        this.file_size = null;
        this.file_uuid = null;
        this.state = {
            /*
            0 : no file selected
            1 : file selected
            2 : uploading
            3 : upload success
            9 : upload error
             */
    /*
            tool: 0
        }
    }
    */

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    async function processFile(file) {
        try {
            let arrayBuffer = await readFileAsync(file);
            let data = arrayBufferToString(arrayBuffer.slice(0,arrayBuffer.length));

            await (async () => {
                this.file_encryptedData = await this.cypher.encrypt(data)
            })()

        } catch (err) {
            //todo: handle error
            console.log(err);
        }
    }

    const arrayBufferToString = (arrayBuffer, decoderType = 'utf-8') => {
        let decoder = new TextDecoder(decoderType);
        return decoder.decode(arrayBuffer);
    }

    const onChange = (e) => {
        if (e.target.files[0]) {

            if (e.target.files[0].size <= this.maxFileSize) {
                // a file was selected
                this.setState({tool: 1});
                this.processFile(e.target.files[0]);
                this.file_name = e.target.files[0].name;
                this.file_mime = e.target.files[0].type;
                this.file_size = e.target.files[0].size;

            } else {
                alert('File too big.');
                // todo: reset input value
            }

        } else {
            this.setState({tool: 0});
        }
    }

    const onFileUpload = (e) => {
        e.preventDefault();

        if (this.state.tool !== 1) {
            // todo: handle error
            return;
        }

        this.setState({tool: 2});

        // try upload
        axios.post(this.serverUrl, {
            fileData: this.file_encryptedData,
            fileName: this.file_name,
            fileSize: this.file_size,
            fileMime: this.file_mime
        })
            .then((e) => {
                this.file_uuid = e.data.uuid;
                this.setState({tool: 3});

            })
            .catch((e) => {
                console.error('Error', e);
                this.setState({tool: 9});
            })
    };

    const showFileData = () => {
        return (
            <div className="row justify-content-center">
                <Dataview value={this.file_uuid} />
                <Dataview value={this.base64currentKey} />
            </div>
        )
    }

    const displayDropZone = () => {
        return (
            <form>
                <input type="file" onChange={this.onChange}/>
                <button onClick={this.onFileUpload}>log</button>
            </form>
        )
    }

    return (
        <div>
            {this.state.tool < 2 && this.displayDropZone()}
            {this.state.tool == 3 && this.showFileData()}
        </div>
    )
}

export default Inputfile;