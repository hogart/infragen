'use strict';

const fs = require('fs');
const path = require('path');

function readProjectFile(name, callback) {
    fs.readFile(
        path.join(__dirname, name),
        (readFileError, fileBuffer) => {
            callback(readFileError, fileBuffer.toString());
        }
    );
}

module.exports = readProjectFile;
