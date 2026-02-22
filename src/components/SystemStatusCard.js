// 系统状态卡片组件
export default {
    name: 'SystemStatusCard',
    props: {
        status: {
            type: Object,
            required: true
        },
        marketHours: {
            type: Object,
            required: true
        },
        countdown: {
            type: Number,
            default: 120
        }
    },
    emits: ['refresh'],
    setup(props, { emit }) {
        const { computed } = Vue
        
        const statusColor = computed(() => {
            const colors = {
                'normal': 'success',
                'warning': 'warning',
                'danger': 'danger',
                'idle': 'muted',
                'buy-signal': 'success',
                'stop-loss': 'danger'
            }
            return colors[props.status.statusCode] || 'info'
        })
        
        const statusIcon = computed(() => {
            const icons = {
                'normal': '✅',
                'warning': '⚠️',
                'danger': '🚨',
                'idle': '💤',
                'buy-signal': '🎯',
                'stop-loss': '⛔'
            }
            return icons[props.status.statusCode] || 'ℹ️'
        })
        
        const formatCountdown = (seconds) => {
            const mins = Math.floor(seconds / 60)
            const secs = seconds % 60
            return `${mins}分${secs}秒`
        }
        
        const onRefresh = () => emit('refresh')
        
        return {
            statusColor,
            statusIcon,
            formatCountdown,
            onRefresh
        }
    },
    template: `
        <div class="system-status-card glass-card">
            <div class="card-header">
                <span class="card-title">系统状态</span>
                <button class="refresh-btn" @click="onRefresh" title="立即刷新">
                    🔄
                </button>
            </div>
            
            <div class="status-main">
                <div class="status-indicator-large" :class="statusColor">
                    <span class="status-icon">{{ statusIcon }}</span>
                    <span class="status-text">{{ status.status }}</span>
                </div>
            </div>
            
            <div class="market-status">
                <div class="market-row">
                    <span class="market-label">市场状态</span>
                    <span 
                        class="market-value" 
                        :class="marketHours.isTrading ? 'success' : 'muted'"
                    >
                        {{ marketHours.isTrading ? '交易中 ' + marketHours.session : '已收盘' }}
                    </span>
                </div>
                
                <div v-if="marketHours.isTrading" class="market-row">
                    <span class="market-label">距收盘</span>
                    <span class="market-value">{{ marketHours.timeToClose }}</span>
                </div>
                
                <div v-else class="market-row">
                    <span class="market-label">下次开盘</span>
                    <span class="market-value">{{ marketHours.nextOpen }}</span>
                </div>
            </div>
            
            <div class="update-info">
                <div class="update-row">
                    <span class="update-label">数据更新</span>
                    <span class="update-value">{{ status.lastUpdate }}</span>
                </div>
                <div class="update-row">
                    <span class="update-label">下次更新</span>
                    <span class="update-value">{{ formatCountdown(countdown) }}</span>
                </div>
            </div>
            
            <div class="data-sources">
                <div class="sources-title">数据源</div>
                <div class="sources-list">
                    <span 
                        v-for="source in status.dataSources" 
                        :key="source"
                        class="source-tag"
                    >
                        {{ source }}
                    </span>
                </div>
            </div>
            
            <div v-if="status.alerts.length > 0" class="system-alerts"
>
                <div class="alerts-title">系统提醒</div>
                <div class="alerts-list">
                    <div 
                        v-for="(alert, i) in status.alerts" 
                        :key="i"
                        class="alert-item"
                    >
                        🔔 {{ alert }}
                    </div>
                </div>
            </div>
        </div>
    `
}
