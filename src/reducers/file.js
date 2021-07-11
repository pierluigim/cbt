const initialState = {
    name: null,
    size: null,
    mime: null,
    plainData: null,
    encryptedData: null,
    fileRef: null,
    uuid: null,
    uploadUrl: null,
    downloadUrl: null,
    findUrl: null,
    found: null,
    uploaded: null,
    downloading: null
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FILE_DATA":
            return {
                //todo: automatize
                name: action.payload.name ?? state.name,
                size: action.payload.size ?? state.size,
                mime: action.payload.mime ?? state.mime,
                plainData: action.payload.plainData ?? state.plainData,
                encryptedData: action.payload.encryptedData ?? state.encryptedData,
                fileRef: action.payload.fileRef ?? state.fileRef,
                uuid: action.payload.uuid ?? state.uuid,
                uploadUrl: action.payload.uploadUrl ?? state.uploadUrl,
                downloadUrl: action.payload.downloadUrl ?? state.downloadUrl,
                findUrl: action.payload.findUrl ?? state.findUrl,
                uploaded: action.payload.uploaded ?? state.uploaded,
                found: action.payload.found ?? state.found,
                downloading: action.payload.downloading ?? state.downloading
            };

        case "RESET":
            return state = initialState;

        default:
            return state;
    }
};

export default fileReducer;