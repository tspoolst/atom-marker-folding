var CompositeDisposable = require('atom').CompositeDisposable;
var Range = require('atom').Range;

module.exports = {

	activate: function(state) {
		this.subscriptions = new CompositeDisposable();

		atom.commands.add('atom-workspace', {
			'tripple-folds:fold-all': this.applyFolds.bind(this),
			'tripple-folds:unfold-all': this.applyFolds.bind(this), // FIXME
		});

		setTimeout(() => this.applyFolds(), 1000);

		console.log('Activated!');
	},

	deactivate: function() {
		this.subscriptions.dispose();
	},


	foldStart: /{{{/,
	foldEnd: /}}}/,

	applyFolds: function() {
		console.log('APPLY!');
		var editor = atom.workspace.getActiveTextEditor();
		var lineCount = editor.getLineCount();
		var sections = [];

		for (var l = 0; l < lineCount; l++) {
			var line = editor.lineTextForBufferRow(l);

			if (this.foldStart.test(line)) {
				sections.push(l);
			} else if (this.foldEnd.test(line) && sections.length) {
				var sectionStart = sections.pop();
				var sectionEnd = l;

				console.log('SECTION', sections.length, sectionStart, sectionEnd-sectionStart, editor.lineTextForBufferRow(sectionStart), editor.lineTextForBufferRow(sectionEnd));
				editor.setSelectedBufferRange(new Range([sectionStart, 512], [sectionEnd, 512]));
				editor.foldSelectedLines();
			}
		}
	},

	selectFold: function() {
		var editor = atom.workspace.getActiveTextEditor();
		var position = getCursorBufferPosition();
		console.log('POS', position);
	},

};
