# getting vim to work with marker based folding.
```# vim:number:tabstop=2:shiftwidth=2:autoindent:foldmethod=marker:foldlevel=0:foldmarker=#[of],#[cf]```  
at the end of the file seems to do the trick.


If the modeline doesn’t work out of the box add  
set modelines=1 (or any non-0 value) into your ~/.vimrc to get it working.


vim can read and display the folds without issue.  
haven't figured out how to get vim to create folds correctly yet using "zf".  
it assumes the comments should be /* */ when they really should be #.  
(need to find the vim setting that forces the comment definition.) . 
vim "zf" also places the tags at the end of the same line, which isn't compatible with parsers that expect the tags to be on a separate line.  
regardless, "zf" isn't strictly needed as the tags can be typed in manually.


# some useful vim commands for viewing folds are:  
{right arrow|sometimes left arrow|zo} open fold  
zc close fold  
zR open all folds  
zM close all folds  
http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding


the tag definitions are as follows:  
#[of]: open fold (fold start)  
#[cf] close fold (fold end)  
#[c] enhanced comment  
and . 
#[l]: file link -- they allow the editor to find/jump to related files in the same project. (in the editor they look like regular folds).


gf  go to a file shown in a link  
ctrl-6  switch buffer  
ctrl-o  close buffer  
ctrl-W gf  open the file link in a new tab  
ctrl-W c  close the current tab window.  
ctrl-pgup/pgdown  switch tabs
