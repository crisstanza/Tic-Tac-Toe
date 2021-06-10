function Fifo(piece, boardSize) {
	this.piece = piece;
	this.boardSize = boardSize;
}

Fifo.prototype.move = function(board) {
	for (let i = 0 ; i < this.boardSize ; i++) {
		let tr = board.rows[i];
		for (let j = 0 ; j < this.boardSize ; j++) {
			let td = tr.cells[j];
			if (!td.innerHTML) {
				td.innerHTML = this.piece;
				td.classList.add('fade-in');
				return;
			}
		}
	}
};
