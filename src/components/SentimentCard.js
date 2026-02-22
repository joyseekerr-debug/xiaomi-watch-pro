// 舆情卡片组件
export default {
    name: 'SentimentCard',
    props: {
        sentiment: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { computed } = Vue
        
        const sentimentColor = computed(() => {
            const colors = {
                'green': 'success',
                'yellow': 'warning',
                'red': 'danger'
            }
            return colors[props.sentiment.alertLevel] || 'info'
        })
        
        const sentimentItems = computed(() => [
            { label: '看多', value: props.sentiment.positive, color: 'success' },
            { label: '中性', value: props.sentiment.neutral, color: 'muted' },
            { label: '看空', value: props.sentiment.negative, color: 'danger' }
        ])
        
        return {
            sentimentColor,
            sentimentItems
        }
    },
    template: `
        <div class="sentiment-card glass-card">
            <div class="card-header">
                <span class="card-title">市场情绪</span>
                <span class="sentiment-badge" :class="sentimentColor">
                    {{ sentiment.overall }}
                </span>
            </div>
            
            <div class="sentiment-score">
                <div class="score-circle" :class="sentimentColor"
>
                    <span class="score-value">{{ sentiment.score }}</span>
                    <span class="score-label">情绪指数</span>
                </div>
            </div>
            
            <div class="sentiment-bars"
>
                <div 
                    v-for="item in sentimentItems" 
                    :key="item.label"
                    class="sentiment-bar-item"
                >
                    <div class="bar-label">{{ item.label }}</div>
                    
                    <div class="bar-container"
>
                        <div 
                            class="bar-fill" 
                            :class="item.color"
                            :style="{ width: item.value + '%' }"
                        ></div>
                    </div>
                    
                    <div class="bar-value">{{ item.value }}%</div>
                </div>
            </div>
            
            <div class="hot-topics"
>
                <div class="topics-title">🔥 热门话题</div>
                <div class="topics-list">
                    <span 
                        v-for="topic in sentiment.hotTopics" 
                        :key="topic"
                        class="topic-tag"
                    >
                        {{ topic }}
                    </span>
                </div>
            </div>
        </div>
    `
}
