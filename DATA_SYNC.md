# 接入真实数据方案

## 方案选择

由于 XiaomiWatch Pro 系统运行在本地/服务器，而 API 在 Cloudflare Workers（边缘网络），需要数据同步机制。

## 推荐方案：Cloudflare KV + 定时同步

### 架构
```
XiaomiWatch Pro 系统（本地/服务器）
    ↓ 定时同步（每5分钟）
Cloudflare KV 存储
    ↓ 读取
Cloudflare Workers API
    ↓ 返回
前端仪表盘
```

### 实施步骤

#### 步骤1：创建 Cloudflare KV Namespace

```bash
npx wrangler kv:namespace create "XIAOMI_WATCH_DATA"
```

获得 namespace ID，添加到 wrangler.toml

#### 步骤2：创建数据同步脚本

在本地系统创建 sync-to-kv.js：

```javascript
// 定时将监控数据同步到 Cloudflare KV
const CF_ACCOUNT_ID = 'your-account-id';
const CF_API_TOKEN = 'your-api-token';
const KV_NAMESPACE_ID = 'your-kv-namespace-id';

async function syncData() {
  // 读取系统最新数据
  const data = {
    price: await getCurrentPrice(),
    position: await getPosition(),
    factorScores: await getFactorScores(),
    sentiment: await getSentiment(),
    timestamp: new Date().toISOString()
  };
  
  // 写入 Cloudflare KV
  await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/dashboard_data`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

// 每5分钟同步一次
setInterval(syncData, 300000);
```

#### 步骤3：修改 API 读取 KV 数据

修改 worker.js：

```javascript
// 从 KV 读取数据
async function getDashboardData() {
  const data = await XIAOMI_WATCH_DATA.get('dashboard_data', { type: 'json' });
  
  if (!data) {
    // KV 无数据，返回默认数据
    return getDefaultDashboardData();
  }
  
  return jsonResponse(data);
}
```

#### 步骤4：配置 wrangler.toml

```toml
name = "xiaomi-watch-pro-api"
main = "worker.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "XIAOMI_WATCH_DATA"
id = "your-kv-namespace-id"
```

---

## 简化方案：直接 HTTP 调用（如果系统有公网访问）

如果 XiaomiWatch Pro 系统部署在有公网 IP 的服务器上：

```javascript
// worker.js 中直接调用
async function getPriceData() {
  const response = await fetch('http://your-server:3000/api/price');
  const data = await response.json();
  return jsonResponse(data);
}
```

---

## 当前实施方案

由于系统当前在本地运行，建议：

1. **短期**：保持 API 返回 Mock 数据，用于演示
2. **中期**：部署系统到服务器，配置公网访问
3. **长期**：使用 KV 同步方案，实现边缘缓存

---

## 需要你做

**选择方案：**

A. **保持 Mock 数据**（当前）- 用于演示，数据固定
B. **部署系统到服务器** - 需要云服务器，配置公网访问
C. **KV 同步方案** - 最优雅，但需要额外配置

**推荐 B 方案**，部署到阿里云/腾讯云服务器，成本低（约50元/月）。

**你想用哪种方案？**
