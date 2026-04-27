import { describe, it } from 'node:test';
import assert from 'node:assert';
import { loadModule, MockWidget } from './helpers/tw-bootstrap.js';
import './helpers/dom-mock.js';

describe('wrapper', () => {
    it('exports MermaidWidget constructor', () => {
        var exports = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js');
        assert.ok(exports.mermaid, 'should export mermaid widget constructor');
    });

    it('instantiates without errors', () => {
        var MermaidWidget = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js').mermaid;
        var widget = new MermaidWidget({ text: 'graph TD; A-->B' }, {});
        assert.ok(widget, 'should create widget instance');
    });

    it('render produces a DOM element for valid diagram', () => {
        var MermaidWidget = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js').mermaid;
        var widget = new MermaidWidget({ text: 'graph TD; A-->B' }, {});
        widget.document = global.document;
        widget.attributes = {};
        widget.wiki = global.$tw.wiki;
        widget.variables = {};

        var parent = global.document.createElement('div');
        widget.render(parent, null);

        assert.strictEqual(widget.domNodes.length, 1, 'should push one DOM node');
        var node = widget.domNodes[0];
        assert.ok(node, 'should have a DOM node');
        assert.strictEqual(node.tagName, 'div', 'should be a div element');
        assert.ok(node.innerHTML.indexOf('<svg') !== -1, 'innerHTML should contain an SVG element');
    });

    it('handles invalid diagram syntax without throwing', () => {
        var MermaidWidget = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js').mermaid;
        var widget = new MermaidWidget({ text: 'INVALID_SYNTAX' }, {});
        widget.document = global.document;
        widget.attributes = {};
        widget.wiki = global.$tw.wiki;
        widget.variables = {};

        var parent = global.document.createElement('div');
        assert.doesNotThrow(function() {
            widget.render(parent, null);
        }, 'render should not throw for invalid syntax');

        assert.strictEqual(widget.domNodes.length, 1, 'should still push one DOM node');
        var node = widget.domNodes[0];
        assert.ok(node, 'should have a DOM node');
        assert.strictEqual(node.tagName, 'div', 'should be a div element');
    });
});
