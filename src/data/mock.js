// Mock数据 - 小米股票监控仪表盘
// 包含7天历史数据和各种状态模拟

export const mockData = {
    // 股票基本信息
    stockInfo: {
        symbol: '1810.HK',
        name: '小米集团-W',
        currency: 'HKD',
        market: '港股',
    },
    
    // 当前价格数据
    currentPrice: {
        price: 35.36,
        change: -1.30,
        changePercent: -3.55,
        open: 36.50,
        high: 36.80,
        low: 35.20,
        prevClose: 36.66,
        volume: '2.8亿',
        turnover: '98.5亿',
        timestamp: new Date().toISOString(),
        source: 'itick+新浪财经',
        confidence: '高置信度'
    },
    
    // 持仓信息
    position: {
        shares: 1000,
        avgCost: 34.63,
        totalCost: 34630,
        currentValue: 35360,
        profit: 730,
        profitPercent: 2.11,
        isProfit: true
    },
    
    // 关键价位
    keyLevels: {
        buy: 34.0,
        sell: 42.0,
        stopLoss: 28.0,
        support: [32.5, 30.0, 28.0],
        resistance: [38.0, 40.0, 42.0]
    },
    
    // 今日建议
    todayAdvice: {
        action: '等待', // 买入/卖出/等待/止损
        actionColor: 'warning', // success/danger/warning/info
        reason: '距离买入位34.0还差3.9%',
        distanceToBuy: 3.9,
        distanceToSell: 18.8,
        riskLevel: '中等',
        confidence: 78
    },
    
    // 系统状态
    systemStatus: {
        status: '正常监控中',
        statusCode: 'normal', // normal/warning/danger/idle
        nextUpdate: '2分钟后',
        lastUpdate: '刚刚',
        uptime: '72小时',
        dataSources: ['itick', '新浪财经', '东方财富'],
        alerts: []
    },
    
    // 交易时间信息
    marketHours: {
        isTrading: true,
        session: '午盘',
        openTime: '09:30',
        closeTime: '16:00',
        nextOpen: null,
        timeToClose: '2小时15分',
        isEarningsMonth: false,
        earningsDate: null
    },
    
    // 6因子评分
    factorScores: {
        technical: 65,      // 技术面
        fundamental: 72,    // 基本面
        sentiment: 58,      // 情绪面
        fundFlow: 45,       // 资金流向
        valuation: 68,      // 估值水平
        momentum: 52,       // 动量指标
        overall: 60         // 综合评分
    },
    
    // 资金流向
    fundFlow: {
        mainInflow: -2.35,      // 主力净流入(亿)
        retailInflow: 0.85,     // 散户净流入(亿)
        northbound: -1.20,      // 北向资金(亿)
        largeOrders: -1.50,     // 大单净流入
        mediumOrders: -0.50,    // 中单净流入
        smallOrders: 0.60       // 小单净流入
    },
    
    // 舆情数据
    sentiment: {
        overall: '中性偏空',
        score: 48,
        positive: 25,
        neutral: 45,
        negative: 30,
        hotTopics: ['新能源汽车', '小米汽车', '财报预期', '市场竞争'],
        alertLevel: 'yellow' // green/yellow/red
    },
    
    // 新闻列表
    news: [
        {
            id: 1,
            title: '小米汽车SU7交付量创新高，月交付突破2万辆',
            source: '财联社',
            time: '35分钟前',
            sentiment: 'positive',
            importance: 'high'
        },
        {
            id: 2,
            title: '高盛维持小米"买入"评级，目标价45港元',
            source: '彭博',
            time: '2小时前',
            sentiment: 'positive',
            importance: 'high'
        },
        {
            id: 3,
            title: '智能手机市场竞争加剧，Q4出货量承压',
            source: 'IDC',
            time: '4小时前',
            sentiment: 'negative',
            importance: 'medium'
        },
        {
            id: 4,
            title: '小米集团回购股份，彰显管理层信心',
            source: '港交所公告',
            time: '5小时前',
            sentiment: 'positive',
            importance: 'medium'
        },
        {
            id: 5,
            title: '美联储降息预期升温，科技股普遍回调',
            source: '华尔街日报',
            time: '6小时前',
            sentiment: 'neutral',
            importance: 'low'
        }
    ],
    
    // 技术指标
    technicalIndicators: {
        ma5: 36.20,
        ma10: 35.85,
        ma20: 35.40,
        ma60: 34.20,
        rsi: 42,
        macd: { dif: -0.15, dea: -0.10, hist: -0.05 },
        boll: { upper: 38.5, middle: 35.4, lower: 32.3 },
        kdj: { k: 35, d: 40, j: 25 },
        volumeMA5: '3.2亿',
        volumeMA10: '3.0亿'
    },
    
    // 7天历史数据
    historyData: {
        dates: ['02-14', '02-17', '02-18', '02-19', '02-20', '02-21', '02-22'],
        prices: [34.20, 35.10, 34.85, 36.20, 36.50, 36.66, 35.36],
        volumes: [2.5, 3.1, 2.8, 3.5, 2.9, 3.2, 2.8],
        changes: [+1.2, +2.6, -0.7, +3.9, +0.8, +0.4, -3.55],
        states: ['normal', 'normal', 'normal', 'profit', 'profit', 'profit', 'loss']
    },
    
    // 分时数据（模拟一天）
    intradayData: {
        times: Array.from({length: 240}, (_, i) => {
            const hour = Math.floor(i / 60) + 9
            const minute = (i % 60) + 30
            if (hour === 11 && minute >= 30) return null
            if (hour === 12) return null
            if (hour === 13 && minute < 30) return null
            const h = hour >= 13 ? hour - 1 : hour
            const m = minute >= 60 ? minute - 60 : minute
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
        }).filter(Boolean),
        prices: Array.from({length: 240}, (_, i) => {
            // 模拟价格波动
            const base = 36.66
            const trend = Math.sin(i / 30) * 0.8
            const noise = (Math.random() - 0.5) * 0.5
            return +(base + trend + noise).toFixed(2)
        }).slice(0, 200)
    },
    
    // 系统日志
    systemLogs: [
        { time: '14:32:15', level: 'info', message: '价格更新: 35.36 HKD (-3.55%)' },
        { time: '14:27:03', level: 'warning', message: '检测到价格快速下跌，触发预警' },
        { time: '14:25:48', level: 'info', message: '资金流向更新: 主力净流出2.35亿' },
        { time: '14:20:00', level: 'info', message: '舆情监控: 检测到3条负面新闻' },
        { time: '14:15:22', level: 'info', message: '技术指标更新: RSI=42, MACD=-0.05' },
        { time: '14:10:00', level: 'success', message: '数据同步完成，所有源正常' },
        { time: '14:05:33', level: 'info', message: '新闻抓取: 获取5条最新资讯' },
        { time: '14:00:00', level: 'info', message: '定时任务: 6因子评分重新计算' }
    ],
    
    // 不同状态的数据变体（用于演示）
    scenarios: {
        // 到达买入位场景
        buySignal: {
            currentPrice: { price: 33.80, change: -2.80, changePercent: -7.65 },
            todayAdvice: { action: '买入', actionColor: 'success', reason: '已到达买入位34.0，机会来了！', distanceToBuy: 0 },
            systemStatus: { statusCode: 'buy-signal', alerts: ['价格已到达买入位'] }
        },
        // 止损警告场景
        stopLoss: {
            currentPrice: { price: 27.50, change: -9.16, changePercent: -25.0 },
            todayAdvice: { action: '止损', actionColor: 'danger', reason: '已跌破止损位28.0，建议立即止损' },
            systemStatus: { statusCode: 'stop-loss', alerts: ['跌破止损位，请立即关注'] }
        },
        // 休市场景
        closed: {
            marketHours: { isTrading: false, session: '已收盘', timeToClose: null, nextOpen: '09:30' },
            systemStatus: { statusCode: 'idle' }
        },
        // 财报月场景
        earnings: {
            marketHours: { isEarningsMonth: true, earningsDate: '2025-03-15' },
            systemStatus: { status: '财报月高频监控中', alerts: ['距离财报发布还有15天'] }
        }
    }
}

// 生成实时更新的模拟数据
export function generateRealtimeData(baseData) {
    const volatility = 0.02 // 2%波动率
    const randomChange = (Math.random() - 0.5) * volatility
    const newPrice = +(baseData.currentPrice.price * (1 + randomChange)).toFixed(2)
    const change = +(newPrice - baseData.currentPrice.prevClose).toFixed(2)
    const changePercent = +((change / baseData.currentPrice.prevClose) * 100).toFixed(2)
    
    return {
        ...baseData,
        currentPrice: {
            ...baseData.currentPrice,
            price: newPrice,
            change,
            changePercent,
            timestamp: new Date().toISOString()
        },
        position: {
            ...baseData.position,
            currentValue: +(newPrice * baseData.position.shares).toFixed(0),
            profit: +((newPrice - baseData.position.avgCost) * baseData.position.shares).toFixed(0),
            profitPercent: +(((newPrice - baseData.position.avgCost) / baseData.position.avgCost) * 100).toFixed(2),
            isProfit: newPrice > baseData.position.avgCost
        }
    }
}

// 导出默认数据
export default mockData
