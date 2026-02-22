import { createApp, ref, computed, onMounted, onUnmounted } from 'vue'
import { mockData, generateRealtimeData } from './data/mock.js'
import PriceCard from './components/PriceCard.js'
import AdviceCard from './components/AdviceCard.js'
import PositionCard from './components/PositionCard.js'
import KeyLevelsCard from './components/KeyLevelsCard.js'
import SystemStatusCard from './components/SystemStatusCard.js'
import FactorRadar from './components/FactorRadar.js'
import FundFlowCard from './components/FundFlowCard.js'
import SentimentCard from './components/SentimentCard.js'
import NewsCard from './components/NewsCard.js'
import TechnicalChart from './components/TechnicalChart.js'
import HistoryChart from './components/HistoryChart.js'
import SystemLogs from './components/SystemLogs.js'
import MobileNav from './components/MobileNav.js'
import EarningsBanner from './components/EarningsBanner.js'

const { createApp: createVueApp } = Vue

const App = {
    components: {
        PriceCard,
        AdviceCard,
        PositionCard,
        KeyLevelsCard,
        SystemStatusCard,
        FactorRadar,
        FundFlowCard,
        SentimentCard,
        NewsCard,
        TechnicalChart,
        HistoryChart,
        SystemLogs,
        MobileNav,
        EarningsBanner
    },
    setup() {
        // 数据状态
        const data = ref(mockData)
        const currentView = ref('dashboard')
        const expandedLevel = ref(1) // 1=基础, 2=展开, 3=深度
        const isMobile = ref(window.innerWidth < 1200)
        const updateTimer = ref(null)
        const countdown = ref(120) // 2分钟倒计时
        
        // 计算属性
        const theme = computed(() => {
            const profit = data.value.position.isProfit
            const status = data.value.systemStatus.statusCode
            
            if (status === 'stop-loss') return 'danger'
            if (status === 'buy-signal') return 'success'
            if (!data.value.marketHours.isTrading) return 'idle'
            return profit ? 'profit' : 'loss'
        })
        
        const isBuySignal = computed(() => {
            return data.value.currentPrice.price <= data.value.keyLevels.buy
        })
        
        const isStopLoss = computed(() => {
            return data.value.currentPrice.price <= data.value.keyLevels.stopLoss
        })
        
        const emotionalMessage = computed(() => {
            const profit = data.value.position.profit
            const profitPercent = data.value.position.profitPercent
            
            if (isBuySignal.value) {
                return { text: '机会来了！价格已到达买入位', type: 'success', icon: '🎯' }
            }
            if (isStopLoss.value) {
                return { text: '注意！价格已跌破止损位', type: 'danger', icon: '⚠️' }
            }
            if (profit > 0) {
                return { text: `今日浮盈+${profit}元，不错！`, type: 'success', icon: '🎉' }
            }
            return { text: '今日回调，保持冷静。', type: 'neutral', icon: '🧘' }
        })
        
        // 方法
        const toggleExpand = () => {
            expandedLevel.value = expandedLevel.value >= 3 ? 1 : expandedLevel.value + 1
        }
        
        const refreshData = () => {
            // 模拟数据更新
            data.value = generateRealtimeData(data.value)
            countdown.value = 120
        }
        
        const handleBuy = () => {
            alert('买入功能：将跳转至交易界面')
        }
        
        const handleSell = () => {
            alert('卖出功能：将跳转至交易界面')
        }
        
        // 响应式处理
        const handleResize = () => {
            isMobile.value = window.innerWidth < 1200
        }
        
        // 倒计时
        const startCountdown = () => {
            setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--
                }
            }, 1000)
        }
        
        // 生命周期
        onMounted(() => {
            window.addEventListener('resize', handleResize)
            startCountdown()
            
            // 每5分钟自动刷新
            updateTimer.value = setInterval(() => {
                refreshData()
            }, 300000)
        })
        
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
            if (updateTimer.value) {
                clearInterval(updateTimer.value)
            }
        })
        
        return {
            data,
            currentView,
            expandedLevel,
            isMobile,
            theme,
            isBuySignal,
            isStopLoss,
            emotionalMessage,
            countdown,
            toggleExpand,
            refreshData,
            handleBuy,
            handleSell
        }
    },
    template: `
        <div class="app-container" :class="theme">
            <!-- 财报月横幅 -->
            <earnings-banner 
                v-if="data.marketHours.isEarningsMonth" 
                :earnings-date="data.marketHours.earningsDate"
            />
            
            <!-- 情感化消息条 -->
            <div class="emotion-bar" :class="emotionalMessage.type">
                <span class="emotion-icon">{{ emotionalMessage.icon }}</span>
                <span class="emotion-text">{{ emotionalMessage.text }}</span>
            </div>
            
            <!-- 桌面端布局 -->
            <div v-if="!isMobile" class="dashboard-grid">
                <!-- 左侧：实时数据 -->
                <div class="left-panel">
                    <price-card 
                        :price-data="data.currentPrice" 
                        :stock-info="data.stockInfo"
                        :is-buy-signal="isBuySignal"
                        :is-stop-loss="isStopLoss"
                    />
                    <advice-card 
                        :advice="data.todayAdvice" 
                        :current-price="data.currentPrice.price"
                        :key-levels="data.keyLevels"
                    />
                    <position-card 
                        :position="data.position"
                        @buy="handleBuy"
                        @sell="handleSell"
                    />
                    <key-levels-card :key-levels="data.keyLevels" />
                </div>
                
                <!-- 中间：图表和深度分析 -->
                <div class="center-panel">
                    <div class="chart-section glass-card">
                        <technical-chart 
                            :intraday-data="data.intradayData"
                            :current-price="data.currentPrice"
                        />
                    </div>
                    
                    <div v-if="expandedLevel >= 2" class="analysis-section">
                        <div class="analysis-grid">
                            <factor-radar :scores="data.factorScores" />
                            <fund-flow-card :fund-flow="data.fundFlow" />
                        </div>
                    </div>
                    
                    <div v-if="expandedLevel >= 3" class="deep-analysis">
                        <history-chart :history-data="data.historyData" />
                    </div>
                </div>
                
                <!-- 右侧：系统信息 -->
                <div class="right-panel">
                    <system-status-card 
                        :status="data.systemStatus"
                        :market-hours="data.marketHours"
                        :countdown="countdown"
                        @refresh="refreshData"
                    />
                    <sentiment-card :sentiment="data.sentiment" />
                    <news-card :news="data.news" />
                    <system-logs v-if="expandedLevel >= 3" :logs="data.systemLogs" />
                </div>
            </div>
            
            <!-- 移动端布局 -->
            <div v-else class="mobile-layout">
                <!-- 顶部股价速览 -->
                <div class="mobile-header">
                    <price-card 
                        :price-data="data.currentPrice" 
                        :stock-info="data.stockInfo"
                        :is-buy-signal="isBuySignal"
                        :is-stop-loss="isStopLoss"
                        compact
                    />
                </div>
                
                <!-- 中部可滑动卡片 -->
                <div class="mobile-content">
                    <div class="mobile-cards">
                        <advice-card 
                            :advice="data.todayAdvice" 
                            :current-price="data.currentPrice.price"
                            :key-levels="data.keyLevels"
                        />
                        <position-card 
                            :position="data.position"
                            @buy="handleBuy"
                            @sell="handleSell"
                        />
                        <key-levels-card :key-levels="data.keyLevels" />
                        
                        <div v-if="expandedLevel >= 2">
                            <factor-radar :scores="data.factorScores" />
                            <fund-flow-card :fund-flow="data.fundFlow" />
                            <sentiment-card :sentiment="data.sentiment" />
                            <news-card :news="data.news" />
                        </div>
                        
                        <div v-if="expandedLevel >= 3">
                            <technical-chart 
                                :intraday-data="data.intradayData"
                                :current-price="data.currentPrice"
                            />
                            <history-chart :history-data="data.historyData" />
                            <system-logs :logs="data.systemLogs" />
                        </div>
                    </div>
                </div>
                
                <!-- 底部导航 -->
                <mobile-nav 
                    :current-view="currentView"
                    :expanded-level="expandedLevel"
                    @change-view="currentView = $event"
                    @toggle-expand="toggleExpand"
                />
            </div>
            
            <!-- 展开/收起按钮 -->
            <button v-if="!isMobile" class="expand-btn" @click="toggleExpand">
                <span v-if="expandedLevel === 1">展开更多 ↓</span>
                <span v-else-if="expandedLevel === 2">深度分析 ↓</span>
                <span v-else>收起 ↑</span>
            </button>
        </div>
    `
}

// 创建应用
createVueApp(App).mount('#app')
