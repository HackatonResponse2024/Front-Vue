<script setup lang="ts">
import TheMap from "../components/Map/TheMap.vue";  
import Rapport from "../components/Rapport/Rapport.vue";
</script>

<template>
  <main>
      <!-- Section pour la carte (75% de largeur) -->
      <div class="card">
        <TheMap />
      </div>

      <!-- Section pour les graphiques (25% de largeur) -->
      <div class="card">
        <Rapport />
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
