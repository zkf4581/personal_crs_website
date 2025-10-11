# Claude Code 镜像服务官网

这是一个为 Claude Code 提供国内镜像服务的营销落地页，同时提供 AI 编程教学服务。

## 🌟 项目特点

- 纯静态网站，无需后端
- 响应式设计，适配移动端
- 现代化 UI，玻璃拟态效果
- 丰富的交互动画
- 配置驱动的内容管理

## 📁 项目结构

```
crs_website/
├── index.html          # 主页面
├── test.html          # 测试页面
├── assets/
│   ├── css/
│   │   └── style.css  # 主样式文件
│   ├── js/
│   │   ├── config.js  # 配置文件（可自定义）
│   │   └── main.js    # 主要 JavaScript 逻辑
│   └── images/
│       └── wechat-qr.jpg  # 微信二维码
├── .mcp.json          # MCP 配置
├── CLAUDE.md          # Claude Code 使用文档
└── README.md          # 项目说明
```

## 🚀 快速开始

### 本地预览

由于是纯静态网站，可以直接用浏览器打开 `index.html`，或使用本地服务器：

```bash
# 使用 Python
python3 -m http.server 8000

# 使用 PHP
php -S localhost:8000

# 使用 npx
npx serve
```

然后访问 `http://localhost:8000`

## ⚙️ 自定义配置

编辑 `assets/js/config.js` 文件来修改网站内容：

```javascript
window.MIRROR_CONFIG = {
  modelName: "CLAUDE CODE",
  serviceName: "CLAUDE CODE 镜像服务",
  brandName: "CLAUDE CODE Mirror",
  serviceWechat: "你的微信号"
};
```

配置项会自动替换 HTML 中对应的内容。

## 🎨 主要功能

### 服务展示
- **镜像套餐**：日卡、周卡、月卡、企业定制
- **核心能力**：多区域分流、安全保障、监控告警、技术支持
- **教学服务**：个人网站搭建、小程序开发

### 交互功能
- 平滑滚动锚点导航
- 微信二维码弹窗
- 移动端汉堡菜单
- 页面加载动画
- 视差滚动效果（桌面端）
- 卡片悬浮动画

## 🎯 技术栈

- HTML5
- CSS3 (CSS Grid, Flexbox, Animations)
- Vanilla JavaScript
- 无框架，无依赖

## 📱 响应式设计

- 桌面端：≥ 960px
- 平板端：768px - 959px
- 移动端：< 768px

## 🔧 开发说明

### 修改样式
所有样式都在 `assets/css/style.css` 中，使用 CSS 变量定义了主题色：

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-accent: #06b6d4;
  /* ... */
}
```

### 添加内容
- 动态内容：修改 `assets/js/config.js`
- 静态内容：直接修改 `index.html`
- 样式调整：修改 `assets/css/style.css`

## 📄 许可证

本项目仅供学习参考使用。

## 📞 联系方式

如需了解镜像服务或教学服务，请添加微信咨询。

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
