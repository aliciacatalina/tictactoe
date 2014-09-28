(($, window, document) ->
  "use strict"

  pluginName = 'tictactoe'

  defaults =
    size: 3
    computer: 'x'
    user: 'o'
    first_turn: 'human'

  class TicTacToe
    constructor: (@el, options) ->
      #board element
      @$el = $(@el)
      @turn = defaults['first_turn']
      @game_board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]

      #merges options
      @options = $.extend {}, defaults, options

    _change_turn: () =>
      if @turn == 'human'
        @turn = 'computer'
      else
        @turn = 'human'

    #function to get state of board
    _get_state: (game_board) =>
      i = 0
      while i < gameBoard.length
        return gameBoard[i][0]  unless gameBoard[i][0] is ''  if gameBoard[i][0] is gameBoard[i][1] and gameBoard[i][1] is gameBoard[i][2]
        i++
      return

    # function to verify game state
    _score: (game) =>
      if game.win?(@computer)
        return 10 - depth
      else if game.win?(@human)
        return depth - 10
      else
        return 0

    #Minimax algorithm function
    _minimax: (game, depth) =>
      return _score(game) if game.over?
      depth += 1
      scores = []
      moves = []

      $.each @_possible_moves(game), (index, move) ->
        possible_game = @_get_next_state(move)
        scores.push(@_minimax(possible_game, depth))
        moves.push(move)

      if game.turn == @human
        max_score = getMaxOfArray(scores)
        max_score_index = scores.indexOf(max_score)
        @choice = moves[max_score_index]
        return max_score
      else
        min_score = getMinOfArray(scores)
        min_score_index = scores.indexOf(min_score)
        @choice = moves[min_score_index]
        return min_score
    
    #Function to get maximum element of an array
    getMaxOfArray = (numArray) ->
      Math.max.apply null, numArray

    #Function to get minimum element of an array
    getMinOfArray = (numArray) ->
      Math.min.apply null, numArray


  $.fn[pluginName] = (options) ->
    boards = this.length
    [_, args...] = arguments
    @each (index) ->
      me = $(@)
      plugin = $.data @, "plugin_#{pluginName}"

      unless plugin
        key = "tictactoe#{if boards > 1 then '-' + ++index else ''}"
        instance = new TicTacToe(@, options)
        me.data(key, instance).data('key', key)
      else if plugin[_]? and $.type(plugin[_]) == 'function'
        plugin[_].apply plugin, args


  $(document).ready ->
    $('[data-tictactoe]').each ->
      $(@).tictactoe()

) $, window, document
