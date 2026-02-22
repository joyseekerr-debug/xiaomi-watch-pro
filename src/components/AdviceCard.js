// 建议卡片组件 - 显示今日操作建议
export default {
    name: 'AdviceCard',
    props: {
        advice: {
            type: Object,
            required: true
        },
        currentPrice: {
            type: Number,
            required: true
        },
        keyLevels: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { computed } = Vue
        
        const actionConfig = computed(() => {
            const configs = {
                '买入': { color: 'success', icon: '🛒', bg: 'rgba(0, 255, 136, 0.1)' },
                '卖出': { color: 'danger', icon: '💰', bg: 'rgba(255, 71, 87, 0.1)' },
                '等待': { color: 'warning', icon: '⏳', bg: 'rgba(255, 215, 0, 0.1)' },
                '止损': { color: 'danger', icon: '🚨', bg: 'rgba(255, 71, 87, 0.2)' }
            }
            return configs[props.advice.action] || configs['等待']
        })
        
        const distancePercent = computed(() => {
            const distance = props.keyLevels.buy - props.currentPrice
            return ((distance / props.currentPrice) * 100).toFixed(1)
        })
        
        const isNearBuy = computed(() => {
            return props.currentPrice <= props.keyLevels.buy * 1.05
        })
        
        return {
            actionConfig,
            distancePercent,
            isNearBuy
        }
    },
    template: `
        <div class="advice-card glass-card">
            <div class="card-header">
                <span class="card-title">今日建议</span>
                <div class="confidence-badge">
                    置信度 {{ advice.confidence }}%
                </div>
            </div>
            
            <div class="advice-main" :style="{ background: actionConfig.bg }">
                <div class="advice-action" :class="actionConfig.color">
                    <span class="action-icon">{{ actionConfig.icon }}</span>
                    <span class="action-text">【{{ advice.action }}】</span>
                </div>
                <div class="advice-reason">{{ advice.reason }}</div>
            </div>
            
            <div class="distance-bars">
                <div class="distance-item">
                    <div class="distance-label">
                        <span>距离买入位</span>
                        <span :class="isNearBuy ? 'text-success' : 'text-muted'">{{ advice.distanceToBuy }}%</span>
                    </div>
                    <div class="progress-bar">
                        <div 
                            class="progress-fill success" 
                            :style="{ width: (100 - advice.distanceToBuy) + '%' }"
                        ></div>
                    </div>
                </div>
                
                <div class="distance-item">
                    <div class="distance-label">
                        <span>距离卖出位</span>
                        <span class="text-muted">{{ advice.distanceToSell }}%</span>
                    </div>
                    <div class="progress-bar"
>
                        <div 
                            class="progress-fill danger" 
                            :style="{ width: (100 - advice.distanceToSell/2) + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
            
            <div class="risk-level">
                <span class="risk-label">风险等级</span>
                <span class="risk-value" :class="advice.riskLevel === '低' ? 'success' : advice.riskLevel === '高' ? 'danger' : 'warning'">
                    {{ advice.riskLevel }}
                </span>
            </div>
        </div>
    `
}
