/**
 * SiteForge — Website Builder Core Logic
 */

// --- SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('[SiteForge] Service Worker registered successfully!', reg))
            .catch(err => console.error('[SiteForge] Service Worker registration failed:', err));
    });
}

// --- LOCALIZATION / TRANSLATIONS ---
let currentLang = 'ru'; // Default

const translations = {
    ru: {
        // App Header
        "logo-text": 'Site<span class="logo-accent">Forge</span>',
        "status-saved": "Черновик сохранен локально",
        "status-cloud-saved": "Сохранено в Supabase Cloud",
        "status-saving": "Сохранение в облако...",
        "status-connected": "Подключено к Supabase",
        "status-disconnected": "Черновик сохранен локально",
        "btn-preview": "Предпросмотр",
        "btn-edit": "Режим правки",
        "btn-cloud-save": "Облако",
        "btn-export": "Экспорт HTML",
        "install-btn-text": "Скачать приложение",

        // Sidebar Tabs
        "tab-blocks": "Блоки",
        "tab-styles": "Стили",
        "tab-settings": "Настройки",
        "tab-help": "Помощь",

        // Panel: Blocks Library
        "blocks-lib-title": "Библиотека блоков",
        "blocks-lib-desc": "Нажмите на блок, чтобы добавить его на холст",
        "cat-nav": "Навигация",
        "cat-hero": "Главный экран (Hero)",
        "cat-features": "Возможности и сетка",
        "cat-social": "Социальное доверие",
        "cat-contact": "Формы и призывы",
        "cat-footers": "Подвалы сайтов",

        "block-navbar": "Классическое меню",
        "block-hero-gradient": "Современный градиент",
        "block-hero-split": "Сплит-презентация",
        "block-features-3col": "Преимущества 3-Col",
        "block-feature-split-left": "Текст и медиа",
        "block-testimonials": "Сетка отзывов",
        "block-pricing": "Тарифные сетки",
        "block-cta-center": "Кнопка действия",
        "block-contact-simple": "Форма обратной связи",
        "block-footer-simple": "Простой подвал",

        // Panel: Styles Inspector
        "no-selection-title": "Блок не выбран",
        "no-selection-desc": "Кликните на любой блок на холсте, чтобы изменить его цвета, отступы и свойства.",
        "inspector-block-title": "Свойства блока",
        "inspector-block-desc": "Настройте выбранный блок ниже",
        "label-bg-style": "Стиль фона",
        "btn-bg-color": "Цвет",
        "btn-bg-gradient": "Градиент",
        "btn-bg-image": "Картинка",
        "label-bg-color": "Цвет фона",
        "label-preset-gradients": "Готовые градиенты",
        "label-bg-image-url": "Ссылка на картинку фона",
        "label-text-colors": "Цвета текста",
        "label-text-color-primary": "Основной заголовок и текст",
        "label-padding": "Вертикальные отступы",
        "label-content-customization": "Кастомизация контента",
        "label-showcase-image": "Ссылка на картинку блока",

        // Dynamic Inspector Fields
        "lbl-btn-url": "Ссылка для кнопки (CTA URL)",
        "lbl-nav-links-url": "Ссылки разделов меню",
        "lbl-form-action": "Адрес отправки формы (Action URL)",
        "lbl-plan-urls": "Ссылки кнопок тарифов",
        "lbl-logo-text": "Текст логотипа",

        // Panel: Page Settings
        "settings-title": "Настройки страницы",
        "settings-desc": "Настройте метаданные SEO и параметры",
        "label-page-title": "Заголовок страницы (SEO Title)",
        "hint-page-title": "Отображается в названии вкладки браузера.",
        "label-meta-desc": "Meta Description (Описание)",
        "hint-meta-desc": "Краткое описание страницы для поисковых систем.",
        "label-fonts-settings": "Шрифты Google Fonts",
        "label-font-headings": "Шрифт заголовков",
        "label-font-body": "Шрифт основного текста",
        "label-editor-language": "Язык интерфейса",

        // Panel: Help & Manual Instructions
        "help-title": "Руководство пользователя",
        "help-desc": "Инструкция по созданию, настройке и публикации сайта",
        "help-q1": "1. Как добавлять и редактировать контент?",
        "help-a1": "Нажмите на нужный блок во вкладке «Блоки», чтобы добавить его. Вы можете изменять любой текст на холсте прямо на экране (просто кликните по тексту). Чтобы заменить картинку, нажмите на нее прямо на холсте и введите новую ссылку.",
        "help-q2": "2. Как настроить ссылки на кнопках?",
        "help-a2": "Выделите нужный блок кликом на холсте, перейдите во вкладку «Стили» и прокрутите вниз до раздела «Кастомизация контента». Введите URL-адрес назначения в поле «Ссылка для кнопки». Вы можете указывать полные ссылки (например, https://my-site.ru/buy) или якоря переходов внутри страницы (например, #pricing).",
        "help-q3": "3. Как заставить форму контактов работать?",
        "help-a3": "Выделите форму контактов на холсте. В разделе кастомизации контента введите ссылку для отправки (например, от бесплатного сервиса Formspree.io). На готовом сайте форма будет отправлять все заявки на вашу электронную почту.",
        "help-q4": "4. Как экспортировать и запустить сайт бесплатно?",
        "help-a4": "Нажмите кнопку «Экспорт HTML» в верхнем правом углу. Браузер сгенерирует чистый код и скачает файл «index.html». Вы можете перетащить этот файл на бесплатный хостинг Netlify или залить на GitHub Pages, и страница будет работать бесплатно в интернете!",

        // Canvas Empty State
        "empty-state-title": "Ваш холст пуст",
        "empty-state-desc": "Выберите блоки в левой панели, чтобы начать создание сайта. Кликайте по текстам прямо на холсте для их изменения.",
        "empty-state-btn": "Добавить шапку сайта",

        // Supabase Modal
        "modal-sb-title": "Подключение Supabase Cloud",
        "modal-sb-desc": "Подключение Supabase позволяет сохранять ваши дизайны в облачную базу данных PostgreSQL и настраивать авторизацию. Отлично подходит для продажи готового SaaS-продукта.",
        "modal-sb-url": "Ссылка на проект Supabase URL",
        "modal-sb-key": "Публичный ключ API Anon Key",
        "modal-sb-save-desc": "Сохранить текущий дизайн в базу данных",
        "modal-btn-save": "Сохранить в облако",
        "modal-btn-load": "Загрузить из облака",
        "modal-badge-disconnected": "Не подключено",
        "modal-badge-connected": "Подключено",
        "modal-btn-connect": "Подключить базу"
    },
    en: {
        // App Header
        "logo-text": 'Site<span class="logo-accent">Forge</span>',
        "status-saved": "Draft saved locally",
        "status-cloud-saved": "Saved to Supabase Cloud",
        "status-saving": "Saving to cloud...",
        "status-connected": "Connected to Supabase",
        "status-disconnected": "Draft saved locally",
        "btn-preview": "Preview",
        "btn-edit": "Edit Mode",
        "btn-cloud-save": "Cloud Save",
        "btn-export": "Export HTML",
        "install-btn-text": "Install App",

        // Sidebar Tabs
        "tab-blocks": "Blocks",
        "tab-styles": "Styles",
        "tab-settings": "Page",
        "tab-help": "Help",

        // Panel: Blocks Library
        "blocks-lib-title": "Block Library",
        "blocks-lib-desc": "Click blocks to add them to your website canvas",
        "cat-nav": "Navigation",
        "cat-hero": "Hero Sections",
        "cat-features": "Features & Grid",
        "cat-social": "Social Proof",
        "cat-contact": "Contact & Callout",
        "cat-footers": "Footers",

        "block-navbar": "Classic Header",
        "block-hero-gradient": "Modern Gradient",
        "block-hero-split": "Split Showcase",
        "block-features-3col": "3-Col Features",
        "block-feature-split-left": "Media & Text",
        "block-testimonials": "Reviews Grid",
        "block-pricing": "Pricing Cards",
        "block-cta-center": "Action Callout",
        "block-contact-simple": "Contact Form",
        "block-footer-simple": "Footer Simple",

        // Panel: Styles Inspector
        "no-selection-title": "No Block Selected",
        "no-selection-desc": "Click on any block in the canvas to customize its colors, spacing, and properties.",
        "inspector-block-title": "Block Properties",
        "inspector-block-desc": "Customize the selected block below",
        "label-bg-style": "Background Style",
        "btn-bg-color": "Color",
        "btn-bg-gradient": "Gradient",
        "btn-bg-image": "Image",
        "label-bg-color": "Background Color",
        "label-preset-gradients": "Preset Gradients",
        "label-bg-image-url": "Background Image URL",
        "label-text-colors": "Text Colors",
        "label-text-color-primary": "Primary Title & Text",
        "label-padding": "Padding (Vertical Spacing)",
        "label-content-customization": "Block Content Customization",
        "label-showcase-image": "Showcase Image URL",

        // Dynamic Inspector Fields
        "lbl-btn-url": "Button Link URL (CTA URL)",
        "lbl-nav-links-url": "Menu Link URLs",
        "lbl-form-action": "Form Submit Endpoint (Action URL)",
        "lbl-plan-urls": "Plan Button URLs",
        "lbl-logo-text": "Logo Brand Name",

        // Panel: Page Settings
        "settings-title": "Page Settings",
        "settings-desc": "Configure SEO metadata and global parameters",
        "label-page-title": "Page Title (SEO Title)",
        "hint-page-title": "Appears in the browser tab and search engine results.",
        "label-meta-desc": "Meta Description",
        "hint-meta-desc": "A brief description for search engine result snippets.",
        "label-fonts-settings": "Google Fonts Settings",
        "label-font-headings": "Heading Font Family",
        "label-font-body": "Body Font Family",
        "label-editor-language": "Editor Language",

        // Panel: Help & Manual Instructions
        "help-title": "Help & Instructions",
        "help-desc": "Learn how to build, deploy, and configure your website",
        "help-q1": "1. How to add and edit content?",
        "help-a1": "Click any block in the 'Blocks' tab to add it to the canvas. Click any text directly on the screen to change it, or click images directly to change their URLs.",
        "help-q2": "2. How to configure links on buttons?",
        "help-a2": "Select a block on the canvas, go to the 'Styles' tab, and scroll to 'Block Content Customization'. Enter the target URL in the 'Button Link URL' field. You can write external URLs or anchor tags like '#pricing'.",
        "help-q3": "3. How to make the contact form work?",
        "help-a3": "Select the contact form block. In the Styles tab under content customization, paste a form submission endpoint (e.g. from Formspree.io). The form on your exported website will submit messages directly to your email.",
        "help-q4": "4. How to export and host for free?",
        "help-a4": "Click the 'Export HTML' button in the top right. It will compile your layout and download it as an 'index.html' file. You can drag and drop this file into Netlify or upload it to GitHub Pages for 100% free hosting.",

        // Canvas Empty State
        "empty-state-title": "Your canvas is empty",
        "empty-state-desc": "Select blocks from the left sidebar library to start forging your website. Click elements directly inside the canvas to edit text and styles.",
        "empty-state-btn": "Add a Header Block",

        // Supabase Modal
        "modal-sb-title": "Connect Supabase Backend",
        "modal-sb-desc": "By connecting a Supabase project, you can save your designs to the database, upload custom images, and allow user logins. Ideal for transferring ownership as a fully functional SaaS.",
        "modal-sb-url": "Supabase Project URL",
        "modal-sb-key": "Supabase Anon Key",
        "modal-sb-save-desc": "Save Current Design to Database",
        "modal-btn-save": "Save Project",
        "modal-btn-load": "Load Saved Project",
        "modal-badge-disconnected": "Not Connected",
        "modal-badge-connected": "Connected",
        "modal-btn-connect": "Connect Database"
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    // Apply structured i18n translation attributes
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (t[key]) {
            if (key === "logo-text") {
                elem.innerHTML = t[key];
            } else if (elem.querySelector("i")) {
                const icon = elem.querySelector("i").outerHTML;
                elem.innerHTML = `${icon} <span>${t[key]}</span>`;
            } else {
                elem.textContent = t[key];
            }
        }
    });

    // Special updates (Status text)
    const statusText = document.querySelector("#save-status .status-text");
    if (statusText) {
        if (statusText.textContent.includes("local") || statusText.textContent.includes("локально")) {
            statusText.textContent = t["status-saved"];
        } else if (statusText.textContent.includes("Supabase") || statusText.textContent.includes("облако")) {
            statusText.textContent = t["status-cloud-saved"];
        }
    }

    // Update DB status badge
    const badge = document.getElementById("db-status-badge");
    if (badge) {
        if (badge.classList.contains("badge-connected")) {
            badge.innerHTML = `<i class="fa-solid fa-circle-dot"></i> ` + t["modal-badge-connected"];
        } else {
            badge.innerHTML = `<i class="fa-solid fa-circle-dot"></i> ` + t["modal-badge-disconnected"];
        }
    }

    // Update viewport dimensions text
    const viewportDimText = document.getElementById("viewport-dimensions");
    const viewportContainer = document.getElementById("viewport-container");
    if (viewportDimText && viewportContainer) {
        const size = viewportContainer.getAttribute("data-size") || "desktop";
        if (size === "desktop") viewportDimText.textContent = lang === 'ru' ? "Десктоп (100%)" : "Desktop (100%)";
        if (size === "tablet") viewportDimText.textContent = lang === 'ru' ? "Планшет (768px)" : "Tablet (768px)";
        if (size === "mobile") viewportDimText.textContent = lang === 'ru' ? "Мобильный (375px)" : "Mobile (375px)";
    }
}

// --- STATE MANAGEMENT ---
let projectState = {
    title: "My Awesome Landing Page",
    description: "Discover our beautiful service. High quality and conversion-optimized blocks built in minutes.",
    fontHeadings: "'Outfit', sans-serif",
    fontBody: "'Inter', sans-serif",
    blocks: [] 
};

let selectedBlockId = null;
let editorMode = "edit"; // "edit" or "preview"

// --- BLOCKS DEFINITIONS (Templates & Default Data) ---
const blockTemplates = {
    "navbar": {
        name: "Classic Header",
        defaultData: {
            brand: "SiteForge",
            link1: "Features",
            link1Url: "#features",
            link2: "Pricing",
            link2Url: "#pricing",
            link3: "Reviews",
            link3Url: "#reviews",
            ctaText: "Get Started",
            ctaLink: "#cta",
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "20",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <nav class="block-navbar-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <a href="#" class="block-navbar-brand" style="color: ${data.textColor};" ${isEditable} data-field="brand">${data.brand}</a>
                    <div class="block-navbar-links">
                        <a href="${data.link1Url}" class="block-navbar-link" style="color: ${data.textColor}cc;" ${isEditable} data-field="link1">${data.link1}</a>
                        <a href="${data.link2Url}" class="block-navbar-link" style="color: ${data.textColor}cc;" ${isEditable} data-field="link2">${data.link2}</a>
                        <a href="${data.link3Url}" class="block-navbar-link" style="color: ${data.textColor}cc;" ${isEditable} data-field="link3">${data.link3}</a>
                    </div>
                    <a href="${data.ctaLink}" class="block-navbar-cta" ${isEditable} data-field="ctaText">${data.ctaText}</a>
                </nav>
            `;
        }
    },
    "hero-gradient": {
        name: "Modern Gradient Hero",
        defaultData: {
            tagline: "NEW GENERATION",
            title: "Forge High-Conversion Landing Pages",
            subtitle: "Create beautiful, conversion-optimized sections in minutes. Sell them or host them for free on Vercel.",
            ctaText: "Start Free Trial",
            ctaLink: "#start",
            bgColor: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.08), transparent 40%)",
            textColor: "#1f2937",
            padding: "100",
            bgMode: "gradient"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-hero-gradient-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <span class="hero-tagline" ${isEditable} data-field="tagline">${data.tagline}</span>
                    <h1 class="hero-title" style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h1>
                    <p class="hero-subtitle" style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                    <a href="${data.ctaLink}" class="hero-cta-btn" ${isEditable} data-field="ctaText">${data.ctaText}</a>
                </div>
            `;
        }
    },
    "hero-split": {
        name: "Split Showcase Hero",
        defaultData: {
            tagline: "ANALYTICS PLATFORM",
            title: "Smart Decisions, Faster Growth",
            subtitle: "Understand your users, optimize conversion paths, and grow your revenue with premium templates.",
            ctaText: "Explore Features",
            ctaLink: "#explore",
            imageUrl: "./hero-mockup.jpg", 
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "100",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-hero-split-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="hero-split-left">
                        <span class="hero-tagline" ${isEditable} data-field="tagline">${data.tagline}</span>
                        <h1 class="hero-title" style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h1>
                        <p class="hero-subtitle" style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                        <a href="${data.ctaLink}" class="hero-cta-btn" ${isEditable} data-field="ctaText">${data.ctaText}</a>
                    </div>
                    <div class="hero-split-right">
                        <img src="${data.imageUrl}" class="hero-split-img" alt="Hero Mockup" data-img-field="imageUrl">
                    </div>
                </div>
            `;
        }
    },
    "features-3col": {
        name: "3-Column Features Grid",
        defaultData: {
            title: "Everything you need",
            subtitle: "Our platform comes loaded with all the premium features you require.",
            f1Title: "Extremely Fast",
            f1Desc: "Built for speed and performance, ensuring your visitors never wait.",
            f2Title: "Responsive Design",
            f2Desc: "Looks flawless on mobile devices, tablets, and wide screens.",
            f3Title: "Export-Ready",
            f3Desc: "One click downloads clean HTML code ready to host on GitHub or Vercel.",
            bgColor: "#fafafa",
            textColor: "#1f2937",
            padding: "80",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-features-3col-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="block-features-header">
                        <h3 style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h3>
                        <p style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                    </div>
                    <div class="block-features-grid">
                        <div class="feature-card">
                            <div class="feature-card-icon"><i class="fa-solid fa-bolt"></i></div>
                            <h4 class="feature-card-title" ${isEditable} data-field="f1Title">${data.f1Title}</h4>
                            <p class="feature-card-desc" ${isEditable} data-field="f1Desc">${data.f1Desc}</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-card-icon"><i class="fa-solid fa-mobile-screen"></i></div>
                            <h4 class="feature-card-title" ${isEditable} data-field="f2Title">${data.f2Title}</h4>
                            <p class="feature-card-desc" ${isEditable} data-field="f2Desc">${data.f2Desc}</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-card-icon"><i class="fa-solid fa-code"></i></div>
                            <h4 class="feature-card-title" ${isEditable} data-field="f3Title">${data.f3Title}</h4>
                            <p class="feature-card-desc" ${isEditable} data-field="f3Desc">${data.f3Desc}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    "feature-split-left": {
        name: "Media & Text Showcase",
        defaultData: {
            title: "Design without limits",
            subtitle: "Craft beautiful landing pages that match your brand identity. Customize colors, layouts, and typography directly in the editor.",
            bullet1: "Live Editing & Instant Preview",
            bullet2: "Clean Exportable Code",
            bullet3: "Google Fonts Integration",
            imageUrl: "./hero-mockup.jpg", 
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "80",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-feature-split-left-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="feature-split-img-box">
                        <img src="${data.imageUrl}" class="feature-split-img" alt="Feature Showcase" data-img-field="imageUrl">
                    </div>
                    <div class="feature-split-text-box">
                        <h3 class="feature-split-title" style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h3>
                        <p class="feature-split-desc" style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                        <div class="feature-split-bullets">
                            <div class="feature-bullet">
                                <i class="fa-solid fa-circle-check"></i>
                                <span ${isEditable} data-field="bullet1">${data.bullet1}</span>
                            </div>
                            <div class="feature-bullet">
                                <i class="fa-solid fa-circle-check"></i>
                                <span ${isEditable} data-field="bullet2">${data.bullet2}</span>
                            </div>
                            <div class="feature-bullet">
                                <i class="fa-solid fa-circle-check"></i>
                                <span ${isEditable} data-field="bullet3">${data.bullet3}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    "testimonials": {
        name: "Reviews Showcase Grid",
        defaultData: {
            t1Text: "SiteForge changed how we launch projects. We went from design mockup to live site in 10 minutes.",
            t1User: "Sarah Connor",
            t1Role: "Product Designer",
            t2Text: "The exported code is incredibly clean. No framework bloat, just pure HTML/CSS ready for Vercel.",
            t2User: "John Doe",
            t2Role: "Frontend Developer",
            t3Text: "I sold a landing page template on Telderi for $300 that I built here. Highly recommended!",
            t3User: "Alex Kovalenko",
            t3Role: "Digital Entrepreneur",
            bgColor: "#fafafa",
            textColor: "#1f2937",
            padding: "80",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-testimonials-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="testimonial-stars">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <p class="testimonial-text" ${isEditable} data-field="t1Text">"${data.t1Text}"</p>
                            <div class="testimonial-user">
                                <div>
                                    <div class="testimonial-username" ${isEditable} data-field="t1User">${data.t1User}</div>
                                    <div class="testimonial-role" ${isEditable} data-field="t1Role">${data.t1Role}</div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-stars">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <p class="testimonial-text" ${isEditable} data-field="t2Text">"${data.t2Text}"</p>
                            <div class="testimonial-user">
                                <div>
                                    <div class="testimonial-username" ${isEditable} data-field="t2User">${data.t2User}</div>
                                    <div class="testimonial-role" ${isEditable} data-field="t2Role">${data.t2Role}</div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-stars">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <p class="testimonial-text" ${isEditable} data-field="t3Text">"${data.t3Text}"</p>
                            <div class="testimonial-user">
                                <div>
                                    <div class="testimonial-username" ${isEditable} data-field="t3User">${data.t3User}</div>
                                    <div class="testimonial-role" ${isEditable} data-field="t3Role">${data.t3Role}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    "pricing": {
        name: "Pricing Comparison",
        defaultData: {
            title: "Simple, Honest Pricing",
            subtitle: "Choose the perfect plan for your business needs.",
            plan1Name: "Starter",
            plan1Price: "$9",
            plan1Link: "#starter",
            plan2Name: "Pro",
            plan2Price: "$29",
            plan2Link: "#pro",
            plan3Name: "Enterprise",
            plan3Price: "$99",
            plan3Link: "#enterprise",
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "80",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-pricing-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="block-features-header">
                        <h3 style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h3>
                        <p style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                    </div>
                    <div class="pricing-grid">
                        <div class="pricing-card">
                            <div class="pricing-name" ${isEditable} data-field="plan1Name">${data.plan1Name}</div>
                            <div class="pricing-price" ${isEditable} data-field="plan1Price">${data.plan1Price}<span style="font-size: 14px; font-weight: normal;">/mo</span></div>
                            <div class="pricing-features">
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> 1 Active Landing Page</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Standard Analytics</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Community Support</div>
                            </div>
                            <a href="${data.plan1Link}" class="pricing-btn">Choose Plan</a>
                        </div>
                        <div class="pricing-card popular">
                            <span class="pricing-badge">Popular</span>
                            <div class="pricing-name" ${isEditable} data-field="plan2Name">${data.plan2Name}</div>
                            <div class="pricing-price" ${isEditable} data-field="plan2Price">${data.plan2Price}<span style="font-size: 14px; font-weight: normal;">/mo</span></div>
                            <div class="pricing-features">
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> 10 Active Landing Pages</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Real-time Analytics</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Priority Email Support</div>
                            </div>
                            <a href="${data.plan2Link}" class="pricing-btn">Choose Plan</a>
                        </div>
                        <div class="pricing-card">
                            <div class="pricing-name" ${isEditable} data-field="plan3Name">${data.plan3Name}</div>
                            <div class="pricing-price" ${isEditable} data-field="plan3Price">${data.plan3Price}<span style="font-size: 14px; font-weight: normal;">/mo</span></div>
                            <div class="pricing-features">
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Unlimited Landing Pages</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> Advanced Reports API</div>
                                <div class="pricing-feature"><i class="fa-solid fa-check"></i> 24/7 Dedicated Support</div>
                            </div>
                            <a href="${data.plan3Link}" class="pricing-btn">Choose Plan</a>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    "cta-center": {
        name: "Call to Action Card",
        defaultData: {
            title: "Ready to accelerate your growth?",
            subtitle: "Join over 10,000+ creators building fast, high-converting websites.",
            ctaText: "Get Started Now",
            ctaLink: "#cta",
            bgColor: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
            textColor: "#ffffff",
            padding: "80",
            bgMode: "gradient"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-cta-center-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <h2 class="cta-title" style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h2>
                    <p class="cta-desc" style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                    <div class="cta-form">
                        <input type="email" placeholder="Enter your email" class="cta-input" readonly>
                        <a href="${data.ctaLink}" class="cta-submit" style="display: flex; align-items: center; justify-content: center; text-decoration: none;" ${isEditable} data-field="ctaText">${data.ctaText}</a>
                    </div>
                </div>
            `;
        }
    },
    "contact-simple": {
        name: "Clean Contact Form",
        defaultData: {
            title: "Get in touch",
            subtitle: "Have questions? We would love to hear from you. Send us a message.",
            ctaText: "Send Message",
            formAction: "https://formspree.io/f/your-id", 
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "80",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <div class="block-contact-simple-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px;">
                    <div class="block-features-header">
                        <h3 style="color: ${data.textColor};" ${isEditable} data-field="title">${data.title}</h3>
                        <p style="color: ${data.textColor}bb;" ${isEditable} data-field="subtitle">${data.subtitle}</p>
                    </div>
                    <form class="contact-form-el" action="${data.formAction}" method="POST" onsubmit="${mode === 'edit' ? 'event.preventDefault()' : ''}">
                        <div class="form-row">
                            <div class="form-col"><input type="text" name="name" placeholder="Name" class="contact-input-el" required ${mode === 'edit' ? 'readonly' : ''}></div>
                            <div class="form-col"><input type="email" name="email" placeholder="Email" class="contact-input-el" required ${mode === 'edit' ? 'readonly' : ''}></div>
                        </div>
                        <textarea name="message" placeholder="Your Message" rows="4" class="contact-input-el" required ${mode === 'edit' ? 'readonly' : ''}></textarea>
                        <button class="hero-cta-btn" style="border: none; cursor: pointer; align-self: flex-start;" ${isEditable} data-field="ctaText">${data.ctaText}</button>
                    </form>
                </div>
            `;
        }
    },
    "footer-simple": {
        name: "Simple Footer",
        defaultData: {
            brand: "SiteForge",
            copy: "© 2026 SiteForge. All rights reserved.",
            bgColor: "#ffffff",
            textColor: "#1f2937",
            padding: "50",
            bgMode: "color"
        },
        render: (id, data, mode) => {
            const isEditable = mode === "edit" ? 'contenteditable="true"' : '';
            return `
                <footer class="block-footer-simple-container" style="background: ${data.bgColor}; color: ${data.textColor}; padding: ${data.padding}px 40px; border-top: 1px solid ${data.textColor}1a;">
                    <div class="footer-logo" style="color: ${data.textColor};" ${isEditable} data-field="brand">${data.brand}</div>
                    <div class="footer-socials">
                        <a href="#" class="footer-social-link" style="color: ${data.textColor}aa;"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="footer-social-link" style="color: ${data.textColor}aa;"><i class="fa-brands fa-github"></i></a>
                        <a href="#" class="footer-social-link" style="color: ${data.textColor}aa;"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                    <p class="footer-copy" style="color: ${data.textColor}99;" ${isEditable} data-field="copy">${data.copy}</p>
                </footer>
            `;
        }
    }
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    loadDraft();
    initUIEventListeners();
    initPWAInstallation();
    initLocalization();
    renderCanvas();
});

// --- LOAD & SAVE DRAFT LOCALLY ---
function saveDraft() {
    localStorage.setItem("siteforge_draft", JSON.stringify(projectState));
    const statusText = document.querySelector("#save-status .status-text");
    statusText.textContent = translations[currentLang]["status-saved"];
}

function loadDraft() {
    const saved = localStorage.getItem("siteforge_draft");
    if (saved) {
        try {
            projectState = JSON.parse(saved);
            
            // Sync page settings fields
            document.getElementById("setting-title").value = projectState.title;
            document.getElementById("setting-desc").value = projectState.description;
            document.getElementById("setting-font-headings").value = projectState.fontHeadings;
            document.getElementById("setting-font-body").value = projectState.fontBody;
        } catch (e) {
            console.error("Failed to load local draft", e);
        }
    }
}

// --- RENDER ENGINE ---
function renderCanvas() {
    const canvas = document.getElementById("canvas");
    const emptyState = document.getElementById("empty-state");

    // Remove existing blocks from canvas (except empty state placeholder)
    const existingBlocks = canvas.querySelectorAll(".forge-block");
    existingBlocks.forEach(el => el.remove());

    if (projectState.blocks.length === 0) {
        emptyState.style.display = "flex";
        return;
    }

    emptyState.style.display = "none";

    // Set font family style values
    let fontStyles = document.getElementById("canvas-fonts-style");
    if (!fontStyles) {
        fontStyles = document.createElement("style");
        fontStyles.id = "canvas-fonts-style";
        document.head.appendChild(fontStyles);
    }
    fontStyles.innerHTML = `
        #canvas {
            font-family: ${projectState.fontBody} !important;
        }
        #canvas h1, #canvas h2, #canvas h3, #canvas h4, #canvas .block-navbar-brand, #canvas .footer-logo {
            font-family: ${projectState.fontHeadings} !important;
        }
    `;

    projectState.blocks.forEach((block, index) => {
        const blockDef = blockTemplates[block.template];
        if (!blockDef) return;

        const blockWrapper = document.createElement("div");
        blockWrapper.className = `forge-block ${block.id === selectedBlockId ? 'selected' : ''}`;
        blockWrapper.setAttribute("data-id", block.id);
        
        // Block inner HTML
        const blockHtml = blockDef.render(block.id, block.data, editorMode);
        blockWrapper.innerHTML = blockHtml;

        // Inject actions overlay if in Edit Mode
        if (editorMode === "edit") {
            const overlay = document.createElement("div");
            overlay.className = "block-actions-overlay";
            overlay.innerHTML = `
                <button class="action-btn btn-up" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                <button class="action-btn btn-down" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                <button class="action-btn btn-delete" title="Delete Block"><i class="fa-solid fa-trash-can"></i></button>
            `;
            blockWrapper.appendChild(overlay);

            // Bind Overlay buttons click events
            overlay.querySelector(".btn-up").addEventListener("click", (e) => {
                e.stopPropagation();
                moveBlock(index, -1);
            });
            overlay.querySelector(".btn-down").addEventListener("click", (e) => {
                e.stopPropagation();
                moveBlock(index, 1);
            });
            overlay.querySelector(".btn-delete").addEventListener("click", (e) => {
                e.stopPropagation();
                deleteBlock(block.id);
            });
        }

        // Selection Listener
        blockWrapper.addEventListener("click", (e) => {
            if (editorMode !== "edit") return;
            selectBlock(block.id);
        });

        // Prevent navigation for links in edit mode
        blockWrapper.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", (e) => {
                if (editorMode === "edit") {
                    e.preventDefault();
                }
            });
        });

        // Inline text editable listener
        if (editorMode === "edit") {
            blockWrapper.querySelectorAll("[contenteditable='true']").forEach(elem => {
                elem.addEventListener("input", (e) => {
                    const field = elem.getAttribute("data-field");
                    if (field) {
                        block.data[field] = elem.innerHTML;
                        saveDraft();
                    }
                });

                // Clean paste format
                elem.addEventListener("paste", (e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertText", false, text);
                });
            });

            // Handle editable images (Click image to replace URL)
            blockWrapper.querySelectorAll("[data-img-field]").forEach(imgElem => {
                imgElem.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const field = imgElem.getAttribute("data-img-field");
                    const currentUrl = block.data[field];
                    const newUrl = prompt(translations[currentLang]["label-showcase-image"] + ":", currentUrl);
                    if (newUrl !== null && newUrl.trim() !== "") {
                        block.data[field] = newUrl;
                        imgElem.src = newUrl;
                        saveDraft();
                    }
                });
            });
        }

        canvas.appendChild(blockWrapper);
    });
}

// --- CONTROLLERS ---
function selectBlock(id) {
    selectedBlockId = id;
    
    // Toggle active state in DOM
    const blocks = document.querySelectorAll(".forge-block");
    blocks.forEach(el => {
        if (el.getAttribute("data-id") === id) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    });

    // Populate Styles sidebar Inspector
    const inspectorControls = document.querySelector(".inspector-controls");
    const noSelectionMessage = document.querySelector(".no-selection-message");
    
    const block = projectState.blocks.find(b => b.id === id);
    if (!block) return;

    noSelectionMessage.style.display = "none";
    inspectorControls.style.display = "block";

    // Switch tab to Styles panel
    document.getElementById("tab-btn-styles").click();

    const blockDef = blockTemplates[block.template];
    document.getElementById("inspector-block-title").textContent = translations[currentLang]["block-" + block.template] || blockDef.name;

    // Load colors & values
    document.getElementById("input-bg-color").value = block.data.bgColor.startsWith("#") ? block.data.bgColor : "#ffffff";
    document.getElementById("input-bg-color-text").value = block.data.bgColor;
    document.getElementById("input-text-color").value = block.data.textColor.startsWith("#") ? block.data.textColor : "#1f2937";
    document.getElementById("input-text-color-text").value = block.data.textColor;
    document.getElementById("input-padding").value = block.data.padding;
    document.getElementById("padding-val").textContent = block.data.padding + "px";

    // Setup bg mode toggle
    const bgMode = block.data.bgMode || "color";
    document.querySelectorAll(".bg-mode-selector .mode-btn").forEach(btn => {
        if (btn.getAttribute("data-bg-mode") === bgMode) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Display appropriate background configuration tab
    toggleBgModeControls(bgMode, block.data.bgColor);

    // Render custom content customization properties (e.g. Image URL, CTA Link URLs)
    const customFields = document.getElementById("custom-block-fields");
    customFields.innerHTML = "";

    const t = translations[currentLang];

    // Image URL field
    if (block.data.imageUrl !== undefined) {
        const div = document.createElement("div");
        div.className = "control-group";
        div.innerHTML = `
            <label class="sub-label">${t["label-showcase-image"]}</label>
            <input type="text" id="input-custom-image-url" class="text-input" value="${block.data.imageUrl}">
        `;
        customFields.appendChild(div);

        document.getElementById("input-custom-image-url").addEventListener("input", (e) => {
            block.data.imageUrl = e.target.value;
            saveDraft();
            renderCanvas();
        });
    }

    // Dynamic CTA Link URL fields
    if (block.data.ctaLink !== undefined) {
        const div = document.createElement("div");
        div.className = "control-group";
        div.innerHTML = `
            <label class="sub-label">${t["lbl-btn-url"]}</label>
            <input type="text" id="input-cta-link" class="text-input" placeholder="https://..." value="${block.data.ctaLink}">
        `;
        customFields.appendChild(div);

        document.getElementById("input-cta-link").addEventListener("input", (e) => {
            block.data.ctaLink = e.target.value;
            saveDraft();
            renderCanvas();
        });
    }

    // Contact Form Endpoint field
    if (block.data.formAction !== undefined) {
        const div = document.createElement("div");
        div.className = "control-group";
        div.innerHTML = `
            <label class="sub-label">${t["lbl-form-action"]}</label>
            <input type="text" id="input-form-action" class="text-input" placeholder="https://formspree.io/..." value="${block.data.formAction}">
        `;
        customFields.appendChild(div);

        document.getElementById("input-form-action").addEventListener("input", (e) => {
            block.data.formAction = e.target.value;
            saveDraft();
            renderCanvas();
        });
    }

    // Header Navbar Navigation links editing
    if (block.template === "navbar") {
        const div = document.createElement("div");
        div.className = "control-group";
        div.innerHTML = `
            <label class="sub-label">${t["lbl-nav-links-url"]} (1, 2, 3)</label>
            <input type="text" id="input-nav-l1" class="text-input" placeholder="Link 1" value="${block.data.link1Url}" style="margin-bottom: 6px;">
            <input type="text" id="input-nav-l2" class="text-input" placeholder="Link 2" value="${block.data.link2Url}" style="margin-bottom: 6px;">
            <input type="text" id="input-nav-l3" class="text-input" placeholder="Link 3" value="${block.data.link3Url}">
        `;
        customFields.appendChild(div);

        document.getElementById("input-nav-l1").addEventListener("input", (e) => { block.data.link1Url = e.target.value; saveDraft(); renderCanvas(); });
        document.getElementById("input-nav-l2").addEventListener("input", (e) => { block.data.link2Url = e.target.value; saveDraft(); renderCanvas(); });
        document.getElementById("input-nav-l3").addEventListener("input", (e) => { block.data.link3Url = e.target.value; saveDraft(); renderCanvas(); });
    }

    // Pricing link editing
    if (block.template === "pricing") {
        const div = document.createElement("div");
        div.className = "control-group";
        div.innerHTML = `
            <label class="sub-label">${t["lbl-plan-urls"]} (Plan 1, 2, 3)</label>
            <input type="text" id="input-price-l1" class="text-input" placeholder="Plan 1 Link" value="${block.data.plan1Link}" style="margin-bottom: 6px;">
            <input type="text" id="input-price-l2" class="text-input" placeholder="Plan 2 Link" value="${block.data.plan2Link}" style="margin-bottom: 6px;">
            <input type="text" id="input-price-l3" class="text-input" placeholder="Plan 3 Link" value="${block.data.plan3Link}">
        `;
        customFields.appendChild(div);

        document.getElementById("input-price-l1").addEventListener("input", (e) => { block.data.plan1Link = e.target.value; saveDraft(); renderCanvas(); });
        document.getElementById("input-price-l2").addEventListener("input", (e) => { block.data.plan2Link = e.target.value; saveDraft(); renderCanvas(); });
        document.getElementById("input-price-l3").addEventListener("input", (e) => { block.data.plan3Link = e.target.value; saveDraft(); renderCanvas(); });
    }
}

function deselectBlock() {
    selectedBlockId = null;
    const blocks = document.querySelectorAll(".forge-block");
    blocks.forEach(el => el.classList.remove("selected"));

    document.querySelector(".inspector-controls").style.display = "none";
    document.querySelector(".no-selection-message").style.display = "flex";
}

function addBlock(templateName) {
    const blockDef = blockTemplates[templateName];
    if (!blockDef) return;

    // Deep clone default data
    const defaultData = JSON.parse(JSON.stringify(blockDef.defaultData));
    
    // Auto-translate block content if browser language is Russian
    if (currentLang === 'ru') {
        if (templateName === 'navbar') {
            defaultData.brand = "СайтФорж";
            defaultData.link1 = "Преимущества";
            defaultData.link2 = "Цены";
            defaultData.link3 = "Отзывы";
            defaultData.ctaText = "Начать";
        } else if (templateName === 'hero-gradient') {
            defaultData.tagline = "НОВОЕ ПОКОЛЕНИЕ";
            defaultData.title = "Создавайте продающие лендинги";
            defaultData.subtitle = "Красивые, адаптивные блоки за считанные минуты. Разворачивайте на Vercel бесплатно.";
            defaultData.ctaText = "Попробовать бесплатно";
        } else if (templateName === 'hero-split') {
            defaultData.tagline = "АНАЛИТИЧЕСКАЯ ПЛАТФОРМА";
            defaultData.title = "Умные решения для быстрого роста";
            defaultData.subtitle = "Понимайте пользователей, повышайте конверсию и увеличивайте выручку с нашими шаблонами.";
            defaultData.ctaText = "Узнать больше";
        } else if (templateName === 'features-3col') {
            defaultData.title = "Всё необходимое уже внутри";
            defaultData.subtitle = "Наша платформа оснащена всеми премиум функциями для легкого старта.";
            defaultData.f1Title = "Невероятная скорость";
            defaultData.f1Desc = "Сайт собран на чистом коде, ваши пользователи не потеряют ни секунды.";
            defaultData.f2Title = "Адаптивный дизайн";
            defaultData.f2Desc = "Идеально выглядит на смартфонах, планшетах и широкоформатных мониторах.";
            defaultData.f3Title = "Экспорт в 1 клик";
            defaultData.f3Desc = "Скачивайте чистый HTML-код, готовый к размещению на GitHub или Vercel.";
        } else if (templateName === 'feature-split-left') {
            defaultData.title = "Дизайн без ограничений";
            defaultData.subtitle = "Создавайте лендинги, соответствующие фирменному стилю. Меняйте цвета, сетки и шрифты прямо в редакторе.";
            defaultData.bullet1 = "Живая правка и предпросмотр";
            defaultData.bullet2 = "Чистый экспортируемый HTML код";
            defaultData.bullet3 = "Интеграция с Google Fonts";
        } else if (templateName === 'testimonials') {
            defaultData.t1Text = "SiteForge полностью изменил наш подход к запуску продуктов. От макета до готового сайта за 10 минут!";
            defaultData.t1User = "Светлана Смирнова";
            defaultData.t1Role = "Продуктовый дизайнер";
            defaultData.t2Text = "Код на выходе кристально чистый. Никакого мусора от фреймворков, только легкий HTML/CSS.";
            defaultData.t2User = "Дмитрий Иванов";
            defaultData.t2Role = "Фронтенд-разработчик";
            defaultData.t3Text = "Я создал шаблон страницы и продал его на Telderi за 15 000 рублей. Конструктор шикарен!";
            defaultData.t3User = "Алексей Коваленко";
            defaultData.t3Role = "Веб-предприниматель";
        } else if (templateName === 'pricing') {
            defaultData.title = "Простые и понятные тарифы";
            defaultData.subtitle = "Выберите подходящий тарифный план для вашего бизнеса.";
            defaultData.plan1Name = "Стартовый";
            defaultData.plan2Name = "Профессиональный";
            defaultData.plan3Name = "Корпоративный";
        } else if (templateName === 'cta-center') {
            defaultData.title = "Готовы ускорить рост ваших продаж?";
            defaultData.subtitle = "Присоединяйтесь к 10,000+ создателям, ноющим сайты на SiteForge.";
            defaultData.ctaText = "Начать сейчас";
        } else if (templateName === 'contact-simple') {
            defaultData.title = "Связаться с нами";
            defaultData.subtitle = "Есть вопросы? Мы с радостью ответим на них. Напишите нам сообщение.";
            defaultData.ctaText = "Отправить сообщение";
        } else if (templateName === 'footer-simple') {
            defaultData.brand = "СайтФорж";
            defaultData.copy = "© 2026 СайтФорж. Все права защищены.";
        }
    }

    const newBlock = {
        id: "block_" + Date.now(),
        template: templateName,
        data: defaultData
    };

    projectState.blocks.push(newBlock);
    saveDraft();
    renderCanvas();
    
    // Auto-select newly created block
    setTimeout(() => selectBlock(newBlock.id), 50);
}

function deleteBlock(id) {
    projectState.blocks = projectState.blocks.filter(b => b.id !== id);
    if (selectedBlockId === id) {
        deselectBlock();
    }
    saveDraft();
    renderCanvas();
}

function moveBlock(index, offset) {
    const newIndex = index + offset;
    if (newIndex < 0 || newIndex >= projectState.blocks.length) return;

    // Swap items
    const temp = projectState.blocks[index];
    projectState.blocks[index] = projectState.blocks[newIndex];
    projectState.blocks[newIndex] = temp;

    saveDraft();
    renderCanvas();
}

function toggleBgModeControls(mode, bgVal) {
    document.querySelectorAll(".bg-control").forEach(el => el.style.display = "none");
    if (mode === "color") {
        document.getElementById("bg-color-control").style.display = "block";
    } else if (mode === "gradient") {
        document.getElementById("bg-gradient-control").style.display = "block";
    } else if (mode === "image") {
        document.getElementById("bg-image-control").style.display = "block";
        document.getElementById("input-bg-image-url").value = bgVal.startsWith("url") ? bgVal.replace(/url\(['"]?|['"]?\)/g, '') : "";
    }
}

// --- PWA INSTALLATION EVENTS ---
let deferredPrompt = null;

function initPWAInstallation() {
    const installBtn = document.getElementById("btn-install"); // header button

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        if (installBtn && editorMode === "edit") {
            installBtn.style.display = "inline-flex";
        }
    });

    if (installBtn) {
        installBtn.addEventListener("click", async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`[PWA] Install choice outcome: ${outcome}`);
            deferredPrompt = null;
            installBtn.style.display = "none";
        });
    }

    window.addEventListener('appinstalled', (evt) => {
        console.log('[PWA] SiteForge successfully installed on device.');
        if (installBtn) installBtn.style.display = "none";
    });
}

// --- LOCALIZATION INITIALIZER ---
function initLocalization() {
    let defaultLang = 'en';
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang && userLang.toLowerCase().startsWith('ru')) {
        defaultLang = 'ru';
    }

    const savedLang = localStorage.getItem("siteforge_lang") || defaultLang;
    
    const selector = document.getElementById("setting-language");
    selector.value = savedLang;
    
    applyLanguage(savedLang);

    selector.addEventListener("change", (e) => {
        const lang = e.target.value;
        localStorage.setItem("siteforge_lang", lang);
        applyLanguage(lang);
        
        if (selectedBlockId) {
            selectBlock(selectedBlockId);
        }
    });
}

// --- EVENT LISTENERS REGISTRATION ---
function initUIEventListeners() {
    // 1. Sidebar Tab Switchers (Updated to support help tab)
    const tabButtons = document.querySelectorAll(".sidebar-tabs .tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const tab = btn.getAttribute("data-tab");
            document.querySelectorAll(".sidebar-content .tab-panel").forEach(p => p.classList.remove("active"));
            document.getElementById("panel-" + tab).classList.add("active");
        });
    });

    // 2. Add Block Click Handlers
    document.querySelectorAll(".block-item").forEach(item => {
        item.addEventListener("click", () => {
            const template = item.getAttribute("data-template");
            addBlock(template);
        });
    });

    // 3. Viewport Size Switchers
    const viewportContainer = document.getElementById("viewport-container");
    const viewportDimText = document.getElementById("viewport-dimensions");
    document.querySelectorAll(".viewport-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".viewport-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const size = btn.getAttribute("data-viewport");
            viewportContainer.setAttribute("data-size", size);
            
            if (size === "desktop") viewportDimText.textContent = currentLang === 'ru' ? "Десктоп (100%)" : "Desktop (100%)";
            if (size === "tablet") viewportDimText.textContent = currentLang === 'ru' ? "Планшет (768px)" : "Tablet (768px)";
            if (size === "mobile") viewportDimText.textContent = currentLang === 'ru' ? "Мобильный (375px)" : "Mobile (375px)";
        });
    });

    // 4. Preview Mode Switcher
    const btnPreview = document.getElementById("btn-preview");
    const installBtn = document.getElementById("btn-install");
    
    btnPreview.addEventListener("click", () => {
        if (editorMode === "edit") {
            editorMode = "preview";
            document.body.classList.remove("editor-mode");
            document.body.classList.add("preview-mode");
            btnPreview.innerHTML = `<i class="fa-solid fa-pen-nib"></i> <span>${currentLang === 'ru' ? "Режим правки" : "Edit Mode"}</span>`;
            
            if (installBtn) installBtn.style.display = "none";
            deselectBlock();
        } else {
            editorMode = "edit";
            document.body.classList.remove("preview-mode");
            document.body.classList.add("editor-mode");
            btnPreview.innerHTML = `<i class="fa-solid fa-eye"></i> <span>${currentLang === 'ru' ? "Предпросмотр" : "Preview"}</span>`;
            
            if (installBtn && deferredPrompt) installBtn.style.display = "inline-flex";
        }
        renderCanvas();
    });

    // 5. Canvas Deselection Click Outer
    document.getElementById("canvas").addEventListener("click", (e) => {
        if (e.target === document.getElementById("canvas") || e.target === document.getElementById("empty-state")) {
            deselectBlock();
        }
    });

    // 6. Page Settings listeners
    document.getElementById("setting-title").addEventListener("input", (e) => {
        projectState.title = e.target.value;
        saveDraft();
    });
    document.getElementById("setting-desc").addEventListener("input", (e) => {
        projectState.description = e.target.value;
        saveDraft();
    });
    document.getElementById("setting-font-headings").addEventListener("change", (e) => {
        projectState.fontHeadings = e.target.value;
        saveDraft();
        renderCanvas();
    });
    document.getElementById("setting-font-body").addEventListener("change", (e) => {
        projectState.fontBody = e.target.value;
        saveDraft();
        renderCanvas();
    });

    // 7. Inspector Styling input changes
    const inputBgColor = document.getElementById("input-bg-color");
    const inputBgColorText = document.getElementById("input-bg-color-text");
    const inputTextColor = document.getElementById("input-text-color");
    const inputTextColorText = document.getElementById("input-text-color-text");
    const inputPadding = document.getElementById("input-padding");

    // BG Color picker
    inputBgColor.addEventListener("input", (e) => {
        const val = e.target.value;
        inputBgColorText.value = val;
        updateSelectedBlockProperty("bgColor", val);
    });
    inputBgColorText.addEventListener("input", (e) => {
        const val = e.target.value;
        inputBgColor.value = val.startsWith("#") && val.length === 7 ? val : "#ffffff";
        updateSelectedBlockProperty("bgColor", val);
    });

    // Text Color picker
    inputTextColor.addEventListener("input", (e) => {
        const val = e.target.value;
        inputTextColorText.value = val;
        updateSelectedBlockProperty("textColor", val);
    });
    inputTextColorText.addEventListener("input", (e) => {
        const val = e.target.value;
        inputTextColor.value = val.startsWith("#") && val.length === 7 ? val : "#1f2937";
        updateSelectedBlockProperty("textColor", val);
    });

    // Padding slider
    inputPadding.addEventListener("input", (e) => {
        const val = e.target.value;
        document.getElementById("padding-val").textContent = val + "px";
        updateSelectedBlockProperty("padding", val);
    });

    // Bg style mode buttons
    document.querySelectorAll(".bg-mode-selector .mode-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const mode = btn.getAttribute("data-bg-mode");
            document.querySelectorAll(".bg-mode-selector .mode-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const block = projectState.blocks.find(b => b.id === selectedBlockId);
            if (!block) return;

            block.data.bgMode = mode;
            let defaultBg = "#ffffff";
            if (mode === "gradient") defaultBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            if (mode === "image") defaultBg = "url('./hero-mockup.jpg')"; 
            
            block.data.bgColor = defaultBg;
            inputBgColorText.value = defaultBg;
            
            toggleBgModeControls(mode, defaultBg);
            saveDraft();
            renderCanvas();
        });
    });

    // Preset gradient clicks
    document.querySelectorAll(".gradient-preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const gradient = btn.getAttribute("data-gradient");
            inputBgColorText.value = gradient;
            updateSelectedBlockProperty("bgColor", gradient);
        });
    });

    // Bg Image URL input
    document.getElementById("input-bg-image-url").addEventListener("input", (e) => {
        const val = e.target.value;
        const bgVal = val ? `url('${val}')` : "#ffffff";
        updateSelectedBlockProperty("bgColor", bgVal);
    });

    // 8. Modal Connect Supabase trigger
    const modal = document.getElementById("supabase-modal");
    document.getElementById("btn-supabase").addEventListener("click", () => {
        modal.style.display = "flex";
    });
    document.getElementById("modal-close").addEventListener("click", () => {
        modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // 9. Export HTML Engine Click
    document.getElementById("btn-export").addEventListener("click", () => {
        exportHtmlWebsite();
    });

    // 10. Help Accordion Toggle Handlers
    document.querySelectorAll(".help-card").forEach(card => {
        const toggle = card.querySelector(".help-header-toggle");
        if (toggle) {
            toggle.addEventListener("click", () => {
                const isOpen = card.classList.contains("open");
                document.querySelectorAll(".help-card").forEach(c => c.classList.remove("open"));
                if (!isOpen) {
                    card.classList.add("open");
                }
            });
        }
    });
}

function updateSelectedBlockProperty(prop, val) {
    if (!selectedBlockId) return;
    const block = projectState.blocks.find(b => b.id === selectedBlockId);
    if (block) {
        block.data[prop] = val;
        saveDraft();
        renderCanvas();
    }
}

// --- EXPORT HTML ENGINE ---
async function exportHtmlWebsite() {
    if (projectState.blocks.length === 0) {
        alert(currentLang === 'ru' ? "Добавьте несколько блоков на холст перед экспортом!" : "Add some blocks to the canvas before exporting.");
        return;
    }

    // 1. Fetch block styles from style.css
    let blockStyles = "";
    try {
        const response = await fetch("style.css");
        const cssText = await response.text();
        const startTag = "/* [BLOCK_TEMPLATES_START] */";
        const endTag = "/* [BLOCK_TEMPLATES_END] */";
        
        const startIndex = cssText.indexOf(startTag);
        const endIndex = cssText.indexOf(endTag);
        
        if (startIndex !== -1 && endIndex !== -1) {
            blockStyles = cssText.substring(startIndex + startTag.length, endIndex);
        } else {
            console.warn("Could not find style tags in style.css, exporting all styles.");
            blockStyles = cssText;
        }
    } catch (e) {
        console.error("Could not fetch style.css. Packing basic styling.", e);
        blockStyles = `
            body { font-family: sans-serif; margin: 0; }
            nav, header, section, footer { box-sizing: border-box; }
        `;
    }

    // 2. Generate active blocks clean HTML code
    let compiledBlocksHtml = "";
    projectState.blocks.forEach(block => {
        const blockDef = blockTemplates[block.template];
        if (blockDef) {
            // Render block in preview mode (removes contenteditable, enables links/form submits)
            let rendered = blockDef.render(block.id, block.data, "preview");
            compiledBlocksHtml += `\n<!-- Block: ${blockDef.name} -->\n` + rendered.trim() + "\n";
        }
    });

    // 3. Assemble clean web template markup
    const fullHtml = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectState.title}</title>
    <meta name="description" content="${projectState.description}">
    <!-- Premium Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Global CSS Resets & Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: ${projectState.fontBody};
            background-color: #ffffff;
            color: #1f2937;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5, h6, .block-navbar-brand, .footer-logo {
            font-family: ${projectState.fontHeadings};
        }
        
        /* Layout Blocks Styles */
        ${blockStyles.trim()}
    </style>
</head>
<body>

    ${compiledBlocksHtml.trim()}

</body>
</html>`;

    // 4. Trigger download
    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
