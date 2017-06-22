var Game = function(renderer, client) {
  console.log("Making a new game!");

  this.camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.z = 1000;
//  this.controls = new THREE.DeviceOrientationControls(camera);
  this.scene = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(200, 200, 200);
  var material = new THREE.MeshBasicMaterial(
    { color: 0xff0000, wireframe: true } );
 
  var mesh = new THREE.Mesh(geometry, material);
  this.scene.add(mesh);

  renderer.render(this.scene, this.camera);
};

Game.prototype.setSize = function(width, height) {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
};
