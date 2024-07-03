function knightMoves(current, target) {
  if (!isValid(current) || !isValid(target)) {
    throw new Error('Invalid coordinates');
  }

  const queue = [{ move: current, parent: null }];
  const visited = new Set();
  const path = [];

  while (queue.length) {
    let { move, parent } = queue.shift();
    visited.add(`${move[0]}, ${move[1]}`);

    if (move[0] === target[0] && move[1] === target[1]) {
      let currentMove = { move, parent };
      while (currentMove) {
        path.unshift(currentMove.move);
        currentMove = currentMove.parent;
      }
      return path;
    }

    const validMoves = getMoves(move);

    for (const nextMove of validMoves) {
      if (!visited.has(`${nextMove[0]}, ${nextMove[1]}`)) {
        queue.push({ move: nextMove, parent: { move, parent } });
      }
    }
  }
}

function getMoves([i, j]) {
  return [
    [i - 1, j + 2],
    [i - 2, j + 1],
    [i - 1, j - 2],
    [i - 2, j - 1],
    [i + 1, j + 2],
    [i + 2, j + 1],
    [i + 2, j - 1],
    [i + 2, j - 2],
  ].filter(isValid);
}

function isValid([i, j]) {
  return i >= 0 && i <= 7 && j >= 0 && j <= 7;
}

console.log(knightMoves([0, 0], [4, 4])); // [ [ 0, 0 ], [ 1, 2 ], [ 0, 4 ], [ 2, 5 ], [ 4, 4 ] ]
console.log(knightMoves([3, 3], [7, 5])); // [ [ 3, 3 ], [ 5, 4 ], [ 7, 5 ] ]
console.log(knightMoves([-1, 2], [8, 3])); // error: Invalid coordinates
