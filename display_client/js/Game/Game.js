var Game = function(renderer, client) {
  console.log("Making a new game!");
  this.client = client;
  this.renderer = renderer;

  this.effect = new THREE.StereoEffect(this.renderer);
  this.effect.setSize(window.innerWidth, window.innerHeight);

  this.camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.z = 1000;

  this.controls = new THREE.DeviceOrientationControls(this.camera);
  this.scene = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(200, 200, 200);
  var material = new THREE.MeshBasicMaterial(
    { color: 0xff0000, wireframe: true } );
 
  this.mesh = new THREE.Mesh(geometry, material);
  this.scene.add(this.mesh);

  this.render();
};

Game.prototype.render = function() {
  this.controls.update();
  this.effect.render(this.scene, this.camera);

  var dyr = this.client.getState('axis', 0);
  if(dyr != undefined) {
    this.mesh.rotateOnAxis(
      this.mesh.worldToLocal(new THREE.Vector3(0, 1, 0)),
      dyr*0.5);
  }

  var dxr = this.client.getState('axis', 1);
  if(dxr != undefined) {
    this.mesh.rotateOnAxis(
      this.mesh.worldToLocal(new THREE.Vector3(1, 0, 0)),
      dxr*0.5);
  }

  var game = this;
  window.requestAnimationFrame(function() {
    game.render();
  });
};

Game.prototype.setSize = function(width, height) {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.effect.setSize(window.innerWidth, window.innerHeight);
};
