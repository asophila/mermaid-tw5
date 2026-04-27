/*
title: $:/plugins/orange/mermaid-tw5/wrapper.js
type: application/javascript
module-type: widget
author: Nathaniel Jones 2017-05-26
modified: E Furlan 2022-05-08
*/
(function() {
    // jslint node: true, browser: true
    // global $tw: false
    'use strict';

    var uniqueID = 1,
        Rocklib = require('$:/plugins/orange/mermaid-tw5/widget-tools.js').rocklib,
        Widget = require('$:/core/modules/widgets/widget.js').widget,
        rocklib = new Rocklib(),
        mermaidAPI = null,
        d3 = null;

    function escapeHtml(text) {
        if (text === null || text === undefined) {
            return '';
        }
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getSimpleStack(ex) {
        if (!ex || !ex.stack) {
            return '';
        }
        var lines = String(ex.stack).split('\n');
        var frames = [];
        for (var i = 0; i < lines.length && frames.length < 3; i++) {
            var line = lines[i].trim();
            if (line.indexOf('at ') === 0) {
                var match = line.match(/at\s+(?:[^\s(]+\s+\()?([^)]+)\)?/);
                if (match) {
                    var loc = match[1];
                    var fileName = loc.split('/').pop().split(':')[0];
                    frames.push(fileName);
                }
            }
        }
        return frames.join('\n');
    }

    var MermaidWidget = function(parseTreeNode, options) {
        this.initialise(parseTreeNode, options);
    };
    MermaidWidget.prototype = new Widget();
    // Render this widget into the DOM
    MermaidWidget.prototype.render = function(parent, nextSibling) {
        this.parentDomNode = parent;
        this.computeAttributes();
        this.execute();
        var tag = 'mermaid',
            scriptBody = rocklib.getScriptBody(this, 'text'),
            divNode = rocklib.getCanvas(this, tag),
            _insertSVG = function(svgCode, bindFunctions) {
                divNode.innerHTML = svgCode;

                // Add bind functions to support click events
                // by fkmiec 2023-05-21
                if (bindFunctions) {
                    bindFunctions(divNode);
                }
            };
        try {
            // Lazy-load mermaid and D3 on first render
            // Libraries are only loaded when a diagram is actually rendered
            if (!mermaidAPI) {
                divNode.innerHTML = '<div style="border-left:3px solid #999;background:#f5f5f5;padding:8px 12px;">Loading diagram…</div>';
                mermaidAPI = require('$:/plugins/orange/mermaid-tw5/mermaid.min.js').mermaidAPI;
                d3 = require('$:/plugins/orange/mermaid-tw5/d3.v6.min.js');
            }

            var options = {
                theme: ''
            };
            rocklib.getOptions(this, tag, options);

            // Add securityLevel: 'loose' configuration to support click events
            // by fkmiec 2023-05-21
            mermaidAPI.initialize({
                startOnLoad: false,
                flowchart: { useMaxWidth: true, htmlLabels: true },
                securityLevel: 'loose',
            });
            // START ZOOM LOGIC: Enable zooming the mermaid diagram with D3
            // by fkmiec 2023-05-21
            var zoomEventListenersApplied = false;
            var isZoomEnabled = false;

            divNode.addEventListener('click', function() {
                if(!zoomEventListenersApplied) {
                    var id = Date.now().toString(36);
                    this.firstChild.setAttribute('id', id);
                    var svg = d3.select('#' + id);
                    svg.html('<g>' + svg.html() + '</g>');
                    var inner = svg.select('g');
                    var zoom = d3.zoom().filter(function() { return isZoomEnabled; }).on('zoom', function(event) {
                        inner.attr('transform', event.transform);
                    });
                    svg.call(zoom);
                    zoomEventListenersApplied = true;
                }
                isZoomEnabled ? isZoomEnabled = false : isZoomEnabled = true;
            });
            //END ZOOM LOGIC

            mermaidAPI.render(divNode.id, scriptBody, _insertSVG);

        } catch (ex) {
            var errorHtml = '<div style="border-left:3px solid #ff4444;background:#fff0f0;padding:8px 12px;">' +
                '<p><strong>Mermaid diagram could not be rendered.</strong> The diagram syntax may contain an error.</p>' +
                '<pre style="margin:8px 0;padding:6px;background:#ffffff;border:1px solid #ffcccc;overflow:auto;">' +
                escapeHtml(scriptBody) +
                '</pre>' +
                '<details>' +
                '<summary style="cursor:pointer;color:#666;font-size:12px;">Technical details</summary>' +
                '<p style="margin:8px 0 0 0;font-size:12px;"><strong>' + escapeHtml(ex.name || 'Error') + ':</strong> ' +
                escapeHtml(ex.message || String(ex)) + '</p>' +
                '<pre style="margin:4px 0 0 0;font-size:11px;overflow:auto;">' + escapeHtml(getSimpleStack(ex)) + '</pre>' +
                '</details>' +
                '</div>';
            divNode.innerHTML = errorHtml;
        }
        parent.insertBefore(divNode, nextSibling);
        this.domNodes.push(divNode);
    };
    MermaidWidget.prototype.execute = function() {
        // Nothing to do
    };
    /*
    Selectively refreshes the widget if needed. Returns true if the
    widget or any of its children needed re-rendering
    */
    MermaidWidget.prototype.refresh = function(changedTiddlers) {
        return false;
    };
    exports.mermaid = MermaidWidget;
})();
