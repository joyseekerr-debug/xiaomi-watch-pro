// 新闻卡片组件
export default {
    name: 'NewsCard',
    props: {
        news: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const getSentimentClass = (sentiment) => {
            const classes = {
                'positive': 'success',
                'negative': 'danger',
                'neutral': 'muted'
            }
            return classes[sentiment] || 'muted'
        }
        
        const getSentimentIcon = (sentiment) => {
            const icons = {
                'positive': '🟢',
                'negative': '🔴',
                'neutral': '⚪'
            }
            return icons[sentiment] || '⚪'
        }
        
        const getImportanceClass = (importance) => {
            return importance === 'high' ? 'high' : importance === 'medium' ? 'medium' : 'low'
        }
        
        return {
            getSentimentClass,
            getSentimentIcon,
            getImportanceClass
        }
    },
    template: `
        <div class="news-card glass-card"
>
            <div class="card-header"
>
                <span class="card-title">📰 实时资讯</span>
                <span class="news-count">{{ news.length }}条</span>
            </div>
            
            <div class="news-list"
>
                <div 
                    v-for="item in news" 
                    :key="item.id"
                    class="news-item"
                    :class="getImportanceClass(item.importance)"
                >
                    <div class="news-sentiment" :class="getSentimentClass(item.sentiment)">
                        {{ getSentimentIcon(item.sentiment) }}
                    </div>
                    
                    <div class="news-content"
>
                        <div class="news-title">{{ item.title }}</div>
                        
                        <div class="news-meta"
>
                            <span class="news-source">{{ item.source }}</span>
                            <span class="news-time">{{ item.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
