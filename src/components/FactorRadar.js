// 6因子评分雷达图组件
export default {
    name: 'FactorRadar',
    props: {
        scores: {
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
            
            const option = {
                backgroundColor: 'transparent',
                radar: {
                    indicator: [
                        { name: '技术面', max: 100 },
                        { name: '基本面', max: 100 },
                        { name: '情绪面', max: 100 },
                        { name: '资金流', max: 100 },
                        { name: '估值', max: 100 },
                        { name: '动量', max: 100 }
                    ],
                    shape: 'polygon',
                    splitNumber: 4,
                    axisName: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 11
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(0, 212, 255, 0.02)', 'rgba(0, 212, 255, 0.05)']
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [
                            props.scores.technical,
                            props.scores.fundamental,
                            props.scores.sentiment,
                            props.scores.fundFlow,
                            props.scores.valuation,
                            props.scores.momentum
                        ],
                        name: '评分',
                        areaStyle: {
                            color: 'rgba(0, 212, 255, 0.3)'
                        },
                        lineStyle: {
                            color: '#00d4ff',
                            width: 2
                        },
                        itemStyle: {
                            color: '#00d4ff',
                            borderWidth: 2
                        }
                    }]
                }]
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
        <div class="factor-radar glass-card">
            <div class="card-header">
                <span class="card-title">6因子评分</span>
                <span class="overall-score" :class="scores.overall >= 60 ? 'success' : scores.overall >= 40 ? 'warning' : 'danger'">
                    综合 {{ scores.overall }}
                </span>
            </div>
            
            <div ref="chartRef" class="radar-chart"></div>
            
            <div class="factor-scores">
                <div class="factor-row">
                    <div class="factor-item">
                        <span class="factor-dot technical"></span>
                        <span class="factor-name">技术面</span>
                        <span class="factor-value">{{ scores.technical }}</span>
                    </div>
                    <div class="factor-item">
                        <span class="factor-dot fundamental"></span>
                        <span class="factor-name">基本面</span>
                        <span class="factor-value">{{ scores.fundamental }}</span>
                    </div>
                </div>
                
                <div class="factor-row">
                    <div class="factor-item">
                        <span class="factor-dot sentiment"></span>
                        <span class="factor-name">情绪面</span>
                        <span class="factor-value">{{ scores.sentiment }}</span>
                    </div>
                    <div class="factor-item">
                        <span class="factor-dot fundflow"></span>
                        <span class="factor-name">资金流</span>
                        <span class="factor-value">{{ scores.fundFlow }}</span>
                    </div>
                </div>
                
                <div class="factor-row">
                    <div class="factor-item">
                        <span class="factor-dot valuation"></span>
                        <span class="factor-name">估值</span>
                        <span class="factor-value">{{ scores.valuation }}</span>
                    </div>
                    <div class="factor-item">
                        <span class="factor-dot momentum"></span>
                        <span class="factor-name">动量</span>
                        <span class="factor-value">{{ scores.momentum }}</span>
                    </div>
                </div>
            </div>
        </div>
    `
}
