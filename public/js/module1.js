export function setUpOrbitalControls(camera, renderer, controls) {
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.campingFactor = 0.25;
  controls.enableZoom = true;
  return controls;
}

export function makeSceneBackgroundWhite(renderer) {
      renderer.setClearColor( 0xffffff, 0);
}
