<script>
import "leaflet/dist/leaflet.css";
import L, { marker, addLayer } from "leaflet";
export default {
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  methods: {
    async getData() {
      this.markers = await fetch("https://hackheroesmarkers.onrender.com").then((res) => res.json());
    },
    async sendData(data = {}) {
      await fetch("https://hackheroesmarkers.onrender.com/receive", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    },
    addMarker(event) {
      L.marker(this.map.getCenter()).addTo(this.map);
      console.log(this.markers);
    }
  },
  async mounted() {
    this.map = L.map("map").setView([51.5, -0.09], 5).on('mousedown', this.addMarker);
    this.map.flyTo([52.0692924089, 19.4803067985], 6.75);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {}).addTo(this.map);
    await this.getData();
    if(this.markers.length != 0) {
      for (let i = 0; i <= this.markers.length-1; i++) {
      L.marker([this.markers[i].lat, this.markers[i].lon]).addTo(this.map).bindPopup(this.markers[i].desc + "<br>Kategoria: " + this.markers[i].categoryType);
    }}
    
  },
}
</script>

<template>
     <div id="map"></div>
</template>

<style scoped>
#map{
  height: 50vh;
}
</style>
