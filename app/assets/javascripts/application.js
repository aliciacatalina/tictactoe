var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window, document) {
  "use strict";
  var BLANK, TicTacToe, defaults, pluginName;
  BLANK = '';
  pluginName = 'tictactoe';
  defaults = {
    size: 3,
    computer: 'x',
    user: 'o',
    first_turn: 'human'
  };
  TicTacToe = (function() {
    var getMaxOfArray, getMinOfArray;

    function TicTacToe(el, options) {
      this.el = el;
      this._minimax = __bind(this._minimax, this);
      this._score = __bind(this._score, this);
      this._determine = __bind(this._determine, this);
      this._update_board = __bind(this._update_board, this);
      this._change_turn = __bind(this._change_turn, this);
      this._fill_board = __bind(this._fill_board, this);
      this._get_empty_cells = __bind(this._get_empty_cells, this);
      this.$el = $(this.el);
      this.turn = defaults['first_turn'];
      this.game_board = [['', '', ''], ['', '', ''], ['', '', '']];
      this.virtual_board = $('table');
      this.rows = $('table tr');
      this.options = $.extend({}, defaults, options);
      this._update_board(this.$el, this.game_board);
      this._fill_board(this.$el, this.game_board);
    }

    TicTacToe.prototype._get_empty_cells = function(game_board) {
      var col, counter, row, _i, _j, _len, _len1;
      counter = 9;
      for (_i = 0, _len = game_board.length; _i < _len; _i++) {
        row = game_board[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          col = row[_j];
          if (col !== '') {
            counter = counter - 1;
          }
        }
      }
      return counter;
    };

    TicTacToe.prototype._fill_board = function(table, game_board) {
      var board;
      board = this;
      return table.find('tr').map(function() {
        return table.find('td').each(function(index) {
          var col, row;
          row = $(this).data('row');
          col = $(this).data('col');
          return game_board[row][col] = $(this).text();
        });
      });
    };

    TicTacToe.prototype._change_turn = function(turn, board) {
      if (turn === 'human') {
        return this.turn = 'computer';
      } else {
        return this.turn = 'human';
      }
    };

    TicTacToe.prototype._update_board = function(table, game_board) {
      var board;
      board = this;
      return table.on('click', function(e) {
        var winner;
        if (e.target && e.target.nodeName === 'TD' && e.target.innerHTML === BLANK) {
          if (board.turn === 'human') {
            $(e.target).addClass('human');
            e.target.innerHTML = 'O';
          } else {
            e.target.innerHTML = 'X';
          }
          board._fill_board(table, game_board);
          winner = board._determine(game_board);
          if (winner !== "notend") {
            if (winner === "draw") {
              console.log("Draw!");
              $('.notice').html('Draw!');
            } else {
              console.log($('.notice'));
              $('.notice').append("Winner is " + winner + " !");
              console.log("Winner is " + winner + " !!!");
            }
          }
          return board._change_turn(board.turn, board);
        }
      });
    };

    TicTacToe.prototype._determine = function(game_board) {
      var board, col, i, j, row, _i, _j, _len, _len1;
      board = this;
      for (i = _i = 0, _len = game_board.length; _i < _len; i = ++_i) {
        row = game_board[i];
        if (game_board[i][0] !== BLANK) {
          if (game_board[i][0] === game_board[i][1] && game_board[i][1] === game_board[i][2]) {
            return game_board[i][0];
          }
        }
      }
      for (j = _j = 0, _len1 = game_board.length; _j < _len1; j = ++_j) {
        col = game_board[j];
        console.log(j);
        if (game_board[0][j] !== BLANK) {
          if (game_board[0][j] === game_board[1][j] && game_board[1][j] === game_board[2][j]) {
            return game_board[0][j];
          }
        }
      }
      if (game_board[1][1] !== BLANK) {
        if ((game_board[0][0] === game_board[1][1] && game_board[1][1] === game_board[2][2]) || (game_board[0][2] === game_board[1][1] && game_board[1][1] === game_board[2][0])) {
          return game_board[1][1];
        }
      }
      if (board._get_empty_cells(game_board) === 0) {
        return 'draw';
      } else {
        return "notend";
      }
    };

    TicTacToe.prototype._get_state = function(game_board) {
      var i, j;
      i = 0;
      while (i < game_board.length) {
        if (!(game_board[i][0] === game_board[i][1] && game_board[i][1] === game_board[i][2] ? game_board[i][0] === BLANK : void 0)) {
          return game_board[i][0];
        }
      }
      i++;
      j = 0;
      while (j < game_board[0].length) {
        if (!(game_board[0][j] === game_board[1][j] && game_board[1][j] === game_board[2][j] ? game_board[0][j] === BLANK : void 0)) {
          return game_board[0][j];
        }
        j++;
      }
      if (!((game_board[0][0] === game_board[1][1] && game_board[1][1] === game_board[2][2]) || (game_board[0][2] === game_board[1][1] && game_board[1][1] === game_board[2][0]) ? game_board[1][1] === BLANK : void 0)) {
        return game_board[1][1];
      }
      if (blankCount === 0) {
        return "draw";
      }
      return "notend";
    };

    TicTacToe.prototype._score = function(game) {
      if (this._win('computer')) {
        return 10 - depth;
      } else if (this._win('human')) {
        return depth - 10;
      } else {
        return 0;
      }
    };

    TicTacToe.prototype._minimax = function(game, depth) {
      var max_score, max_score_index, min_score, min_score_index, moves, scores;
      if (game.over != null) {
        return _score(game);
      }
      depth += 1;
      scores = [];
      moves = [];
      $.each(this._possible_moves(game), function(index, move) {
        var possible_game;
        possible_game = this._get_next_state(move);
        scores.push(this._minimax(possible_game, depth));
        return moves.push(move);
      });
      if (game.turn === this.human) {
        max_score = getMaxOfArray(scores);
        max_score_index = scores.indexOf(max_score);
        this.choice = moves[max_score_index];
        return max_score;
      } else {
        min_score = getMinOfArray(scores);
        min_score_index = scores.indexOf(min_score);
        this.choice = moves[min_score_index];
        return min_score;
      }
    };

    getMaxOfArray = function(numArray) {
      return Math.max.apply(null, numArray);
    };

    getMinOfArray = function(numArray) {
      return Math.min.apply(null, numArray);
    };

    return TicTacToe;

  })();
  $.fn[pluginName] = function(options) {
    var args, boards, _;
    boards = this.length;
    _ = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.each(function(index) {
      var instance, key, me, plugin;
      me = $(this);
      plugin = $.data(this, "plugin_" + pluginName);
      if (!plugin) {
        key = "tictactoe" + (boards > 1 ? '-' + ++index : '');
        instance = new TicTacToe(this, options);
        return me.data(key, instance).data('key', key);
      } else if ((plugin[_] != null) && $.type(plugin[_]) === 'function') {
        return plugin[_].apply(plugin, args);
      }
    });
  };
  return $(document).ready(function() {
    return $('[data-tictactoe]').each(function() {
      return $(this).tictactoe();
    });
  });
})($, window, document);
