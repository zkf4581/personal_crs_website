# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for a GLM/Claude Code mirror service - a landing page offering proxy/mirror access to Claude Code API for users in China. The site is built with pure HTML, CSS, and JavaScript without any frameworks or build tools.

## Architecture

### Configuration System
The website uses a config-driven content system that allows easy customization without editing HTML:

- **Base Config** (`assets/js/main.js`): Contains default configuration values with template variables
- **User Config** (`assets/js/config.js`): Overrides with `window.MIRROR_CONFIG` object
- **Template Rendering**: Uses `{{variable}}` syntax for dynamic content replacement
- **Data Attributes**: Content is bound to HTML using:
  - `data-config-key`: For single values
  - `data-config-list`: For arrays
  - `data-config-attr`: To specify which attribute to update (e.g., `content` for meta tags)
  - `data-config-render`: Set to `"html"` to render HTML instead of text

### Key Files Structure

```
crs_website/
├── index.html              # Main landing page
├── test.html              # Preview page for improvements
├── assets/
│   ├── css/
│   │   ├── style.css      # Main stylesheet with animations & responsive design
│   │   └── style.css.backup
│   ├── js/
│   │   ├── config.js      # User configuration override
│   │   └── main.js        # Core logic: config system, animations, mobile menu, modal
│   └── images/
│       └── wechat-qr.jpg  # WeChat QR code image
└── .mcp.json              # MCP server config for Playwright automation
```

### JavaScript Functionality (`assets/js/main.js`)

The main.js file handles multiple responsibilities:

1. **Configuration System**: Merges base config with user overrides and renders content
2. **Page Loader**: Hides loading animation on page load
3. **Mobile Menu**: Toggles hamburger menu with accessibility support
4. **Modal System**: Opens/closes WeChat QR code modal
5. **Scroll Animations**: IntersectionObserver for fade-in effects
6. **Parallax Effects**: Vertical parallax on hero section (disabled on mobile)
7. **Smooth Scrolling**: Anchor links with highlight effects for pricing → contact flow
8. **Ripple Effects**: Click animations on navigation links
9. **Header Transitions**: Backdrop blur and styling changes on scroll

### CSS Architecture (`assets/css/style.css`)

- **CSS Variables** (`:root`): Centralized design tokens for colors, shadows, spacing, transitions
- **Gradient Theme**: Purple gradient color scheme (#667eea to #764ba2)
- **Animation Library**: Multiple keyframe animations including:
  - Page load animations (`fadeInUp`, `slideInRight`, `slideInUp`)
  - Chart bar growth (`growBar`)
  - Button effects (`pulseButton`, `highlightPulse`)
  - Border glow animations (`borderGlow`, `headerButtonGlow`)
- **Responsive Design**: Breakpoints at 960px, 768px, and 540px
- **Glassmorphism**: Backdrop blur effects on header and cards
- **Accessibility**: Focus states, skip-to-content link, ARIA support

## Development Workflow

### Local Development

Since this is a static site with no build process:

```bash
# Method 1: Python simple HTTP server
python3 -m http.server 8000

# Method 2: PHP built-in server
php -S localhost:8000

# Method 3: npx serve
npx serve
```

Then open `http://localhost:8000` in your browser.

### Testing Changes

- Edit HTML/CSS/JS files directly
- Refresh browser to see changes (hard refresh with Cmd+Shift+R / Ctrl+Shift+R if needed)
- Test responsive design using browser DevTools device emulation
- The `test.html` file serves as a preview page for improvements

### Browser Testing

The site uses modern CSS features (backdrop-filter, CSS Grid, CSS custom properties) and ES6 JavaScript. Test in:
- Chrome/Edge (primary target)
- Safari (especially for -webkit- prefixed properties)
- Firefox
- Mobile browsers (iOS Safari, Chrome Mobile)

## Common Customization Tasks

### Updating Branding

Edit `assets/js/config.js` to change service name, supported models, or contact info:

```javascript
window.MIRROR_CONFIG = {
  modelName: "SERVICE NAME",
  serviceName: "SERVICE NAME 镜像服务",
  serviceWechat: "wechat-id"
};
```

### Modifying Pricing Plans

Edit `index.html` lines 163-237 to update plan cards. Each plan has:
- CSS modifier class (`.plan-card--starter`, `.plan-card--growth`, `.plan-card--enterprise`, `.plan-card--custom`)
- Custom colors defined via CSS variables (see style.css lines 899-960)

### Changing Color Scheme

Update CSS variables in `assets/css/style.css` at lines 1-27, particularly:
- `--color-primary`: Main brand color
- Gradient colors in `.brand`, `.btn--primary`, and `.hero` backgrounds

### Adding Animations

- New keyframe animations go in style.css
- Use IntersectionObserver pattern from main.js for scroll-triggered animations
- Follow the existing naming convention: `.scroll-animate` class with `.animate-in` trigger

## Important Patterns

### Mobile Menu Implementation

The mobile menu uses:
- Hidden by default with `max-height: 0`
- Animates to `max-height: 400px` when `.active` class is added
- Hamburger icon transforms to X using CSS transforms
- Body overflow is controlled to prevent scroll when menu is open
- Closes on link click, outside click, or Escape key

### Modal System

Modal structure:
- `.modal[data-modal]`: Container
- `.modal__backdrop[data-modal-close]`: Backdrop (click to close)
- `.modal__dialog`: Content container
- Opens with `[data-modal-trigger]` elements
- Closes with `[data-modal-close]` elements or Escape key

### Pricing → Contact Flow

When clicking "立即咨询" from pricing cards:
1. Link has `data-highlight-target` attribute
2. Smooth scrolls to `#contact` section
3. After 800ms, adds `.highlight-target` class to contact button
4. Button pulses 3 times with scale animation
5. Contact panel box-shadow intensifies temporarily

## Notes for AI Assistants

- This is a marketing/landing page focused on visual appeal and conversion
- Chinese language content - maintain Chinese text unless explicitly asked to translate
- WeChat integration is central to the business model (QR codes, contact methods)
- Parallax effects and animations should be performance-conscious (disabled on mobile)
- No user data collection or forms - all contact is via WeChat
- Service targets Chinese developers who need China-accessible Claude Code API access
