import { describe, it } from 'node:test';
import assert from 'node:assert';
import { loadModule } from './helpers/tw-bootstrap.js';

describe('typed-parser', () => {
    it('exports a parser for the mermaid MIME type', () => {
        var exports = loadModule('$:/plugins/orange/mermaid-tw5/typed-parser.js');
        assert.ok(exports['text/vnd.tiddlywiki.mermaid'], 'Parser should be registered for MIME type');
    });

    it('produces a tree with correct structure', () => {
        var Parser = loadModule('$:/plugins/orange/mermaid-tw5/typed-parser.js')['text/vnd.tiddlywiki.mermaid'];
        var parser = new Parser('text/vnd.tiddlywiki.mermaid', 'graph TD; A-->B', {});
        assert.ok(Array.isArray(parser.tree), 'tree should be an array');
        assert.strictEqual(parser.tree.length, 1, 'tree should have exactly one element');
        assert.strictEqual(parser.tree[0].type, 'mermaid', 'element type should be "mermaid"');
        assert.strictEqual(parser.tree[0].tag, '$mermaid', 'element tag should be "$mermaid"');
        assert.strictEqual(parser.tree[0].text, 'graph TD; A-->B', 'element text should match input');
    });
});
