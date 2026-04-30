# mermaid-tw5

*Last edited: 2026-04-30*

The mermaid-tw5 plugin is a wrapper for Mermaid (<https://mermaid.js.org>).

TiddlyWiki notebook including the plugin: <https://asophila.github.io/mermaid-tw5> . You can install the plugin by navigating to the site and dragging the plugin link to your TiddlyWiki.

This is a fork of the original plugin, now maintained at <https://github.com/asophila/mermaid-tw5>, updated to Mermaid 11.14.0 with async rendering and lazy loading. All credits are from the original authors:

* <http://github.com/gt6796c/mermaid-tw5>
* <http://github.com/jasonmhoule/tw5-mermaid>
* <http://github.com/cedarvera/mermaid-tw5>
* <http://github.com/jceb/mermaid-tw5>
* <https://github.com/mermaid-js/mermaid>
* and others

Notes:

1. The mermaid.min.js 11.14.0 version currently used in the plugin is 3.1 MB in size. The plugin adds ~3.4 MB total to a TiddlyWiki installation (the empty TiddlyWiki 5.3.3 is 2.4 MB, giving a total of ~6 MB).
2. Mermaid is lazy-loaded: it is only initialized when the first diagram is rendered, so startup performance is not affected.
