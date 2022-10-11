<template>
<div>
    <div class="w-full h-screen grid grid-cols-3">
        <div class="grid col-start-1 col-end-2 bg-white rounded-r-3xl">
        <h1 class="text-slate-900 uppercase font-black text-8xl">SPOTTED</h1>
        </div>
    </div>
    <map-leaf></map-leaf>
</div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
renderer.physicallyCorrectLights = true;
camera.position.setZ(20);
scene.background = new THREE.Color( 0xffffff );
const loader = new GLTFLoader();
var earth;
renderer.render(scene,camera);

let light = new Array(5);

const intensity = 1;

light[0] = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, intensity);

light[1] = new THREE.AmbientLight( 0xffffff, 0.5);

light[2] = new THREE.DirectionalLight( 0xFF5862, intensity);
light[2].position.set( 1, 2, 4 );

light[3] = new THREE.DirectionalLight( 0xB7D9FF, intensity);
light[3].position.set( 0, 10, 9);

light[4] = new THREE.DirectionalLight( 0x5989FF, intensity);
light[4].position.set(-1, 4, -3 );

scene.add(light[0], light[1],light[2],light[3],light[4]);

loader.load( '/assets/models/low_poly_earth.gltf', function ( gltf ) {
    let obj = new Array(2);
    earth = gltf.scene;
    earth.traverse( child => {

        if ( child.material ) {
            child.material.metalness = 0;
            child.material.roughness = 0.4;
            child.castShadow = true;
            child.receiveShadow = false;
        }
    } );
    obj[0] = earth.getObjectByName('Sphere004_1');
    obj[1] = earth.getObjectByName('Sphere004');

    obj[0].material = new THREE.MeshPhongMaterial({
        color: 0x00FF00,
    });
    obj[1].material.color.setHex(0x00aaFF);

    earth.position.set( 5, 0, 0 );
    earth.scale.set( 3, 3, 3 );
    scene.add( earth );
}, undefined, function ( error ) {
	console.error( error );
} );
const geometry = new THREE.PlaneGeometry( 30, 15 );
const material = new THREE.MeshPhongMaterial({
  color: 'black',
  emissive: 0xB1E1FF,
  shininess: 50,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.position.set( 0, 0, -4 );
function animate() {
	requestAnimationFrame( animate );
    if (earth != null){
        earth.rotation.x += 0.0001;
        earth.rotation.y += 0.0002;
    }
	renderer.render( scene, camera );
}
animate();

</script>