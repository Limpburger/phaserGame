var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

function preload() {
    game.load.tilemap('myMap', 'myMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('myMap2', 'myMap2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'tiles.png');
    game.load.spritesheet('player', 'player.png', 32, 32);
}

function create() {
    // Create myMap and myMap2
    var map1 = game.add.tilemap('map1');
    var map2 = game.add.tilemap('map2');
    

    // Add the tilesets to the maps
    myMap.addTilesetImage('tiles', 'tiles');
    myMap2.addTilesetImage('tiles', 'tiles');

    // Create the layers for the maps
    var layer1 = map1.createLayer('layer1');
    var layer2 = map2.createLayer('layer1');
    

    // Set the initial position of the player on myMap
    player = game.add.sprite(100, 100, 'player');
}

// Add collision detection to the door tile on myMap
myMap.setTileIndexCallback(3, function() {
    // Move the player to the door tile on myMap2
    player.x = myMap2.tileToWorldX(5);
    player.y = myMap2.tileToWorldY(5);

    // Switch to myMap2
    layer1.visible = false;
    layer2.visible = true;
}, this);

// Add collision detection to the door tile on myMap2
myMap2.setTileIndexCallback(3, function() {
    // Move the player to the door tile on myMap
    player.x = myMap.tileToWorldX(5);
    player.y = myMap.tileToWorldY(5);

    // Switch to myMap
    layer1.visible = true;
    layer2.visible = false;
}, this);

// Add movement logic to move the player to the right when the player is positioned on the door tile in myMap
game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () {
    if (player.x == myMap.tileToWorldX(5) && player.y == myMap.tileToWorldY(5)) {
        player.x += 32; // move the player to the right
    }
}, this);



