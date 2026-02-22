# 小米股票智能监控仪表盘

## 项目简介

一个让投资者**3秒内做出决策**的智能监控仪表盘，专为小米集团(01810.HK)股票监控设计。

## 核心特性

### 1. 一眼决策原则
- 当前股价（最大字号显示）
- 今日建议（买/卖/等待）
- 持仓盈亏（红绿色直观显示）
- 关键价位距离

### 2. 状态语言系统
- 🟢 绿色脉冲 = 到达买入位，可以行动
- 🔴 红色闪烁 = 跌破止损，需要关注
- 🟡 黄色警告 = 舆情负面，谨慎操作
- 🔵 蓝色呼吸 = 交易中，数据实时更新
- ⚪ 灰色静态 = 休市中，显示倒计时

### 3. 时间感知界面
- **交易时间**：实时价格大字，5分钟刷新
- **非交易时间**：显示最后收盘价，灰色主题
- **财报月**：顶部横幅提醒，高频监控

### 4. 渐进披露交互
- **第一层**：股价 + 建议 + 盈亏 + 关键位
- **第二层**：6因子评分 + 资金流向 + 舆情
- **第三层**：技术指标 + 历史数据 + 系统日志

### 5. 情感化设计
- 浮盈时：绿色主题 + "今日浮盈+XXX，不错！"
- 浮亏时：灰色主题 + "今日回调，保持冷静。"
- 到达买入位：绿色脉冲 + "机会来了！"

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **样式框架**：Tailwind CSS
- **图表库**：ECharts 5
- **字体**：系统默认字体栈

## 项目结构

```
xiaomi-dashboard/
├── index.html              # 主入口
├── src/
│   ├── main.js            # Vue应用主文件
│   ├── components/        # 组件目录
│   │   ├── PriceCard.js       # 股价卡片
│   │   ├── AdviceCard.js      # 建议卡片
│   │   ├── PositionCard.js    # 持仓卡片
│   │   ├── KeyLevelsCard.js   # 关键位卡片
│   │   ├── SystemStatusCard.js # 系统状态
│   │   ├── FactorRadar.js     # 因子雷达图
│   │   ├── FundFlowCard.js    # 资金流向
│   │   ├── SentimentCard.js   # 舆情卡片
│   │   ├── NewsCard.js        # 新闻卡片
│   │   ├── TechnicalChart.js  # 技术指标
│   │   ├── HistoryChart.js    # 历史图表
│   │   ├── SystemLogs.js      # 系统日志
│   │   ├── MobileNav.js       # 移动端导航
│   │   └── EarningsBanner.js  # 财报横幅
│   ├── data/
│   │   └── mock.js        # Mock数据
│   └── styles/
│       └── main.css       # 样式文件
└── README.md              # 本文档
```

## 快速开始

### 方式1：直接打开（最简单）
```bash
# 进入项目目录
cd xiaomi-dashboard

# 用浏览器打开 index.html
# 或者使用本地服务器
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

### 方式2：使用Node.js服务器
```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8080

# 访问 http://localhost:8080
```

### 方式3：Docker部署
```bash
# 构建镜像
docker build -t xiaomi-dashboard .

# 运行容器
docker run -p 8080:80 xiaomi-dashboard
```

## 响应式适配

| 设备 | 宽度 | 布局 |
|------|------|------|
| 手机 | 320-768px | 单栏卡片 + 底部导航 |
| 平板 | 768-1200px | 双栏布局 |
| 电脑 | 1200px+ | 三栏布局 |

## 数据说明

当前使用Mock数据演示，包含：
- 7天历史股价数据
- 6因子评分模型数据
- 资金流向模拟数据
- 舆情分析示例数据

接入真实数据时，修改 `src/data/mock.js` 中的 API 调用即可。

## 自定义配置

### 修改监控标的
编辑 `src/data/mock.js`：
```javascript
stockInfo: {
    symbol: '1810.HK',    // 修改股票代码
    name: '小米集团-W',    // 修改股票名称
    currency: 'HKD',
    market: '港股',
}
```

### 修改关键价位
```javascript
keyLevels: {
    buy: 34.0,      // 买入位
    sell: 42.0,     // 卖出位
    stopLoss: 28.0, // 止损位
}
```

### 修改买入计划
```javascript
buyPlan: {
    batches: [
        { price: 34.0, shares: 800, executed: false },
        { price: 32.0, shares: 1000, executed: false },
        // ...
    ]
}
```

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能优化

- 首屏加载 < 1秒
- 数据更新动画 < 300ms
- 支持离线浏览（缓存最后数据）
- 图片懒加载

## 开发计划

- [x] 基础布局和样式
- [x] 股价卡片和动画
- [x] 持仓和盈亏显示
- [x] 关键价位提醒
- [x] 6因子评分雷达图
- [x] 资金流向展示
- [x] 舆情分析卡片
- [x] 响应式适配
- [ ] 真实数据接入
- [ ] 用户登录系统
- [ ] 操作记录保存
- [ ] 分享功能

## 许可证

MIT License

## 致谢

- Vue.js 团队
- Tailwind CSS 团队
- ECharts 团队
- 小米集团 (股票代码: 1810.HK)

---

**免责声明**：本仪表盘仅供学习和参考，不构成投资建议。股市有风险，投资需谨慎。
