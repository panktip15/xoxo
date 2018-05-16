import { Map } from "immutable";

let board = Map(); // Creates a new Immutable Map

// board = board.setIn([1,1], 'X');

// Action creators
const MOVE = "MOVE";

export const move = (player, position) => {
  return {
    type: MOVE,
    position,
    player,
  };
};

const whichTurn = currentTurn => (currentTurn === "X" ? "O" : "X");

export default function reducer(state = { board, turn: "X", count: 0}, action) {
  // Initial state is an empty board

  switch (action.type) {
    case MOVE:
      return {
        board: state.board.setIn(action.position, action.player), // state.board changes with each new input and remembers the initial as well as all the steps after so you can refer back to old moves.
        turn: whichTurn(state.turn),
        count: state.count + 1 // You can't use increment by ++. Must use + 1;
      };
    default:
      return state;
  }
}

// const winner = board

const willWin = (board, player) => {
  const entireBoard = [];

  for (let i = 0; i < 3; i++) {
    // Allows us to access the board's information with coordinates.
    const row = [];

    for (let j = 0; j < 3; j++) {
      row.push(board.getIn([i, j]));
    }

    entireBoard.push(row);
  }
  const countInRow = (player, row) =>
    row.filter(space => space === player).length;

  const countInColumn = (player, colNumber, board) =>
    board.map(rows => rows[colNumber]).filter(space => space === player).length;

  const countInBackwards = () =>
    [entireBoard[0][1], entireBoard[1][1], entireBoard[2][2]].filter(
      space => space === player
    ).length;

  const countInForwards = () =>
    [entireBoard[2][0], entireBoard[1][1], entireBoard[0][2]].filter(
      space => space === player
    ).length;

  if (
    countInRow(player, entireBoard[0]) === 3 ||
    countInRow(player, entireBoard[1]) === 3 ||
    countInRow(player, entireBoard[2]) === 3 ||
    countInColumn(player, 0, entireBoard) === 3 ||
    countInColumn(player, 1, entireBoard) === 3 ||
    countInColumn(player, 2, entireBoard) === 3 ||
    countInBackwards() === 3 ||
    countInForwards() === 3
  ) {
    return true;
  } else {
    return false;
  }
};

export const winner = (board, player, count) => {

  while (count <= 9) {

    if (willWin(board, player)) {
      return player + 'won! \n';
    } else {
      return 'null \n';
    }
  }
  return 'It\'s a draw... \n';
};

// board.subscribe(() => {
//   console.log("HELLO")
//   willWin(board, 'X')
// })
