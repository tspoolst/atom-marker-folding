Marker-Folding
============
VIM and Code Browser style folding support for folds manually designated with `#[of]` and `#[cf]`.

https://www.vim.org/
http://tibleiz.net/code-browser/index.html

For example the following ShellScript code would be collapsed into three folds:

```shellscript
#[of]: This does something
# ... Bit of code here ...
#[cf]
#[of]: This does something else
# ... Bit more code here ...
#[cf]
#[of]: This does yet another thing
# ... Bit more code here ...
#[of]: And can be recursive
# ... Bit more code here ...
#[cf]
#[cf]

```

Getting this to work
----

The built in folding must be disabled, because it interferes with the folding operations.

This tip was originally taken from https://jamesgecko.com/disable-code-folding-in-atom/

To turn folding off, create the file ~/.atom/init.coffee, if it does not already exist, and add this:

```
# Disable code folding
{TextEditor} = require('atom')
TextEditor.prototype.isFoldableAtBufferRow = -> false
```

Keys
----

| Key                | Function                                                          |
|--------------------|-------------------------------------------------------------------|
| `ctrl+alt+shift+[` | **Fold all** - Apply folding to the entire document               |
| `ctrl+alt+shift+]` | **Unfold all** - Remove all folding from the entire document      |
| `ctrl+alt+[`       | **Collapse current** - fold the surrounding area                  |
| `ctrl+alt+[`       | **Uncollapse current** - remove folding from the surrounding area |
