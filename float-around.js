var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update});

function preload() {
    game.load.image('marshall', './assets/marshall_bighair_eyesright.png');
    game.load.image('laser', './assets/Laser.png');
    game.load.image('background', './assets/background.png');
}

var marshall;
var cursor;
var spacebar;
function create() {

    game.add.tileSprite(0,0, 800, 600,'background');
    marshall = game.add.sprite(game.world.centerX, game.world.centerY, 'marshall');
     //  We're going to be using physics, so enable the Arcade Physics system
game.physics.startSystem(Phaser.Physics.ARCADE);
    //  And enable the Sprite to have a physics body:
    game.physics.arcade.enable(marshall);

    marshall.body.bounce.y = 0.2;

    marshall.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    lasers = game.add.group();
    
    lasers.enableBody = true;
}

var lastShotTime = Date.now();
var SHOTDELAY = 250;
var SHOTSPEED = 500;
function update() {
        //  Reset the marshalls velocity (movement)
        marshall.body.velocity.x = 0;
        marshall.body.velocity.y = 0;
    
        if (cursors.left.isDown)
        {
            //  Move to the left
            marshall.body.velocity.x = -150;

            marshall.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            marshall.body.velocity.x = 150;

            marshall.animations.play('right');
        }
        else if (cursors.down.isDown)
        {
            marshall.body.velocity.y = 150
        }
        else
        {
            //  Stand still
            marshall.animations.stop();
            marshall.frame = 4;
        }

        //  Allow the marshall to jump if they are touching the ground.
        if (cursors.up.isDown)
        {
            marshall.body.velocity.y = -150;
        }
    
        timeSinceLastShot = Date.now() - lastShotTime;
        if (spacebar.isDown && timeSinceLastShot > SHOTDELAY)
        {
            lastShotTime = Date.now();
            lastShot = Date.now;
            var laser1 = lasers.create(marshall.body.x + 25, marshall.body.y + 12, 'laser');
            
            var laser2 = lasers.create(marshall.body.x + 12, marshall.body.y + 13, 'laser');
            game.physics.arcade.enable(laser1);
            game.physics.arcade.enable(laser2);
            laser1.body.velocity.x = SHOTSPEED;
            laser2.body.velocity.x = SHOTSPEED;
        }
}