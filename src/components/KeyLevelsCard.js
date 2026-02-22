// 关键价位卡片组件
export default {
    name: 'KeyLevelsCard',
    props: {
        keyLevels: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { computed } = Vue
        
        const levels = computed(() => [
            { label: '买入位', value: props.keyLevels.buy, type: 'success', icon: '🛒' },
            { label: '卖出位', value: props.keyLevels.sell, type: 'danger', icon: '💰' },
            { label: '止损位', value: props.keyLevels.stopLoss, type: 'warning', icon: '🛑' }
        ])
        
        return {
            levels
        }
    },
    template: `
        <div class="key-levels-card glass-card">
            <div class="card-header">
                <span class="card-title">关键价位</span>
                <span class="card-subtitle">HKD</span>
            </div>
            
            <div class="levels-list">
                <div 
                    v-for="level in levels" 
                    :key="level.label"
                    class="level-item"
                    :class="level.type"
                >
                    <div class="level-icon">{{ level.icon }}</div>
                    <div class="level-info">
                        <div class="level-label">{{ level.label }}</div>
                        <div class="level-value">{{ level.value.toFixed(1) }}</div>
                    </div>
                </div>
            </div>
            
            <div class="support-resistance">
                <div class="sr-section">
                    <div class="sr-title">支撑位</div>
                    <div class="sr-values">
                        <span 
                            v-for="(s, i) in keyLevels.support" 
                            :key="i"
                            class="sr-value support"
                        >
                            {{ s }}
                        </span>
                    </div>
                </div>
                
                <div class="sr-section">
                    <div class="sr-title">阻力位</div>
                    <div class="sr-values"
>
                        <span 
                            v-for="(r, i) in keyLevels.resistance" 
                            :key="i"
                            class="sr-value resistance"
                        >
                            {{ r }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
}
