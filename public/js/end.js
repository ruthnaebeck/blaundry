/* global */

var BearClothes = BearClothes || {}
BearClothes.End = function () { }
BearClothes.End.prototype = {
  init: function(score){
    this.score = score || 0
    this.highestScore = window.localStorage.highestScore || 0
    this.highestScore = Math.max(score, this.highestScore)
    window.localStorage.highestScore = this.highestScore
  },
  create: function () {
    // Replay
    this.game.input.onTap.add(this.listener, this)
    // Game World
    var height = this.game.world.height
    this.background = this.game.add.sprite(0, 0, 'wall')
    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    var ground = this.platforms.create(0, height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true
    var ledge = this.platforms.create(400, 400, 'ground')
    ledge.body.immovable = true
    ledge = this.platforms.create(-150, 250, 'ground')
    ledge.body.immovable = true
    // Score
    this.scoreText = this.game.add.text(
      16, height - 50, `Score: ${this.score}`, { fontSize: '32px', fill: '#fff' })
    var text = 'Game Over'
    var style = { font: '35px Arial', fill: '#000', align: 'center' }
    var aText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 50, text, style)
    aText.anchor.set(0.5)
    text = 'Click to Replay'
    style = { font: '15px Arial', fill: '#000', align: 'center' }
    var cText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 20, text, style)
    cText.anchor.set(0.5)
    text = 'Your Highest Score: ' + this.highestScore
    style = { font: '20px Arial', fill: '#000', align: 'center' }
    var hText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 10, text, style)
    hText.anchor.set(0.5)
  },
  listener(){
    this.game.state.start('Game')
  }
}
