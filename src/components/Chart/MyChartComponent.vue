<template>
  <!-- Conteneur du graphique, avec un style de hauteur définie -->
  <div ref="chart" style="height: 400px"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

// Utilisation du `ref` pour accéder au DOM
const chart = ref(null);

onMounted(() => {
  // Initialisation du graphique une fois que le composant est monté
  const myChart = echarts.init(chart.value);

  // Configuration du graphique
  const option = {
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E", "F", "G"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  // Appliquer la configuration du graphique
  myChart.setOption(option);
});
</script>

<style scoped>
/* Style spécifique pour le graphique (facultatif) */
</style>
