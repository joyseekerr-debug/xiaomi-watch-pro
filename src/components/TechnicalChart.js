// 技术图表组件 - 分时图
export default {
    name: 'TechnicalChart',
    props: {
        intradayData: {
            type: Object,
            required: true
        },
        currentPrice: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { onMounted, onUnmounted, ref, watch } = Vue
        const chartRef = ref(null)
        let chart = null
        
        const initChart = () => {
            if (!chartRef.value) return
            
            chart = echarts.init(chartRef.value)
            updateChart()
        }
        
        const updateChart = () => {
            if (!chart) return
            
            const times = props.intradayData.times
            const prices = props.intradayData.prices
            const prevClose = props.currentPrice.prevClose
            
            const option = {
                backgroundColor: 'transparent',
                grid: {
                    left: 10,
                    right: 10,
                    top: 30,
                    bottom: 20,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(22, 33, 62, 0.9)',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function(params) {
                        return `${params[0].axisValue}<br/>价格: ${params[0].value} HKD`
                    }
                },
                xAxis: {
                    type: 'category',
                    data: times,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 10,
                        interval: 29
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 10,
                        formatter: '{value}'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                },
                series: [{
                    type: 'line',
                    data: prices,
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        color: '#00d4ff',
                        width: 2
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                                { offset: 1, color: 'rgba(0, 212, 255, 0)' }
                            ]
                        }
                    },
                    markLine: {
                        symbol: 'none',
                        data: [{
                            yAxis: prevClose,
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)',
                                type: 'dashed'
                            },
                            label: {
                                show: true,
                                position: 'right',
                                formatter: '昨收 {c}',
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: 10
                            }
                        }]
                    }
                }]
            }
            
            chart.setOption(option)
        }
        
        const handleResize = () => {
            chart && chart.resize()
        }
        
        watch(() => props.currentPrice, () => {
            updateChart()
        }, { deep: true })
        
        onMounted(() => {
            initChart()
            window.addEventListener('resize', handleResize)
        })
        
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
            chart && chart.dispose()
        })
        
        return {
            chartRef
        }
    },
    template: `
        <div class="technical-chart"
>
            <div class="chart-header"
>
                <span class="chart-title">分时走势</span>
                <div class="chart-legend"
>
                    <span class="legend-item"
>
                        <span class="legend-line"></span>
                        实时价格
                    </span>
                    <span class="legend-item"
>
                        <span class="legend-dash"></span>
                        昨收
                    </span>
                </div>
            </div>
            
            <div ref="chartRef" class="chart-container"
></div>
        </div>
    `
}
