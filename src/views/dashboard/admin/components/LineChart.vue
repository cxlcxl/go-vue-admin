<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '380px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      const chartLines = []
      for (const line in chartData.reports) {
        chartLines.push({
          name: chartData.maps[line],
          smooth: true,
          type: 'line',
          data: chartData.reports[line],
          animationDuration: 1500,
          animationEasing: 'quadraticOut'
        })
      }
      this.chart.setOption({
        xAxis: {
          data: chartData.xGrid,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 35,
          right: 35,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: Object.values(chartData.maps)
        },
        series: chartLines
      })
    }
  }
}

/*
{
name: "展示",
smooth: true,
type: "line",
itemStyle: {
  normal: {
    color: "#3888fa",
    lineStyle: {color: "#3888fa", width: 2}, areaStyle: {color: "#f3f8ff"},
  },
},
data: actualData,
animationDuration: 2800,
animationEasing: "quadraticOut",
}
*/
</script>
