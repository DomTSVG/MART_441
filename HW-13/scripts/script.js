/**
* Generate a scene object with a background color
**/

 function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

var model;
/**
* Generate the camera to be used in the scene. Camera args:
*   [0] field of view: identifies the portion of the scene
*     visible at any time (in degrees)
*   [1] aspect ratio: identifies the aspect ratio of the
*     scene in width/height
*   [2] near clipping plane: objects closer than the near
*     clipping plane are culled from the scene
*   [3] far clipping plane: objects farther than the far
*     clipping plane are culled from the scene
**/

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 5;
  return camera;
}

/**
 Generate the light to be used in the scene. Light args:
   [0]: Hexadecimal color of the light
   [1]: Numeric value of the light's strength/intensity
   [2]: The distance from the light where the intensity is 0
 @param {obj} scene: the current scene object
**/

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(0, 0, 10);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

/**
* Generate the renderer to be used in the scene
**/

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
* Generate the controls to be used in the scene
* @param {obj} camera: the three.js camera for the scene
* @param {obj} renderer: the three.js renderer for the scene
**/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

// ==================
// Load Emerald model
// ==================

function loadModel() {
  var loader = new THREE.OBJLoader();
  loader.load( 'emerald.obj', function ( object ) { //MODEL LOAD
    object.traverse( function (obj) {
      if (obj.isMesh){
        obj.material.color.set(0x32a852);
      }
      } );
    object.rotation.z = 1.5;
    object.rotation.x = 0.2;
    object.scale.x = 0.1;
    object.scale.y = 0.1;
    object.scale.z = 0.1;
    object.position.z = 0;
    object.position.y = -0.7;
    scene.add( object );
    document.querySelector('h1').style.display = 'none';
  } );
}
/**
* Render!
**/

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

// =========================
// Generate the other shapes
// =========================

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({
    color: 0x998d8d
});

var geometry2 = new THREE.ConeGeometry();
var material2 = new THREE.MeshBasicMaterial({
    color: 0xd1c5c5
});

var geometry3 = new THREE.CylinderGeometry();
var material3 = new THREE.MeshBasicMaterial({
    color: 0xd1c5c5
});

var cube = new THREE.Mesh(geometry, material);
cube.position.x = 0;
cube.position.y = 1;
cube.position.z = -0.3;

var cyl = new THREE.Mesh(geometry3, material3);
cyl.position.x = 0;
cyl.position.y = 2.7;
cyl.scale.y = 3;
cyl.position.z = -0.3;

var cone = new THREE.Mesh(geometry2, material2);
cone.position.x = 0;
cone.position.y = 0.1;
cone.rotation.x = 2.8;
cone.rotation.z = 0.01;

scene.add(cube);
scene.add(cone);
scene.add(cyl);

// =========================

// ==============
// Animate shapes
// ==============

function animate()  {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0;
    cone.rotation.y += 0.09;
    cyl.rotation.y += 0.09;
}



// ==============

loadModel();

render();

animate();
