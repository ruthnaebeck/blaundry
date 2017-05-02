// /* global game Phaser */

var BearClothes = BearClothes || {}
BearClothes.Game = function () {}
BearClothes.Game.prototype = {
  create: function () {
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
    this.popSound = this.game.add.audio('pop')
    // New Bear
    this.bear = this.game.add.sprite(32, height - 135, 'bear', '000.png')
    this.game.physics.arcade.enable(this.bear)
    this.bear.body.bounce.y = 0.2
    this.bear.body.gravity.y = 350
    this.bear.body.collideWorldBounds = true
    this.bear.animations.add('left', [6, 7, 8, 9], 10, true)
    this.bear.animations.add('right', [0, 1, 2, 3], 10, true)
    // Keyboard control
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spacebar = this.game.input.keyboard.addKey(32)
    // Clothes
    this.clothes = this.game.add.group()
    this.clothes.enableBody = true
    this.numClothes = 0
    this.addClothes()
    // Score
    this.scoreText = this.game.add.text(
      16, height - 50, 'Score: 0', { fontSize: '32px', fill: '#fff' })
    this.score = 0
    // Timer
    this.timerText = this.game.add.text(
      600, height - 50, 'Timer: 0:30', { fontSize: '32px', fill: '#fff' })
    this.time = 30
    this.timer = this.game.time.create(false)
    this.timer.loop(1000, this.updateTimer, this)
    this.timer.start()
  },
  update: function () {
    console.log('Still updating')
    // Player - Bear
    var hitPlatform = this.game.physics.arcade.collide(this.bear, this.platforms)
    this.bear.body.velocity.x = 0
    if (this.cursors.left.isDown) {
      this.bear.body.velocity.x = -150
      if(hitPlatform) this.bear.animations.play('left')
      else this.bear.frame = 10
    } else if (this.cursors.right.isDown) {
      this.bear.body.velocity.x = 150
      if(hitPlatform) this.bear.animations.play('right')
      else this.bear.frame = 5
    } else {
      this.bear.animations.stop()
      if(this.bear.animations.currentFrame.index < 6) this.bear.frame = 0
      else this.bear.frame = 6
    }
    if ((this.cursors.up.isDown || this.spacebar.isDown)
      && this.bear.body.touching.down && hitPlatform) {
      this.bear.body.velocity.y = -350
      if(this.bear.animations.currentFrame.index < 4) this.bear.frame = 5
      else this.bear.frame = 10
    }
    // Clothes
    this.game.physics.arcade.collide(this.clothes, this.platforms)
    this.game.physics.arcade.overlap(this.bear, this.clothes, this.getClothes, null, this)
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
    this.popSound.play()
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
    this.bear.kill()
    this.game.state.start('End', true, false, this.score)
  }
}
