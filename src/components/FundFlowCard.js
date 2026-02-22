// 资金流向卡片组件
export default {
    name: 'FundFlowCard',
    props: {
        fundFlow: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { computed } = Vue
        
        const flowItems = computed(() => [
            { label: '主力净流入', value: props.fundFlow.mainInflow, icon: '🐋' },
            { label: '散户净流入', value: props.fundFlow.retailInflow, icon: '🐟' },
            { label: '北向资金', value: props.fundFlow.northbound, icon: '🌏' }
        ])
        
        const orderItems = computed(() => [
            { label: '大单', value: props.fundFlow.largeOrders },
            { label: '中单', value: props.fundFlow.mediumOrders },
            { label: '小单', value: props.fundFlow.smallOrders }
        ])
        
        const getValueClass = (value) => {
            if (value > 0) return 'success'
            if (value < 0) return 'danger'
            return 'muted'
        }
        
        const formatValue = (value) => {
            const sign = value > 0 ? '+' : ''
            return `${sign}${value.toFixed(2)}亿`
        }
        
        return {
            flowItems,
            orderItems,
            getValueClass,
            formatValue
        }
    },
    template: `
        <div class="fund-flow-card glass-card">
            <div class="card-header">
                <span class="card-title">资金流向</span>
                <span class="card-subtitle">单位：亿港元</span>
            </div>
            
            <div class="flow-main">
                <div 
                    v-for="item in flowItems" 
                    :key="item.label"
                    class="flow-item"
                >
                    <div class="flow-icon">{{ item.icon }}</div>
                    <div class="flow-info">
                        <div class="flow-label">{{ item.label }}</div>
                        <div class="flow-value" :class="getValueClass(item.value)">
                            {{ formatValue(item.value) }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="order-flow">
                <div class="order-title">订单分布</div>
                
                <div class="order-bars"
>
                    <div 
                        v-for="item in orderItems" 
                        :key="item.label"
                        class="order-item"
                    >
                        <div class="order-label">{{ item.label }}</div>
                        
                        <div class="order-bar-container"
>
                            <div 
                                class="order-bar" 
                                :class="getValueClass(item.value)"
                                :style="{ 
                                    width: Math.min(Math.abs(item.value) * 20, 100) + '%',
                                    marginLeft: item.value < 0 ? 'auto' : '0',
                                    marginRight: item.value >= 0 ? 'auto' : '0'
                                }"
                            ></div>
                        </div>
                        
                        <div class="order-value" :class="getValueClass(item.value)">
                            {{ formatValue(item.value) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
