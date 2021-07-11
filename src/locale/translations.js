import {Cubbitcypher} from "../modules/Cubbitcypher";
const cubbitCypherKey = "fullstack";

export const translations = {
    'en' : {
        'application' : {
            "website" : "https://Cubbit.io",
            "app_title": "Cubbit Vault",
            "app_hint": "Advanced online file encryption and decryption. Secure any file type and maintain your privacy!",
            "app_footer": "The whole is never the sum of the parts - it is greater or lesser, depending on how well the individuals work together"
        },
        'upload': {
            'hint': 'or drop files here'
        },
        'download': {
            'hint': 'Insert your file id:',
            'label_fileid': 'File id',
            'label_filename': 'File name',
            'label_filesize': 'File size',
            'label_filemime': 'File mime',
            'label_encKey': 'Insert your encryption key:',
            'button_decrypt': 'Decrypt and download'
        },
        "button_encrypt": "Encrypt and download",
        "button_decrypt": "Download and decrypt",
        "button_copy": "Copy",
        "button_getfile": "Get file!",
        "dataview_fileid": "Your file id:",
        "dataview_b64key": "Your encryption key",
        "encrypted" : "encrypted",
        "english": "english"
    }
}

export function autoCypher(obj) {
    let tmpObj = {};

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            tmpObj[key] = autoCypher(obj[key]);

        } else {
            tmpObj[key] = cypher.encrypt(obj[key]);
        }
    });
    return tmpObj;
}

const cypher = new Cubbitcypher(cubbitCypherKey);
translations.encrypted = autoCypher(translations.en);
console.log(translations);
