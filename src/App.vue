<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { DataZoomComponent } from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import dataList from './assets/ip'
import area from './assets/area'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent, DataZoomComponent, TitleComponent, BarChart]);
const chartBox = ref<HTMLElement | null>(null)
onMounted(() => {
  initCharts()
})

const initCharts = () => {
  const ins = echarts.init(chartBox.value!)
  const options = {
    title: {
      text: 'ip分布',
      left: 100,
      top: 20,
      textStyle: {
        color: '#6cf'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: area
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line', // bar
        smooth: true, 
        data: [] as any
      }
    ],
    dataZoom: {
      type: 'inside' // slider
    }
  }
  const obj: {[key:string]: number} = {}
  area.forEach(a => {
    obj[a] = 0
  })
  dataList.forEach(item => {
    const vals = item.split('|')
    if (vals[1] in obj) {
      obj[vals[1]] += Number(vals[4] || 0)
    }
  })
  options.series[0].data = Object.values(obj)
  ins.setOption(options)
}

</script>

<template>
  <header>
    <div class="chart-box" ref="chartBox"></div>
  </header>
</template>

<style>
@import '@/assets/base.css';
.chart-box{
  height: 400px;
}
</style>
