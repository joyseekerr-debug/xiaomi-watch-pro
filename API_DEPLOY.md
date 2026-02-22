# Cloudflare Workers API 部署指南

## 快速部署（5分钟）

### 步骤1：安装 Wrangler CLI

```bash
# 使用 npm 安装
npm install -g wrangler

# 或者使用 npx（无需全局安装）
npx wrangler --version
```

### 步骤2：登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器，授权 Wrangler 访问你的 Cloudflare 账号。

### 步骤3：创建 Worker 项目

```bash
# 进入项目目录
cd /root/.openclaw/workspace/learning/xiaomi-dashboard

# 初始化 Wrangler
wrangler init xiaomi-watch-pro-api

# 或者手动创建 wrangler.toml
cat > wrangler.toml << 'EOF'
name = "xiaomi-watch-pro-api"
main = "worker.js"
compatibility_date = "2024-01-01"

[env.production]
name = "xiaomi-watch-pro-api"
EOF
```

### 步骤4：部署 Worker

```bash
# 部署到 Cloudflare
wrangler deploy

# 部署成功后，会显示访问地址
# 例如：https://xiaomi-watch-pro-api.your-subdomain.workers.dev
```

### 步骤5：测试 API

```bash
# 测试健康检查
curl https://xiaomi-watch-pro-api.your-subdomain.workers.dev/api/health

# 测试股价接口
curl https://xiaomi-watch-pro-api.your-subdomain.workers.dev/api/price

# 测试聚合接口
curl https://xiaomi-watch-pro-api.your-subdomain.workers.dev/api/dashboard
```

---

## 前端连接 API

修改 `index.html` 中的数据获取逻辑：

```javascript
// 在 setup() 函数中添加
const API_BASE = 'https://xiaomi-watch-pro-api.your-subdomain.workers.dev';

// 获取实时数据
const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/dashboard`);
    const data = await response.json();
    
    // 更新各个数据项
    currentPrice.value = data.price;
    position.value = data.position;
    keyLevels.value = data.keyLevels;
    todayAdvice.value = data.advice;
    factorScores.value = data.factorScores;
    fundFlowData.value = data.fundFlow;
    sentiment.value = data.sentiment;
    news.value = data.news;
    systemStatus.value = data.systemStatus;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchData();
  // 每5分钟刷新一次
  setInterval(fetchData, 300000);
});
```

---

## 连接真实数据源

目前 worker.js 使用的是 Mock 数据。要连接真实数据源，需要修改各个数据获取函数：

### 示例：连接 itick API 获取股价

```javascript
// 在 worker.js 中添加
async function getPriceData() {
  // 调用 itick API
  const response = await fetch('https://api.itick.com/price?symbol=1810.HK', {
    headers: {
      'Authorization': 'Bearer YOUR_ITICK_API_KEY'
    }
  });
  
  const data = await response.json();
  
  return jsonResponse({
    symbol: '1810.HK',
    name: '小米集团-W',
    price: data.price,
    change: data.change,
    changePercent: data.changePercent,
    // ...
    timestamp: getTimestamp()
  });
}
```

### 示例：读取本地系统数据

如果系统和 API 在同一服务器，可以直接读取文件或调用本地脚本：

```javascript
// 读取监控报告文件
const report = await STORAGE.get('latest_report');
const data = JSON.parse(report);

return jsonResponse(data);
```

---

## 自定义域名（可选）

### 添加自定义域名

1. 在 Cloudflare Dashboard 中，选择你的 Worker
2. 点击 "Triggers" → "Custom Domains"
3. 点击 "Add Custom Domain"
4. 输入域名：`api.xiaomi-watch-pro.com`
5. 按照提示添加 DNS 记录

---

## 监控和日志

### 查看日志

```bash
# 实时查看日志
wrangler tail

# 查看生产环境日志
wrangler tail --env production
```

### 添加 Analytics

在 worker.js 中添加：

```javascript
// 记录请求日志
console.log(JSON.stringify({
  timestamp: getTimestamp(),
  path: url.pathname,
  method: request.method,
  ip: request.headers.get('CF-Connecting-IP')
}));
```

---

## 故障排查

### 问题1：部署失败

```bash
# 检查 wrangler.toml 配置
wrangler config

# 重新登录
wrangler logout
wrangler login
```

### 问题2：API 返回 500 错误

```bash
# 查看详细错误日志
wrangler tail

# 本地测试
wrangler dev
```

### 问题3：CORS 错误

确保 worker.js 中已添加 CORS 响应头：

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
```

---

## 下一步

1. 部署 API Worker
2. 修改前端代码，连接 API
3. 将 API 地址配置到前端
4. 测试数据同步

**需要我帮你修改前端代码连接 API 吗？**
