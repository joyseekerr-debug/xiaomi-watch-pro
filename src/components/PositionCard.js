// 持仓卡片组件 - 显示持仓盈亏
export default {
    name: 'PositionCard',
    props: {
        position: {
            type: Object,
            required: true
        }
    },
    emits: ['buy', 'sell'],
    setup(props, { emit }) {
        const { computed } = Vue
        
        const profitColor = computed(() => {
            return props.position.isProfit ? 'success' : 'danger'
        })
        
        const profitIcon = computed(() => {
            return props.position.isProfit ? '📈' : '📉'
        })
        
        const onBuy = () => emit('buy')
        const onSell = () => emit('sell')
        
        return {
            profitColor,
            profitIcon,
            onBuy,
            onSell
        }
    },
    template: `
        <div class="position-card glass-card" :class="position.isProfit ? 'profit-theme' : 'loss-theme'">
            <div class="card-header">
                <span class="card-title">持仓盈亏</span>
                <span class="profit-icon">{{ profitIcon }}</span>
            </div>
            
            <div class="position-main">
                <div class="profit-large" :class="profitColor">
                    <span class="profit-sign">{{ position.profit > 0 ? '+' : '' }}</span>
                    <span class="profit-value">{{ position.profitPercent }}%</span>
                </div>
                <div class="profit-amount" :class="profitColor">
                    ({{ position.profit > 0 ? '+' : '' }}{{ position.profit }}元)
                </div>
            </div>
            
            <div class="position-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="detail-label">持仓数量</span>
                        <span class="detail-value">{{ position.shares }}股</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">持仓成本</span>
                        <span class="detail-value">{{ position.avgCost }} HKD</span>
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="detail-label">总市值</span>
                        <span class="detail-value">{{ position.currentValue.toLocaleString() }} HKD</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">总成本</span>
                        <span class="detail-value">{{ position.totalCost.toLocaleString() }} HKD</span>
                    </div>
                </div>
            </div>
            
            <div class="position-actions">
                <button class="btn btn-success" @click="onBuy">
                    <span>买入</span>
                </button>
                <button class="btn btn-danger" @click="onSell">
                    <span>卖出</span>
                </button>
            </div>
        </div>
    `
}
