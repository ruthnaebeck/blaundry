/* global Phaser */

var BearClothes = BearClothes || {}

BearClothes.game = new Phaser.Game(800, 600, Phaser.AUTO, '')
BearClothes.game.state.add('Boot', BearClothes.Boot)


BearClothes.game.state.start('Boot')
