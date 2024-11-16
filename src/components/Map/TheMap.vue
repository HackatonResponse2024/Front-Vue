<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { useSiteStore } from '@/stores/siteStore'

const mapContainer = shallowRef(null);
const map = shallowRef<Map | null>(null);
const siteStore = useSiteStore()

onMounted(async () => {
    config.apiKey = 'I13a36UYaY7TpmsPixKu';

    const initialState = { lng: 5.039249, lat: 47.321758, zoom: 12 };
    if (mapContainer.value) {
        map.value = markRaw(new Map({
            container: mapContainer.value,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        }));

        await siteStore.fetchSites()
        
        console.log(siteStore.sites)
        // Ajouter les marqueurs colorés pour chaque site
        siteStore.sites.forEach(site => {
            const color = site.production ? '#00FF00' : '#FF0000';
            const marker = new Marker({ color: color })
                .setLngLat([site.longitude, site.latitude])
                .addTo(map.value!)
        });
    }
})

onUnmounted(() => {
    map.value?.remove()
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