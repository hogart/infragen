'use strict';

const readTemplate = require('./readTemplate');

class ConfigGenerator {
    constructor(settings, data = null) {
        this.setSettings(settings);

        if (data) {
            this.setData(data);
        }
    }

    setSettings(settings) {
        this._settings = settings;
        return this;
    }

    setData(data) {
        this._data = data;
        return this;
    }

    generateConfig(name, callback) {
        callback(new Error('Not implemented yet'), '');
    }
}

module.exports = ConfigGenerator;
