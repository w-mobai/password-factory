# 部署指南 📦

本项目是一个纯静态网站，可以部署到任何支持静态文件托管的平台。

## 🚀 快速部署

### 1. Vercel (推荐)

最简单的部署方式，完全免费，支持自动部署。

#### 方法一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

#### 方法二：通过 Git 仓库

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的仓库
5. Vercel 会自动检测 Vite 项目并配置好构建设置
6. 点击 "Deploy" 完成部署

**构建配置**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Netlify

另一个优秀的免费静态网站托管平台。

#### 方法一：通过拖放

```bash
# 构建项目
npm run build

# 将 dist 文件夹拖放到 netlify.com/drop
```

#### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 构建
npm run build

# 部署
netlify deploy --prod --dir=dist
```

#### 方法三：通过 Git 仓库

1. 将代码推送到 GitHub
2. 访问 [netlify.com](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### 3. GitHub Pages

免费托管 GitHub 项目的静态网站。

```bash
# 安装 gh-pages
npm install -D gh-pages

# 在 package.json 中添加部署脚本
# "deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

**注意**: 如果项目不在根路径，需要在 `vite.config.ts` 中设置 `base`:

```typescript
export default defineConfig({
  base: '/password-factory/', // 你的仓库名
  // ...
})
```

### 4. Cloudflare Pages

Cloudflare 提供的免费静态网站托管服务。

1. 将代码推送到 GitHub
2. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
3. 点击 "Create a project"
4. 选择你的 GitHub 仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
6. 点击 "Save and Deploy"

### 5. 自定义服务器

如果你有自己的服务器（Nginx/Apache），只需：

```bash
# 构建项目
npm run build

# 将 dist 目录上传到服务器
scp -r dist/* user@server:/var/www/html/
```

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # 支持 HTML5 History 模式
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

## 🔧 环境变量

本项目不需要任何环境变量，因为所有操作都在客户端完成。

## 📊 性能优化建议

1. **启用 Gzip/Brotli 压缩** - 大多数托管平台默认启用
2. **配置 CDN** - Vercel/Netlify/Cloudflare Pages 自动提供
3. **启用 HTTP/2** - 现代托管平台默认支持
4. **设置缓存策略** - 静态资源长期缓存

## 🔒 安全建议

1. **启用 HTTPS** - 所有托管平台都提供免费 SSL
2. **配置 CSP (Content Security Policy)**
3. **启用 HSTS (HTTP Strict Transport Security)**
4. **配置安全响应头**

大多数托管平台会自动处理这些安全设置。

## 📈 监控和分析

### Google Analytics

在 `index.html` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

在 `src/main.tsx` 中添加：

```typescript
import { inject } from '@vercel/analytics';
inject();
```

## 🐛 常见问题

### Q: 部署后页面空白？

A: 检查浏览器控制台，通常是路径配置问题。确保 `vite.config.ts` 中的 `base` 配置正确。

### Q: 刷新页面 404？

A: 需要配置服务器支持 SPA 路由，参考上面的 Nginx 配置或托管平台的 rewrites 配置。

### Q: 构建失败？

A: 确保 Node.js 版本 >= 16，并检查依赖是否正确安装：

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 支持

如有问题，请在 GitHub 上提 Issue。

---

**祝部署顺利！** 🎉
