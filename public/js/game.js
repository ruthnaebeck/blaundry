/* global Phaser game */

var platforms, player, cursors, spacebar, clothes, scoreText, timer, timerText
var score = 0
var total = 30
var numClothes = 0

var main = {
    preload: () => {
        var keys = ['sky', 'ground', 'clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6', 'clothes7', 'clothes8', 'clothes9', 'clothes10', 'clothes11', 'clothes12', 'clothes13', 'clothes14', 'clothes15', 'clothes16', 'clothes17', 'clothes18', 'clothes19', 'clothes20', 'clothes21', 'clothes22', 'clothes23']
        keys.forEach(key => game.load.image(key, `assets/${key}.png`))
        game.load.spritesheet('bear', 'assets/bear.png', 50, 59)
    },
    create: () => {
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.add.sprite(0, 0, 'sky')
        platforms = game.add.group()
        platforms.enableBody = true
        var ground = platforms.create(0, game.world.height - 64, 'ground')
        ground.scale.setTo(2, 2)
        ground.body.immovable = true
        var ledge = platforms.create(400, 400, 'ground')
        ledge.body.immovable = true
        ledge = platforms.create(-150, 250, 'ground')
        ledge.body.immovable = true
        // Player - Bear
        player = game.add.sprite(32, game.world.height - 150, 'bear')
        game.physics.arcade.enable(player)
        player.body.bounce.y = 0.2
        player.body.gravity.y = 350
        player.body.collideWorldBounds = true
        player.animations.add('left', [0, 1, 2, 3], 10, true)
        player.animations.add('right', [5, 6, 7, 8], 10, true)
        // Keyboard control
        cursors = game.input.keyboard.createCursorKeys()
        spacebar = game.input.keyboard.addKey(32)
        // Clothes
        clothes = game.add.group()
        clothes.enableBody = true
        addClothes()
        // Score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })
        // Timer
        timerText = game.add.text(600, 16, 'Timer: 0:30', { fontSize: '32px', fill: '#000' })
        timer = game.time.create(false)
        timer.loop(1000, updateTimer, this)
        timer.start()
    },
    update: () => {
        console.log('Still updating')
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms)

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0
        if (cursors.left.isDown) { //  Move to the left
            player.body.velocity.x = -150
            player.animations.play('left')
            // if (player.body.touching.down)
            // else player.frame = 0
        } else if (cursors.right.isDown) { //  Move to the right
            player.body.velocity.x = 150
            player.animations.play('right')
            // if (player.body.touching.down)
            // else player.frame = 4
        } else { //  Stand still
            player.animations.stop()
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350
            player.frame = 4
        }
        if (spacebar.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350
            player.frame = 4
        }

        // Stars
        game.physics.arcade.collide(clothes, platforms)
        game.physics.arcade.overlap(player, clothes, getClothes, null, this)

        if(numClothes < 100) addClothes()

        // End of Game
        if (!total) {
            timer.stop()
            total++
            game.add.text(350, 200, 'Game Over', { fontSize: '32px', fill: '#000' })
            player.destroy()
            game.enableStep() // Debugging step (stops update)
            clothes.destroy()
        }
    }
}

function addClothes() {
    if(clothes){
        let piece = 'clothes' + Math.floor(Math.random() * 23 + 1)
        let item = clothes.create(game.world.randomX, 0, piece)
        numClothes++
        item.body.gravity.y = 6
        item.body.bounce.y = 0.7 + Math.random() * 0.2
    }
}

function getClothes(plyr, pc) {
    pc.destroy()
    numClothes--
    score += 10
    scoreText.text = 'Score: ' + score
}

function updateTimer() {
    total--
    timerText.text = total > 9 ? `Timer: 0:${total}` : `Timer: 0:0${total}`
}

game.state.add('main', main)
game.state.start('main')
