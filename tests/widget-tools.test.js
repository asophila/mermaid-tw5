import { describe, it } from 'node:test';
import assert from 'node:assert';
import { loadModule, MockWidget } from './helpers/tw-bootstrap.js';
import './helpers/dom-mock.js';

describe('widget-tools', () => {
    it('exports Rocklib constructor', () => {
        var exports = loadModule('$:/plugins/orange/mermaid-tw5/widget-tools.js');
        assert.ok(exports.rocklib, 'should export rocklib constructor');
    });

    it('creates Rocklib instance with expected methods', () => {
        var Rocklib = loadModule('$:/plugins/orange/mermaid-tw5/widget-tools.js').rocklib;
        var rl = new Rocklib();
        assert.ok(rl, 'should create instance');
        assert.strictEqual(typeof rl.getScriptBody, 'function', 'should have getScriptBody method');
        assert.strictEqual(typeof rl.getOptions, 'function', 'should have getOptions method');
        assert.strictEqual(typeof rl.getCanvas, 'function', 'should have getCanvas method');
    });

    it('getCanvas creates a div element with correct id pattern', () => {
        var Rocklib = loadModule('$:/plugins/orange/mermaid-tw5/widget-tools.js').rocklib;
        var rl = new Rocklib();
        var widget = new MockWidget();
        widget.document = global.document;
        var canvas = rl.getCanvas(widget, 'mermaid', 'div');
        assert.ok(canvas, 'should return an element');
        assert.strictEqual(canvas.tagName, 'div', 'should be a div element');
        assert.ok(canvas.attributes.id, 'should have an id attribute');
        assert.ok(canvas.attributes.id.startsWith('mermaid_'), 'id should start with "mermaid_"');
    });

    it('getScriptBody extracts text from parseTreeNode', () => {
        var Rocklib = loadModule('$:/plugins/orange/mermaid-tw5/widget-tools.js').rocklib;
        var rl = new Rocklib();
        var widget = new MockWidget();
        widget.parseTreeNode = { text: 'graph TD; A-->B' };
        var body = rl.getScriptBody(widget, 'text');
        assert.strictEqual(body, 'graph TD; A-->B', 'should extract text from parseTreeNode');
    });
});
