import { describe, it } from 'node:test';
import assert from 'node:assert';
import { loadModule, MockWidget, getRequireCalls, clearRequireCalls, clearModuleCache } from './helpers/tw-bootstrap.js';
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
        global.$tw.browser = true;

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
        global.$tw.browser = true;

        var parent = global.document.createElement('div');
        assert.doesNotThrow(function() {
            widget.render(parent, null);
        }, 'render should not throw for invalid syntax');

        assert.strictEqual(widget.domNodes.length, 1, 'should still push one DOM node');
        var node = widget.domNodes[0];
        assert.ok(node, 'should have a DOM node');
        assert.strictEqual(node.tagName, 'div', 'should be a div element');
    });

    describe('lazy loading', () => {
        it('does not load mermaid or d3 during module evaluation', () => {
            clearRequireCalls();
            clearModuleCache('$:/plugins/orange/mermaid-tw5/wrapper.js');

            loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js');

            var calls = getRequireCalls();
            assert.strictEqual(calls.indexOf('$:/plugins/orange/mermaid-tw5/mermaid.min.js'), -1, 'should not require mermaid during module load');
            assert.strictEqual(calls.indexOf('$:/plugins/orange/mermaid-tw5/d3.v6.min.js'), -1, 'should not require d3 during module load');
        });

        it('loads mermaid and d3 on first render', () => {
            clearRequireCalls();
            clearModuleCache('$:/plugins/orange/mermaid-tw5/wrapper.js');

            var exports = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js');
            var MermaidWidget = exports.mermaid;
            var widget = new MermaidWidget({ text: 'graph TD; A-->B' }, {});
            widget.document = global.document;
            widget.attributes = {};
            widget.wiki = global.$tw.wiki;
            widget.variables = {};
            global.$tw.browser = true;

            var parent = global.document.createElement('div');
            widget.render(parent, null);

            var calls = getRequireCalls();
            assert.ok(calls.indexOf('$:/plugins/orange/mermaid-tw5/mermaid.min.js') !== -1, 'should require mermaid on first render');
            assert.ok(calls.indexOf('$:/plugins/orange/mermaid-tw5/d3.v6.min.js') !== -1, 'should require d3 on first render');
        });

        it('does not reload mermaid or d3 on second render', () => {
            clearRequireCalls();
            clearModuleCache('$:/plugins/orange/mermaid-tw5/wrapper.js');

            var MermaidWidget = loadModule('$:/plugins/orange/mermaid-tw5/wrapper.js').mermaid;
            var widget = new MermaidWidget({ text: 'graph TD; A-->B' }, {});
            widget.document = global.document;
            widget.attributes = {};
            widget.wiki = global.$tw.wiki;
            widget.variables = {};

            var parent = global.document.createElement('div');
            widget.render(parent, null); // First render — loads libraries

            clearRequireCalls();

            var widget2 = new MermaidWidget({ text: 'graph TD; C-->D' }, {});
            widget2.document = global.document;
            widget2.attributes = {};
            widget2.wiki = global.$tw.wiki;
            widget2.variables = {};
            global.$tw.browser = true;

            var parent2 = global.document.createElement('div');
            widget2.render(parent2, null); // Second render — should not reload

            var calls = getRequireCalls();
            assert.strictEqual(calls.indexOf('$:/plugins/orange/mermaid-tw5/mermaid.min.js'), -1, 'should not require mermaid on second render');
            assert.strictEqual(calls.indexOf('$:/plugins/orange/mermaid-tw5/d3.v6.min.js'), -1, 'should not require d3 on second render');
        });
    });
});
