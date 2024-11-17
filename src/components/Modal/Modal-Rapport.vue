<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h1>Dashboard</h1>

      <!-- Slider pour les graphiques affichés horizontalement -->
      <div class="slider-container">
        <div
          v-for="(chart, index) in charts.slice(0, 3)"
          :key="index"
          class="slider-item"
        >
          <div class="chart-data">
            <h2>{{ chart.props.title }}</h2>
            <div class="progress-container">
              <div
                class="progress-bar"
                :class="{ 'animate-fill': isAnimated }"
                :style="{
                  height: isAnimated
                    ? getProportionalHeight(chart.props.value, index) + 'px'
                    : '0px',
                }"
              ></div>
            </div>
            <p>{{ chart.props.value }} {{ chart.props.unite || "" }}</p>
          </div>
        </div>
      </div>

      <!-- Texte sous le slider -->
      <div class="text-container">
        <p>
          Voici une description détaillée des graphiques et leurs
          interprétations.
        </p>
        <ul>
          <li>
            <strong>Auto Production</strong>: Évalue la production autonome en
            %.
          </li>
          <li>
            <strong>Auto Consommation</strong>: Évalue la consommation autonome
            en %.
          </li>
          <li>
            <strong>Puissance Max</strong>: Affiche la puissance maximale
            atteinte en W.
          </li>
        </ul>

        <!-- Liste des infrastructures avec latitude et longitude -->
        <div v-if="showBuildings" class="infrastructure-list">
          <h3>Liste des bâtiments/infrastructures à Dijon :</h3>
          <ul>
            <li v-for="(building, index) in buildings" :key="index">
              <button @click="showLocation(building)" class="link-button">
                {{ building.name }} - Consommation :
                {{ building.consumption }} kWh
              </button>
            </li>
          </ul>
        </div>

        <!-- Affichage des informations de localisation -->
        <div v-if="selectedBuilding" class="location-info">
          <h4>Localisation de {{ selectedBuilding.name }}:</h4>
          <p><strong>Latitude:</strong> {{ selectedBuilding.latitude }}</p>
          <p><strong>Longitude:</strong> {{ selectedBuilding.longitude }}</p>
        </div>

        <!-- Flèche pour afficher plus de bâtiments -->
        <div class="expand-button" @click="toggleBuildings">
          <span v-if="showBuildings">↑</span>
          <span v-else>↓</span>
        </div>
      </div>

      <button @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

// Propriété pour contrôler l'ouverture du modal
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  charts: {
    type: Array,
    required: true,
  },
});

// Données des bâtiments avec lat/long
const buildings = [
  {
    name: "Hôtel de Ville",
    consumption: 12000,
    latitude: 47.322,
    longitude: 5.0415,
  },
  {
    name: "Gare de Dijon",
    consumption: 45000,
    latitude: 47.323,
    longitude: 5.043,
  },
  {
    name: "Centre commercial Toison d'Or",
    consumption: 75000,
    latitude: 47.324,
    longitude: 5.0445,
  },
  {
    name: "Campus Universitaire",
    consumption: 50000,
    latitude: 47.325,
    longitude: 5.045,
  },
  {
    name: "Stade Gaston Gérard",
    consumption: 30000,
    latitude: 47.326,
    longitude: 5.0465,
  },
];

// État pour l'animation et la sélection de bâtiment
const isAnimated = ref(false);
const selectedBuilding = ref(null);
const showBuildings = ref(false); // Contrôle l'affichage des bâtiments

// Écouter les changements de "isVisible"
watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        isAnimated.value = true;
      }, 200);
    } else {
      isAnimated.value = false;
    }
  }
);

// Facteur multiplicatif pour calculer la hauteur proportionnelle
const maxValues = [100, 100, 1300];
const maxHeight = 200;

const getProportionalHeight = (value, index) => {
  const maxValue = maxValues[index] || 100;
  const percentage = (value / maxValue) * 100; // Pourcentage de la barre à remplir

  // Remarque: Vous pouvez ajuster la logique ici si vous souhaitez un autre comportement.
  return (value / maxValue) * maxHeight;
};

// Fonction pour afficher la localisation du bâtiment sélectionné
const showLocation = (building) => {
  selectedBuilding.value = building;
};

// Fonction pour afficher ou masquer les bâtiments
const toggleBuildings = () => {
  showBuildings.value = !showBuildings.value;
};

// Événement pour fermer le modal
const emit = defineEmits(["update:isVisible"]);

const closeModal = () => {
  emit("update:isVisible", false);
  selectedBuilding.value = null; // Ajoute cette ligne pour réinitialiser le bâtiment sélectionné
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 1000px;
  width: 95%;
  max-height: 95%;
  overflow-y: auto;
}

.slider-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
  justify-content: center;
}

.slider-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.chart-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-container {
  width: 20px;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
}

.progress-bar {
  background-image: linear-gradient(
    to top,
    red,
    /* Rouge pour faible valeur */ yellow,
    /* Jaune pour valeur intermédiaire */ green /* Vert pour haute valeur */
  );
  border-radius: 0 0 8px 8px;
  transition: height 4s ease-out;
}

.text-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.text-container p {
  font-size: 16px;
  font-weight: bold;
}

.text-container ul {
  margin: 10px 0 0;
  padding: 0 20px;
  list-style-type: disc;
}

.infrastructure-list {
  margin-top: 10px;
}

.infrastructure-list h3 {
  margin-bottom: 10px;
}

.infrastructure-list ul {
  list-style-type: square;
  padding-left: 20px;
}

.infrastructure-list button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.infrastructure-list button:hover {
  color: #a3acb5;
}

.link-button {
  font-weight: bold;
  text-decoration: none;
  color: #007bff;
}

.link-button:hover {
  color: #0056b3;
  text-decoration: underline;
}

.location-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 8px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

/* Flèche pour agrandir la section */
.expand-button {
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  color: #007bff;
}

.expand-button:hover {
  color: #0056b3;
}
</style>
