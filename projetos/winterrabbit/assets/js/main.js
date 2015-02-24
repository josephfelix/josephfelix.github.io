/**
* +-------------------------------------------+
* |     Desenvolvido por: Joseph Felix        |
* |    http://www.facebook.com/Joseph0xfff    |
* |        http://josephfelix.github.io       |
* |               24/02/2015                  |
* +-------------------------------------------+
*/

var lastKey = '', blockJump = false, isPlaying = false;
var SnowEffect = 
{
	load: function()
	{
		game.load.spritesheet('snowflakes', 'assets/img/Snowflake.png', 17, 17);
		game.load.spritesheet('snowflakes-large', 'assets/img/Snowflake-large.png', 64, 64);
	},
	start: function()
	{
		var Snow;
		Snow = game.add.emitter(game.world.centerX, -32, 600);
		Snow.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
		Snow.maxParticleScale = 0.6;
		Snow.minParticleScale = 0.2;
		Snow.setYSpeed(20, 100);
		Snow.gravity = 0;
		Snow.width = game.world.width * 1.5;
		Snow.fixedToCamera = true;
		Snow.minRotation = 0;
		Snow.maxRotation = 40;
		Snow.start(false, 14000, 20);
	}
};

var BellsEffect = 
{
	bells: false,
	load: function()
	{
		game.load.image('bell', 'assets/img/bell.png');
	},
	start: function()
	{		
		BellsEffect.bells = game.add.group();
		BellsEffect.bells.enableBody = true;
		BellsEffect.bells.createMultiple( 10, 'bell' );

		this.bellsCreateOne( game.rnd.between( 20, game.world.width - 50 ), game.world.width/2 );
		for ( var i = 1; i <= 7; i++ )
		{
			this.bellsCreateOne( game.rnd.between( 50, game.world.width - 50), i*50 );
		}
	},
	bellsCreateOne: function( x, y )
	{
		var bell = BellsEffect.bells.getFirstDead();
		game.physics.arcade.collide(BellsEffect.bells, bell);
		bell.anchor.set(0.5);
		bell.reset( x, y );
		bell.body.checkCollision.up = true;
		bell.body.checkCollision.left = true;
		bell.body.checkCollision.right = true;
		/* bell.scale.x = 1;
		bell.scale.y = 1; */
		bell.body.immovable = true;
		/* bell.body.allowGravity = true;
		bell.body.gravity.y = 100;
		bell.body.velocity.y = 10; */
		return bell;
	}
};
var WinterBells = 
{
	rabbit: false,
	points: 0,
	start: function()
	{
		if ( !isPlaying )
			document.getElementById('background_music').play();
		WinterBells.copyrightText.visible = false;
		WinterBells.startBtn.visible = false;
		WinterBells.gameName.visible = false;
		WinterBells.startGame = true;
		
		BellsEffect.start();
		SnowEffect.start();
		WinterBells.pointsLabel = game.add.text(0, 0, "Pontos: " + WinterBells.points, { font: "20px Arial", fill: "#fff" });
		WinterBells.pointsLabel.fixedToCamera = true;
	},
	preload: function()
	{
		/* Background */
		game.load.image('background', 'assets/img/background.jpg');
		/* */
		
		/* Botão jogar */
		game.load.spritesheet('btn-jogar', 'assets/img/btn-jogar.png');
		/* */
		
		/* Snow */
		SnowEffect.load();
		/* */
		
		game.load.spritesheet('rabbit', 'assets/img/rabbit.png', 50, 45, 6);
		
		BellsEffect.load();
	},
	create: function()
	{
		WinterBells.startGame = false;
		game.add.tileSprite(0, 180, 800, 500, 'background');
	
		WinterBells.gameName = this.game.add.text(this.game.width/2, this.game.height/5, "Winter's Rabbit", 
		{ font: "50px Arial", fill: "#fff", align: "center" });
		WinterBells.gameName.anchor.set(0.5);
		
		WinterBells.copyrightText = this.game.add.text(this.game.width/2, this.game.height/3, "Desenvolvido por: Joseph F.", { font: "20px Arial", fill: "#fff", align: "center" });
		WinterBells.copyrightText.anchor.set(0.5);
		
		WinterBells.startBtn = game.add.button(this.game.width/2, this.game.height/2, 'btn-jogar', WinterBells.start, this, 2, 1, 0);
		WinterBells.startBtn.anchor.set(0.5);
		
		WinterBells.rabbit = game.add.sprite(this.game.width/2, this.game.height-20, 'rabbit');
		WinterBells.rabbit.anchor.set(0.5);
		WinterBells.rabbit.animations.add('walk-left', [1,2,0]);
		WinterBells.rabbit.animations.add('walk-right', [4,5,3]);
		WinterBells.rabbit.animations.add('jump-left', [1,1,2,0]);
		WinterBells.rabbit.animations.add('jump-right', [4,4,5,3]);
		
		// track where the hero started and how much the distance has changed from that point
		WinterBells.rabbit.yOrig = WinterBells.rabbit.y;
		WinterBells.rabbit.yChange = 0;

		game.physics.enable(WinterBells.rabbit, Phaser.Physics.ARCADE);
		WinterBells.rabbit.body.gravity.y = 500;
		WinterBells.rabbit.body.checkCollision.up = false;
		WinterBells.rabbit.body.checkCollision.left = true;
		WinterBells.rabbit.body.checkCollision.right = true;
		WinterBells.rabbit.body.collideWorldBounds = true;
		
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.maxWidth = this.game.width;
		this.scale.maxHeight = this.game.height;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize( true );
		this.physics.startSystem( Phaser.Physics.ARCADE );
		this.cameraYMin = 999999;
		this.platformYMin = 99999;
		
		
		this.cursor = game.input.keyboard.createCursorKeys();
		
		/* this.textSprite = this.add.sprite(this.game.width/2, this.game.height/2, null);
		this.textSprite.anchor.set(0.5);
		this.textSprite.addChild(texto);
		game.physics.enable(this.textSprite, Phaser.Physics.ARCADE); */
	},
	update: function()
	{
		if ( WinterBells.startGame )
		{
			this.world.setBounds( 0, -WinterBells.rabbit.yChange, game.world.width, game.height + WinterBells.rabbit.yChange );

			this.cameraYMin = Math.min( this.cameraYMin, WinterBells.rabbit.y - game.height + 130 );
			this.camera.y = this.cameraYMin;

			this.physics.arcade.collide( WinterBells.rabbit, BellsEffect.bells, function()
			{
				if ( blockJump )
				{
					WinterBells.rabbit.body.velocity.y = -300;
					WinterBells.points++;
					WinterBells.pointsLabel.text = "Pontos: " + WinterBells.points;
					blockJump = false;
				}
			});
			
			
			if ( this.cursor.left.isDown )
			{
				lastKey = 'left';
				WinterBells.rabbit.animations.play('walk-left', 5, false);
				WinterBells.rabbit.body.velocity.x = -350;
			} else if( this.cursor.right.isDown )
			{
				lastKey = 'right';
				WinterBells.rabbit.animations.play('walk-right', 5, false);
				WinterBells.rabbit.body.velocity.x = 350;
			} else
			{
				WinterBells.rabbit.body.velocity.x = 0;
			}

			if ( this.cursor.up.isDown && blockJump == false )
			{
				if ( lastKey == 'left' )
					WinterBells.rabbit.animations.play('jump-left', 5, false);
				else
					WinterBells.rabbit.animations.play('jump-right', 5, false);
			  WinterBells.rabbit.body.velocity.y = -500;
			  blockJump = true;
			} 
			
			game.world.wrap( WinterBells.rabbit, WinterBells.rabbit.width / 2, false );

			WinterBells.rabbit.yChange = Math.max( WinterBells.rabbit.yChange, Math.abs( WinterBells.rabbit.y - WinterBells.rabbit.yOrig ) );
			
			if ( WinterBells.rabbit.y > this.cameraYMin + game.height && WinterBells.rabbit.alive )
			{
				WinterBells.points = 0;
				WinterBells.pointsLabel.text = "Pontos: " + WinterBells.points;
				blockJump = false;
				this.state.start( 'Play' );
			}
			
			
			BellsEffect.bells.forEachAlive( function( elem )
			{
				this.platformYMin = Math.min( this.platformYMin, elem.y );
				if ( elem.y > this.camera.y + game.height )
				{
					elem.kill();
					BellsEffect.bellsCreateOne( game.rnd.integerInRange( 0, game.world.width ), this.platformYMin - 100 );
				}
			}, this );
		}
	}
};

var game = new Phaser.Game(800, 580, Phaser.CANVAS, 'game');
game.state.add( 'Play', WinterBells );
game.state.start( 'Play' );