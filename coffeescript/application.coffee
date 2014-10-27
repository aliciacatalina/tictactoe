(($, window, document) ->
  "use strict"
  #get game state
  #get available moves
  #minmax(moves)
  #choose move

  BLANK = ''

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

      @virtual_board = $('table')
      @rows = $('table tr')
      #merges options
      @options = $.extend {}, defaults, options
      #@_get_empty_cells(@game_board)
      @_update_board(@$el, @game_board)
      @_fill_board(@$el, @game_board)
      #@_choose_move(@$el, @game_board)


    _get_empty_cells: (game_board) =>
      counter = 9
      for row in game_board
        for col in row
          if col != ''
            counter = counter - 1
      return counter

    _fill_board: (table, game_board) =>
      board = @
      table.find('tr').map ->
        table.find('td').each (index)->
          row = $(@).data('row')
          col = $(@).data('col')
          #console.log row, col
          game_board[row][col] = $(@).text()


    _change_turn: (turn, board) =>
      if turn == 'human'
        @turn = 'computer'
      else
        @turn = 'human'

    _update_board: (table, game_board) =>
      board = @
      table.on 'click', (e) ->
        #event delegation
        if e.target && e.target.nodeName == 'TD' && e.target.innerHTML == BLANK
          if board.turn == 'human'
            $(e.target).addClass('human')
            e.target.innerHTML = 'O'
          else
            e.target.innerHTML = 'X'
          board._fill_board(table, game_board)
          winner = board._determine(game_board)
          unless winner is "notend"
            if winner is "draw"
              console.log "Draw!"
              $('.notice').html('Draw!')
            else
              console.log $('.notice')
              $('.notice').append("Winner is " + winner + " !")
              console.log "Winner is " + winner + " !!!"
          board._change_turn(board.turn, board)

    _determine: (game_board) =>
      board = @
      for row, i in game_board
        unless game_board[i][0] == BLANK
          if game_board[i][0] == game_board[i][1] and game_board[i][1] == game_board[i][2]
            return game_board[i][0] 

      for col, j in game_board
        console.log j
        unless game_board[0][j] == BLANK
          if game_board[0][j] == game_board[1][j] and game_board[1][j] == game_board[2][j]
            return game_board[0][j]

      unless game_board[1][1] == BLANK 
        if (game_board[0][0] is game_board[1][1] and game_board[1][1] is game_board[2][2]) or (game_board[0][2] is game_board[1][1] and game_board[1][1] is game_board[2][0])
          return game_board[1][1] 


      if board._get_empty_cells(game_board) == 0
        return 'draw'
      else
        return "notend"




    #function to get state of board
    _get_state: (game_board) ->
      i = 0

      while i < game_board.length
        return game_board[i][0]  unless game_board[i][0] is BLANK  if game_board[i][0] is game_board[i][1] and game_board[i][1] is game_board[i][2]
      i++
      j = 0

      while j < game_board[0].length
        return game_board[0][j]  unless game_board[0][j] is BLANK  if game_board[0][j] is game_board[1][j] and game_board[1][j] is game_board[2][j]
        j++
      return game_board[1][1]  unless game_board[1][1] is BLANK  if (game_board[0][0] is game_board[1][1] and game_board[1][1] is game_board[2][2]) or (game_board[0][2] is game_board[1][1] and game_board[1][1] is game_board[2][0])
      return "draw"  if blankCount is 0
      "notend"


    # function to verify game state
    _score: (game) =>
      if @_win('computer')
        return 10 - depth
      else if @_win('human')
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
