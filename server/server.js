const databaseName = 'cubbit';
const database = {
    host: "localhost",
    user: "root",
    password: "",
}

const port = 8000;

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const stream = require("stream");

const storage = multer.memoryStorage()
const upload = multer({ storage });

const mysql = require("mysql");
let con = mysql.createConnection(database);

const { v4: uuidv4 } = require('uuid');

app.use(express.static("./public"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



function saveFile(buffer, filePath) {
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
    }
    fs.writeFileSync(filePath, buffer);
}

function getFile(filePath) {
    return fs.readFileSync(filePath);
}

// upload
app.post("/upload", upload.single("file"),  (req, res) => {
    console.log("Trying to upload file: ", req.body.name);
    let file_uuid = uuidv4();

    con.query(
        "INSERT INTO Files (uuid, name, size, mime) VALUES ('" + file_uuid + "', '" + req.body.fileName + "', '" + req.body.fileSize + "', '" + req.body.fileMime + "' )",
        function (err) {
            if (err)
                throw err;

            console.log("File uploaded successfully!");
        });

    saveFile(req.body.fileData, path.join("./uploads", req.body.fileName));
    res.status(201).json( { uuid: file_uuid});
});

// find
app.post("/find", (req, res) => {
    console.log("Searching for uuid:", req.body.fileUuid);

    if (req.body.fileUuid != null) {
        con.query("SELECT * FROM Files WHERE uuid = '" + req.body.fileUuid + "' LIMIT 1;",
            function (err, result) {
                if (err) throw err;

                // found uuid
                if (result[0]) {
                    console.log("Found: " + result[0].name);
                    res.status(201).json( {
                        fileName: result[0].name,
                        fileSize: result[0].size,
                        fileMime: result[0].mime,
                        fileUuid: result[0].uuid
                    });
                }
            });
    }
});

// download
app.post("/download", (req, res) => {
    console.log("Downloading file corresponding to uuid:", req.body.fileUuid);

    if (req.body.fileUuid != null) {
        con.query("SELECT * FROM Files WHERE uuid = '" + req.body.fileUuid + "' LIMIT 1;",
            function (err, result) {
                if (err) throw err;

                // found uuid
                if (result[0]) {
                    const buffer = getFile(path.join("./uploads", result[0].name));
                    const readStream = new stream.PassThrough();
                    readStream.end(buffer);

                    res.status(201).json( {
                        encryptedFileData: buffer.toString(),
                    });
                }
            });
    }
});

// main
app.listen(port, () => {

    // init database
    con.query('CREATE DATABASE IF NOT EXISTS ' + databaseName, function (err) {
        if (err)
            throw err;

        console.log("Database ready");
    });

    con.query('USE ' + databaseName);

    con.query("CREATE TABLE IF NOT EXISTS `files` (" +
        'uuid VARCHAR(256) NOT NULL, ' +
        'name VARCHAR(256) NOT NULL, ' +
        'size INT(11) NOT NULL, ' +
        'mime VARCHAR(128) NOT NULL ' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
        function (err) {
            if (err)
                throw err;

            console.log("Table ready");
    });

    console.log('cbt server running on port 8000');
});