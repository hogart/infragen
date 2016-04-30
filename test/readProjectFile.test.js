'use strict';

const test = require('tape');
const readProjectFile = require('../readProjectFile');
const pkg = require('../package.json');

test('readProjectFile', (assert) => {
    assert.equal(typeof readProjectFile, 'function', 'is function');

    assert.test('reads file if it exists', (assert) => {
        assert.plan(3);

        readProjectFile('./package.json', (readError, contents) => {
            assert.notOk(readError, 'package.json reading failed');

            assert.equal(typeof contents, 'string', 'got a string passed to callback');

            let parsedContents;
            try {
                parsedContents = JSON.parse(contents);
            } catch (e) {
                assert.fail('what was read is not a JSON');
            }

            assert.deepEqual(parsedContents, pkg, 'package.json read successful');
        });
    });

    assert.test('passes error if file not exist', (assert) => {
        assert.plan(2);

        readProjectFile('these are not the droids you are looking.for', (readError, contents) => {
            assert.equal(readError.code, 'ENOENT', 'error code is correct');
            assert.equal(contents, null, 'file contents is null');
        });
    });
});