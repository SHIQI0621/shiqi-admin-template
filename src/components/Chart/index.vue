<template>
  <div class="chart-wrapper">
    <v-chart ref="chartRef" class="echarts" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart, RadarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useThemeStore } from '@/stores/modules/theme'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent,
])

export type ChartType = 'pie' | 'bar' | 'line' | 'radar' | 'doughnut'

export interface ChartDataItem {
  name: string
  value: number | number[]
}

export interface SeriesConfig {
  name?: string
  data: ChartDataItem[] | number[][] | { name: string, value: number }[]
  smooth?: boolean
  areaStyle?: boolean
  stack?: string
}

interface Props {
  type: ChartType
  data: ChartDataItem[] | SeriesConfig[]
  xAxisData?: string[]
  title?: string
  legend?: boolean
  colors?: string[]
  showTooltip?: boolean
  height?: string | number
  pieRadius?: string | string[]
  donutInnerRadius?: string
  donutOuterRadius?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  legend: true,
  showTooltip: true,
  height: '350px',
  pieRadius: '50%',
  donutInnerRadius: '40%',
  donutOuterRadius: '70%',
})

const themeStore = useThemeStore()
const chartRef = ref<InstanceType<typeof VChart>>()

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

function mixColors(color1: string, color2: string, weight: number): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return color1
  const r = Math.round(rgb1.r * weight + rgb2.r * (1 - weight))
  const g = Math.round(rgb1.g * weight + rgb2.g * (1 - weight))
  const b = Math.round(rgb1.b * weight + rgb2.b * (1 - weight))
  return `rgb(${r}, ${g}, ${b})`
}

const themeColors = computed(() => {
  const primary = themeStore.themeConfig.primaryColor
  const textPrimary = getCssVar('--el-text-color-primary') || '#303133'
  const textRegular = getCssVar('--el-text-color-regular') || '#606266'
  const textSecondary = getCssVar('--el-text-color-secondary') || '#909399'
  const borderColor = getCssVar('--el-border-color') || '#dcdfe6'
  const borderLight = getCssVar('--el-border-color-lighter') || '#ebeef5'
  const fillColor = getCssVar('--el-fill-color-light') || '#f5f7fa'
  const bgColor = getCssVar('--el-bg-color') || '#ffffff'

  return {
    primary,
    textPrimary,
    textRegular,
    textSecondary,
    borderColor,
    borderLight,
    fillColor,
    bgColor,
    primaryLight3: mixColors(primary, '#ffffff', 0.85),
    primaryLight5: mixColors(primary, '#ffffff', 0.7),
    primaryLight7: mixColors(primary, '#ffffff', 0.55),
    primaryLight8: mixColors(primary, '#ffffff', 0.45),
    primaryLight9: mixColors(primary, '#ffffff', 0.35),
    primaryDark2: mixColors(primary, '#000000', 0.85),
  }
})

const palette = computed(() => {
  const primary = themeStore.themeConfig.primaryColor
  return [
    primary,
    themeColors.value.primaryLight5,
    themeColors.value.primaryDark2,
    themeColors.value.primaryLight7,
    themeColors.value.primaryLight3,
    themeColors.value.primaryLight8,
    themeColors.value.primaryLight9,
    themeColors.value.primary,
    themeColors.value.textPrimary,
  ]
})

const colors = computed(() => props.colors || palette.value)

const chartOption = computed(() => {
  const tc = themeColors.value
  const option: any = {
    tooltip: props.showTooltip ? {
      trigger: 'item',
      backgroundColor: tc.bgColor,
      borderColor: tc.borderColor,
      borderWidth: 1,
      textStyle: {
        color: tc.textPrimary,
      },
    } : undefined,
    legend: props.legend ? {
      bottom: 10,
      textStyle: {
        color: tc.textRegular,
      },
      icon: 'roundRect',
      itemWidth: 14,
      itemHeight: 4,
    } : undefined,
    color: colors.value,
    animationDuration: 600,
    animationEasing: 'cubicOut',
  }

  if (props.title) {
    option.title = {
      text: props.title,
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: tc.textPrimary,
      },
    }
  }

  const axisLineStyle = { color: tc.borderLight }
  const axisLabelColor = tc.textRegular
  const splitLineStyle = { color: tc.borderLight, type: 'dashed' as const }

  switch (props.type) {
    case 'pie':
      option.series = [{
        type: 'pie',
        radius: props.pieRadius,
        center: ['50%', '55%'],
        data: props.data,
        itemStyle: {
          borderColor: tc.bgColor,
          borderWidth: 2,
          borderRadius: 4,
        },
        label: {
          color: tc.textRegular,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.15)',
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: tc.textPrimary,
          },
        },
      }]
      if (props.title) {
        option.title.top = 10
        option.series[0].center = ['50%', '60%']
      }
      break

    case 'doughnut':
      option.series = [{
        type: 'pie',
        radius: [props.donutInnerRadius, props.donutOuterRadius],
        center: ['50%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: tc.bgColor,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: tc.textPrimary,
          },
        },
        labelLine: {
          show: false,
        },
        data: props.data,
      }]
      break

    case 'bar':
      option.grid = {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: props.title ? 60 : 30,
        containLabel: true,
      }
      option.xAxis = {
        type: 'category',
        data: props.xAxisData || props.data.map((d: any) => d.name),
        axisLine: { lineStyle: axisLineStyle },
        axisLabel: { color: axisLabelColor },
        axisTick: { show: false },
      }
      option.yAxis = {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor },
        splitLine: splitLineStyle,
      }
      option.series = Array.isArray((props.data as any[])[0]?.value) || Array.isArray((props.data as SeriesConfig[])[0]?.data)
        ? (props.data as SeriesConfig[]).map((s) => ({
            type: 'bar',
            name: s.name,
            data: s.data,
            barMaxWidth: 50,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
          }))
        : [{
            type: 'bar',
            data: props.data.map((d: any) => d.value),
            barMaxWidth: 50,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
          }]
      break

    case 'line':
      option.grid = {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: props.title ? 60 : 30,
        containLabel: true,
      }
      option.xAxis = {
        type: 'category',
        boundaryGap: false,
        data: props.xAxisData || props.data.map((d: any) => d.name),
        axisLine: { lineStyle: axisLineStyle },
        axisLabel: { color: axisLabelColor },
        axisTick: { show: false },
      }
      option.yAxis = {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor },
        splitLine: splitLineStyle,
      }
      option.series = Array.isArray((props.data as any[])[0]?.value) || Array.isArray((props.data as SeriesConfig[])[0]?.data)
        ? (props.data as SeriesConfig[]).map((s) => ({
            type: 'line',
            name: s.name,
            data: s.data,
            smooth: s.smooth !== false,
            areaStyle: s.areaStyle ? {
              opacity: 0.3,
            } : undefined,
            stack: s.stack,
            showSymbol: false,
            emphasis: {
              focus: 'series',
            },
          }))
        : [{
            type: 'line',
            data: props.data.map((d: any) => d.value),
            smooth: true,
            areaStyle: {
              opacity: 0.3,
            },
            showSymbol: false,
            emphasis: {
              focus: 'series',
            },
          }]
      break

    case 'radar': {
      const radarData = props.data as { name: string; value: number }[]
      const maxValue = Math.max(...radarData.map(d => d.value)) * 1.2
      option.radar = {
        indicator: radarData.map(d => ({ name: d.name, max: maxValue })),
        shape: 'polygon',
        splitNumber: 4,
        axisName: {
          color: tc.textRegular,
        },
        axisLine: {
          lineStyle: { color: tc.borderLight },
        },
        splitLine: {
          lineStyle: { color: tc.borderLight },
        },
        splitArea: {
          areaStyle: {
            color: [tc.fillColor, tc.bgColor],
          },
        },
      }
      option.series = [{
        type: 'radar',
        data: [{
          value: radarData.map(d => d.value),
          name: props.title || '数据',
          areaStyle: {
            opacity: 0.2,
          },
          lineStyle: {
            width: 2,
          },
        }],
      }]
      delete option.legend
      break
    }
  }

  return option
})

onMounted(() => {
  nextTick(() => {
    if (chartRef.value?.chart) {
      chartRef.value.chart.resize()
    }
  })
})

watch(
  () => themeStore.themeConfig.primaryColor,
  () => {
    nextTick(() => {
      if (chartRef.value?.chart) {
        chartRef.value.chart.resize()
      }
    })
  }
)

watch(
  () => themeStore.themeConfig.isGrey,
  () => {
    nextTick(() => {
      if (chartRef.value?.chart) {
        chartRef.value.chart.resize()
      }
    })
  }
)

defineExpose({
  getChartInstance: () => chartRef.value?.chart,
})
</script>

<style scoped lang="scss">
.chart-wrapper {
  width: 100%;
  height: v-bind(height);
  min-height: 200px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
