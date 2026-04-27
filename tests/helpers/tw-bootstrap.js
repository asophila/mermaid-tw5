'use strict';

var fs = require('fs');
var vm = require('vm');

// ---------------------------------------------------------------------------
// Global $tw mock
// ---------------------------------------------------------------------------

global.$tw = {
    wiki: {
        getTiddler: function(title) { return null; },
        tiddlerExists: function(title) { return false; },
        getTiddlerData: function(title) { return {}; }
    },
    modules: {
        execute: function(moduleName, moduleRoot) { return {}; }
    },
    utils: {
        parseStringArray: function() { return []; }
    }
};

// ---------------------------------------------------------------------------
// Widget base class mock
// ---------------------------------------------------------------------------

function MockWidget(parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
}

MockWidget.prototype.initialise = function(parseTreeNode, options) {
    this.parseTreeNode = parseTreeNode || {};
    this.attributes = (options && options.attributes) ? options.attributes : {};
    this.children = [];
    this.domNodes = [];
    this.document = global.document;
    this.wiki = global.$tw.wiki;
    this.parentWidget = null;
    this.variables = {};
};

MockWidget.prototype.computeAttributes = function() {};
MockWidget.prototype.execute = function() {};
MockWidget.prototype.refresh = function() { return false; };

MockWidget.prototype.getAttribute = function(name, defaultValue) {
    return this.attributes[name] !== undefined ? this.attributes[name] : defaultValue;
};

MockWidget.prototype.getVariable = function(name) {
    return this.variables[name] || null;
};

MockWidget.prototype.setVariable = function(name, value) {
    this.variables[name] = value;
};

// ---------------------------------------------------------------------------
// Mermaid API mock
// ---------------------------------------------------------------------------

var mockMermaidAPI = {
    initialize: function() {},
    render: function(id, source, callback) {
        if (source && source.indexOf('INVALID_SYNTAX') !== -1) {
            var err = new Error('Syntax error in graph');
            err.name = 'MermaidParseError';
            throw err;
        }
        callback('<svg id="' + id + '"><rect width="100" height="50"/></svg>', null);
    }
};

// ---------------------------------------------------------------------------
// D3 mock
// ---------------------------------------------------------------------------

var mockD3 = {
    select: function() {
        return {
            html: function() { return this; },
            select: function() { return this; },
            attr: function() { return this; },
            call: function() { return this; }
        };
    },
    zoom: function() {
        return {
            filter: function() { return this; },
            on: function() { return this; }
        };
    }
};

// ---------------------------------------------------------------------------
// TW-style module loader
// ---------------------------------------------------------------------------

var moduleCache = {};

var pathMap = {
    '$:/plugins/orange/mermaid-tw5/widget-tools.js': 'mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_widget-tools.js',
    '$:/plugins/orange/mermaid-tw5/typed-parser.js': 'mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_typed-parser.js',
    '$:/plugins/orange/mermaid-tw5/wrapper.js': 'mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js'
};

function twRequire(moduleName) {
    if (moduleCache[moduleName]) {
        return moduleCache[moduleName];
    }

    if (moduleName === '$:/core/modules/widgets/widget.js') {
        return { widget: MockWidget };
    }
    if (moduleName === '$:/plugins/orange/mermaid-tw5/mermaid.min.js') {
        return { mermaidAPI: mockMermaidAPI };
    }
    if (moduleName === '$:/plugins/orange/mermaid-tw5/d3.v6.min.js') {
        return mockD3;
    }

    var localPath = pathMap[moduleName];
    if (!localPath) {
        return require(moduleName);
    }

    var exports = {};
    var code = fs.readFileSync(localPath, 'utf8');

    var context = vm.createContext({
        exports: exports,
        require: twRequire,
        $tw: global.$tw,
        document: global.document,
        console: console,
        Array: Array,
        Object: Object,
        String: String,
        Number: Number,
        Boolean: Boolean,
        Date: Date,
        Math: Math,
        JSON: JSON,
        Error: Error,
        RegExp: RegExp,
        parseInt: parseInt,
        parseFloat: parseFloat,
        isNaN: isNaN,
        isFinite: isFinite,
        undefined: undefined,
        Infinity: Infinity,
        NaN: NaN
    });

    vm.runInContext(code, context);

    moduleCache[moduleName] = exports;
    return exports;
}

function loadModule(moduleName) {
    return twRequire(moduleName);
}

module.exports = {
    loadModule: loadModule,
    twRequire: twRequire,
    MockWidget: MockWidget,
    mockMermaidAPI: mockMermaidAPI
};
