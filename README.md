Marker-Based-Folding
============
VIM and Code Browser style folding support for folds manually designated with `#[of]` and `#[cf]`.

For example the following JavaScript code would be collapsed into three folds:

```javascript
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


Keys
----

| Key                | Function                                                          |
|--------------------|-------------------------------------------------------------------|
| `ctrl+alt+shift+[` | **Fold all** - Apply folding to the entire document               |
| `ctrl+alt+shift+]` | **Unfold all** - Remove all folding from the entire document      |
| `ctrl+alt+[`       | **Collapse current** - fold the surrounding area                  |
| `ctrl+alt+[`       | **Uncollapse current** - remove folding from the surrounding area |
