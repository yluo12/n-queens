// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    // get a nested array, each element represent one row
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
    // 0 <-> 1
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // return false; // fixme
      // set a count variable

      // get the current row array with rowIndex -> this.rows[rowIndex]
      // iterate over the row array
      // if current element is 1,
      // increment count
      // if count > 1
      // return true;
      //otherwise return false;
      let count = 0;

      let currRow = this.rows()[rowIndex];
      for (let i = 0; i < currRow.length; i++) {
        if (currRow[i] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme
      // get the nested array -> this.rows
      // iterate over the array
      // at current index, run hasRowConflictAt(i) -> currentConflict
      // if currentConflict is true
      // return true;
      // return false;
      let matrix = this.rows();
      for (let i = 0; i < matrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      // create a count variable
      // get the nestedArr -> this.rows
      // iterate over the nestedArr
      // if colIndex item at the current element === 1
      // increment count
      // if count greater than 1
      // return true;
      // otherwise return false;

      let matrix = this.rows(); // call this.rows to return the nested array
      let count = 0;

      for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i];
        if (row[colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme

      // get n -> this.get('n')  // new Board({n: 6})
      // iterate from 0 to n - 1
      // run hasColConflictAt(i)
      // if it's true
      // return true
      // return false;

      let n = this.get('n');

      for (let i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme
      // var matrix = [
      //   [0, 0, 0, 0], if row[colIndex] === 1 count++
      //   [0, 1, 0, 0],
      //   [0, 0, 0, 0],
      //   [0, 0, 0, 0]
      // ];
      // set count variable
      // get the current nestedArr -> this.rows
      // iterate over the rows
      // iterate over the cols
      // if col - row === input && this.get(row, col) === 1
      // count++
      // if count greater than 1
      // return true
      // return false;
      let matrix = this.rows();
      let count = 0;

      for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i];

        for (let j = 0; j < row.length; j++) {
          if ((j - i === majorDiagonalColumnIndexAtFirstRow) && (matrix[i][j] === 1)) {
            count++;
          }
        }
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      // get n -> this.get('n')
      // iterate from (-n + 2) to (n - 2)
      // if hasMajorDiagonalConflictAt(i) true
      // return true;
      // return false;
      let n = this.get('n');

      for (let i = (-n + 2); i <= (n - 2); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme
      // set count variable
      // get the board -> this.rows
      // iterate over the rows
      // iterate over the cols
      // if col + row === input && this.get(row, col) === 1
      // count++
      // if count greater than 1
      // return true;
      // return false;    let matrix = this.rows();
      let count = 0;

      for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i];

        for (let j = 0; j < row.length; j++) {
          if ((j + i === minorDiagonalColumnIndexAtFirstRow) && (matrix[i][j] === 1)) {
            count++;
          }
        }
      }
      return count > 1;
    },

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // return false; // fixme
      var oddNumGenerator = function (n) {
        var num = 1;
        while (n > 2) {

        }
      }

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
