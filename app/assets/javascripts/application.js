var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window, document) {
  "use strict";
  var TicTacToe, defaults;
  defaults = {
    size: 3,
    computer: 'x',
    user: 'o'
  };
  TicTacToe = (function() {
    var getMaxOfArray;

    function TicTacToe(el, options) {
      this.el = el;
      this._minimax = __bind(this._minimax, this);
      this._score = __bind(this._score, this);
      this.$el = $(this.el);
      this.options = $.extend({}, defaults, options);
    }

    TicTacToe.prototype._score = function(game) {
      if (typeof game.win === "function" ? game.win(this.computer) : void 0) {
        return 10 - depth;
      } else if (typeof game.win === "function" ? game.win(this.human) : void 0) {
        return depth - 10;
      } else {
        return 0;
      }
    };

    TicTacToe.prototype._minimax = function(game, depth) {
      var max_score, moves, scores;
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
        return max_score = Math.max(scores);
      }
    };

    getMaxOfArray = function(numArray) {};

    return TicTacToe;

  })();
  Math.max.apply(null, numArray);
  $.fn[pluginName] = function(options) {
    var args, sliders, _;
    sliders = this.length;
    _ = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.each(function(index) {
      var instance, key, me, plugin;
      me = $(this);
      plugin = $.data(this, "plugin_" + pluginName);
      if (!plugin) {
        key = "suraido" + (sliders > 1 ? '-' + ++index : '');
        instance = new Furatto.Suraido(this, options);
        return me.data(key, instance).data('key', key);
      } else if ((plugin[_] != null) && $.type(plugin[_]) === 'function') {
        return plugin[_].apply(plugin, args);
      }
    });
  };
  return $(document).ready(function() {
    return $('[data-suraido]').each(function() {
      return $(this).suraido();
    });
  });
})($, window, document);
