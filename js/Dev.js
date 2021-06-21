function Dev(piece, boardSize) {
	this.piece = piece;
	this.boardSize = boardSize;
}

Dev.prototype.move = function(board) {
	let t3Rows = findAllT3Rows(board);

	for (let i = 0 ; i < t3Rows.length ; i++) {
		let t3Row = t3Rows[i];
		let rowReport = getRowReport(t3Row);
		if (rowReport.countEmpty > 0) {
			let mine = rowReport['count' + this.piece.toUpperCase()];
			if (mine == (this.boardSize - 1)) {
				let emptySquare = findEmptySquareRow(t3Row);
				move(emptySquare, this.piece);
				return;
			}
		}
	}

	for (let i = 0 ; i < t3Rows.length ; i++) {
		let t3Row = t3Rows[i];
		let rowReport = getRowReport(t3Row);
		if (rowReport.countEmpty > 0) {
			let his = rowReport['count' + otherPiece(this.piece).toUpperCase()];
			if (his == (this.boardSize - 1)) {
				let emptySquare = findEmptySquareRow(t3Row);
				move(emptySquare, this.piece);
				return;
			}
		}
	}

	for (let i = t3Rows.length - 1 ; i >= 0  ; i--) {
		let t3Row = t3Rows[i];
		let rowReport = getRowReport(t3Row);
		if (rowReport.countEmpty > 0) {
			let mine = rowReport['count' + this.piece.toUpperCase()];
			let his = rowReport['count' + otherPiece(this.piece).toUpperCase()];
			if (mine == 0 && his > 0) {
				let emptySquare = findEmptySquareRow(t3Row);
				move(emptySquare, this.piece);
				return;
			}
		}
	}

	let emptySquare = findEmptySquareAllRows(t3Rows);
	move(emptySquare, this.piece);
};
