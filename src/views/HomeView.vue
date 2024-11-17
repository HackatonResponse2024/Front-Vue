<script setup lang="ts">
import TheMap from "../components/Map/TheMap.vue";
import Rapport from "../components/Rapport/Rapport.vue";
import { useConsumationStore } from "@/stores/consumationStore";
import { storeToRefs } from "pinia";

const consumationStore = useConsumationStore();
const { sortedReports } = storeToRefs(consumationStore);
</script>

<template>
  <main>
    <div class="card">
      <TheMap />
    </div>

    <div class="card">
      <div v-if="sortedReports.length === 0">
        Cliquez sur la carte pour générer des rapports
      </div>
      <div v-else>
        <Rapport
          v-for="(report, index) in sortedReports"
          :key="index"
          :rapport="report"
          :rapport-index="index + 1"
        />
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
.cardMap
/* Conteneur pour la carte */
.map-container {
  border: 2px solid #ccc; /* Bordure grise */
  border-radius: 12px; /* Bords arrondis */
  padding: 10px; /* Espacement interne */
}

/* Conteneur pour les graphiques */
.charts-container {
  display: flex;
  flex-direction: column; /* Alignement vertical des graphiques */
  gap: 20px; /* Espacement entre les graphiques */
  border: 2px solid #ccc; /* Bordure grise */
  border-radius: 12px; /* Bords arrondis */
  padding: 10px; /* Espacement interne */
}

/* Conteneur pour chaque graphique individuel */
.chart-container {
  border: 2px solid #ccc; /* Bordure grise pour chaque graphique */
  border-radius: 8px; /* Bords arrondis */
  padding: 10px; /* Espacement interne */
}
</style>
