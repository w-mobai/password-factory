# Password Factory 🔐

一个现代化、安全的在线密码生成器，帮助您创建强大的随机密码。

![Password Factory](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特性

- 🔒 **安全可靠** - 使用 Web Crypto API 生成加密级别的随机密码
- 🎨 **现代界面** - 精美的 UI 设计，支持深色/浅色主题
- 📱 **响应式设计** - 完美支持桌面、平板和手机
- ⚡ **快速生成** - 即时生成密码，无需等待
- 📊 **强度评估** - 实时评估密码强度并提供改进建议
- 🎯 **高度自定义** - 灵活配置密码长度和字符类型
- 🔐 **隐私保护** - 所有操作在浏览器本地完成，不发送到服务器
- 📋 **一键复制** - 快速复制密码到剪贴板

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
npm run build
```

构建后的文件将在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库
- **Web Crypto API** - 密码生成

## 📦 项目结构

```
password-factory/
├── public/             # 静态资源
│   └── favicon.svg     # 网站图标
├── src/
│   ├── components/     # React 组件
│   │   ├── PasswordDisplay.tsx   # 密码显示组件
│   │   ├── PasswordOptions.tsx   # 选项配置组件
│   │   ├── StrengthMeter.tsx     # 强度评估组件
│   │   └── Toast.tsx             # 提示组件
│   ├── utils/          # 工具函数
│   │   ├── passwordGenerator.ts  # 密码生成逻辑
│   │   └── passwordStrength.ts   # 强度评估逻辑
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html          # HTML 入口
├── package.json        # 依赖配置
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
└── tailwind.config.js  # Tailwind CSS 配置
```

## 🎯 功能说明

### 密码生成选项

- **密码长度**: 8-64 位可调
- **大写字母**: A-Z
- **小写字母**: a-z
- **数字**: 0-9
- **特殊符号**: !@#$%^&*()_+-=[]{}|;:,.<>?
- **排除易混淆字符**: 可选排除 0OIl1io 等字符

### 密码强度评估

系统会根据以下维度评估密码强度：

1. **长度评分** (30%)
   - 8-11 位：10 分
   - 12-15 位：20 分
   - 16-19 位：25 分
   - 20+ 位：30 分

2. **字符多样性** (40%)
   - 包含大小写字母、数字、符号可获得最高 40 分

3. **复杂度** (30%)
   - 检查常见密码模式
   - 检查重复字符
   - 检查连续字符序列

### 安全特性

- ✅ 使用 `crypto.getRandomValues()` 生成密码
- ✅ 不使用 `Math.random()` (不够安全)
- ✅ 所有操作在客户端完成
- ✅ 不向服务器发送任何数据
- ✅ 不存储密码历史记录

## 🌐 部署

### 部署到 Vercel

```bash
npm run build
```

然后将 `dist` 目录部署到 [Vercel](https://vercel.com)

### 部署到 Netlify

```bash
npm run build
```

然后将 `dist` 目录部署到 [Netlify](https://netlify.com)

### 部署到 GitHub Pages

```bash
npm run build
```

然后将 `dist` 目录推送到 `gh-pages` 分支

## 📝 开发计划

- [x] MVP 版本 (v1.0)
  - [x] 基础密码生成
  - [x] 密码强度评估
  - [x] 响应式设计
  - [x] 深色模式
- [ ] V1.1
  - [ ] 密码历史记录
  - [ ] 批量生成
  - [ ] 更多自定义选项
- [ ] V2.0
  - [ ] 密码短语生成器
  - [ ] 密码模板
  - [ ] 多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

由 AI 辅助开发 © 2026

---

**⭐ 如果这个项目对你有帮助，请给它一个星标！**
