<template>
  <div ref="chartRef" style="height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";

export default {
  props: {
    months: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => typeof item === 'string');
      }
    },
    valuableProduction: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => typeof item === 'number');
      }
    },
    surplus: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => typeof item === 'number');
      }
    }
  },

  setup(props) {
    const chartRef = ref(null);
    let barChart = null;

    const handleResize = () => {
      barChart?.resize();
    };

    onMounted(() => {
      barChart = echarts.init(chartRef.value);
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: props.months
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Production utilisée',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: props.valuableProduction
          },
          {
            name: 'Surplus',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: props.surplus
          }
        ]
      };

      barChart.setOption(option);
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      if (barChart) {
        barChart.dispose();
      }
      window.removeEventListener('resize', handleResize);
    });

    return {
      chartRef
    };
  }
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>