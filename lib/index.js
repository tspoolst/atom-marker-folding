var CompositeDisposable = require('atom').CompositeDisposable;
var Range = require('atom').Range;

module.exports = {

	activate: function(state) {
		this.subscriptions = new CompositeDisposable();

		atom.commands.add('atom-workspace', {
			'triple-folds:fold-all': this.applyFolds.bind(this, null, null),
			'triple-folds:unfold-all': this.destroyFolds.bind(this, null, null),
		});

		setTimeout(() => this.applyFolds(), 1000);

		console.log('Activated!');
	},

	deactivate: function() {
		this.subscriptions.dispose();
	},

	foldStart: /{{{/,
	foldEnd: /}}}/,

	/**
	* Apply folding either to the entire document or the given line range
	* @param {number} [startLine] The row to start applying folds from. If omitted the document start is assumed
	* @param {number} [endLine] The row to stop applying folds at. If omitted the document end is assumed
	*/
	applyFolds: function(startLine, endLine) {
		console.log('APPLY FOLDING', startLine, endLine);
		var editor = atom.workspace.getActiveTextEditor();

		if (!startLine) startLine = 0;
		if (!endLine) endLine = editor.getLineCount();

		var sections = [];

		for (var l = startLine; l < endLine; l++) {
			var line = editor.lineTextForBufferRow(l);

			if (this.foldStart.test(line)) {
				sections.push(l);
			} else if (this.foldEnd.test(line) && sections.length) {
				var sectionStart = sections.pop();
				var sectionEnd = l;

				editor.setSelectedBufferRange(new Range([sectionStart, 512], [sectionEnd, 512]));
				editor.foldSelectedLines();
			}
		}
	},

	destroyFolds: function(startLine, endLine) {
		console.log('DESTROY FOLDING', startLine, endLine);

		var editor = atom.workspace.getActiveTextEditor();

		if (!startLine) startLine = 0;
		if (!endLine) endLine = editor.getLineCount();

		for (var l = startLine; l < endLine; l++) {
			editor.unfoldBufferRow(l);
		}
	},
};
