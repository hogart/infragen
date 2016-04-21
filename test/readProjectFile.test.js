'use strict';

const tape = require('tape');
const readProjectFile = require('../readProjectFile');

tape('readProjectFile', (t) => {
    t.plan(1);

    t.equal(typeof readProjectFile, 'function', 'is function alright');
});
