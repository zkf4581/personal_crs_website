// Prevent browser from auto-scrolling on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top on page load
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Ensure we start at the top
if (window.location.hash === '') {
  window.scrollTo(0, 0);
}

// Hide page loader once page is loaded
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after animation completes
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 300);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const baseConfig = {
    modelName: "GLM",
    serviceName: "GLM 镜像服务",
    brandName: "GLM Mirror",
    supportedModels: "GLM-4 / GLM-3 / 高频调用模型",
    serviceWechat: "GLM-Biz",
    metaTitle: "{{modelName}} 镜像服务 - 国内免魔法直连与专属支持",
    metaDescription:
      "{{serviceName}} 聚焦国内免魔法直连，提供多节点分流、调用监控与专属支持，帮助企业与开发者快速上线模型能力。",
    heroTagline: "国内免魔法镜像服务",
    heroTitle: "官方200刀MAX分流镜像，<br />只做转发，原滋原味的CLAUDE CODE。",
    heroSummary:
      "无积分，不套路，用$计费，用量清晰。多地高可用节点、智能分流调度，让你无需魔法即可稳定调用模型，轻松支撑各类 AI 场景。",
    heroBullets: [
      "国内免魔法访问，自动选择最优线路",
      "支持 claude code sonnet 4.5、claude code opus 4.1 全球最牛编程模型",
      "提供详尽调用统计与失败告警",
    ],
    contactIntro:
      "想了解更多镜像方案、定制化接入、或是试用 {{serviceName}}，欢迎直接添加微信与我们交流。",
  };

  const userConfig =
    (typeof window !== "undefined" && window.MIRROR_CONFIG) || {};
  const config = { ...baseConfig, ...userConfig };

  const renderTemplate = (value) => {
    if (typeof value !== "string") {
      return value;
    }
    return value.replace(/\{\{(\w+)\}\}/g, (_, token) => {
      return Object.prototype.hasOwnProperty.call(config, token)
        ? config[token]
        : "";
    });
  };

  const applyConfig = () => {
    const titleValue = config.metaTitle
      ? renderTemplate(config.metaTitle)
      : document.title;
    if (titleValue) {
      document.title = titleValue;
      const titleEl = document.querySelector(
        "title[data-config-key='metaTitle']"
      );
      if (titleEl) {
        titleEl.textContent = titleValue;
      }
    }

    document.querySelectorAll("[data-config-list]").forEach((list) => {
      const listKey = list.dataset.configList;
      const items = config[listKey];
      if (!Array.isArray(items)) {
        return;
      }
      list.innerHTML = items
        .map((item) => {
          const content =
            typeof item === "string" ? renderTemplate(item) : String(item);
          return `<li>${content}</li>`;
        })
        .join("");
    });

    document.querySelectorAll("[data-config-key]").forEach((el) => {
      if (el.tagName === "TITLE") {
        return;
      }
      const key = el.dataset.configKey;
      const attr = el.dataset.configAttr;
      const renderType = el.dataset.configRender || "text";
      const value = config[key];
      if (value === undefined || value === null) {
        return;
      }
      const output =
        typeof value === "string" ? renderTemplate(value) : String(value);
      if (attr) {
        el.setAttribute(attr, output);
      } else if (renderType === "html") {
        el.innerHTML = output;
      } else {
        el.textContent = output;
      }
    });
  };

  applyConfig();

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Update ARIA attributes
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
      mobileMenuToggle.setAttribute('aria-label', isActive ? '关闭菜单' : '打开菜单');

      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', '打开菜单');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) &&
          !mobileMenu.contains(e.target) &&
          mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', '打开菜单');
        document.body.style.overflow = '';
      }
    });
  }

  const modal = document.querySelector("[data-modal]");
  const openButtons = document.querySelectorAll("[data-modal-trigger]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const openModal = () => {
    if (modal) {
      modal.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  };

  openButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        if (entry.target.classList.contains('once')) {
          animateOnScroll.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  document.querySelectorAll('.feature, .section__head').forEach(el => {
    el.classList.add('scroll-animate', 'once');
    animateOnScroll.observe(el);
  });

  // Smooth scroll for anchor links with highlight effect
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // If clicking from a pricing card button, highlight the contact button
        if (this.hasAttribute('data-highlight-target') && targetId === '#contact') {
          setTimeout(() => {
            const contactButton = document.querySelector('.contact__panel .btn--primary');
            if (contactButton) {
              // Add highlight animation class
              contactButton.classList.add('highlight-target');

              // Remove the class after animation ends
              setTimeout(() => {
                contactButton.classList.remove('highlight-target');
              }, 3000);

              // Add a glow effect to the panel
              const contactPanel = document.querySelector('.contact__panel');
              if (contactPanel) {
                contactPanel.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.5)';
                setTimeout(() => {
                  contactPanel.style.boxShadow = '';
                }, 2000);
              }
            }
          }, 800); // Wait for scroll to complete
        }
      }
    });
  });

  // Add parallax effect to hero section
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroCard = document.querySelector('.hero__card');

    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (heroCard && scrolled < 800) {
      heroCard.style.transform = `translateY(${scrolled * -0.1}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Add hover effect to cards
  document.querySelectorAll('.plan-card, .feature').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Enhanced header on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.site-header');

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Add ripple effect to navigation links
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
