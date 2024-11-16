<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import TheHeader from "../components/TheHeader.vue";
import TheMap from "../components/TheMap.vue";
import TheChart from "../components/TheChart.vue";
import MyChartComponent from "../components/Chart/MyChartComponent.vue";
import GaugeChart from "../components/Chart/GaugeChart.vue"; // Assure-toi que le chemin est correct
</script>

<template>
  <main>
    <TheHeader />
    <TheWelcome />
    <div class="content-container">
      <!-- Section pour la carte (75% de largeur) -->
      <div class="map-container">
        <TheMap />
      </div>

      <!-- Section pour les graphiques (25% de largeur) -->
      <div class="charts-container">
        <TheChart />
        <MyChartComponent />
        <GaugeChart />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Styles pour le container principal */
main {
  display: flex;
  flex-direction: column; /* Disposition verticale pour les autres éléments */
  gap: 20px; /* Espacement entre les composants */
}

/* Conteneur pour la carte et les graphiques */
.content-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Espacement entre la carte et les graphiques */
  width: 100%;
}

/* Conteneur pour la carte */
.map-container {
  width: 75%; /* Carte occupe 75% de la largeur */
}

/* Conteneur pour les graphiques */
.charts-container {
  width: 25%; /* Graphiques occupent 25% de la largeur */
  display: flex;
  flex-direction: column; /* Alignement vertical des graphiques */
  gap: 20px; /* Espacement entre les graphiques */
}
</style>
