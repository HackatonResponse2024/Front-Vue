<template>
  <div>
    <h1>Rapport</h1>
    <!-- Conteneur pour la jauge -->
    <div class="chart-container">
          <GaugeChart />
        </div>
        
    <!-- Conteneur pour le graphique MyChartComponent -->
    <div class="chart-container">
      <MyChartComponent />
    </div>
  </div>
</template>

<script setup>
import GaugeChart from '../Chart/GaugeChart.vue';
import MyChartComponent from '../Chart/MyChartComponent.vue';
</script>
