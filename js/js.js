const DELAY_BEFORE_COMPUTER_PLAY = 250;

const ENUM_GAME_STATE = {
	NOT_STARTED: -1,
	STARTED: 0,
	GAME_OVER: 1
};

const ENUM_PIECES = {
	X: 'x',
	O: 'o'
};

const GAME_STATE = {
	state: ENUM_GAME_STATE.NOT_STARTED,
	currentPlayer: null,
	winner: null
};

let board, boardSize, playerPiece, computerPiece, machine;

function btStart_OnClick(event) {
	mainDisplay.innerHTML = '';
	mainOutput.innerHTML = '';

	let checkedPlayer = player.find(player => player.checked);
	playerPiece = checkedPlayer.value;

	let unCheckedPlayer = player.find(player => !player.checked);
	computerPiece = unCheckedPlayer.value;

	let checkedSize = size.find(size => size.checked);
	boardSize = checkedSize.value;

	let checkedComputer = computer.find(computer => computer.checked);
	computerName = checkedComputer.value;
	machine = eval('new ' + computerName + '(computerPiece, boardSize)');

	let table = io.github.crisstanza.Creator.html('table', {class: 'fade-in'}, mainDisplay);
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = io.github.crisstanza.Creator.html('tr', null, table);
		for (let j = 0 ; j < boardSize ; j++) {
			let td = io.github.crisstanza.Creator.html('td', {title: i + ', ' + j}, tr);
			td.addEventListener('click', function() { td_OnClick(i, j); });
		}
	}
	board = table;

	document.location.hash = `player=${playerPiece}&computer=${computerName}&size=${boardSize}`;

	GAME_STATE.state = ENUM_GAME_STATE.STARTED;
	GAME_STATE.currentPlayer = ENUM_PIECES.X;

	if (playerPiece == ENUM_PIECES.O) {
		computerPlay();
	}
}

function td_OnClick(line, column) {
	if (GAME_STATE.state != ENUM_GAME_STATE.STARTED)
		return;
	if (GAME_STATE.currentPlayer != playerPiece)
		return;
	let tr = board.rows[line];
	let td = tr.cells[column];
	if (td.innerHTML)
		return;
	move(td, playerPiece);
	updateGameState();
	if (GAME_STATE.state == ENUM_GAME_STATE.GAME_OVER) {
		GAME_STATE.currentPlayer = null;
		gameOver();
	} else {
		GAME_STATE.currentPlayer = computerPiece;
		setTimeout(computerPlay, DELAY_BEFORE_COMPUTER_PLAY);
	}
}

function gameOver() {
	GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
	board.classList.add('game-over');
	mainOutput.innerHTML = 'Game over!<br /><br />The winner is: ' + getWinnerLabel() + '.';
	if (GAME_STATE.winner) {
		let t3Rows = findAllT3Rows(board);
		for (let i = 0 ; i < t3Rows.length ; i++) {
			let t3Row = t3Rows[i];
			let rowReport = getRowReport(t3Row);
			if (rowReport.countX == boardSize || rowReport.countO == boardSize) {
				t3Row.forEach(td => td.classList.add('fade-in', 'high-light'));
				return;
			}
		}
	}
}

function computerPlay() {
	if (GAME_STATE.currentPlayer != computerPiece)
		return;
	machine.move(board);
	updateGameState();
	if (GAME_STATE.state == ENUM_GAME_STATE.GAME_OVER) {
		GAME_STATE.currentPlayer = null;
		gameOver();
	} else {
		GAME_STATE.currentPlayer = playerPiece;
	}
}

function move(td, piece) {
	td.innerHTML = piece;
	td.classList.add('fade-in');
}

(function() {

	function init(event) {
		btStart_OnClick(event);
	}

	window.addEventListener('load', init);

})();

function countInARow(row, content) {
	return row.filter(element => element.innerHTML == content).length;
}

function updateGameWinner(tds) {
	let rowReport = getRowReport(tds);
	GAME_STATE.winner = getWinner(rowReport);
}

function getRowReport(tds) {
	let report = {
		countX: countInARow(tds, ENUM_PIECES.X),
		countO: countInARow(tds, ENUM_PIECES.O),
		countEmpty: countInARow(tds, '')
	};
	return report;
}

function getWinner(report) {
	if (report.countX == boardSize)
		return ENUM_PIECES.X;
	if (report.countO == boardSize)
		return ENUM_PIECES.O;
	return null;
}

function findEmptySquareRow(tds) {
	return tds.find(element => element.innerHTML == '');
}

function findEmptySquareAllRows(t3Rows) {
	for (let i = 0 ; i < t3Rows.length ; i++) {
		let t3Row = t3Rows[i];
		let emptySquare = t3Row.find(element => element.innerHTML == '');
		if (emptySquare)
			return emptySquare;
	}
}

function otherPiece(piece) {
	return piece == ENUM_PIECES.O ? ENUM_PIECES.X : ENUM_PIECES.O;
}

function updateGameState(whoJustPlayed) {
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		let tds = Array.from(tr.cells);
		updateGameWinner(tds);
		if (GAME_STATE.winner) {
			GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
			return;
		}
	}
	for (let j = 0 ; j < boardSize ; j++) {
		let tds = [];
		for (let i = 0 ; i < boardSize ; i++) {
			let tr = board.rows[i];
			tds.push(tr.cells[j]);
		}
		updateGameWinner(tds);
		if (GAME_STATE.winner) {
			GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
			return;
		}
	}

	let tds = [];
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		tds.push(tr.cells[i]);
	}
	updateGameWinner(tds);
	if (GAME_STATE.winner) {
		GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
		return;
	}

	tds = [];
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		tds.push(tr.cells[boardSize - 1 - i]);
	}
	updateGameWinner(tds);
	if (GAME_STATE.winner) {
		GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
		return;
	}

	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		for (let j = 0 ; j < boardSize ; j++) {
			let td = tr.cells[j];
			if (!td.innerHTML)
				return;
		}
	}

	GAME_STATE.state = ENUM_GAME_STATE.GAME_OVER;
}

function findDiagonals(board) {
	let rows = [];
	let tdsPrim = [];
	let tdsSec = [];
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		tdsPrim.push(tr.cells[i]);
		tdsSec.push(tr.cells[boardSize - 1 - i]);
	}
	rows.push(tdsPrim);
	rows.push(tdsSec);
	return rows;
}

function findVerticals(board) {
	let rows = [];
	for (let j = 0 ; j < boardSize ; j++) {
		let tds = [];
		for (let i = 0 ; i < boardSize ; i++) {
			let tr = board.rows[i];
			tds.push(tr.cells[j]);
		}
		rows.push(tds);
	}
	return rows;
}

function findHorizonals(board) {
	let rows = [];
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		let tds = Array.from(tr.cells);
		rows.push(tds);
	}
	return rows;
}

function findAllT3Rows(board) {
	let t3Rows = [];
	t3Rows.push(...findHorizonals(board));
	t3Rows.push(...findVerticals(board));
	t3Rows.push(...findDiagonals(board));
	return t3Rows;
}

function getWinnerLabel() {
	if (GAME_STATE.winner == playerPiece)
		return 'Human player';
	if (GAME_STATE.winner == computerPiece)
		return 'Computer player';
	return 'Draw';
}
