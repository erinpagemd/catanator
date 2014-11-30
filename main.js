//Define the main state

var main = {
  preload: function(){
    //This function will be executed at the beginning
      //That's where we load the game's assets
    //Load the paddle image
    game.load.image('paddle', 'assets/paddle.png');

    //Load the brick sprite
    game.load.image('brick', 'assets/brick.png');

    //Load the ball sprite
    game.load.image('ball', 'assets/ball.png');

    //Load the lava sprite
    game.load.image('lava', 'assets/lava.png');
  },

  create: function(){
    //This function is called after the preload function
      //Here we set up the game, display sprites, etc.

    //Initialize the physics system of the game
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Create a variable to handle the arrow keys
    this.cursor = game.input.keyboard.createCursorKeys();

    //Create the paddle at the bottom of the screen
    this.paddle = game.add.sprite(200, 400, 'paddle');

    //Create the lava at the bottom of the screen
    this.lava = game.add.sprite(0, 410, 'lava');

    //Enable the physics system for the paddle
    game.physics.arcade.enable(this.paddle);

    //Enable the physics system for the lava
    game.physics.arcade.enable(this.lava);

    //Make sure the paddle won't move when hit by the ball
    this.paddle.body.immovable = true;

    //Make sure the lava won't move when hit by the ball
    this.lava.body.immovable = true;

    //Create a group that will contain all the bricks
    this.bricks = game.add.group();
    this.bricks.enableBody = true;

    //Create the bricks
    for (var i=0; i<5; i++)
      for (var j=0; j<5; j++)
        game.add.sprite(55+i*60, 55+j*35, 'brick', 0, this.bricks);

    //make sure the bricks won't move
    this.bricks.setAll('body.immovable', true);

    //create the ball with physics
    this.ball = game.add.sprite(200, 300, 'ball');
    game.physics.arcade.enable(this.ball);

    //add velocity to the ball
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;

    //make the ball bouncy
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.x = 1;
    this.ball.body.bounce.y = 1;
  },

  update: function(){
    //This function is called 60 times per second
      //It contains the game's logic

    //If the right arrow is pressed move the paddle to the right
    if (this.cursor.right.isDown)
      this.paddle.body.velocity.x = 350;

    //if the left arrow is pressed, move left
    else if (this.cursor.left.isDown)
      this.paddle.body.velocity.x = -350;

    //if no arrow is pressed, stop moving
    else
      this.paddle.body.velocity.x = 0;

    //make the paddle and the ball collide
    game.physics.arcade.collide(this.paddle, this.ball);

    //make the ball and the lava collide


    //call the death function when the ball hits lava
    game.physics.arcade.collide(this.ball, this.lava, this.death, null, this);

    //call the hit function when the ball hits a brick
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
  },

  hit: function(ball, brick){
    //when the ball hits a brick, kill the brick
    brick.kill();
  },

  death: function(ball, lava){
    //when the ball hits lava, kill the ball
    ball.kill();
  }
};

//Initialize phaser and start our main state
var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');
