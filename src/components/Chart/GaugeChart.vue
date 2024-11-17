<template>
  <div>
    <!-- Title of the component -->
    <h2 class="gauge-title">{{ title }}</h2>

    <!-- Container for the gauge -->
    <div ref="gaugeChart" style="height: 25em"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";

export default {
  props: {
    title: {
      type: String, // Title of the gauge
      default: "Default Title",
    },
    value: {
      type: Number, // Current value to display
      required: true,
    },
    unite: {
      type: String,
      default: "%",
    },
    maxValue: {
      type: Number, // Maximum value for the gauge
      default: 100, // Default max value
    },
  },
  setup(props) {
    // Reference to the gauge container
    const gaugeChart = ref(null);

    onMounted(() => {
      // Initialize the chart
      const myChart = echarts.init(gaugeChart.value);

      // Configuration for the gauge
      const option = {
        series: [
          {
            type: "gauge",
            max: props.maxValue, // Use the maxValue prop for the maximum value
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#fd666d"],
                  [0.7, "#37a2da"],
                  [1, "#67e0e3"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -10,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              distance: -10,
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 4,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 10,
              fontSize: 20,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}" + props.unite, // Display value in the detail area
            },
            data: [
              {
                value: props.value, // Bind the initial value to the prop
                name: props.title,
              },
            ],
          },
        ],
      };

      // Set the initial option
      myChart.setOption(option);

      // Watch for changes in the value prop and update the chart
      watch(
        () => props.value,
        (newValue) => {
          myChart.setOption({
            series: [
              {
                data: [
                  {
                    value: newValue, // Update the gauge value
                  },
                ],
              },
            ],
          });
        }
      );

      // Watch for changes in the maxValue prop and update the gauge's max
      watch(
        () => props.maxValue,
        (newMaxValue) => {
          myChart.setOption({
            series: [
              {
                max: newMaxValue, // Update the max value of the gauge
              },
            ],
          });
        }
      );
    });

    return {
      gaugeChart,
    };
  },
};
</script>

<style scoped>
.gauge-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}
</style>
