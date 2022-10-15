<script>
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
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
  },
  async mounted() {
    await this.getData();
    this.map = L.map("map").setView([51.5, -0.09], 5);
    this.map.flyTo([52.0692924089, 19.4803067985], 6.75);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {}).addTo(this.map);
    if(this.markers.length != 0) {
      for (let i = 0; i <= this.markers.length-1; i++) {
      L.marker([this.markers[i].lat, this.markers[i].lon]).addTo(this.map).bindPopup(this.markers[i].desc).openPopup();
    }
    }
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
