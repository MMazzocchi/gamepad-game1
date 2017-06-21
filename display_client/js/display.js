$(function() {
  function setupDisplay() {
    var renderer = new THREE.WebGLRenderer();
  };

  function setupPlayerList(player_list, client) {

    var html = "<h1>Select player ID:</h1>";
    for(var i = 0; i < player_list.length; i++) {
      html += '<div><a class="btn btn-default choose-player-btn">'+
              player_list[i]+
              '</a></div>';
    }

    $('#content')[0].innerHTML = html;

    $('.choose-player-btn').click(function(e) {
      e.preventDefault();
      var player_id = e.target.innerHTML;

      $('#content')[0].innerHTML = "";

      client.selectPlayer(player_id);
    });
  };

  var client = new DisplayClient();
  client.onPlayerList(function(player_list) {
    setupPlayerList(player_list, client);
  });
});
