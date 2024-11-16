<template>
  <div>
    <h1 class="h1">Rapport</h1>

    <!-- Conteneur pour la jauge -->
    <div class="row">
      <div class="col card" @click="openModal">
        <GaugeChart :title="'Auto Production'" :value="95" />
      </div>
      <div class="col card" @click="openModal">
        <GaugeChart :title="'Auto Consomation'" :value="55" />
      </div>
      <div class="col card" @click="openModal">
        <!-- Ajout de maxValue à 1200 pour la jauge Puissance Max -->
        <GaugeChart
          :title="'Puissance Max'"
          :value="1200"
          :unite="' W'"
          :maxValue="1200"
        />
      </div>
    </div>

    <div class="col card" @click="openModal">
      <!-- Conteneur pour le graphique MyChartComponent -->
      <MyChartComponent />
    </div>

    <!-- Utilisation du ModalRapport et passage des graphiques -->
    <ModalRapport
      :isVisible="isModalVisible"
      @update:isVisible="isModalVisible = $event"
      :charts="charts"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import GaugeChart from "../Chart/GaugeChart.vue";
import MyChartComponent from "../Chart/MyChartComponent.vue";
import ModalRapport from "../Modal/Modal-Rapport.vue"; // Importer le modal

// Etat du modal
const isModalVisible = ref(false);

// Liste des graphiques à afficher dans le modal
const charts = [
  { component: GaugeChart, props: { title: "Auto Production", value: 95 } },
  { component: GaugeChart, props: { title: "Auto Consomation", value: 55 } },
  {
    component: GaugeChart,
    props: { title: "Puissance Max", value: 1200, unite: " W", maxValue: 1200 }, // Ajout de maxValue à 1200
  },
  { component: MyChartComponent, props: {} },
];

// Fonction pour ouvrir le modal
const openModal = () => {
  isModalVisible.value = true; // Ouvre le modal
};
</script>

<style scoped>
/* Styles pour les cards et le layout */
.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  padding: 15px;
  box-sizing: border-box;
}
.h1 {
  margin-left: 5%;
}
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 2%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  transition-duration: 10ms;
}
</style>
