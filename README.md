Triple-Folds
============
VIM style folding support for folds manually designated with `{{{` and `}}}`.

For example the following JavaScript code would be collapsed into three folds:

```javascript
// This does something {{{
// ... Bit of code here ...
// }}}
// This does something else {{{
// ... Bit more code here ...
// }}}
// This does yet another thing {{{
// ... Bit more code here ...
// And can be recursive {{{
// ... Bit more code here ...
// }}}
// }}}
```


Keys
----

| Key                | Function                                                          |
|--------------------|-------------------------------------------------------------------|
| `ctrl+alt+shift+[` | **Fold all** - Apply folding to the entire document               |
| `ctrl+alt+shift+]` | **Unfold all** - Remove all folding from the entire document      |
| `ctrl+alt+[`       | **Collapse current** - fold the surrounding area                  |
| `ctrl+alt+[`       | **Uncollapse current** - remove folding from the surrounding area |
