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

To turn native folding off, create the file ~/.atom/init.coffee if it does not already exist, and add this:

```
# Disable code folding
{TextEditor} = require('atom')
TextEditor.prototype.isFoldableAtBufferRow = -> false
```

Keys
----

| Key                | Function                                                          |
|--------------------|-------------------------------------------------------------------|
| `ctrl+alt+shift+6` | **Fold all** - Apply folding to the entire document               |
| `ctrl+alt+shift+7` | **Unfold all** - Remove all folding from the entire document      |
| `ctrl+alt+6`       | **Collapse current** - fold the surrounding area                  |
| `ctrl+alt+7`       | **Uncollapse current** - remove folding from the surrounding area |

Manual Install
----
download this repo as a zip file.
```
cd ~/.atom/packages/
unzip ~/Downloads/atom-marker-folding-master.zip
mv atom-marker-folding-master/ marker-based-folding
```
exit and reload atom.

Todo/Bugs
----
* doesn't always do a fold_all when a new TextEditor tab is loaded.
* both collaps/uncollaps current do not work correctly.  use the mouse to open folds.
* collapsing a singular nested fold doesn't work.  to refold everything properly a fold_all must be called.
