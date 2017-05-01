/* global */

var BearClothes = BearClothes || {}

BearClothes.Preload = function(){}

BearClothes.Preload.prototype = {
  preload: function() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
    this.splash.anchor.setTo(0.5)
    this.preloadBar = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar)
    //load game assets
    var keys = ['wall', 'ground', 'bearcub', 'bearJumpR', 'clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6', 'clothes7', 'clothes8', 'clothes9', 'clothes10', 'clothes11', 'clothes12', 'clothes13', 'clothes14', 'clothes15', 'clothes16', 'clothes17', 'clothes18', 'clothes19', 'clothes20', 'clothes21', 'clothes22', 'clothes23']
    keys.forEach(key => this.load.image(key, `assets/${key}.png`))
    this.load.spritesheet('bear1', 'assets/bear.png', 50, 59)
    this.load.audio('pop', 'assets/audio/pop.ogg')
    this.game.load.atlasJSONHash('bear', 'assets/atlas/bear.png', 'assets/atlas/bear.json')
  },
  create: function() {
    this.state.start('Menu')
  }
}
