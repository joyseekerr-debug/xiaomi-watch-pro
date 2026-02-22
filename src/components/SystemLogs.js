// 系统日志组件
export default {
    name: 'SystemLogs',
    props: {
        logs: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const getLevelClass = (level) => {
            const classes = {
                'info': 'info',
                'success': 'success',
                'warning': 'warning',
                'error': 'danger'
            }
            return classes[level] || 'info'
        }
        
        const getLevelIcon = (level) => {
            const icons = {
                'info': 'ℹ️',
                'success': '✅',
                'warning': '⚠️',
                'error': '❌'
            }
            return icons[level] || 'ℹ️'
        }
        
        return {
            getLevelClass,
            getLevelIcon
        }
    },
    template: `
        <div class="system-logs glass-card"
>
            <div class="card-header"
>
                <span class="card-title">📝 系统日志</span>
                <span class="log-count">{{ logs.length }}条</span>
            </div>
            
            <div class="logs-list"
>
                <div 
                    v-for="(log, index) in logs" 
                    :key="index"
                    class="log-item"
                    :class="getLevelClass(log.level)"
                >
                    <span class="log-time">{{ log.time }}</span>
                    <span class="log-icon">{{ getLevelIcon(log.level) }}</span>
                    <span class="log-message">{{ log.message }}</span>
                </div>
            </div>
        </div>
    `
}
