/* global Phaser */

var BearClothes = BearClothes || {}

BearClothes.game = new Phaser.Game(800, 600, Phaser.AUTO, '')
BearClothes.game.state.add('Boot', BearClothes.Boot)
BearClothes.game.state.add('Preload', BearClothes.Preload)
BearClothes.game.state.add('Menu', BearClothes.Menu)
BearClothes.game.state.add('Game', BearClothes.Game)

BearClothes.game.state.start('Boot')
