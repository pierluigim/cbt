export const config = {
    "app": {
        "locale": {
            "l1": "en",
            "l2": "encrypted"
        },
        "currentLang": "l1",
        "defaultLang": "en"
    },
    "database": {
        "host": "localhost",
        "user": "root",
        "pass": "",
        "db": "cubbit"
    },
    "upload": {
        "serverUrl": "//localhost:8000/upload",
        "maxFileSize": 1048756,
    },
    "download": {
        "serverUrl": "//localhost:8000/download",
    },
    "find": {
        "serverUrl": "//localhost:8000/find",
    },
    "cypher": {
        "keyLength": 32
    }
}