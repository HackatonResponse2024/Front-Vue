<template>
  <div>
    <h1 class="h1">Rapport</h1>

    <div class="row">
      <div class="col card" @click="openModal">
        <GaugeChart
          :title="'Auto Production'"
          :value="Math.round(rapport.autoProductionRate * 100 * 1000) / 1000"
        />
      </div>
      <div class="col card" @click="openModal">
        <GaugeChart
          :title="'Auto Consommation'"
          :value="Math.round(rapport.autoConsumationRate * 100 * 1000) / 1000"
        />
      </div>
      <div class="col card" @click="openModal">
        <GaugeChart :title="'Puissance Max'" :value="1238" :unite="' W'" />
      </div>
    </div>

    <div class="col card">
      <BarChart
        :months="rapport.months"
        :valuable-production="rapport.valuableProduction"
        :surplus="rapport.surplus"
      />
    </div>

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
import ModalRapport from "../Modal/Modal-Rapport.vue";

const props = defineProps({
  rapport: {
    type: Object,
    required: true,
    default: () => ({
      autoConsumationRate: 0,
      autoProductionRate: 0,
      months: [],
      valuableProduction: [],
      surplus: [],
    }),
  },
  rapportIndex: {
    // Nouvelle prop pour l'index
    type: Number,
    required: true,
  },
});

const isModalVisible = ref(false);

const charts = [
  {
    component: GaugeChart,
    props: {
      title: "Auto Production",
      value: Math.round(props.rapport.autoProductionRate * 100 * 1000) / 1000,
    },
  },
  {
    component: GaugeChart,
    props: {
      title: "Auto Consommation",
      value: Math.round(props.rapport.autoConsumationRate * 100 * 1000) / 1000,
    },
  },
  {
    component: GaugeChart,
    props: { title: "Puissance Max", value: 1238, unite: " W", maxValue: 1200 },
  },
  {
    component: BarChart,
    props: {
      months: props.rapport.months,
      valuableProduction: props.rapport.valuableProduction,
      surplus: props.rapport.surplus,
    },
  },
];

const openModal = () => {
  isModalVisible.value = true;
};
</script>

<style scoped>
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

/* Responsiveness */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
  .col {
    flex: none;
    width: 100%;
    margin-bottom: 15px;
  }
  .card {
    width: 100%;
    margin: 5px 0;
  }
}

@media (max-width: 480px) {
  .h1 {
    font-size: 1.5rem; /* Ajuste de taille du titre sur les petits écrans */
    text-align: center;
    margin-left: 0;
  }
}
</style>
