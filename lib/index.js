var CompositeDisposable = require('atom').CompositeDisposable;
var Range = require('atom').Range;

module.exports = {

	activate: function(state) {
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(atom.workspace.onDidAddTextEditor(event => {
			event.textEditor.tokenizedBuffer.onDidTokenize(() => {
				this.applyFolds();
			});
		}));

		atom.commands.add('atom-workspace', {
			'marker-folding:fold-all': this.applyFolds.bind(this, null, null),
			'marker-folding:unfold-all': this.destroyFolds.bind(this, null, null),
			'marker-folding:collapse-this': this.toggleCollapse.bind(this, null, true),
			'marker-folding:uncollapse-this': this.toggleCollapse.bind(this, null, false),
		});

		setTimeout(() => this.applyFolds(), 500);
	},

	deactivate: function() {
		this.subscriptions.dispose();
	},

	foldStart: /#\[of\]/, // Compiled RegExp of the folding lines
	foldEnd: /#\[cf\]/, // Compiled RegExp of the unfolding lines
	foldLength: 200, // How many characters to show of the fold line

	/**
	* Apply folding either to the entire document or the given line range
	* @param {number} [startLine] The row to start applying folds from. If omitted the document start is assumed
	* @param {number} [endLine] The row to stop applying folds at. If omitted the document end is assumed
	*/
	applyFolds: function(startLine, endLine) {
		var editor = atom.workspace.getActiveTextEditor();
		if (!editor) return;

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

				editor.setSelectedBufferRange(new Range([sectionStart, this.foldLength], [sectionEnd, this.foldLength]));
				editor.foldSelectedLines();
			}
		}
	},


	/**
	* Destroy folding either on the entire document or the given line range
	* @param {number} [startLine] The row to start destroying folds from. If omitted the document start is assumed
	* @param {number} [endLine] The row to stop destroying folds at. If omitted the document end is assumed
	*/
	destroyFolds: function(startLine, endLine) {
		var editor = atom.workspace.getActiveTextEditor();
		if (!editor) return;

		if (!startLine) startLine = 0;
		if (!endLine) endLine = editor.getLineCount();

		for (var l = startLine; l < endLine; l++) {
			editor.unfoldBufferRow(l);
		}
	},

	/**
	* Find the wrapping section around the given row
	* This will return an array of two elements for the rows at the start and end of the wrapping fold
	* @param {number} [row] The row to find the wrapping fold of. If omitted the current buffer row is assumed
	* @return {null|array} An array of two elements for the start and end of the wrapping fold. If no wrapping fold is found null is returned
	*/
	findSection: function(row) {
		var editor = atom.workspace.getActiveTextEditor();
		if (!editor) return;

		var lineCount = editor.getLineCount();
		if (!row) row = editor.getCursorBufferPosition().row;

		// Seek backwards until we hit an opening fold {{{
		var startRow = row;
		for (startRow = row; startRow > 0; startRow--) {
			var line = editor.lineTextForBufferRow(startRow);
			if (this.foldStart.test(line)) break;
		}
		if (startRow == 0 && !this.foldStart.test(editor.lineTextForBufferRow(0))) return null; // Invalid start
		// }}}

		// Seek forwards until we hit an ending fold {{{
		var endRow = row;
		for (endRow = row; endRow < lineCount; endRow++) {
			var line = editor.lineTextForBufferRow(endRow);
			if (this.foldEnd.test(line)) break;
		}
		if (endRow == lineCount && !this.foldStart.test(editor.lineTextForBufferRow(lineCount))) return null; // Invalid end
		// }}}

		return [startRow, endRow];
	},


	/**
	* Toggle the collapse state of the lowest level fold around a row
	* @param {number} [row] Optional row to focus around. If omitted the current buffer row is assumed
	* @param {boolean} [collapseState] Whether to collapse the fold
	*/
	toggleCollapse: function(row, collapseState) {
		var editor = atom.workspace.getActiveTextEditor();
		if (!editor) return;

		var section = this.findSection();
		if (!section) return; // Invalid fold

		if (collapseState) {
			editor.setSelectedBufferRange(new Range([section[0], this.foldLength], [section[1], this.foldLength]));
			editor.foldSelectedLines();
		} else {
			editor.setSelectedBufferRange(new Range([section[0], this.foldLength], [section[1], this.foldLength]));
			// NOTE: Just telling the editor to select the text also unfolds it
		}
	},
};
