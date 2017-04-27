/* global */

var BearClothes = BearClothes || {}
BearClothes.Menu = function () { }
BearClothes.Menu.prototype = {
  init: function(score){
    score = score || 0
    this.highestScore = this.highestScore || 0
    this.highestScore = Math.max(score, this.highestScore)
  },
  create: function () {
    this.background = this.game.add.sprite(0, 0, 'sky')
    //start game text
    var text = 'Help the Bear Gather as Many Clothes as Possible!'
    var style = { font: '25px Arial', fill: '#fff', align: 'center' }
    var bText = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style)
    bText.anchor.set(0.5)
    text = 'Click to Start'
    style = { font: '15px Arial', fill: '#fff', align: 'center' }
    var cText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 30, text, style)
    cText.anchor.set(0.5)
    text = 'Highest score: ' + this.highestScore
    style = { font: '20px Arial', fill: '#fff', align: 'center' }
    var hText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 75, text, style)
    hText.anchor.set(0.5)
  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game')
    }
  }
}
