// XiaomiWatch Pro API Worker
// Cloudflare Workers 部署脚本

// 导入系统模块（实际部署时需要调整路径）
// import { getCurrentPrice } from './modules/price.js';
// import { getFactorScores } from './modules/factor.js';
// import { getSentiment } from './modules/sentiment.js';

// CORS 响应头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// 处理 CORS 预检请求
function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

// 创建 JSON 响应
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders
  });
}

// 获取当前时间戳
function getTimestamp() {
  return new Date().toISOString();
}

// API 路由处理
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }
  
  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return jsonResponse({
      error: true,
      code: 'METHOD_NOT_ALLOWED',
      message: '只允许 GET 请求',
      timestamp: getTimestamp()
    }, 405);
  }
  
  try {
    switch (path) {
      case '/api/price':
        return await getPriceData();
        
      case '/api/position':
        return await getPositionData();
        
      case '/api/key-levels':
        return await getKeyLevelsData();
        
      case '/api/advice':
        return await getAdviceData();
        
      case '/api/factor-scores':
        return await getFactorScoresData();
        
      case '/api/fund-flow':
        const period = url.searchParams.get('period') || 'today';
        return await getFundFlowData(period);
        
      case '/api/sentiment':
        return await getSentimentData();
        
      case '/api/news':
        const limit = parseInt(url.searchParams.get('limit')) || 5;
        return await getNewsData(limit);
        
      case '/api/system-status':
        return await getSystemStatusData();
        
      case '/api/dashboard':
        return await getDashboardData();
        
      case '/api/health':
        return jsonResponse({
          status: 'ok',
          timestamp: getTimestamp(),
          version: '1.0.0'
        });
        
      default:
        return jsonResponse({
          error: true,
          code: 'NOT_FOUND',
          message: '接口不存在',
          availableEndpoints: [
            '/api/price',
            '/api/position',
            '/api/key-levels',
            '/api/advice',
            '/api/factor-scores',
            '/api/fund-flow',
            '/api/sentiment',
            '/api/news',
            '/api/system-status',
            '/api/dashboard',
            '/api/health'
          ],
          timestamp: getTimestamp()
        }, 404);
    }
  } catch (error) {
    return jsonResponse({
      error: true,
      code: 'INTERNAL_ERROR',
      message: error.message,
      timestamp: getTimestamp()
    }, 500);
  }
}

// 1. 获取实时股价
async function getPriceData() {
  // TODO: 连接真实数据源
  // const price = await getCurrentPriceFromAPI();
  
  return jsonResponse({
    symbol: '1810.HK',
    name: '小米集团-W',
    price: 35.36,
    change: -1.30,
    changePercent: -3.55,
    open: 36.66,
    high: 36.86,
    low: 35.32,
    prevClose: 36.66,
    volume: '9326.99万',
    turnover: '33.29亿',
    timestamp: getTimestamp(),
    source: 'itick+新浪财经',
    confidence: '高置信度'
  });
}

// 2. 获取持仓数据
async function getPositionData() {
  return jsonResponse({
    shares: 1600,
    avgCost: 35.90,
    marketValue: 56576,
    profit: -864,
    profitPercent: -1.51,
    isProfit: false,
    timestamp: getTimestamp()
  });
}

// 3. 获取关键价位
async function getKeyLevelsData() {
  return jsonResponse({
    buy: 34.0,
    sell: 42.0,
    stopLoss: 28.0,
    support: [32.5, 30.0, 28.0],
    resistance: [38.0, 40.0, 42.0],
    timestamp: getTimestamp()
  });
}

// 4. 获取今日建议
async function getAdviceData() {
  return jsonResponse({
    action: '等待',
    actionColor: 'warning',
    reason: '距离买入位34.0还差3.9%',
    detailReason: '当前价格35.36，建议等待回调至34.0附近再考虑建仓',
    distanceToBuy: 3.9,
    distanceToSell: 18.8,
    riskLevel: '中等',
    confidence: 78,
    timestamp: getTimestamp()
  });
}

// 5. 获取6因子评分
async function getFactorScoresData() {
  return jsonResponse({
    overall: 72.8,
    factors: {
      price: { score: 75, weight: 0.30 },
      news: { score: 68, weight: 0.20 },
      fundFlow: { score: 45, weight: 0.20 },
      sentiment: { score: 58, weight: 0.10 },
      technical: { score: 65, weight: 0.15 },
      market: { score: 70, weight: 0.05 }
    },
    formula: '综合评分 = 价格×0.3 + 新闻×0.2 + 资金×0.2 + 舆情×0.1 + 技术×0.15 + 大盘×0.05',
    timestamp: getTimestamp()
  });
}

// 6. 获取资金流向
async function getFundFlowData(period) {
  const data = {
    today: { mainInflow: -2.35, retailInflow: 0.85, northbound: -1.20, largeOrders: -1.50, mediumOrders: -0.50, smallOrders: 0.30 },
    '5d': { mainInflow: -8.50, retailInflow: 3.20, northbound: -4.50, largeOrders: -5.20, mediumOrders: -2.10, smallOrders: 1.20 },
    '10d': { mainInflow: -15.20, retailInflow: 6.80, northbound: -8.30, largeOrders: -9.50, mediumOrders: -4.20, smallOrders: 2.50 },
    '20d': { mainInflow: -28.50, retailInflow: 12.50, northbound: -15.60, largeOrders: -18.20, mediumOrders: -8.50, smallOrders: 5.30 }
  };
  
  return jsonResponse({
    period: period,
    ...data[period],
    timestamp: getTimestamp()
  });
}

// 7. 获取舆情监控
async function getSentimentData() {
  return jsonResponse({
    score: 35,
    level: '负面',
    stats: {
      positive: 12,
      neutral: 28,
      negative: 45,
      total: 85
    },
    reason: '近期高管言论偏谨慎，社交媒体负面情绪较多，机构评级下调',
    events: [
      { title: '雷军表示2025年是最艰难的一年', impact: -15, time: '3天前' },
      { title: '小米SU7销量不及预期传闻', impact: -10, time: '5天前' },
      { title: '多家机构下调目标价', impact: -8, time: '1周前' }
    ],
    timestamp: getTimestamp()
  });
}

// 8. 获取最新新闻
async function getNewsData(limit) {
  const allNews = [
    { title: '小米集团2月20日回购428万股，涉资1.52亿港元', url: 'https://finance.sina.com.cn/stock/hkstock/ggscyd/2025-02-20/doc-inefukaq9026549.shtml', source: '新浪财经', time: '2天前', sentiment: 'positive', sentimentText: '正面' },
    { title: '小米SU7销量超预期，3月产能将提升', url: 'https://www.cls.cn/detail/1926440', source: '财联社', time: '3天前', sentiment: 'positive', sentimentText: '正面' },
    { title: '雷军：2025年是小米汽车关键之年', url: 'https://www.wallstreetcn.com/articles/1234567', source: '华尔街见闻', time: '5天前', sentiment: 'neutral', sentimentText: '中性' },
    { title: '摩根大通下调小米目标价至38港元', url: 'https://finance.sina.com.cn/stock/hkstock/ggscyd/2025-02-18/doc-inefukaq9026548.shtml', source: '新浪财经', time: '1周前', sentiment: 'negative', sentimentText: '负面' }
  ];
  
  return jsonResponse({
    news: allNews.slice(0, limit),
    timestamp: getTimestamp()
  });
}

// 9. 获取系统状态
async function getSystemStatusData() {
  return jsonResponse({
    status: '正常监控中',
    statusCode: 'normal',
    nextUpdate: '2分钟后',
    lastUpdate: '刚刚',
    uptime: '72小时',
    dataSources: ['itick', '新浪财经', '东方财富'],
    alerts: [],
    timestamp: getTimestamp()
  });
}

// 10. 获取所有数据（聚合接口）
async function getDashboardData() {
  const [
    price,
    position,
    keyLevels,
    advice,
    factorScores,
    fundFlow,
    sentiment,
    news,
    systemStatus
  ] = await Promise.all([
    getPriceData().then(r => r.json()),
    getPositionData().then(r => r.json()),
    getKeyLevelsData().then(r => r.json()),
    getAdviceData().then(r => r.json()),
    getFactorScoresData().then(r => r.json()),
    getFundFlowData('today').then(r => r.json()),
    getSentimentData().then(r => r.json()),
    getNewsData(5).then(r => r.json()),
    getSystemStatusData().then(r => r.json())
  ]);
  
  return jsonResponse({
    price,
    position,
    keyLevels,
    advice,
    factorScores,
    fundFlow,
    sentiment,
    news,
    systemStatus,
    timestamp: getTimestamp()
  });
}

// 主入口
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
