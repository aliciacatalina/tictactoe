(($, window, document) ->
  "use strict"

  defaults =
    size: 3
    computer: 'x'
    user: 'o'

  class TicTacToe
    constructor: (@el, options) ->
      #board element
      @$el = $(@el)

      #merges options
      @options = $.extend {}, defaults, options

    # function to verify game state
    _score: (game) =>
      if game.win?(@computer)
        return 10 - depth
      else if game.win?(@human)
        return depth - 10
      else
        return 0

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
        max_score = Math.max(scores)

    getMaxOfArray = (numArray) ->
  Math.max.apply null, numArray

  $.fn[pluginName] = (options) ->
    sliders = this.length
    [_, args...] = arguments
    @each (index) ->
      me = $(@)
      plugin = $.data @, "plugin_#{pluginName}"

      unless plugin
        key = "suraido#{if sliders > 1 then '-' + ++index else ''}"
        instance = new Furatto.Suraido(@, options)
        me.data(key, instance).data('key', key)
      else if plugin[_]? and $.type(plugin[_]) == 'function'
        plugin[_].apply plugin, args


  $(document).ready ->
    $('[data-suraido]').each ->
      $(@).suraido()

) $, window, document
