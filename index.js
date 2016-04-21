'use strict';

const readProjectFile = require('./readProjectFile');
const _ = require('underscore');
_.templateSettings.evaluate = /\$\{(.+?)\}/g;

function generateConfig (type, configData, callback) {
    readProjectFile(
        `${type}.conf`,
        (error, confTemplate) => {
            if (error) {
                callback(error, null);
            } else {
                const conf = _.template(confTemplate, configData);
                callback(null, conf);
            }
        }
    )
}