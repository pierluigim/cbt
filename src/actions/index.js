export const GET_CONFIG = () => {
        return {
                type: "GET_CONFIG"
        }
};

export const SET_CONFIG = (config) => {
        return {
                type: "SET_CONFIG",
                payload: config
        }
}

export const SET_FILE_DATA = (fileData) => {
        return {
                type: "SET_FILE_DATA",
                payload: fileData
        }
}

export const RESET = () => {
        return {
                type: "RESET"
        }
}

export const SET_KEY = (key) => {
        return {
                type: "SET_KEY",
                payload: key
        }
}

export const GET_KEY = (key) => {
        return {
                type: "GET_KEY",
                payload: key
        }
}

export const SWITCH_LANG_TO = (locale) => {
        return {
                type: "SWITCH_LANG_TO",
                payload: locale
        }
}
