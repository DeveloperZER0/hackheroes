<script>
import "leaflet/dist/leaflet.css";
import L, { marker, addLayer } from "leaflet";
export let mapLeaflet
export default {
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  methods: {
    async getData() {
      this.markers = await fetch("https://api-spotted-developerzer0.vercel.app/markers").then((res) => res.json());
    },
    addMarker(event) {
      L.marker(this.map.getCenter()).addTo(this.map);
      console.log(this.markers);
    }
  },
  async mounted() {
    var wypadek = L.divIcon({
	      className: 'ikona',
        html: "<div style='background-color:#FF0000;' class='marker-pin'></div><i class='material-icons'>car_crash</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
    var wydarzenie = L.divIcon({
	      className: 'ikona',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='material-icons'>celebration</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
    var obiekt = L.divIcon({
	      className: 'ikona',
        html: "<div style='background-color:#444444;' class='marker-pin'></div><i class='material-icons'>report_off</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
    
    this.map = L.map("map").setView([51.5, -0.09], 5);
    this.map.flyTo([52.0692924089, 19.4803067985], 6.75);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {}).addTo(this.map);
    await this.getData();
    
    if(this.markers.length != 0) {
      var ikona;
      for (let i = 0; i <= this.markers.length-1; i++) {
      console.log(this.markers[i].categoryType);
      if (this.markers[i].categoryType === "Wydarzenie") {
        ikona = wydarzenie;
      } else if (this.markers[i].categoryType === "Wypadek") {
        ikona = wypadek;
      } else if (this.markers[i].categoryType === "Obiekt nie istnieje") {
        ikona = obiekt;
      }
      L.marker([this.markers[i].lat, this.markers[i].lon], {icon: ikona}).addTo(this.map).bindPopup(this.markers[i].desc + "<br>Kategoria: " + this.markers[i].categoryType);
    }}
    mapLeaflet = this.map;
  },
}

</script>

<template>
     <div id="map"></div>
</template>

<style>
#map{
  height: 50vh;
}
.marker-pin {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}
.marker-pin::after {
    content: '';
    width: 24px;
    height: 24px;
    margin: 3px 0 0 3px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
 }

.ikona i {
   position: absolute;
   width: 22px;
   font-size: 22px;
   left: 0;
   right: 0;
   margin: 10px auto;
   text-align: center;
}
.ikona i.awesome {
   margin: 12px auto;
   font-size: 17px;
}
</style>
