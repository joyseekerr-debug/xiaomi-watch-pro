// 历史数据图表组件
export default {
    name: 'HistoryChart',
    props: {
        historyData: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { onMounted, onUnmounted, ref } = Vue
        const chartRef = ref(null)
        let chart = null
        
        const initChart = () => {
            if (!chartRef.value) return
            
            chart = echarts.init(chartRef.value)
            
            const dates = props.historyData.dates
            const prices = props.historyData.prices
            const volumes = props.historyData.volumes
            
            const option = {
                backgroundColor: 'transparent',
                grid: [
                    {
                        left: 10,
                        right: 10,
                        top: 30,
                        height: '60%',
                        containLabel: true
                    },
                    {
                        left: 10,
                        right: 10,
                        top: '75%',
                        height: '20%',
                        containLabel: true
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(22, 33, 62, 0.9)',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dates,
                        gridIndex: 0,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 10
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    {
                        type: 'category',
                        data: dates,
                        gridIndex: 1,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex: 0,
                        scale: true,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 10
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        }
                    },
                    {
                        type: 'value',
                        gridIndex: 1,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '收盘价',
                        type: 'line',
                        data: prices,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: '#00d4ff',
                            width: 2
                        },
                        itemStyle: {
                            color: '#00d4ff'
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
                        }
                    },
                    {
                        name: '成交量',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: volumes,
                        itemStyle: {
                            color: function(params) {
                                const changes = props.historyData.changes
                                return changes[params.dataIndex] >= 0 
                                    ? 'rgba(0, 255, 136, 0.6)' 
                                    : 'rgba(255, 71, 87, 0.6)'
                            }
                        }
                    }
                ]
            }
            
            chart.setOption(option)
        }
        
        const handleResize = () => {
            chart && chart.resize()
        }
        
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
        <div class="history-chart glass-card"
>
            <div class="card-header"
>
                <span class="card-title">📊 7日走势</span>
                <div class="chart-legend"
>
                    <span class="legend-item success"
>🟢 上涨</span>
                    <span class="legend-item danger"
>🔴 下跌</span>
                </div>
            </div>
            
            <div ref="chartRef" class="chart-container" style="height: 300px;"
></div>
        </div>
    `
}
