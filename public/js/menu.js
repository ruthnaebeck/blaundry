/* global */

var BearClothes = BearClothes || {}
BearClothes.Menu = function () { }
BearClothes.Menu.prototype = {
  create: function () {
    this.bearcub = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'bearcub')
    this.bearcub.anchor.set(0.5)
    var text = 'Help the Bear Gather as'
    var style = { font: '25px Arial', fill: '#fff', align: 'center' }
    var aText = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style)
    aText.anchor.set(0.5)
    text = 'Many Clothes as Possible!'
    var bText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 30, text, style)
    bText.anchor.set(0.5)
    text = 'Click to Start'
    style = { font: '15px Arial', fill: '#fff', align: 'center' }
    var cText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 70, text, style)
    cText.anchor.set(0.5)
  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game')
    }
  }
}
