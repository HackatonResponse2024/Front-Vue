<template>
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as echarts from "echarts";

// Référence pour l'élément du graphique
const chartRef = ref<HTMLDivElement | null>(null);

// Définir les props pour recevoir les options du graphique
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

// Initialisation du graphique dans onMounted
onMounted(() => {
  if (chartRef.value) {
    const chartDom = chartRef.value;
    const chart = echarts.init(chartDom);

    // Vérifiez si le graphique a bien été initialisé
    console.log("Graphique initialisé:", chart);

    // Appliquer les options du graphique
    chart.setOption(props.options);

    // Assurer que le graphique se redimensionne en cas de changement de taille de la fenêtre
    window.addEventListener("resize", () => {
      chart.resize();
    });

    // Nettoyage de l'instance avant le démontage
    onBeforeUnmount(() => {
      window.removeEventListener("resize", () => {
        chart.resize();
      });
      chart.dispose();
    });
  } else {
    console.error("Le conteneur du graphique est introuvable.");
  }
});
</script>

<style scoped>
/* Vous pouvez ajouter du style si nécessaire */
</style>
