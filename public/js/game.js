/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update })

function preload() {
    var keys = ['sky', 'ground', 'star', 'clothes1', 'clothes2', 'clothes3', 'clothes4', 'clothes5', 'clothes6', 'clothes7', 'clothes8', 'clothes9', 'clothes10', 'clothes11', 'clothes12', 'clothes13', 'clothes14', 'clothes15', 'clothes16', 'clothes17', 'clothes18', 'clothes19', 'clothes20', 'clothes21', 'clothes22', 'clothes23']
    keys.forEach(key => game.load.image(key, `assets/${key}.png`))
    // for(var i = 0; i < keys.length; i++){
    //     console.log(keys[i])
    //     game.load.image(keys[i], 'assets/' + keys[i] + '.png')
    // }
    game.load.spritesheet('bear', 'assets/bear.png', 50, 59) // W x H of image on spritesheet
}

var platforms, player, cursors, spacebar, stars, clothes, counter, scoreText, timer, timerText
var score = 0
var total = 0

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky')
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group()
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground')
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2)
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground')
    ledge.body.immovable = true
    ledge = platforms.create(-150, 250, 'ground')
    ledge.body.immovable = true

    // The player and its settings
    // Add the bear sprite at position 32 x 450 (600-150)
    player = game.add.sprite(32, game.world.height - 150, 'bear')
    //  We need to enable physics on the player
    game.physics.arcade.enable(player)
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2
    player.body.gravity.y = 350
    player.body.collideWorldBounds = true
    // Two animations, walking left and right.
    // name of animation = left, pics on strip = arr, FPS = 10, Loop = true
    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)

    // Character movement (up, down, left, right)
    cursors = game.input.keyboard.createCursorKeys()
    spacebar = game.input.keyboard.addKey(32)

    // stars = game.add.group()
    // counter = 0
    // stars.enableBody = true
    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++){
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(i * 70, 0, 'star')
    //     counter++
    //     //  Let gravity do its thing
    //     star.body.gravity.y = 6
    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2
    // }
    clothes = game.add.group()
    counter = 0
    clothes.enableBody = true
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++){
        var piece = 'clothes' + Math.floor(Math.random() * 23 + 1)
        console.log(piece)
        var item = clothes.create(i * 70, 0, piece)
        counter++
        //  Let gravity do its thing
        item.body.gravity.y = 6
        //  This just gives each star a slightly random bounce value
        item.body.bounce.y = 0.7 + Math.random() * 0.2
    }
    // Diamonds
    // diamonds = game.add.group()
    // diamonds.enableBody = true
    // for (i = 0; i < 2; i++){
    //     var diamond = diamonds.create((i + 1) * 300, 0, 'diamond')
    //     counter++
    //     diamond.body.gravity.y = 3
    //     diamond.body.bounce.y = 0.7 + Math.random() * 0.2
    // }
    // Score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })
    // Timer
    timerText = game.add.text(600, 16, 'Timer: 0', { fontSize: '32px', fill: '#000' })
    timer = game.time.create(false)
    timer.loop(1000, updateTimer, this)
    timer.start()
}

function update() {
    console.log('Still updating')
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms)

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0
    if (cursors.left.isDown){
        //  Move to the left
        player.body.velocity.x = -150
        player.animations.play('left')
    }else if (cursors.right.isDown){
        //  Move to the right
        player.body.velocity.x = 150
        player.animations.play('right')
    }else{
        //  Stand still
        player.animations.stop()
        player.frame = 4
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform){
        player.body.velocity.y = -350
    }
    if (spacebar.isDown && player.body.touching.down && hitPlatform){
        player.body.velocity.y = -350
    }

    // Stars
    game.physics.arcade.collide(clothes, platforms)
    game.physics.arcade.overlap(player, clothes, collectStar, null, this)

    // End of Game
    if(!counter){
        counter++
        timer.stop()
        score += 100 - total
        scoreText.text = 'Score: ' + score
        game.add.text(350, 200, 'Game Over', { fontSize: '32px', fill: '#000' })
        player.destroy()
        game.lockRender = true
        // Enables debugging step method
        game.enableStep()
    }
}

function collectStar (plyr, pc) {
    // Removes the star from the screen
    pc.destroy()
    counter--
    //  Add and update the score
    score += 10
    scoreText.text = 'Score: ' + score
}

function updateTimer(){
    total++
    timerText.text = 'Timer: ' + total
}
