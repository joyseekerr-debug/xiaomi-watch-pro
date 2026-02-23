#!/bin/bash
# 快速部署脚本 - 使用 npx 无需全局安装

echo "🚀 开始部署 XiaomiWatch Pro API..."

# 进入项目目录
cd /root/.openclaw/workspace/learning/xiaomi-dashboard

# 检查是否已登录
if [ ! -f "$HOME/.wrangler/config/default.toml" ]; then
    echo "🔑 请先登录 Cloudflare..."
    echo "运行: npx wrangler login"
    exit 1
fi

# 创建 wrangler.toml
cat > wrangler.toml << 'EOF'
name = "xiaomi-watch-pro-api"
main = "worker.js"
compatibility_date = "2024-01-01"

# 可选：添加自定义域名
# routes = [
#   { pattern = "api.xiaomi-watch-pro.com", custom_domain = true }
# ]
EOF

echo "📦 部署中..."

# 使用 npx 部署
npx wrangler deploy worker.js --name xiaomi-watch-pro-api

echo "✅ 部署完成！"
echo ""
echo "API 地址: https://xiaomi-watch-pro-api.your-subdomain.workers.dev"
echo ""
echo "测试命令:"
echo "  curl https://xiaomi-watch-pro-api.your-subdomain.workers.dev/api/health"
echo "  curl https://xiaomi-watch-pro-api.your-subdomain.workers.dev/api/price"
