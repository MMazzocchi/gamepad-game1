$(function() {
  function setupGame() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var game = new Game(renderer, client);

    window.addEventListener( 'resize', function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      game.setSize(window.innerWidth, window.innerHeight);
    }, false );

    document.body.appendChild(renderer.domElement);

    return game;
  };

  function setupPlayerList(player_list, client) {

    var html = "<h1>Select player ID:</h1>";
    for(var i = 0; i < player_list.length; i++) {
      html += '<div><input type="button" class="choose-player-btn" value="'+
              player_list[i]+
              '"/></div>';
    }

    $('body')[0].innerHTML = html;

    $('.choose-player-btn').click(function(e) {
      e.preventDefault();
      var player_id = e.target.value;

      $('body')[0].innerHTML = "";

      client.selectPlayer(player_id);
      var game = setupGame(client);
    });
  };

  var client = new DisplayClient();
  client.onPlayerList(function(player_list) {
    setupPlayerList(player_list, client);
  });
});
