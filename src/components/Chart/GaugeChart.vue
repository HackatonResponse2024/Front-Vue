<template>
  <div>
    <!-- Titre du composant -->
    <h2 class="gauge-title">Performance Ma</h2>
    <!-- Titre au-dessus de la jauge -->

    <!-- Conteneur pour la jauge -->
    <div ref="gaugeChart" style="height: 400px"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

// Référence de l'élément DOM pour la jauge
const gaugeChart = ref(null);

onMounted(() => {
  // Initialisation du graphique de type 'gauge'
  const myChart = echarts.init(gaugeChart.value);

  // Configuration du graphique (type jauge)
  const option = {
    series: [
      {
        type: "gauge",
        progress: {
          show: true,
          width: 18,
        },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [
              [0.2, "#ff0000"],
              [0.8, "#ff9900"],
              [1, "#00cc00"],
            ],
          },
        },
        axisLabel: {
          distance: 25,
          fontSize: 20,
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
          },
        },
        splitLine: {
          length: 30,
          width: 5,
          lineStyle: {
            color: "auto",
          },
        },
        pointer: {
          width: 5,
          length: "70%",
        },
        title: {
          offsetCenter: [0, "50%"],
          fontSize: 18,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          fontSize: 30,
          color: "auto",
        },
        data: [{ value: 60, name: "WATTS" }],
      },
    ],
  };

  // Appliquer la configuration de la jauge
  myChart.setOption(option);
});
</script>

<style scoped>
/* Style optionnel pour personnaliser la jauge */
.gauge-title {
  text-align: center; /* Centrer le titre */
  font-size: 24px;
  color: #333; /* Choisis une couleur qui te convient */
  margin-bottom: 10px; /* Espacement entre le titre et la jauge */
}
</style>
