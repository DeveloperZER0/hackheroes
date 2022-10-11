<script>
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import mapMarker from './mapMarker.vue';

export default {
  components: { mapMarker },
  name: "LeafletMap",
  data() {
    return {
      map: null,
      markers: [
        {id: 1, lat: 51.5, lon: 19.4803067985, desc: 'A pretty CSS3 popup.<br> Easily customizable.'},
        {id: 2, lat: 45.5, lon: 19.4803067985, desc: 'A pretty CSS3 popup.<br> Easily customizable.'},
        {id: 3, lat: 30.5, lon: 19.4803067985, desc: 'A pretty CSS3 popup.<br> Easily customizable.'},
      ],
    };
  },
  mounted() {
    this.map = L.map("map").setView([51.5, -0.09], 5);
    this.map.flyTo([52.0692924089, 19.4803067985], 6.75);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    
    for (let i = 0; i <= this.markers.length; i++) {
      L.marker([this.markers[i].lat, this.markers[i].lon]).addTo(this.map).bindPopup(this.markers[i].desc).openPopup();
      console.log(this.markers[i].id);
    }
  },
}

</script>

<template>
     <div id="map" v-if="markers.length"></div>
</template>

<style scoped>
#map{
  height: 100vh;
}
</style>
