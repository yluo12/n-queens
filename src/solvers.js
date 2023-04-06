/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let solution = new Board({'n': n});
  let count = n;
  for (let i = 0; i <= n - 1; i++) {
    for (let j = 0; j <= n - 1; j++) {
      if (count > 0) {
        solution.togglePiece(i, j);
        if (solution.hasAnyRowConflicts()) {
          solution.togglePiece(i, j);
          break;
        } else {
          if (solution.hasAnyColConflicts()) {
            solution.togglePiece(i, j);
            continue;
          } else {
            count--;
            break;
          }
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution;
};

// console.log(window.findNRooksSolution(2).rows());

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n}); //fixme
  var count = n;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (n > 0) {
        solution.togglePiece(i, j);
        if (solution.hasAnyQueensConflicts()) {
          solution.togglePiece(i, j);
          continue;
        } else {
          count--;
          break;
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
// console.log(window.findNQueensSolution(4).rows());

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
