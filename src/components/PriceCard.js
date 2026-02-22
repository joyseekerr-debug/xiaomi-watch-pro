// 价格卡片组件 - 显示当前股价（最大字号）
export default {
    name: 'PriceCard',
    props: {
        priceData: {
            type: Object,
            required: true
        },
        stockInfo: {
            type: Object,
            required: true
        },
        isBuySignal: {
            type: Boolean,
            default: false
        },
        isStopLoss: {
            type: Boolean,
            default: false
        },
        compact: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { computed } = Vue
        
        const priceColor = computed(() => {
            if (props.isStopLoss) return 'danger'
            if (props.isBuySignal) return 'success'
            return props.priceData.change >= 0 ? 'success' : 'danger'
        })
        
        const cardClass = computed(() => {
            const classes = ['price-card', 'glass-card']
            if (props.isBuySignal) classes.push('pulse-green')
            if (props.isStopLoss) classes.push('flash-red')
            if (props.compact) classes.push('compact')
            return classes.join(' ')
        })
        
        const formatTime = (timestamp) => {
            if (!timestamp) return '刚刚'
            const date = new Date(timestamp)
            return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
        
        return {
            priceColor,
            cardClass,
            formatTime
        }
    },
    template: `
        <div :class="cardClass">
            <div class="stock-header">
                <div class="stock-info">
                    <span class="stock-symbol">{{ stockInfo.symbol }}</span>
                    <span class="stock-name">{{ stockInfo.name }}</span>
                </div>
                <div class="market-badge">
                    {{ stockInfo.market }}
                </div>
            </div>
            
            <div class="price-main">
                <div class="price-value" :class="priceColor">
                    {{ priceData.price.toFixed(2) }}
                </div>
                <div class="price-currency">{{ priceData.currency }}</div>
            </div>
            
            <div class="price-change" :class="priceColor">
                <span class="change-icon">
                    {{ priceData.change >= 0 ? '↑' : '↓' }}
                </span>
                <span class="change-value">{{ priceData.change > 0 ? '+' : '' }}{{ priceData.change.toFixed(2) }}</span>
                <span class="change-percent">({{ priceData.change > 0 ? '+' : '' }}{{ priceData.changePercent }}%)</span>
            </div>
            
            <div v-if="!compact" class="price-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="detail-label">今开</span>
                        <span class="detail-value">{{ priceData.open }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">最高</span>
                        <span class="detail-value">{{ priceData.high }}</span>
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="detail-label">最低</span>
                        <span class="detail-value">{{ priceData.low }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">昨收</span>
                        <span class="detail-value">{{ priceData.prevClose }}</span>
                    </div>
                </div>
            </div>
            
            <div class="price-footer">
                <div class="freshness-indicator">
                    <span class="freshness-dot"></span>
                    <span class="freshness-text">{{ formatTime(priceData.timestamp) }}</span>
                </div>
                <div class="data-source">{{ priceData.source }} · {{ priceData.confidence }}</div>
            </div>
        </div>
    `
}
