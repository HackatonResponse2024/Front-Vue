<template>
  <div>
    <h1 class="h1">Rapport</h1>

    <!-- Conteneur pour la jauge -->

    <div class="row">
      <div class="col card">
        <GaugeChart :title="'Auto Production'" :value="95" />
      </div>
      <div class="col card">
        <GaugeChart :title="'Auto Consomation'" :value="55" />
      </div>
      <div class="col card">
        <GaugeChart :title="'Puissance MAx'" :value="996" :unite="' W'" />
      </div>

    </div>


    <div class="col card" @click="openModal">
      <!-- Conteneur pour le graphique MyChartComponent -->
      <BarChart 
    :months="[
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]"
    :valuable-production="[
      755.1188200181846,
      678.8073622014945,
      740.3015695735102,
      703.8292022016147,
      745.5479493902054,
      723.564353855502,
      733.0295619511626,
      730.7586628990291,
      719.8286867037068,
      737.9228678129307,
      722.1933931049585,
      761.5334555828168
    ]"
    :surplus="[
      743439891.0841013,
      664766761.2783263,
      747793624.8342831,
      732839852.8470674,
      739203438.8402358,
      712424617.1273435,
      727493549.6821536,
      714270909.3785863,
      726916114.1793481,
      744504485.1621321,
      708878294.1952077,
      734794154.9563582
    ]"
  />
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
import BarChart from "../Chart/BarChart.vue";
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
  { component: BarChart, props: {} },
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
