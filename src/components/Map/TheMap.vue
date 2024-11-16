<template>
<div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
</div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
config.apiKey = 'I13a36UYaY7TpmsPixKu';

const initialState = { lng: 5.039249, lat: 47.321758, zoom: 12 };

map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
}));

new Marker({color: "#FF0000"})
.setLngLat([5.039249,47.321758])
.addTo(map.value);

}),
onUnmounted(() => {
map.value?.remove();
})
</script>

<style scoped>
.map-wrap {
position: relative;
width: 100%;
height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
}

.map {
position: absolute;
width: 100%;
height: 100%;
}
</style>