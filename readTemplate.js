'use strict';

const readProjectFile = require('./readProjectFile');
const _ = require('underscore');

_.templateSettings.evaluate = /\$\{(.+?)\}/g;

const templates = new Map();

function readTemplate(name, callback) {
    if (templates.has(name)) {
        callback(null, name);
    } else {
        readProjectFile(`templates/${name}.tpl`, (error, template) => {
            if (error) {
                callback(error, null);
            } else {
                let compiled;

                try {
                    compiled = _.template(template);
                } catch (compilationException) {
                    callback(compilationException, null);
                }

                if (compiled) {
                    templates.set(name, compiled);
                    callback(null, compiled);
                }

            }
        });
    }
}

module.exports = readTemplate;