# XiaomiWatch Pro API 接口文档

## 接口概述

提供 RESTful API 供前端仪表盘获取实时数据。

**Base URL:** `https://api.xiaomi-watch-pro.workers.dev` (Cloudflare Workers)
或 `http://your-server:3000/api` (自建服务器)

## 接口列表

### 1. 获取实时股价

**GET** `/api/price`

**响应示例：**
```json
{
  "symbol": "1810.HK",
  "name": "小米集团-W",
  "price": 35.36,
  "change": -1.30,
  "changePercent": -3.55,
  "open": 36.66,
  "high": 36.86,
  "low": 35.32,
  "prevClose": 36.66,
  "volume": "9326.99万",
  "turnover": "33.29亿",
  "timestamp": "2026-02-23T09:30:00+08:00",
  "source": "itick+新浪财经",
  "confidence": "高置信度"
}
```

### 2. 获取持仓数据

**GET** `/api/position`

**响应示例：**
```json
{
  "shares": 1600,
  "avgCost": 35.90,
  "marketValue": 56576,
  "profit": -864,
  "profitPercent": -1.51,
  "isProfit": false,
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 3. 获取关键价位

**GET** `/api/key-levels`

**响应示例：**
```json
{
  "buy": 34.0,
  "sell": 42.0,
  "stopLoss": 28.0,
  "support": [32.5, 30.0, 28.0],
  "resistance": [38.0, 40.0, 42.0],
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 4. 获取今日建议

**GET** `/api/advice`

**响应示例：**
```json
{
  "action": "等待",
  "actionColor": "warning",
  "reason": "距离买入位34.0还差3.9%",
  "detailReason": "当前价格35.36，建议等待回调至34.0附近再考虑建仓",
  "distanceToBuy": 3.9,
  "distanceToSell": 18.8,
  "riskLevel": "中等",
  "confidence": 78,
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 5. 获取6因子评分

**GET** `/api/factor-scores`

**响应示例：**
```json
{
  "overall": 72.8,
  "factors": {
    "price": { "score": 75, "weight": 0.30 },
    "news": { "score": 68, "weight": 0.20 },
    "fundFlow": { "score": 45, "weight": 0.20 },
    "sentiment": { "score": 58, "weight": 0.10 },
    "technical": { "score": 65, "weight": 0.15 },
    "market": { "score": 70, "weight": 0.05 }
  },
  "formula": "综合评分 = 价格×0.3 + 新闻×0.2 + 资金×0.2 + 舆情×0.1 + 技术×0.15 + 大盘×0.05",
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 6. 获取资金流向

**GET** `/api/fund-flow?period=today`

**参数：**
- `period`: 时间跨度 (`today`, `5d`, `10d`, `20d`)

**响应示例：**
```json
{
  "period": "today",
  "mainInflow": -2.35,
  "retailInflow": 0.85,
  "northbound": -1.20,
  "largeOrders": -1.50,
  "mediumOrders": -0.50,
  "smallOrders": 0.30,
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 7. 获取舆情监控

**GET** `/api/sentiment`

**响应示例：**
```json
{
  "score": 35,
  "level": "负面",
  "stats": {
    "positive": 12,
    "neutral": 28,
    "negative": 45,
    "total": 85
  },
  "reason": "近期高管言论偏谨慎，社交媒体负面情绪较多，机构评级下调",
  "events": [
    { "title": "雷军表示2025年是最艰难的一年", "impact": -15, "time": "3天前" },
    { "title": "小米SU7销量不及预期传闻", "impact": -10, "time": "5天前" },
    { "title": "多家机构下调目标价", "impact": -8, "time": "1周前" }
  ],
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 8. 获取最新新闻

**GET** `/api/news?limit=5`

**参数：**
- `limit`: 返回新闻数量（默认5条）

**响应示例：**
```json
{
  "news": [
    {
      "title": "小米集团2月20日回购428万股，涉资1.52亿港元",
      "url": "https://finance.sina.com.cn/...",
      "source": "新浪财经",
      "time": "2天前",
      "sentiment": "positive",
      "sentimentText": "正面"
    }
  ],
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 9. 获取系统状态

**GET** `/api/system-status`

**响应示例：**
```json
{
  "status": "正常监控中",
  "statusCode": "normal",
  "nextUpdate": "2分钟后",
  "lastUpdate": "刚刚",
  "uptime": "72小时",
  "dataSources": ["itick", "新浪财经", "东方财富"],
  "alerts": [],
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

### 10. 获取所有数据（聚合接口）

**GET** `/api/dashboard`

**响应示例：** 包含以上所有数据的聚合对象

## 部署方案

### 方案1：Cloudflare Workers（推荐，免费）

**优点：**
- 全球CDN，访问快
- 免费额度充足
- 自动HTTPS

**步骤：**
1. 安装 Wrangler CLI
2. 创建 Worker 脚本
3. 部署到 Cloudflare

### 方案2：自建 Node.js 服务器

**优点：**
- 完全控制
- 可连接本地数据源

**步骤：**
1. 创建 Express/Fastify 服务
2. 连接数据源
3. 部署到服务器

## 错误处理

**错误响应格式：**
```json
{
  "error": true,
  "code": "DATA_SOURCE_ERROR",
  "message": "无法获取股价数据",
  "timestamp": "2026-02-23T09:30:00+08:00"
}
```

**错误码：**
- `200` - 成功
- `400` - 请求参数错误
- `404` - 数据不存在
- `500` - 服务器内部错误
- `503` - 数据源不可用

## 前端调用示例

```javascript
// 获取实时股价
const response = await fetch('https://api.xiaomi-watch-pro.workers.dev/api/price');
const data = await response.json();

// 更新页面
currentPrice.value = data;
```
