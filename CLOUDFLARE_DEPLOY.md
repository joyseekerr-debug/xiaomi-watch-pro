# Cloudflare Pages 部署指南

## 一、准备工作

### 1. 注册账号
1. 访问 https://dash.cloudflare.com/
2. 点击 "Sign up" 注册账号（可用邮箱注册）
3. 验证邮箱

### 2. 准备代码
确保你的代码在 GitHub/GitLab 仓库中，或者本地准备好。

---

## 二、方案A：通过 Git 部署（推荐）

### 步骤1：创建 GitHub 仓库

```bash
# 进入项目目录
cd /root/.openclaw/workspace/learning/xiaomi-dashboard

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 在 GitHub 创建仓库后，关联并推送
git remote add origin https://github.com/你的用户名/xiaomi-dashboard.git
git branch -M main
git push -u origin main
```

### 步骤2：在 Cloudflare 连接仓库

1. 登录 https://dash.cloudflare.com/
2. 点击左侧菜单 "Pages"
3. 点击 "Create a project"
4. 选择 "Connect to Git"
5. 授权 Cloudflare 访问你的 GitHub 账号
6. 选择 `xiaomi-dashboard` 仓库
7. 点击 "Begin setup"

### 步骤3：配置构建设置

| 设置项 | 值 |
|:---|:---|
| Project name | xiaomi-dashboard |
| Production branch | main |
| Framework preset | None |
| Build command | （留空，因为是纯静态） |
| Build output directory | / |

点击 "Save and Deploy"

### 步骤4：等待部署完成

- 部署通常需要 1-2 分钟
- 完成后会获得 `xxx.pages.dev` 域名
- 例如：`xiaomi-dashboard-abc123.pages.dev`

---

## 三、方案B：直接上传部署（不用Git）

### 步骤1：打包代码

```bash
cd /root/.openclaw/workspace/learning/xiaomi-dashboard

# 创建 zip 压缩包
zip -r xiaomi-dashboard.zip . -x "*.git*"
```

### 步骤2：在 Cloudflare 上传

1. 登录 https://dash.cloudflare.com/
2. 点击左侧菜单 "Pages"
3. 点击 "Create a project"
4. 选择 "Upload assets"
5. 拖拽或选择 `xiaomi-dashboard.zip` 文件
6. 输入项目名称：`xiaomi-dashboard`
7. 点击 "Deploy site"

---

## 四、配置自定义域名（可选）

### 如果你有域名：

1. 在 Cloudflare Pages 项目页面，点击 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入你的域名，例如：`dashboard.yourdomain.com`
4. 按照提示添加 DNS 记录
5. 等待 SSL 证书自动配置（约5分钟）

### 域名 DNS 配置示例：

| 类型 | 名称 | 内容 | TTL |
|:---|:---|:---|:---|
| CNAME | dashboard | xiaomi-dashboard-xxx.pages.dev | Auto |

---

## 五、配置国内访问优化

### 1. 启用中国网络优化

1. 在 Cloudflare 域名管理页面
2. 点击 "Speed" → "Optimization"
3. 开启 "Auto Minify"（压缩 JS/CSS/HTML）
4. 开启 "Brotli" 压缩

### 2. 使用国内友好的 CDN

Cloudflare 在国内访问速度一般，如果需要更快：

**方案：使用 Cloudflare + 国内CDN 回源**

1. 在 Cloudflare 保持默认 DNS（橙色云朵开启）
2. 或者使用 Cloudflare 的 "中国网络" 功能（企业版功能）

**免费替代方案：**
- 使用 Vercel + 国内镜像
- 或使用阿里云 OSS（国内最快）

---

## 六、自动部署配置

### 开启 Git 自动部署：

1. 在 Cloudflare Pages 项目设置中
2. 点击 "Build & Deploy"
3. 确保 "Automatic deploys" 已开启

这样每次推送到 GitHub，Cloudflare 会自动重新部署。

---

## 七、访问你的站点

部署完成后，你会获得：

- **默认域名**：`https://xiaomi-dashboard-xxx.pages.dev`
- **自定义域名**（如果配置）：`https://dashboard.yourdomain.com`

---

## 八、常见问题

### Q1: 部署后页面空白？
检查 `index.html` 中的路径是否为相对路径：
```html
<!-- 正确 -->
<script src="./src/main.js"></script>

<!-- 错误 -->
<script src="/src/main.js"></script>
```

### Q2: 如何更新网站？
- Git 方案：推送新代码到 GitHub，自动部署
- 上传方案：重新上传 zip 文件

### Q3: 国内访问慢怎么办？
- 方案1：升级到 Cloudflare Pro（付费）
- 方案2：切换到阿里云 OSS（推荐）
- 方案3：使用 Vercel + 国内镜像

---

## 九、快速检查清单

- [ ] 注册 Cloudflare 账号
- [ ] 代码推送到 GitHub / 打包 zip
- [ ] 在 Cloudflare Pages 创建项目
- [ ] 配置构建设置（静态站点）
- [ ] 等待部署完成
- [ ] 测试访问 `xxx.pages.dev`
- [ ] （可选）配置自定义域名

---

需要帮助时，可以：
1. 在 Cloudflare 社区提问：https://community.cloudflare.com/
2. 查看官方文档：https://developers.cloudflare.com/pages/
