<template>
  <div>
    <h1>Rapport</h1>
    <!-- Conteneur pour la jauge -->
    
      <div class="row">
        <div class="col card">
          <GaugeChart />
        </div>
        <div class="col card">
          <GaugeChart />
        </div>
      </div>

  
    <div class="col card">
      <!-- Conteneur pour le graphique MyChartComponent -->
      
        <MyChartComponent />
    
    </div>
  </div>
</template>

<script setup>
import GaugeChart from '../Chart/GaugeChart.vue';
import MyChartComponent from '../Chart/MyChartComponent.vue';
</script>

<style>
/* Row Class */
.row {
  display: flex;
  /* Use Flexbox for layout */
  flex-wrap: wrap;
  /* Allow columns to wrap to the next line if needed */
  margin-left: -15px;
  /* Negative margins to align with column padding */
  margin-right: -15px;
}

/* Column Class */
.col {
  flex: 1;
  /* Distribute available space evenly */
  padding-left: 15px;
  /* Match with row's negative margins */
  padding-right: 15px;
  box-sizing: border-box;
  /* Include padding in width calculations */
}

/* Column Sizes (Optional) */
.col-1 {
  flex: 0 0 8.33%;
  max-width: 8.33%;
}

/* 1/12 */
.col-2 {
  flex: 0 0 16.66%;
  max-width: 16.66%;
}

/* 2/12 */
.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

/* 3/12 */
.col-4 {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}

/* 4/12 */
.col-5 {
  flex: 0 0 41.66%;
  max-width: 41.66%;
}

/* 5/12 */
.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

/* 6/12 */
.col-7 {
  flex: 0 0 58.33%;
  max-width: 58.33%;
}

/* 7/12 */
.col-8 {
  flex: 0 0 66.66%;
  max-width: 66.66%;
}

/* 8/12 */
.col-9 {
  flex: 0 0 75%;
  max-width: 75%;
}

/* 9/12 */
.col-10 {
  flex: 0 0 83.33%;
  max-width: 83.33%;
}

/* 10/12 */
.col-11 {
  flex: 0 0 91.66%;
  max-width: 91.66%;
}

/* 11/12 */
.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

/* 12/12 */

.card {
  background-color: #fff;
  /* White background */
  border: 1px solid #ddd;
  /* Subtle border */
  border-radius: 8px;
  /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Light shadow for depth */
  overflow: hidden;
  /* Ensure content fits inside rounded edges */
  margin: 2%;
  /* Space between cards */
  display: flex;
  flex-direction: column;
  /* Stack content vertically */
}
</style>