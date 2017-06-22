var Game = function(renderer, client) {
  console.log("Making a new game!");

  this.renderer = renderer;
  this.camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.z = 1000;

//  this.controls = new THREE.DeviceOrientationControls(camera);
  this.scene = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(200, 200, 200);
  var material = new THREE.MeshBasicMaterial(
    { color: 0xff0000, wireframe: true } );
 
  this.mesh = new THREE.Mesh(geometry, material);
  this.scene.add(this.mesh);

  this.render();
};

Game.prototype.render = function() {
  this.renderer.render(this.scene, this.camera);

  this.mesh.rotation.y += 0.01;

  var game = this;
  window.requestAnimationFrame(function() {
    game.render();
  });
};

Game.prototype.setSize = function(width, height) {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
};
