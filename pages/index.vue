<script>
import {mapLeaflet} from '@/components/mapLeaf.vue'
import L, { marker, addLayer, latLng } from "leaflet";
var Marker;
var latCenter,lngCenter;
export default {
    data() {
        return {
            form:  [{id:1,is:'input',type:'text',label:'Tytuł zgłoszenia',itemId:'title'},
                    {id:2,is:'input',type:'text',label:'Koordynaty miejsca na mapie',itemId:'coords', readonly: true},
                    {id:3,is:'select',type:'',label:'Wybierz kategorię zgłoszenia',itemId:'select'}
            ],
            kategorie: [],
        };
    },
    methods: {
        async getData() {
            this.kategorie = await fetch("https://api-spotted-developerzer0.vercel.app/category").then((res) => res.json());
        },
        async sendData(data) {
            if (data != 0) {
                await fetch("https://api-spotted-developerzer0.vercel.app/receive", {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
                console.log(JSON.stringify(data));
            }
        },
        async center() {
            var koordynaty = document.getElementById("coords");
            latCenter = mapLeaflet.getCenter().lat;
            lngCenter = mapLeaflet.getCenter().lng;
            koordynaty.value = latCenter + "; " + lngCenter;
            
            //Marker.setLatLng([latCenter,lngCenter]).update();
        },
        /*async createMarker() {
            Marker = L.marker(mapLeaflet.getCenter()).addTo(mapLeaflet);
        },*/
        compData() {
            var cdesc = document.getElementById("title").value;
            var select = document.getElementById('select').value;
            if (cdesc != null || cdesc != undefined || cdesc != ''){
                var cdata = {"lat": latCenter,"lon": lngCenter,"desc": cdesc,"categoryType": select};
                return cdata;
            } else {
                return 0;
            }
            
        }
    },
    async mounted() {
        await this.getData();
        //this.createMarker();
    }
}

</script>
<template>
<div>
    <div>
        <div class="w-full h-screen grid bg-slate-600 mix-blend-multiply">
        <!-- <h1 class="text-slate-700 uppercase font-black text-9xl text-center m-auto mix-blend-multiply">SPOTTED</h1> --> 
        </div>
        <img src="~/assets/img/logo.png" alt="logo" class="m-auto absolute top-0 bottom-0 left-0 right-0"/>
    </div>
    <div class="grid w-full h-full bg-[#EEE7EF]">
        <div class="container w-full h-full m-auto">
            <div class="card flex box-border my-8 mx-auto w-full flex-col rounded-xl drop-shadow-lg p-3 bg-white">
                <div>
                    <img src="~/assets/img/plus.png" alt="plus" class="w-4 absolute z-50 left-0 right-0 m-auto top-0 box-content select-none pointer-events-none" id="plus"/>
                    <map-leaf class="rounded-lg z-10" @mousemove="center()" @touchmove="center()"></map-leaf>
                </div>
                
                <form class="card-form p-[2rem_1rem_0]">
			        <div v-for="item in form" class="input flex flex-col-reverse relative pt-6 mt-6" :key="item.id">
				        <input v-if="item.is === 'input'" :type="item.text" :id="item.itemId" class="border-[0] border-b-2 border-solid border-gray-400 text-lg py-1 px-0 focus:outline-0 valid:outline-0 peer" required v-bind:readonly='item.readonly'/>
                        <select v-if="item.is === 'select'" :id="item.itemId" class="border-[0] border-b-2 border-solid border-gray-400 text-lg py-1 px-0 focus:outline-0 valid:outline-0 peer" title="kategorie" required>
                            <option v-for="kat in kategorie" :value="kat.type">{{kat.type}}</option>
                        </select>
				        <label class="absolute transition-all top-6 text-gray-500 peer-focus:text-[#006B05] peer-valid:text-[#006B05] peer-focus:top-0 peer-valid:top-0 select-none pointer-events-none peer-read-only:top-0 peer-read-only:text-[#006B05]">{{item.label}}</label>
			        </div>
			        <div class="action mt-8">
				        <button type="button" class="action-button text-xl p-[1em] w-full font-medium bg-[#006B05] rounded-md text-white border-0 focus:outline-0" @click="sendData(compData())">Wyślij zgłoszenie</button>
			        </div>
		        </form>
            </div>
        </div>
    </div>
    
</div>
</template>
<style scoped>
#plus{
    transform: translateY(25vh);
}
</style>
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
scene.background = new THREE.Color( 0xaaddFF );
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

loader.load( '/models/low_poly_earth.gltf', function ( gltf ) {
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

    earth.scale.set( 3, 3, 3 );
    scene.add( earth );
}, undefined, function ( error ) {
	console.error( error );
} );

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