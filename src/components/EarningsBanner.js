// EarningsBanner.js - 财报横幅组件
export default {
    name: 'EarningsBanner',
    props: {
        earningsDate: {
            type: String,
            default: '2026-03-24'
        },
        isEarningsMonth: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const calculateDays = () => {
            const today = new Date()
            const earnings = new Date(props.earningsDate)
            const diffTime = earnings - today
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays
        }
        
        return {
            calculateDays
        }
    },
    template: `
        <div v-if="isEarningsMonth" class="earnings-banner">
            <div class="flex items-center justify-center gap-4 py-3 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30">
                <span class="text-amber-400 text-xl">📅</span>
                <div class="text-sm">
                    <span class="text-amber-300 font-semibold">财报月高频监控中</span>
                    <span class="text-gray-400 mx-2">|</span>
                    <span class="text-gray-300">距离财报发布还有 <span class="text-accent font-mono">{{ calculateDays() }}</span> 天</span>
                </div>
                <span class="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded">30秒刷新</span>
            </div>
        </div>
    `
}
