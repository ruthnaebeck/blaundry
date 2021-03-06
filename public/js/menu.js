/* global */

var BearClothes = BearClothes || {}
BearClothes.Menu = function () { }
BearClothes.Menu.prototype = {
  create: function () {
    this.game.input.onTap.add(this.listener, this)
    this.bearcub = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'bearcub')
    this.bearcub.anchor.set(0.5)
    var text = 'BLaundry'
    var style = { font: '40px Arial', fill: '#fff', align: 'left' }
    var title = this.game.add.text(
      this.game.width / 2, this.game.height / 2, text, style)
    title.anchor.set(0.5)
    text = 'Help the Bear Gather as'
    style = { font: '25px Arial', fill: '#fff', align: 'center' }
    var aText = this.game.add.text(
      this.game.width / 2, this.game.height / 2 + 50, text, style)
    aText.anchor.set(0.5)
    text = 'Many Clothes as Possible!'
    var bText = this.game.add.text(
      this.game.width / 2, this.game.height / 2 + 75, text, style)
    bText.anchor.set(0.5)
    text = 'Click to Start'
    style = { font: '15px Arial', fill: '#fff', align: 'center' }
    var cText = this.game.add.text(
      this.game.width / 2, this.game.height / 2 + 115, text, style)
    cText.anchor.set(0.5)
  },
  listener(){
    this.game.state.start('Game')
  }
}
