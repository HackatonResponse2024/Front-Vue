<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
</template>

<script setup>
import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(async () => {
    config.apiKey = 'I13a36UYaY7TpmsPixKu';
    const initialState = { lng: 5.039249, lat: 47.321758, zoom: 12 };
    
    map.value = markRaw(
        new Map({
            container: mapContainer.value,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            scaleControl: true
        })
    );

    try {
    const response = await fetch('https://response-ejf9djema4gaanex.francecentral-01.azurewebsites.net/api/Sites');
    const sites = await response.json();
    sites.forEach((site) => {
        const marker = new Marker({
            color: site.production ? '#00FF00' : '#FF0000',
        })
            .setLngLat([site.longitude, site.latitude])
            .addTo(map.value);
        const popup = new Popup().setHTML(
            `<strong>${site.name}</strong><br>Production: ${site.production ? 'Yes' : 'No'}`
        );
            marker.setPopup(popup);
        });
    } catch (error) {
        console.error('Error fetching sites:', error);
    }

    map.value.on('load', () => {
        map.value.addSource('circle', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        // Create a circle layer
        map.value.addLayer({
            id: 'circle',
            type: 'fill',
            source: 'circle',
            paint: {
                'fill-color': '#0080FF',
                'fill-opacity': 0.2,
                'fill-outline-color': '#0080FF'
            }
        });
    });

    // Function to create a circle feature
    function createCircleFeature(center, radiusKm) {
        const points = 64; // Number of points that make up the circle
        const coords = [];
        const km = radiusKm;
        for (let i = 0; i < points; i++) {
            const angle = (i * 2 * Math.PI) / points;
            
            // Convert km to degrees (approximately)
            const latOffset = (km / 111.32) * Math.cos(angle);
            const lonOffset = km / (111.32 * Math.cos(center[1] * (Math.PI / 180))) * Math.sin(angle);
            
            coords.push([
            center[0] + lonOffset,
            center[1] + latOffset
            ]);
        }
        // Close the circle
        coords.push(coords[0]);
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [coords]
            },
            properties: {}
        };
    }  
    // Add a circle to the map on click
    map.value.on('click', (e) => {
        const circleFeature = createCircleFeature(
            [e.lngLat.lng, e.lngLat.lat],
            1  // 1km radius
        );
    
        // Update the source with only the new circle
        const source = map.value.getSource('circle');
        if (source) {
            source.setData({
            type: 'FeatureCollection',
                features: [circleFeature] // Only include the new circle
            });
        }
    });
});
onUnmounted(() => {
    map.value?.remove();
    });
</script>

<style scoped>
.map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px);
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
