// /* global game */

var BearClothes = BearClothes || {}
BearClothes.Game = function () {}
BearClothes.Game.prototype = {
  create: function () {
    // this.game.world.setBounds(0, 0, 1920, 1920)
    this.background = this.game.add.sprite(0, 0, 'sky')
    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true
    var ledge = this.platforms.create(400, 400, 'ground')
    ledge.body.immovable = true
    ledge = this.platforms.create(-150, 250, 'ground')
    ledge.body.immovable = true
    // Player - Bear
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'bear')
    this.game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 350
    this.player.body.collideWorldBounds = true
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
    // Keyboard control
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spacebar = this.game.input.keyboard.addKey(32)
    // Clothes
    this.clothes = this.game.add.group()
    this.clothes.enableBody = true
    this.numClothes = 0
    this.addClothes()
    // Score
    this.scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })
    this.score = 0
    // Timer
    this.timerText = this.game.add.text(600, 16, 'Timer: 0:30', { fontSize: '32px', fill: '#000' })
    this.time = 30
    this.timer = this.game.time.create(false)
    this.timer.loop(1000, this.updateTimer, this)
    this.timer.start()
  },
  update: function () {
    console.log('Still updating')
    // Player - Bear
    var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms)
    this.player.body.velocity.x = 0
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
      this.player.animations.play('left')
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
      this.player.animations.play('right')
    } else {
      this.player.animations.stop()
    }
    if ((this.cursors.up.isDown || this.spacebar.isDown)
      && this.player.body.touching.down && hitPlatform) {
      this.player.body.velocity.y = -350
      this.player.frame = 4
    }
    // Clothes
    this.game.physics.arcade.collide(this.clothes, this.platforms)
    this.game.physics.arcade.overlap(this.player, this.clothes, this.getClothes, null, this)
    if (this.numClothes < 100) this.addClothes()
    // End of Game
    if (!this.time) this.gameOver()
  },
  addClothes: function () {
    if (this.clothes) {
      let piece = 'clothes' + Math.floor(Math.random() * 23 + 1)
      let item = this.clothes.create(this.game.world.randomX, 0, piece)
      this.numClothes++
      item.body.gravity.y = 6
      item.body.bounce.y = 0.7 + Math.random() * 0.2
    }
  },
  getClothes: function (plyr, pc) {
    pc.destroy()
    this.numClothes--
    this.score += 10
    this.scoreText.text = 'Score: ' + this.score
  },
  updateTimer: function () {
    this.time--
    this.timerText.text = this.time > 9 ?
      `Timer: 0:${this.time}` : `Timer: 0:0${this.time}`
  },
  gameOver: function() {
    this.timer.stop()
    this.game.add.text(350, 200, 'Game Over', { fontSize: '32px', fill: '#000' })
    this.player.kill()
    this.game.state.start('Menu', true, false, this.score)
  }
}
