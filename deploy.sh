#!/bin/bash
# Cloudflare Pages 部署脚本
# 使用方法：bash deploy.sh

echo "🚀 开始部署 Xiaomi Watch Pro 到 Cloudflare Pages..."

# 检查 wrangler 是否安装
if ! command -v wrangler &> /dev/null; then
    echo "📦 安装 Wrangler CLI..."
    npm install -g wrangler
fi

# 登录 Cloudflare
echo "🔑 请登录 Cloudflare..."
wrangler login

# 部署
echo "📤 部署中..."
cd /root/.openclaw/workspace/learning/xiaomi-dashboard
wrangler pages deploy . --project-name=xiaomi-watch-pro

echo "✅ 部署完成！"
echo "访问地址: https://xiaomi-watch-pro.pages.dev"
