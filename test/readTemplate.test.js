'use strict';

const test = require('tape');
const readTemplate = require('../readTemplate');
const fs = require('fs');
const path = require('path');

test('readTemplate', (assert) => {
    assert.equal(typeof readTemplate, 'function', 'is function');

    assert.test('reads template by name', (assert) => {
        assert.plan(2);

        readTemplate('nginx', (readError, compiledTemplate) => {
            assert.notOk(readError, 'unexpected read error');
            assert.equal(typeof compiledTemplate, 'function', 'compiled template is function');
        });
    });

    assert.test('passes error if template does not exist', (assert) => {
        assert.plan(2);

        readTemplate('no such template will ever exist', (readError, compiledTemplate) => {
            assert.equal(readError.code, 'ENOENT', 'expected error code');
            assert.notOk(compiledTemplate, 'compiled template is falsy');
        });
    });

    assert.test('passes error if template contains syntax errors', (assert) => {
        assert.plan(2);

        const brokenTemplateName = '__broken_file';
        const brokenTemplatePath = path.join(__dirname, `../templates/${brokenTemplateName}.tpl`);
        const brokenTemplateContent = 'foo bar ${ bar foo }';

        fs.writeFile(
            brokenTemplatePath,
            brokenTemplateContent,
            {},
            (writeError) => {
                if (writeError) {
                    assert.fail(`fixture write error: ${writeError}`);
                    assert.end();
                }

                readTemplate(brokenTemplateName, (compileError, contents) => {
                    assert.ok(compileError, 'error is passed');
                    assert.notOk(contents, 'compiled template is falsy');

                    fs.unlink(brokenTemplatePath, (unlinkError) => {
                        if (unlinkError) {
                            assert.fail(`fixture cleanup error: ${unlinkError}`);
                        }

                        assert.end();
                    });
                });
            }
        );
    });
});