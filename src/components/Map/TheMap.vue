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

onMounted(async () => {
    config.apiKey = 'I13a36UYaY7TpmsPixKu';

    const initialState = { lng: 5.039249, lat: 47.321758, zoom: 12 };

    map.value = markRaw(new Map({
        container: mapContainer.value,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
    }));

    try {
        const response = await fetch('http://10.21.105.75:45456/api/Sites');
        const sites = await response.json();
        console.log(sites);
        
        sites.forEach(site => {
            new Marker({
                color: site.production ? "#00FF00" : "#FF0000" // vert pour production, rouge sinon
            })
            .setLngLat([site.longitude, site.latitude])
            .addTo(map.value);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des sites:', error);
    }
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