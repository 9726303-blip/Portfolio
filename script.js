document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const galleryContainer = document.querySelector(".floating-gallery");
  const languageModal = document.getElementById("languageModal");
  const languageButtons = document.querySelectorAll(".language-button");
  const adminPanel = document.getElementById("adminPanel");
  const adminClose = document.getElementById("adminClose");
  const adminSave = document.getElementById("adminSave");
  const adminReset = document.getElementById("adminReset");
  const heroBgImage = document.querySelector(".hero-bg-image");
  const leftSidebarImage = document.querySelector(".side-panel--left .side-panel-image");
  const rightSidebarImage = document.querySelector(".side-panel--right .side-panel-image");
  const adminHeaderImageBtn = document.getElementById("adminHeaderImageBtn");
  const adminHeaderImageInput = document.getElementById("adminHeaderImageInput");
  const adminLeftSidebarImageBtn = document.getElementById("adminLeftSidebarImageBtn");
  const adminLeftSidebarImageInput = document.getElementById("adminLeftSidebarImageInput");
  const adminRightSidebarImageBtn = document.getElementById("adminRightSidebarImageBtn");
  const adminRightSidebarImageInput = document.getElementById("adminRightSidebarImageInput");
  const adminHeaderImagePreview = document.getElementById("adminHeaderImagePreview");
  const adminLeftSidebarImagePreview = document.getElementById("adminLeftSidebarImagePreview");
  const adminRightSidebarImagePreview = document.getElementById("adminRightSidebarImagePreview");
  const adminUnlock = document.getElementById("adminUnlock");
  const passwordModal = document.getElementById("passwordModal");
  const adminPasswordInput = document.getElementById("adminPasswordInput");
  const passwordSubmit = document.getElementById("passwordSubmit");
  const passwordCancel = document.getElementById("passwordCancel");
  const passwordError = document.getElementById("passwordError");
  const adminTextList = document.getElementById("adminTextList");
  const adminGalleryFilterSelectors = document.getElementById("adminGalleryFilterSelectors");
  const adminGalleryFileInput = document.getElementById("adminGalleryFileInput");
  const adminFilterEditor = document.getElementById("adminFilterEditor");
  const adminAddPrimaryFilter = document.getElementById("adminAddPrimaryFilter");
  const adminAddSecondaryFilter = document.getElementById("adminAddSecondaryFilter");
  const adminGalleryList = document.getElementById("adminGalleryList");
  const adminAddGalleryItem = document.getElementById("adminAddGalleryItem");
  const adminApply = document.getElementById("adminApply");
  const adminNewPassword = document.getElementById("adminNewPassword");
  const adminConfirmPassword = document.getElementById("adminConfirmPassword");
  const filterRow = document.getElementById("filterRow");
  const filterRowSecondary = document.getElementById("filterRowSecondary");
  const filterClearBtn = document.getElementById("filterClear");
  const filterCountEl = document.getElementById("filterCount");
  const filterModeBtns = document.querySelectorAll(".filter-mode__btn");
  const themeToggle = document.getElementById("themeToggle");
  const langSwitcher = document.getElementById("langSwitcher");
  const langToggle = document.getElementById("langToggle");
  const langMenu = document.getElementById("langMenu");
  const langCurrent = document.getElementById("langCurrent");
  const heroTitle = document.querySelector(".hero-title");
  const heroWrap = document.querySelector(".hero-title-wrap");
  const bird = document.querySelector(".bird");
  const adminSocialLinks = document.getElementById("adminSocialLinks");
  const adminAddSocialLink = document.getElementById("adminAddSocialLink");

  // Gallery data
  const defaultGalleryItems = [
    { image: "", tags: "sketch animals", alt: "placeholder sketch" },
    { image: "", tags: "art concept", alt: "placeholder art" },
    { image: "", tags: "meme portrait", alt: "placeholder meme" },
    { image: "", tags: "animation fantasy", alt: "placeholder animation" },
    { image: "", tags: "art pixel", alt: "placeholder pixel art" },
    { image: "", tags: "mono concept", alt: "placeholder mono concept" },
    { image: "", tags: "sketch fantasy", alt: "placeholder fantasy" },
    { image: "", tags: "art animals", alt: "placeholder animals" },
    { image: "", tags: "portrait art", alt: "placeholder portrait" },
    { image: "", tags: "concept fantasy", alt: "placeholder concept" },
    { image: "", tags: "animation art", alt: "placeholder animation 2" },
    { image: "", tags: "pixel sketch", alt: "placeholder pixel" },
    { image: "", tags: "mono portrait", alt: "placeholder mono" },
    { image: "", tags: "art animals", alt: "placeholder animal" },
    { image: "", tags: "fantasy concept", alt: "placeholder fantasy 2" },
  ];

  let galleryItems = [];
  let galleryStartIndex = 0;
  let galleryRotationTimer = null;
  let pendingHeaderImage = null;
  let pendingLeftSidebarImage = null;
  let pendingRightSidebarImage = null;
  let uploadQueue = [];
  let filterButtons = [];
  let filterMatchMode = localStorage.getItem("filterMatchMode") === "all" ? "all" : "any";

  const defaultFilterSettings = [
    { key: "all", label: "все", primary: true },
    { key: "sketch", label: "скетчи", primary: true },
    { key: "art", label: "арты", primary: true },
    { key: "meme", label: "меме", primary: true },
    { key: "animation", label: "анимации", primary: true },
    { key: "mono", label: "чб арты", primary: false },
    { key: "animals", label: "животные", primary: false },
    { key: "concept", label: "концепт арты", primary: false },
    { key: "pixel", label: "пиксель арты", primary: false },
    { key: "fantasy", label: "фэнтези", primary: false },
    { key: "portrait", label: "портреты", primary: false },
  ];

  const adminTextSections = [
    {
      section: "Главный экран",
      titleKey: "hero_title",
      bodyKeys: ["hero_subtitle"],
    },
    {
      section: "Галерея",
      titleKey: "gallery_title",
      bodyKeys: ["gallery_description", "gallery_empty"],
    },
    {
      section: "Заказ",
      titleKey: "order_title",
      bodyKeys: ["order_p1"],
    },
    {
      section: "Сотрудничество",
      titleKey: "collab_title",
      bodyKeys: ["collab_p1", "collab_p2"],
    },
    {
      section: "Обо мне",
      titleKey: "about_title",
      bodyKeys: ["about_p1", "about_li1", "about_li2", "about_li3"],
    },
    {
      section: "Проекты",
      titleKey: "projects_title",
      bodyKeys: ["projects_description", "projects_item1"],
    },
    {
      section: "Футер",
      titleKey: "footer_title",
      bodyKeys: [],
    },
  ];

  const adminTextFieldLabels = {
    nav_order: "Кнопка заказа",
    nav_projects: "Кнопка проектов",
    nav_collab: "Кнопка сотрудничества",
    nav_about: "Кнопка обо мне",
    hero_subtitle: "Подзаголовок",
    gallery_description: "Описание",
    gallery_empty: "Текст при пустой галерее",
    order_p1: "Текст блока заказа",
    order_p2: "Дополнительный текст блока заказа",
    collab_p1: "Текст блока сотрудничества",
    collab_p2: "Дополнительный текст блока сотрудничества",
    about_p1: "Текст блока обо мне",
    about_li1: "Пункт 1",
    about_li2: "Пункт 2",
    about_li3: "Пункт 3",
    projects_description: "Описание проектов",
    projects_item1: "Пункт списка проектов",
  };

  const translations = {
    ru: {
      nav_order: "Заказать коммишку",
      nav_projects: "Мои проекты",
      nav_about: "Обо мне",
      nav_collab: "Предложить сотрудничество",
      hero_title: "Podvalnia_alebarda",
      hero_subtitle: "диджитал‑художник и аниматор.",
      gallery_title: "Галерея работ",
      gallery_description: "Работы фильтруются по стилю и настроению. В будущем здесь появятся настоящие картины.",
      gallery_empty: "Работ пока нет — скоро появятся новые зарисовки.",
      filter_sketch: "Скетчи",
      filter_art: "Полноценные арты",
      filter_meme: "Меме",
      filter_animation: "Анимации",
      filter_all: "Все",
      filter_mono: "Ч/Б арты",
      filter_animals: "Животные",
      filter_concept: "Концепт‑арты",
      filter_pixel: "Пиксель‑арт",
      filter_fantasy: "Фэнтези",
      filter_portrait: "Портреты",
      order_title: "Заказать коммишку",
      order_p1: "Опишите идею, настроение и формат — я превращу её в тёплое цифровое произведение с цветочными и листовыми мотивами.",
      order_p2: "Напишите свои пожелания, и я предложу лучший вариант исполнения.",
      collab_title: "Предложить сотрудничество",
      collab_p1: "Ищу проекты, где можно добавить лёгкую магию с помощью диджитал‑арта. Буду рада сделать работу для бренда, игры, издательства или кампании.",
      collab_p2: "Оставьте запрос — я отвечу с предварительной идеей и примерными сроками.",
      about_title: "Обо мне",
      about_p1: "Я художник, работаю в цифровой живописи: люблю тёплые цвета, мягкое освещение и характерных персонажей.",
      about_li1: "Люблю лыжный спорт, макароны и лапшу.",
      about_li2: "Фанат сериалов, фэнтези и классических иллюстраций.",
      about_li3: "Хочу создавать тёплые работы с атмосферой и характером.",
      projects_title: "Мои проекты",
      projects_description: "Здесь я рассказываю о проектах, в которых участвовал, и о том, над чем работал.",
      projects_item1: "Проекты будут добавлены в ближайшее время.",
      footer_title: "Следите за мной в соцсетях",
      social_instagram: "Instagram",
      social_telegram: "Telegram",
      social_vk: "VK",
      filter_mode_label: "Совпадение:",
      filter_mode_any: "любой",
      filter_mode_all: "все",
      filter_clear: "Сбросить фильтры",
      filter_count_one: "{n} работа",
      filter_count_few: "{n} работы",
      filter_count_many: "{n} работ",
      order_form_name: "Имя",
      order_form_contact_label: "Как с вами связаться",
      order_form_contact_email: "Email",
      order_form_contact_discord: "Discord",
      order_form_contact_telegram: "Telegram",
      order_form_contact_ph_email: "you@example.com",
      order_form_contact_ph_discord: "напр. username или username#1234",
      order_form_contact_ph_telegram: "напр. @username",
      order_form_type: "Тип работы",
      order_form_type_any: "Любой / уточним",
      order_form_desc: "Опишите идею",
      order_form_budget: "Бюджет (необязательно)",
      order_form_deadline: "Желаемый срок (необязательно)",
      order_form_consent: "Согласен(на) на обработку данных для ответа на заявку",
      order_form_submit: "Отправить заявку",
      order_form_sending: "Отправляем…",
      order_form_success: "Спасибо! Заявка отправлена — я свяжусь с вами по указанному контакту.",
      order_form_error: "Не удалось отправить. Заявка сохранена, попробуйте позже.",
      order_form_saved: "Заявка сохранена. Художник свяжется с вами по указанному контакту.",
      footer_copyright: "© Podvalnia_alebarda. Все работы защищены авторским правом. Копирование запрещено.",
      copy_warning: "Работы защищены авторским правом. Копирование запрещено.",
    },
    en: {
      nav_order: "Order commission",
      nav_projects: "Projects",
      nav_about: "About",
      nav_collab: "Collaborate",
      hero_title: "Podvalnia_alebarda",
      hero_subtitle: "Digital artist & animator.",
      gallery_title: "Gallery",
      gallery_description: "Browse artworks filtered by style and mood. Original paintings coming soon.",
      gallery_empty: "No works yet — new pieces will appear soon.",
      filter_sketch: "Sketches",
      filter_art: "Full artworks",
      filter_meme: "Memes",
      filter_animation: "Animations",
      filter_all: "All",
      filter_mono: "B&W art",
      filter_animals: "Animals",
      filter_concept: "Concept art",
      filter_pixel: "Pixel art",
      filter_fantasy: "Fantasy",
      filter_portrait: "Portraits",
      order_title: "Commission an artwork",
      order_p1: "Describe the idea, mood and format — I'll turn it into a warm digital piece with floral and foliage motifs.",
      order_p2: "Share your preferences and I'll propose the best approach.",
      collab_title: "Propose a collaboration",
      collab_p1: "I'm open to projects where I can add a touch of magic with digital art — brands, games, publishers, or campaigns.",
      collab_p2: "Leave a request and I'll reply with an initial concept and estimated timeline.",
      about_title: "About me",
      about_p1: "I create warm-toned digital art combining organic patterns, soft lighting, and expressive characters.",
      about_li1: "Focus on atmosphere and charm",
      about_li2: "Working in illustration, concept art, animation and pixel art",
      about_li3: "I love pieces that feel sunny and cozy",
      projects_title: "Projects",
      projects_description: "Here I share projects I've taken part in and my past work.",
      projects_item1: "Project details will be added soon.",
      footer_title: "Follow me on social media",
      social_instagram: "Instagram",
      social_telegram: "Telegram",
      social_vk: "VK",
      filter_mode_label: "Match:",
      filter_mode_any: "any",
      filter_mode_all: "all",
      filter_clear: "Clear filters",
      filter_count_one: "{n} work",
      filter_count_few: "{n} works",
      filter_count_many: "{n} works",
      order_form_name: "Your name",
      order_form_contact_label: "How to reach you",
      order_form_contact_email: "Email",
      order_form_contact_discord: "Discord",
      order_form_contact_telegram: "Telegram",
      order_form_contact_ph_email: "you@example.com",
      order_form_contact_ph_discord: "e.g. username or username#1234",
      order_form_contact_ph_telegram: "e.g. @username",
      order_form_type: "Work type",
      order_form_type_any: "Any / let's discuss",
      order_form_desc: "Describe the idea",
      order_form_budget: "Budget (optional)",
      order_form_deadline: "Deadline (optional)",
      order_form_consent: "I agree to the processing of my data to reply to this request",
      order_form_submit: "Send request",
      order_form_sending: "Sending…",
      order_form_success: "Thanks! Your request was sent — I'll reach out via the contact you provided.",
      order_form_error: "Could not send. Your request was saved, please try again later.",
      order_form_saved: "Your request was saved. The artist will contact you via the contact you provided.",
      footer_copyright: "© Podvalnia_alebarda. All works are protected by copyright. Copying is prohibited.",
      copy_warning: "These works are protected by copyright. Copying is not allowed.",
    },
    ko: {
      nav_order: "주문하기",
      nav_projects: "프로젝트",
      nav_about: "소개",
      nav_collab: "협업 제안",
      hero_title: "Podvalnia_alebarda",
      hero_subtitle: "디지털 아티스트 겸 애니메이터.",
      gallery_title: "갤러리",
      gallery_description: "스타일과 분위기별로 작품을 필터링해 둘러보세요. 곧 원화들도 올라옵니다.",
      gallery_empty: "아직 작품이 없습니다 — 곧 새로운 작품이 추가됩니다.",
      filter_sketch: "스케치",
      filter_art: "완성작",
      filter_meme: "밈",
      filter_animation: "애니메이션",
      filter_all: "전체",
      filter_mono: "흑백 아트",
      filter_animals: "동물",
      filter_concept: "컨셉 아트",
      filter_pixel: "픽셀 아트",
      filter_fantasy: "판타지",
      filter_portrait: "초상화",
      order_title: "커미션 의뢰",
      order_p1: "아이디어, 분위기, 형식을 알려주시면 꽃과 잎사귀 모티프가 있는 따뜻한 디지털 작품으로 만들어 드립니다.",
      order_p2: "원하시는 사항을 적어주시면 최적의 진행 방안을 제안하겠습니다.",
      collab_title: "협업 제안",
      collab_p1: "디지털 아트로 은은한 마법을 더할 수 있는 프로젝트를 찾고 있습니다. 브랜드, 게임, 출판사, 캠페인 작업 환영합니다.",
      collab_p2: "요청을 남겨주시면 초안 아이디어와 예상 일정을 회신드리겠습니다.",
      about_title: "소개",
      about_p1: "유기적인 패턴, 부드러운 조명, 감성적인 캐릭터를 결합한 따뜻한 톤의 디지털 아트를 제작합니다.",
      about_li1: "분위기와 온기에 중점",
      about_li2: "일러스트, 컨셉, 애니메이션, 픽셀 아트 작업",
      about_li3: "따뜻하고 포근한 분위기의 작품을 좋아합니다",
      projects_title: "프로젝트",
      projects_description: "참여한 프로젝트와 작업물을 소개합니다.",
      projects_item1: "프로젝트 정보는 곧 업데이트됩니다.",
      footer_title: "SNS에서 팔로우",
      social_instagram: "Instagram",
      social_telegram: "Telegram",
      social_vk: "VK",
      filter_mode_label: "일치:",
      filter_mode_any: "하나라도",
      filter_mode_all: "모두",
      filter_clear: "필터 초기화",
      filter_count_one: "작품 {n}점",
      filter_count_few: "작품 {n}점",
      filter_count_many: "작품 {n}점",
      order_form_name: "이름",
      order_form_contact_label: "연락 방법",
      order_form_contact_email: "이메일",
      order_form_contact_discord: "Discord",
      order_form_contact_telegram: "Telegram",
      order_form_contact_ph_email: "you@example.com",
      order_form_contact_ph_discord: "예: username 또는 username#1234",
      order_form_contact_ph_telegram: "예: @username",
      order_form_type: "작업 유형",
      order_form_type_any: "상관없음 / 상담",
      order_form_desc: "아이디어 설명",
      order_form_budget: "예산 (선택)",
      order_form_deadline: "희망 마감일 (선택)",
      order_form_consent: "이 요청에 답변하기 위한 데이터 처리에 동의합니다",
      order_form_submit: "요청 보내기",
      order_form_sending: "보내는 중…",
      order_form_success: "감사합니다! 요청이 전송되었습니다 — 입력하신 연락처로 연락드리겠습니다.",
      order_form_error: "전송하지 못했습니다. 요청이 저장되었으니 나중에 다시 시도해 주세요.",
      order_form_saved: "요청이 저장되었습니다. 작가가 입력하신 연락처로 연락드립니다.",
      footer_copyright: "© Podvalnia_alebarda. 모든 작품은 저작권으로 보호됩니다. 복제 금지.",
      copy_warning: "이 작품은 저작권으로 보호되어 있습니다. 복제할 수 없습니다.",
    },
    es: {
      nav_order: "Pedir comisión",
      nav_projects: "Proyectos",
      nav_about: "Sobre mí",
      nav_collab: "Colaborar",
      hero_title: "Podvalnia_alebarda",
      hero_subtitle: "Artista digital y animador.",
      gallery_title: "Galería",
      gallery_description: "Explora obras filtradas por estilo y estado de ánimo. Pronto habrá pinturas originales.",
      gallery_empty: "Aún no hay obras — pronto se añadirán nuevas piezas.",
      filter_sketch: "Bocetos",
      filter_art: "Obras completas",
      filter_meme: "Memes",
      filter_animation: "Animaciones",
      filter_all: "Todo",
      filter_mono: "Arte B/N",
      filter_animals: "Animales",
      filter_concept: "Arte conceptual",
      filter_pixel: "Pixel art",
      filter_fantasy: "Fantasía",
      filter_portrait: "Retratos",
      order_title: "Pedir una comisión",
      order_p1: "Describe la idea, el estado de ánimo y el formato: lo convertiré en una pieza digital cálida con motivos florales y hojas.",
      order_p2: "Comparte tus preferencias y propondré la mejor forma de realizarlo.",
      collab_title: "Proponer colaboración",
      collab_p1: "Estoy abierta a proyectos donde pueda aportar un toque de magia con arte digital: marcas, juegos, editoriales o campañas.",
      collab_p2: "Deja una solicitud y te responderé con una idea inicial y plazos estimados.",
      about_title: "Sobre mí",
      about_p1: "Creo arte digital en tonos cálidos combinando patrones orgánicos, iluminación suave y personajes expresivos.",
      about_li1: "Enfoque en atmósfera y ternura",
      about_li2: "Trabajo en ilustración, concept art, animación y pixel art",
      about_li3: "Me encantan las obras que transmiten una sensación cálida y acogedora",
      projects_title: "Proyectos",
      projects_description: "Aquí comparto proyectos en los que participé y trabajos realizados.",
      projects_item1: "Los detalles de los proyectos se añadirán pronto.",
      footer_title: "Sígueme en redes sociales",
      social_instagram: "Instagram",
      social_telegram: "Telegram",
      social_vk: "VK",
      filter_mode_label: "Coincidencia:",
      filter_mode_any: "cualquiera",
      filter_mode_all: "todas",
      filter_clear: "Limpiar filtros",
      filter_count_one: "{n} obra",
      filter_count_few: "{n} obras",
      filter_count_many: "{n} obras",
      order_form_name: "Tu nombre",
      order_form_contact_label: "Cómo contactarte",
      order_form_contact_email: "Email",
      order_form_contact_discord: "Discord",
      order_form_contact_telegram: "Telegram",
      order_form_contact_ph_email: "you@example.com",
      order_form_contact_ph_discord: "p. ej. username o username#1234",
      order_form_contact_ph_telegram: "p. ej. @username",
      order_form_type: "Tipo de trabajo",
      order_form_type_any: "Cualquiera / lo hablamos",
      order_form_desc: "Describe la idea",
      order_form_budget: "Presupuesto (opcional)",
      order_form_deadline: "Fecha límite (opcional)",
      order_form_consent: "Acepto el tratamiento de mis datos para responder a esta solicitud",
      order_form_submit: "Enviar solicitud",
      order_form_sending: "Enviando…",
      order_form_success: "¡Gracias! Tu solicitud fue enviada — te contactaré por el medio que indicaste.",
      order_form_error: "No se pudo enviar. Tu solicitud se guardó, inténtalo más tarde.",
      order_form_saved: "Tu solicitud se guardó. El artista te contactará por el contacto que indicaste.",
      footer_copyright: "© Podvalnia_alebarda. Todas las obras están protegidas por derechos de autor. Prohibida su copia.",
      copy_warning: "Estas obras están protegidas por derechos de autor. No se permite copiarlas.",
    },
    zh: {
      nav_order: "委托创作",
      nav_projects: "项目",
      nav_about: "关于我",
      nav_collab: "合作",
      hero_title: "Podvalnia_alebarda",
      hero_subtitle: "数字艺术家与动画师.",
      gallery_title: "作品集",
      gallery_description: "按风格和氛围浏览作品。原创画作将很快上线.",
      gallery_empty: "暂无作品 — 新作品将很快添加.",
      filter_sketch: "草图",
      filter_art: "完整作品",
      filter_meme: "表情包",
      filter_animation: "动画",
      filter_all: "全部",
      filter_mono: "黑白艺术",
      filter_animals: "动物",
      filter_concept: "概念艺术",
      filter_pixel: "像素艺术",
      filter_fantasy: "奇幻",
      filter_portrait: "肖像",
      order_title: "委托创作",
      order_p1: "描述想法、氛围和格式——我会把它变成带有花卉和叶片元素的温暖数字作品.",
      order_p2: "写下你的偏好，我会提出最佳实现方式.",
      collab_title: "提出合作",
      collab_p1: "我希望参与可以用数字艺术加入微妙魔法的项目，欢迎品牌、游戏、出版或活动的合作.",
      collab_p2: "留下请求，我会回复初步构想和预计时间.",
      about_title: "关于我",
      about_p1: "我以温暖色调创作数字作品，结合有机图案、柔和光线和富有表现力的角色.",
      about_li1: "注重氛围与温度",
      about_li2: "从事插画、概念、动画与像素艺术",
      about_li3: "喜欢作品看起来阳光且舒适",
      projects_title: "项目",
      projects_description: "在此展示我参与过的项目与作品.",
      projects_item1: "项目详情将很快补充.",
      footer_title: "在社交平台关注我",
      social_instagram: "Instagram",
      social_telegram: "Telegram",
      social_vk: "VK",
      filter_mode_label: "匹配：",
      filter_mode_any: "任一",
      filter_mode_all: "全部",
      filter_clear: "清除筛选",
      filter_count_one: "{n} 件作品",
      filter_count_few: "{n} 件作品",
      filter_count_many: "{n} 件作品",
      order_form_name: "你的名字",
      order_form_contact_label: "如何联系你",
      order_form_contact_email: "邮箱",
      order_form_contact_discord: "Discord",
      order_form_contact_telegram: "Telegram",
      order_form_contact_ph_email: "you@example.com",
      order_form_contact_ph_discord: "例如 username 或 username#1234",
      order_form_contact_ph_telegram: "例如 @username",
      order_form_type: "作品类型",
      order_form_type_any: "不限 / 详谈",
      order_form_desc: "描述你的想法",
      order_form_budget: "预算（可选）",
      order_form_deadline: "期望期限（可选）",
      order_form_consent: "我同意为回复此请求而处理我的数据",
      order_form_submit: "发送请求",
      order_form_sending: "发送中…",
      order_form_success: "谢谢！请求已发送——我会通过你填写的联系方式联系你。",
      order_form_error: "发送失败。请求已保存，请稍后再试。",
      order_form_saved: "请求已保存。艺术家将通过你填写的联系方式联系你。",
      footer_copyright: "© Podvalnia_alebarda。所有作品均受版权保护。禁止复制。",
      copy_warning: "这些作品受版权保护，禁止复制。",
    }
  };

  let currentLanguage = localStorage.getItem("siteLanguage") || "ru";
  const customTextStore = JSON.parse(localStorage.getItem("customTexts") || "{}");

  // Translation functions
  function getText(key) {
    const languageTexts = customTextStore[currentLanguage] || {};
    const translationText = translations[currentLanguage]?.[key];
    const russianCustom = customTextStore.ru?.[key];
    
    if (languageTexts[key] !== undefined) return languageTexts[key];
    if (translationText !== undefined) return translationText;
    if (russianCustom !== undefined) return russianCustom;
    if (translations.ru?.[key]) return translations.ru[key];
    return "";
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (element.dataset.manualLabel === "true") return;
      const key = element.dataset.i18n;
      const text = getText(key);
      if (element.tagName.toLowerCase() === "input" || element.tagName.toLowerCase() === "textarea") {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });
    try { buildFilterButtons(); } catch (e) { console.error("Filter rebuild error:", e); }
    try { renderSocialLinks(); } catch (e) { console.error('social render error', e); }
    try { populateOrderTypeSelect(); } catch (e) { console.error('order select error', e); }
    try { updateContactFieldUI(); } catch (e) { console.error('contact field error', e); }
  }

  // Лениво подгружаем CJK/корейские шрифты только при выборе zh/ko (они тяжёлые).
  function ensureScriptFont(language) {
    const map = {
      zh: { id: "notoSansSC", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;800&display=swap" },
      ko: { id: "notoSansKR", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;800&display=swap" },
    };
    const entry = map[language];
    if (!entry || document.getElementById(entry.id)) return;
    const link = document.createElement("link");
    link.id = entry.id;
    link.rel = "stylesheet";
    link.href = entry.href;
    document.head.appendChild(link);
  }

  function setLanguage(language) {
    localStorage.setItem("siteLanguage", language);
    currentLanguage = language;
    // Per-script: помечаем язык документа (активирует :lang() в CSS) и грузим нужный шрифт
    document.documentElement.lang = language;
    ensureScriptFont(language);
    // Переинициализировать customTextStore из localStorage
    const stored = localStorage.getItem("customTexts");
    if (stored) {
      try {
        Object.assign(customTextStore, JSON.parse(stored));
      } catch (e) {
        console.warn("customTextStore reinit error", e);
      }
    }
    applyTranslations();
    hideLanguageModal();
    updateLangSwitcher();
    playTitleEffects();
  }

  // Постоянный переключатель языка (выпадающий список рядом с темой)
  const langLabels = { ru: "RU", en: "EN", zh: "中文", es: "ES", ko: "KO" };
  function updateLangSwitcher() {
    if (langCurrent) langCurrent.textContent = langLabels[currentLanguage] || currentLanguage.toUpperCase();
    if (langMenu) {
      langMenu.querySelectorAll("li[data-lang]").forEach((li) => {
        li.setAttribute("aria-selected", li.dataset.lang === currentLanguage ? "true" : "false");
      });
    }
  }
  function openLangMenu() {
    if (!langMenu) return;
    langMenu.classList.remove("hidden");
    if (langToggle) langToggle.setAttribute("aria-expanded", "true");
  }
  function closeLangMenu() {
    if (!langMenu) return;
    langMenu.classList.add("hidden");
    if (langToggle) langToggle.setAttribute("aria-expanded", "false");
  }
  function toggleLangMenu() {
    if (langMenu && langMenu.classList.contains("hidden")) openLangMenu();
    else closeLangMenu();
  }

  function showLanguageModal() {
    if (!languageModal) return;
    languageModal.classList.remove("hidden");
    // Перезапускаем анимацию появления при каждом показе (в т.ч. при перезагрузке)
    languageModal.classList.remove("is-appearing");
    // reflow, чтобы анимация проиграла заново
    void languageModal.offsetWidth;
    languageModal.classList.add("is-appearing");
  }

  function hideLanguageModal() {
    if (languageModal) languageModal.classList.add("hidden");
  }

  // Gallery functions
  function loadGalleryItems() {
    try {
      const stored = localStorage.getItem("galleryItems");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (error) {
      console.warn("Failed to parse gallery items", error);
    }
    return defaultGalleryItems;
  }

  function renderGallery(items, startIndex = 0) {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";
    if (!items || items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "gallery-empty";
      empty.textContent = getText("gallery_empty") || "No works found yet.";
      galleryContainer.appendChild(empty);
      return;
    }
    const count = Math.min(8, items.length);
    for (let i = 0; i < count; i++) {
      const item = items[(startIndex + i) % items.length];
      const card = document.createElement("article");
      card.className = "art-card";
      card.dataset.tags = item.tags || "";
      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.alt || "gallery item";
        img.draggable = false; // запрет перетаскивания
        card.appendChild(img);

        // Водяной знак (если включён в админке)
        const wm = loadWatermarkSettings();
        if (wm.enabled) {
          const watermark = document.createElement("div");
          watermark.className = "art-watermark";
          const wmText = document.createElement("span");
          wmText.textContent = wm.text || getText("hero_title") || "Podvalnia_alebarda";
          watermark.appendChild(wmText);
          card.appendChild(watermark);
        }

        // Прозрачный оверлей — перехватывает правый клик/перетаскивание изображения
        const guard = document.createElement("div");
        guard.className = "art-guard";
        card.appendChild(guard);
      } else {
        card.classList.add("art-card--placeholder");
      }
      galleryContainer.appendChild(card);
    }
  }

  function getSelectedFilters() {
    return Array.from(filterButtons)
      .filter((button) => button.dataset.filter !== "all" && button.classList.contains("active"))
      .map((button) => button.dataset.filter);
  }

  function syncFilterButtonAria() {
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
    });
  }

  function updateFilterButtons(clicked) {
    const filter = clicked.dataset.filter;
    if (filter === "all") {
      filterButtons.forEach((button) => button.classList.toggle("active", button.dataset.filter === "all"));
    } else {
      const allButton = filterButtons.find((button) => button.dataset.filter === "all");
      clicked.classList.toggle("active");
      if (allButton) {
        allButton.classList.remove("active");
      }
      if (getSelectedFilters().length === 0 && allButton) {
        allButton.classList.add("active");
      }
    }
    syncFilterButtonAria();
    updateFilterToolbar();
    resetGalleryRotation();
  }

  function clearAllFilters() {
    const allButton = filterButtons.find((button) => button.dataset.filter === "all");
    filterButtons.forEach((button) => button.classList.remove("active"));
    if (allButton) allButton.classList.add("active");
    syncFilterButtonAria();
    updateFilterToolbar();
    resetGalleryRotation();
  }

  function getFilteredGalleryItems() {
    const selected = getSelectedFilters();
    if (selected.length === 0) return galleryItems.slice();
    return galleryItems.filter((item) => {
      const tags = (item.tags || "").split(" ").filter(Boolean);
      // any = совпал хотя бы один тег (OR); all = совпали все выбранные (AND)
      return filterMatchMode === "all"
        ? selected.every((filter) => tags.includes(filter))
        : selected.some((filter) => tags.includes(filter));
    });
  }

  // Сколько работ соответствует конкретному тегу (для бейджа-счётчика)
  function countItemsForTag(tagKey) {
    if (tagKey === "all") return galleryItems.length;
    return galleryItems.filter((item) =>
      (item.tags || "").split(" ").filter(Boolean).includes(tagKey)
    ).length;
  }

  // Склонение/формат счётчика работ под язык
  function formatWorksCount(n) {
    if (currentLanguage === "ru") {
      const mod10 = n % 10;
      const mod100 = n % 100;
      let key = "filter_count_many";
      if (mod10 === 1 && mod100 !== 11) key = "filter_count_one";
      else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) key = "filter_count_few";
      return (getText(key) || "{n}").replace("{n}", n);
    }
    const key = n === 1 ? "filter_count_one" : "filter_count_many";
    return (getText(key) || "{n}").replace("{n}", n);
  }

  function updateFilterToolbar() {
    const selected = getSelectedFilters();
    if (filterClearBtn) filterClearBtn.classList.toggle("hidden", selected.length === 0);
    if (filterCountEl) {
      const shown = getFilteredGalleryItems().length;
      filterCountEl.textContent = formatWorksCount(shown);
    }
  }

  function rotateGallery() {
    const items = getFilteredGalleryItems();
    if (items.length === 0) {
      renderGallery(items);
      return;
    }
    renderGallery(items, galleryStartIndex);
    galleryStartIndex = (galleryStartIndex + 1) % items.length;
  }

  function resetGalleryRotation() {
    galleryStartIndex = 0;
    clearInterval(galleryRotationTimer);
    rotateGallery();
    galleryRotationTimer = setInterval(rotateGallery, 3500);
  }

  function loadFilterSettings() {
    try {
      const stored = localStorage.getItem("galleryFilters");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (error) {
      console.warn("Filter load error", error);
    }
    return defaultFilterSettings;
  }

  function buildFilterButtons() {
    if (!filterRow || !filterRowSecondary) return;
    const filters = loadFilterSettings();
    // Запоминаем активные фильтры, чтобы не сбрасывать выбор при перерисовке (смена языка и т.п.)
    const previouslyActive = new Set(getSelectedFilters());
    filterRow.innerHTML = "";
    filterRowSecondary.innerHTML = "";
    filters.forEach((filter) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-button";
      btn.dataset.filter = filter.key;
      const translatedLabel = getText(`filter_${filter.key}`) || filter.label;
      const count = countItemsForTag(filter.key);

      const labelSpan = document.createElement("span");
      labelSpan.className = "filter-label";
      labelSpan.textContent = translatedLabel;
      btn.appendChild(labelSpan);

      const badge = document.createElement("span");
      badge.className = "filter-badge";
      badge.textContent = count;
      btn.appendChild(badge);

      // Фильтр без работ — недоступен (кроме "Все")
      if (filter.key !== "all" && count === 0) {
        btn.disabled = true;
      }
      if (filter.key === "all" || previouslyActive.has(filter.key)) {
        btn.classList.add("active");
      }
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        updateFilterButtons(btn);
      });
      if (filter.primary !== false) {
        filterRow.appendChild(btn);
      } else {
        filterRowSecondary.appendChild(btn);
      }
    });
    filterButtons = Array.from(document.querySelectorAll(".filter-button"));
    // Если активных тегов нет — активируем "Все"
    if (getSelectedFilters().length === 0) {
      const allButton = filterButtons.find((b) => b.dataset.filter === "all");
      if (allButton) allButton.classList.add("active");
    }
    syncFilterButtonAria();
    updateFilterToolbar();
  }

  function parseFilterLines(value) {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("=").map((part) => part.trim());
        const key = parts[0] || "";
        const label = parts[1] || parts[0] || "";
        const isPrimary = !label.endsWith("!");
        const cleanLabel = isPrimary ? label : label.slice(0, -1).trim();
        return { key, label: cleanLabel, primary: isPrimary };
      })
      .filter((item) => item.key && item.label);
  }

  // Admin functions
  function applyAdminImages() {
    const headerValue = localStorage.getItem("adminHeaderImage") || heroBgImage.getAttribute("src");
    const leftValue = localStorage.getItem("adminLeftSidebar") || leftSidebarImage.getAttribute("src");
    const rightValue = localStorage.getItem("adminRightSidebar") || rightSidebarImage.getAttribute("src");
    if (headerValue) heroBgImage.src = headerValue;
    if (leftValue) leftSidebarImage.src = leftValue;
    if (rightValue) rightSidebarImage.src = rightValue;
  }

  function handleImageUpload(file, targetId, previewId, storageKey) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result?.toString() || '';
      localStorage.setItem(storageKey, dataUrl);
      // Update the displayed image
      if (targetId === 'header') {
        heroBgImage.src = dataUrl;
      } else if (targetId === 'left') {
        leftSidebarImage.src = dataUrl;
      } else if (targetId === 'right') {
        rightSidebarImage.src = dataUrl;
      }
      // Update preview in admin panel
      if (previewId) {
        const preview = document.getElementById(previewId);
        if (preview) {
          preview.innerHTML = `<img src="${dataUrl}" alt="preview" style="max-width: 100%; max-height: 150px;">`;
        }
      }
    };
    reader.readAsDataURL(file);
  }

  function openAdminPanel() {
    if (!adminPanel) return;
    if (!localStorage.getItem("adminPassword")) {
      localStorage.setItem("adminPassword", "МММ");
    }
    if (adminPasswordInput) {
      adminPasswordInput.value = "";
      passwordError?.classList.add("hidden");
    }
    passwordModal?.classList.remove("hidden");
  }

  function closeAdminPanel() {
    if (adminPanel) adminPanel.classList.add("hidden");
    if (adminPasswordInput) {
      adminPasswordInput.value = "";
    }
    if (passwordError) {
      passwordError.classList.add("hidden");
    }
  }

  function populateAdminForm() {
    renderAdminFilterEditor();
    renderAdminGalleryFilterSelectors();
    renderAdminGalleryList();
    renderAdminTextList();
    populateEmailjsFields();
    populateWatermarkFields();
    renderAdminOrders();
  }

  function saveAdminSettings() {
    const filters = collectAdminFilterSettings();
    const oldFilters = loadFilterSettings();
    const oldFilterKeys = new Set(oldFilters.map((f) => f.key));
    const newFilterKeys = new Set(filters.map((f) => f.key));
    const removedKeys = Array.from(oldFilterKeys).filter((k) => !newFilterKeys.has(k));

    if (removedKeys.length > 0) {
      galleryItems.forEach((item) => {
        const tags = (item.tags || "").split(" ").filter(Boolean);
        item.tags = tags.filter((tag) => !removedKeys.includes(tag)).join(" ");
      });
    }

    localStorage.setItem("galleryFilters", JSON.stringify(filters));

    const galleryData = collectAdminGalleryData();
    if (Array.isArray(galleryData)) {
      galleryItems = galleryData;
    }
    localStorage.setItem("galleryItems", JSON.stringify(galleryItems));

    const updatedText = collectAdminTextOverrides();
    const existingCustom = JSON.parse(localStorage.getItem("customTexts") || "{}");
    
    const allLanguages = ['ru', 'en', 'ko', 'es', 'zh'];
    allLanguages.forEach((lang) => {
      if (!existingCustom[lang]) existingCustom[lang] = {};
      Object.assign(existingCustom[lang], updatedText);
    });
    
    filters.forEach((filter) => {
      const filterKey = `filter_${filter.key}`;
      allLanguages.forEach((lang) => {
        if (!existingCustom[lang]) existingCustom[lang] = {};
        existingCustom[lang][filterKey] = filter.label;
      });
    });

    const newPassword = adminNewPassword?.value.trim();
    const confirmPassword = adminConfirmPassword?.value.trim();
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert('Пароли не совпадают. Изменение пароля не сохранено.');
      } else if (newPassword) {
        localStorage.setItem('adminPassword', newPassword);
      }
    }

    localStorage.setItem("customTexts", JSON.stringify(existingCustom));
    Object.assign(customTextStore, existingCustom);

    try {
      const social = collectAdminSocialLinks();
      localStorage.setItem('socialLinks', JSON.stringify(social));
    } catch (e) { console.warn('save social links failed', e); }

    try { saveEmailjsConfig(); } catch (e) { console.warn('save emailjs config failed', e); }
    try { saveWatermarkSettings(); } catch (e) { console.warn('save watermark failed', e); }

    if (adminNewPassword) adminNewPassword.value = '';
    if (adminConfirmPassword) adminConfirmPassword.value = '';

    resetGalleryRotation();
    applyTranslations();
    renderSocialLinks();
    closeAdminPanel();
  }

  function collectAdminTextOverrides() {
    if (!adminTextList) return {};
    const result = {};
    Array.from(adminTextList.querySelectorAll("[data-text-key], [data-text-keys]")).forEach((field) => {
      const keys = field.dataset.textKeys
        ? field.dataset.textKeys.split("|").map((k) => k.trim()).filter(Boolean)
        : field.dataset.textKey
        ? [field.dataset.textKey]
        : [];
      const rawValue = field.value.trim();
      if (!keys.length) return;
      if (!rawValue) {
        keys.forEach((key) => {
          result[key] = "";
        });
        return;
      }

      if (keys.length === 1) {
        result[keys[0]] = rawValue;
        return;
      }

      const paragraphs = rawValue
        .split(/\n{2,}/)
        .map((part) => part.trim())
        .filter(Boolean);

      if (paragraphs.length >= keys.length) {
        keys.slice(0, -1).forEach((key, index) => {
          result[key] = paragraphs[index] || "";
        });
        result[keys[keys.length - 1]] = paragraphs.slice(keys.length - 1).join("\n\n") || "";
      } else {
        const lines = rawValue
          .split(/\n/)
          .map((part) => part.trim())
          .filter(Boolean);
        if (lines.length >= keys.length) {
          keys.forEach((key, index) => {
            result[key] = lines[index] || "";
          });
        } else {
          result[keys[0]] = rawValue;
        }
      }
    });
    return result;
  }

  function renderAdminTextList() {
    if (!adminTextList) return;
    adminTextList.innerHTML = "";
    const currentCustom = customTextStore[currentLanguage] || {};

    adminTextSections.forEach(({ section, titleKey, bodyKeys }) => {
      const sectionWrap = document.createElement("div");
      sectionWrap.className = "admin-text-section";

      const sectionTitle = document.createElement("div");
      sectionTitle.className = "admin-text-section__title";
      sectionTitle.textContent = section;
      sectionWrap.appendChild(sectionTitle);

      if (titleKey) {
        const titleRow = document.createElement("div");
        titleRow.className = "admin-text-row";
        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Заголовок";
        titleLabel.htmlFor = `adminTextField_${titleKey}`;
        const titleField = document.createElement("input");
        titleField.id = `adminTextField_${titleKey}`;
        titleField.type = "text";
        titleField.dataset.textKey = titleKey;
        titleField.value =
          currentCustom[titleKey] ||
          translations[currentLanguage][titleKey] ||
          translations.ru[titleKey] ||
          "";
        titleField.className = "admin-text-field";
        titleRow.appendChild(titleLabel);
        titleRow.appendChild(titleField);
        sectionWrap.appendChild(titleRow);
      }

      if (bodyKeys && bodyKeys.length) {
        const bodyRow = document.createElement("div");
        bodyRow.className = "admin-text-row";
        const bodyLabel = document.createElement("label");
        bodyLabel.textContent = "Основной текст";
        bodyLabel.htmlFor = `adminTextField_${bodyKeys[0]}`;
        const bodyField = document.createElement("textarea");
        bodyField.id = `adminTextField_${bodyKeys[0]}`;
        bodyField.dataset.textKeys = bodyKeys.join("|");
        bodyField.rows = 6;
        bodyField.className = "admin-text-field";
        bodyField.value = bodyKeys
          .map(
            (key) =>
              currentCustom[key] || translations[currentLanguage][key] || translations.ru[key] || ""
          )
          .filter(Boolean)
          .join("\n\n");
        bodyRow.appendChild(bodyLabel);
        bodyRow.appendChild(bodyField);
        sectionWrap.appendChild(bodyRow);
      }

      adminTextList.appendChild(sectionWrap);
    });

    renderAdminSocialList();
  }

  // Social links management
  function loadSocialLinks() {
    try {
      const stored = localStorage.getItem('socialLinks');
      if (stored) return JSON.parse(stored);
    } catch (e) { console.warn('socialLinks parse error', e); }
    return {
      social_instagram: { label: 'Instagram', url: '#'},
      social_telegram: { label: 'Telegram', url: '#'},
      social_vk: { label: 'VK', url: '#'}
    };
  }

  function normalizeUrl(url) {
    if (!url) return '#';
    const trimmed = url.trim();
    if (!trimmed || trimmed === '#') return '#';
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) return trimmed;
    if (trimmed.startsWith('//')) return 'https:' + trimmed;
    if (/^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) return 'mailto:' + trimmed;
    return 'https://' + trimmed;
  }

  function renderSocialLinks() {
    const container = document.querySelector('.social-links');
    if (!container) return;
    const links = loadSocialLinks();
    container.innerHTML = '';
    Object.keys(links).forEach((key) => {
      const anchor = document.createElement('a');
      anchor.className = 'social-button';
      const href = normalizeUrl(links[key].url || '#');
      anchor.href = href;
      if (href.startsWith('http')) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      const translationExists = Boolean(translations[currentLanguage] && translations[currentLanguage][key]);
      const label = links[key].label || getText(key) || key.replace('social_', '');
      anchor.textContent = label;
      if (translationExists) {
        anchor.dataset.i18n = key;
      } else {
        anchor.removeAttribute('data-i18n');
        anchor.dataset.manualLabel = 'true';
      }
      container.appendChild(anchor);
    });
  }

  function renderAdminSocialList() {
    if (!adminSocialLinks) return;
    adminSocialLinks.innerHTML = '';
    const links = loadSocialLinks();
    Object.keys(links).forEach((key) => {
      const row = document.createElement('div');
      row.className = 'admin-social-row';
      row.style.display = 'flex';
      row.style.gap = '8px';
      row.style.marginBottom = '8px';
      row.style.alignItems = 'center';
      
      const keyInput = document.createElement('input');
      keyInput.type = 'text';
      keyInput.value = key;
      keyInput.disabled = true;
      keyInput.style.width = '30%';
      
      const labelInput = document.createElement('input');
      labelInput.type = 'text';
      labelInput.placeholder = 'Название кнопки';
      labelInput.value = links[key].label || getText(key) || '';
      labelInput.dataset.socialKey = key;
      labelInput.style.width = '50%';
      labelInput.addEventListener('change', () => {
        links[key].label = labelInput.value.trim() || getText(key) || key.replace('social_', '');
        localStorage.setItem('socialLinks', JSON.stringify(links));
        renderSocialLinks();
      });
      
      const rm = document.createElement('button');
      rm.type = 'button';
      rm.textContent = 'Удалить';
      rm.className = 'admin-button admin-button--secondary';
      rm.style.width = '70px';
      rm.addEventListener('click', () => {
        delete links[key];
        localStorage.setItem('socialLinks', JSON.stringify(links));
        renderAdminSocialList();
        renderSocialLinks();
      });
      
      row.appendChild(keyInput);
      row.appendChild(labelInput);
      row.appendChild(rm);
      adminSocialLinks.appendChild(row);
    });
  }

  function collectAdminSocialLinks() {
    const rows = document.querySelectorAll('#adminSocialLinks .admin-social-row');
    const out = {};
    rows.forEach((row) => {
      const inputs = row.querySelectorAll('input');
      if (inputs.length >= 3) {
        const key = inputs[0].value.trim();
        const label = inputs[1].value.trim();
        const url = inputs[2].value.trim() || '#';
        if (key) {
          out[key] = { label: label || key.replace('social_', ''), url };
        }
      }
    });
    return out;
  }

  function slugifyFilterLabel(label) {
    return String(label)
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\d]+/gu, "-")
      .replace(/^-+|-+$/g, "");
  }

  function createUniqueFilterKey(label, existingKeys) {
    const base = slugifyFilterLabel(label) || "filter";
    let key = base;
    let suffix = 1;
    while (existingKeys.has(key)) {
      key = `${base}-${suffix}`;
      suffix += 1;
    }
    existingKeys.add(key);
    return key;
  }

  function collectAdminFilterSettings() {
    if (!adminFilterEditor) return [];
    const filters = [];
    const keys = new Set();
    adminFilterEditor.querySelectorAll(".admin-filter-chip").forEach((chip) => {
      const labelInput = chip.querySelector(".admin-filter-input");
      let label = labelInput ? labelInput.value.trim() : "";
      if (!label) {
        label = chip.dataset.filterLabel || chip.querySelector('.admin-filter-label')?.textContent?.trim() || "";
      }
      if (!label) return;
      let key = chip.dataset.filterKey || "";
      const primary = chip.dataset.filterPrimary === "true";
      if (!key || keys.has(key)) {
        key = createUniqueFilterKey(label, keys);
      } else {
        keys.add(key);
      }
      filters.push({ key, label, primary });
    });
    return filters;
  }

  function renderAdminFilterEditor() {
    if (!adminFilterEditor) return;
    const filters = loadFilterSettings();
    adminFilterEditor.innerHTML = "";

    const primaryGroup = document.createElement("div");
    primaryGroup.className = "admin-filter-group";
    const primaryTitle = document.createElement("div");
    primaryTitle.className = "admin-filter-group__title";
    primaryTitle.textContent = "Основные фильтры";
    const primaryList = document.createElement("div");
    primaryList.className = "admin-filter-chip-list";
    primaryGroup.appendChild(primaryTitle);
    primaryGroup.appendChild(primaryList);

    const secondaryGroup = document.createElement("div");
    secondaryGroup.className = "admin-filter-group";
    const secondaryTitle = document.createElement("div");
    secondaryTitle.className = "admin-filter-group__title";
    secondaryTitle.textContent = "Дополнительные фильтры";
    const secondaryList = document.createElement("div");
    secondaryList.className = "admin-filter-chip-list";
    secondaryGroup.appendChild(secondaryTitle);
    secondaryGroup.appendChild(secondaryList);

    filters.forEach((filter) => {
      const chip = document.createElement("div");
      chip.className = "admin-filter-chip";
      chip.dataset.filterKey = filter.key;
      chip.dataset.filterPrimary = filter.primary ? "true" : "false";

      const labelText = document.createElement("div");
      labelText.className = "admin-filter-label";
      labelText.textContent = filter.label || "Фильтр";

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "admin-button admin-button--secondary admin-filter-delete";
      deleteBtn.textContent = "Удалить";
      deleteBtn.addEventListener("click", () => {
        chip.remove();
      });

      chip.appendChild(labelText);
      chip.appendChild(deleteBtn);
      chip.dataset.filterLabel = filter.label || "";

      if (filter.primary) {
        primaryList.appendChild(chip);
      } else {
        secondaryList.appendChild(chip);
      }
    });

    adminFilterEditor.appendChild(primaryGroup);
    adminFilterEditor.appendChild(secondaryGroup);
    renderAdminGalleryFilterSelectors();
  }

  function addAdminFilter(primary) {
    const currentFilters = loadFilterSettings();
    const keys = new Set(currentFilters.map((f) => f.key));
    const rawLabel = prompt("Введите название фильтра:", primary ? "Основной фильтр" : "Дополнительный фильтр");
    const label = rawLabel ? rawLabel.trim() : "";
    if (!label) return;
    const newKey = createUniqueFilterKey(label, keys);
    currentFilters.push({ key: newKey, label, primary });
    localStorage.setItem("galleryFilters", JSON.stringify(currentFilters));
    renderAdminFilterEditor();
  }

  function getAdminSelectedGalleryFilters() {
    if (!adminGalleryFilterSelectors) return [];
    return Array.from(adminGalleryFilterSelectors.querySelectorAll('input[type="checkbox"]'))
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.dataset.filterKey)
      .filter(Boolean);
  }

  function renderAdminGalleryFilterSelectors() {
    if (!adminGalleryFilterSelectors) return;
    const filters = loadFilterSettings().filter((filter) => filter.key !== 'all');
    adminGalleryFilterSelectors.innerHTML = '';
    if (!filters.length) {
      adminGalleryFilterSelectors.textContent = 'Добавьте фильтры, чтобы назначать их работам.';
      return;
    }
    const selectorWrap = document.createElement('div');
    selectorWrap.className = 'admin-gallery-filter-selector';
    filters.forEach((filter) => {
      const label = document.createElement('label');
      label.className = 'admin-gallery-filter-option';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.filterKey = filter.key;
      checkbox.checked = false;
      const span = document.createElement('span');
      span.textContent = filter.label || getText(`filter_${filter.key}`) || filter.key;
      label.appendChild(checkbox);
      label.appendChild(span);
      selectorWrap.appendChild(label);
    });
    adminGalleryFilterSelectors.appendChild(selectorWrap);
  }

  function updateGalleryItemTags(index, tags) {
    galleryItems[index].tags = tags.join(' ').trim();
    renderAdminGalleryList();
  }

  function renderAdminGalleryList() {
    if (!adminGalleryList) return;
    adminGalleryList.innerHTML = "";

    galleryItems.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "admin-gallery-row";

      const preview = document.createElement("div");
      preview.className = "admin-gallery-preview";
      const previewImage = document.createElement("img");
      previewImage.src = item.image || "";
      previewImage.alt = item.alt || "preview";
      preview.appendChild(previewImage);

      const fields = document.createElement("div");
      fields.className = "admin-gallery-fields";

      const altInput = document.createElement("input");
      altInput.type = "text";
      altInput.value = item.alt || "";
      altInput.placeholder = "Alt / описание";
      altInput.addEventListener("input", () => {
        galleryItems[index].alt = altInput.value.trim();
      });

      const imageInput = document.createElement("input");
      imageInput.type = "text";
      imageInput.value = item.image || "";
      imageInput.placeholder = "URL изображения или Data URL";
      imageInput.addEventListener("input", () => {
        galleryItems[index].image = imageInput.value.trim();
      });

      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'admin-gallery-tags';
      const assignedTags = (item.tags || '').split(' ').filter(Boolean);
      const availableFilters = loadFilterSettings().filter((filter) => filter.key !== 'all');

      assignedTags.forEach((tag) => {
        const filterInfo = availableFilters.find((filter) => filter.key === tag);
        const tagRow = document.createElement('div');
        tagRow.className = 'admin-gallery-tag';
        tagRow.dataset.filterKey = tag;
        tagRow.textContent = filterInfo ? filterInfo.label : tag;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'admin-button admin-button--secondary admin-gallery-tag-remove';
        remove.textContent = '×';
        remove.addEventListener('click', () => {
          const newTags = assignedTags.filter((existing) => existing !== tag);
          updateGalleryItemTags(index, newTags);
        });
        tagRow.appendChild(remove);
        tagsContainer.appendChild(tagRow);
      });

      const tagSelect = document.createElement('select');
      tagSelect.className = 'admin-gallery-tag-select';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Добавить фильтр';
      tagSelect.appendChild(defaultOption);
      availableFilters
        .filter((filter) => !assignedTags.includes(filter.key))
        .forEach((filter) => {
          const option = document.createElement('option');
          option.value = filter.key;
          option.textContent = filter.label || getText(`filter_${filter.key}`) || filter.key;
          tagSelect.appendChild(option);
        });
      const addTagButton = document.createElement('button');
      addTagButton.type = 'button';
      addTagButton.className = 'admin-button admin-gallery-tag-add';
      addTagButton.textContent = '+';
      addTagButton.addEventListener('click', () => {
        const selected = tagSelect.value;
        if (!selected) return;
        const nextTags = [...assignedTags, selected];
        updateGalleryItemTags(index, nextTags);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "admin-button admin-button--secondary admin-gallery-delete";
      deleteBtn.textContent = "Удалить";
      deleteBtn.addEventListener("click", () => {
        galleryItems.splice(index, 1);
        renderAdminGalleryList();
      });

      fields.appendChild(imageInput);
      fields.appendChild(altInput);
      fields.appendChild(tagsContainer);
      fields.appendChild(tagSelect);
      fields.appendChild(addTagButton);
      fields.appendChild(deleteBtn);

      row.appendChild(preview);
      row.appendChild(fields);
      adminGalleryList.appendChild(row);
    });

    if (galleryItems.length === 0) {
      const empty = document.createElement("div");
      empty.className = "admin-gallery-empty";
      empty.textContent = "Нет записей. Добавьте элементы галереи ниже.";
      adminGalleryList.appendChild(empty);
    }
  }

  function collectAdminGalleryData() {
    if (!adminGalleryList) return galleryItems;
    const rows = Array.from(adminGalleryList.querySelectorAll(".admin-gallery-row"));
    return rows.map((row) => {
      const inputs = row.querySelectorAll("input");
      const tagKeys = Array.from(row.querySelectorAll('.admin-gallery-tag'))
        .map((tagEl) => tagEl.dataset.filterKey)
        .filter(Boolean);
      return {
        image: inputs[0]?.value.trim() || "",
        alt: inputs[1]?.value.trim() || "",
        tags: tagKeys.join(' '),
      };
    });
  }

  function addAdminGalleryItem() {
    const selectedFilters = getAdminSelectedGalleryFilters();
    if (!selectedFilters.length) {
      alert('Выберите хотя бы один фильтр для новой работы.');
      return;
    }
    if (adminGalleryFileInput) {
      adminGalleryFileInput.click();
    }
  }

  function handleAdminGalleryFileSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const selectedFilters = getAdminSelectedGalleryFilters();
    const reader = new FileReader();
    reader.onload = () => {
      galleryItems.push({
        image: reader.result?.toString() || '',
        alt: file.name,
        tags: selectedFilters.join(' '),
      });
      renderAdminGalleryList();
      if (adminGalleryFileInput) adminGalleryFileInput.value = '';
    };
    reader.readAsDataURL(file);
  }

  function playTitleEffects() {
    if (!heroTitle || !heroWrap) return;
    heroTitle.classList.add("title-animate");
    const sparks = 12;
    for (let i = 0; i < sparks; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      const tx = Math.floor(Math.random() * 260 - 130) + "px";
      const ty = Math.floor(-Math.random() * 160 - 20) + "px";
      const delay = Math.floor(Math.random() * 220) + "ms";
      s.style.setProperty("--tx", tx);
      s.style.setProperty("--ty", ty);
      s.style.setProperty("--delay", delay);
      heroWrap.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
    if (bird) {
      bird.classList.add("fly");
    }
  }

  /* =====================================================================
   * ЗАЩИТА КОНТЕНТА (затруднение копирования — не абсолютная защита).
   * Любое изображение, видимое в браузере, физически уже на устройстве
   * пользователя; полностью запретить скачивание на статическом сайте
   * нельзя. Эти меры отсекают случайное/ленивое копирование.
   * ===================================================================== */
  function loadWatermarkSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem("watermark") || "{}");
      return { enabled: Boolean(stored.enabled), text: (stored.text || "").trim() };
    } catch (e) {
      return { enabled: false, text: "" };
    }
  }

  const copyToast = document.getElementById("copyToast");
  let copyToastTimer = null;
  function showCopyToast() {
    if (!copyToast) return;
    copyToast.textContent = getText("copy_warning") || "Работы защищены авторским правом.";
    copyToast.classList.add("is-visible");
    clearTimeout(copyToastTimer);
    copyToastTimer = setTimeout(() => copyToast.classList.remove("is-visible"), 2600);
  }

  // Разрешаем нормальную работу в полях ввода и в админке (иначе нельзя печатать/копировать в формах)
  function isEditableTarget(target) {
    if (!target) return false;
    const tag = (target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (target.isContentEditable) return true;
    if (target.closest && target.closest(".admin-modal, .order-form, .password-modal")) return true;
    return false;
  }

  function initContentProtection() {
    // Контекстное меню — блокируем только на изображениях/карточках галереи и фонах
    document.addEventListener("contextmenu", (ev) => {
      if (isEditableTarget(ev.target)) return;
      const onProtected = ev.target.closest && ev.target.closest(".art-card, .side-panel, .hero-section");
      if (onProtected) {
        ev.preventDefault();
        showCopyToast();
      }
    });

    // Запрет перетаскивания изображений
    document.addEventListener("dragstart", (ev) => {
      if (ev.target && ev.target.tagName === "IMG") {
        ev.preventDefault();
      }
    });

    // Копирование вне полей ввода — показываем предупреждение
    document.addEventListener("copy", (ev) => {
      if (isEditableTarget(ev.target)) return;
      showCopyToast();
    });

    // Горячие клавиши: Ctrl/Cmd+S (сохранить), Ctrl+U (исходник), Ctrl+C вне полей, F12
    document.addEventListener("keydown", (ev) => {
      const key = (ev.key || "").toLowerCase();
      const ctrl = ev.ctrlKey || ev.metaKey;
      if (key === "f12") {
        ev.preventDefault();
        showCopyToast();
        return;
      }
      if (ctrl && (key === "s" || key === "u")) {
        ev.preventDefault();
        showCopyToast();
        return;
      }
      if (ctrl && key === "c" && !isEditableTarget(ev.target)) {
        ev.preventDefault();
        showCopyToast();
      }
    });
  }

  /* =====================================================================
   * ТЕМА (светлая / тёмная)
   * ===================================================================== */
  function getStoredTheme() {
    // По умолчанию — светлая тёплая палитра (как в прошлой версии). Тёмная только если
    // её явно выбрали кнопкой. Системную тёмную не навязываем.
    return localStorage.getItem("siteTheme") === "dark" ? "dark" : "light";
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#1a120b" : "#f5c56a");
    if (themeToggle) themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("siteTheme", next);
    applyTheme(next);
  }

  /* =====================================================================
   * ФОРМА ЗАКАЗА — отправка через EmailJS, с резервом в localStorage
   * EmailJS publicKey ПУБЛИЧНЫЙ по дизайну — это нормально. Защита от спама
   * (reCAPTCHA, лимиты, allowed origins) настраивается в дашборде EmailJS.
   * ===================================================================== */
  const orderForm = document.getElementById("orderForm");
  const orderTypeSelect = document.getElementById("orderType");
  const orderStatus = document.getElementById("orderStatus");
  const orderSubmit = document.getElementById("orderSubmit");
  const orderContactMethod = document.getElementById("orderContactMethod");
  const orderContactInput = document.getElementById("orderContact");
  const orderReplyTo = document.getElementById("orderReplyTo");

  // Подсказки/тип поля контакта зависят от выбранного способа связи.
  // Для Email включаем встроенную валидацию e-mail; для Discord/Telegram — обычный ник.
  function updateContactFieldUI() {
    if (!orderContactMethod || !orderContactInput) return;
    const method = orderContactMethod.value;
    if (method === "email") {
      orderContactInput.type = "email";
      orderContactInput.placeholder = getText("order_form_contact_ph_email") || "you@example.com";
      orderContactInput.autocomplete = "email";
    } else if (method === "discord") {
      orderContactInput.type = "text";
      orderContactInput.placeholder = getText("order_form_contact_ph_discord") || "напр. username или username#1234";
      orderContactInput.autocomplete = "off";
    } else if (method === "telegram") {
      orderContactInput.type = "text";
      orderContactInput.placeholder = getText("order_form_contact_ph_telegram") || "напр. @username";
      orderContactInput.autocomplete = "off";
    }
  }

  // reply_to (Reply-To письма) имеет смысл только для e-mail; иначе оставляем пустым.
  function syncContactField() {
    if (!orderReplyTo) return;
    const method = orderContactMethod ? orderContactMethod.value : "email";
    orderReplyTo.value = (method === "email" && orderContactInput) ? orderContactInput.value.trim() : "";
  }

  function loadEmailjsConfig() {
    try {
      const stored = JSON.parse(localStorage.getItem("emailjsConfig") || "{}");
      return {
        publicKey: (stored.publicKey || "").trim(),
        serviceId: (stored.serviceId || "").trim(),
        templateId: (stored.templateId || "").trim(),
      };
    } catch (e) {
      return { publicKey: "", serviceId: "", templateId: "" };
    }
  }
  function isEmailjsConfigured() {
    const c = loadEmailjsConfig();
    return Boolean(window.emailjs && c.publicKey && c.serviceId && c.templateId);
  }

  function populateOrderTypeSelect() {
    if (!orderTypeSelect) return;
    const prev = orderTypeSelect.value;
    orderTypeSelect.innerHTML = "";
    const anyOpt = document.createElement("option");
    anyOpt.value = "";
    anyOpt.textContent = getText("order_form_type_any") || "Любой / уточним";
    orderTypeSelect.appendChild(anyOpt);
    loadFilterSettings()
      .filter((f) => f.key !== "all")
      .forEach((f) => {
        const opt = document.createElement("option");
        opt.value = f.key;
        opt.textContent = getText(`filter_${f.key}`) || f.label;
        orderTypeSelect.appendChild(opt);
      });
    if (prev) orderTypeSelect.value = prev;
  }

  function setOrderStatus(messageKey, kind) {
    if (!orderStatus) return;
    orderStatus.textContent = messageKey ? (getText(messageKey) || messageKey) : "";
    orderStatus.className = "order-status" + (kind ? " is-" + kind : "");
  }

  function saveOrderLocally(data) {
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.unshift(data);
      localStorage.setItem("orders", JSON.stringify(orders.slice(0, 100)));
      return true;
    } catch (e) {
      console.warn("save order failed", e);
      return false; // например QuotaExceededError
    }
  }

  function handleOrderSubmit(event) {
    event.preventDefault();
    if (!orderForm) return;
    // honeypot: если бот заполнил скрытое поле — тихо игнорируем
    const hp = orderForm.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) return;
    // Перед проверкой формы синхронизируем скрытый reply_to (нужен EmailJS только для Email)
    syncContactField();
    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    const method = orderContactMethod ? orderContactMethod.value : "email";
    const methodLabel = orderContactMethod
      ? (orderContactMethod.options[orderContactMethod.selectedIndex]?.textContent || method)
      : "Email";
    const contactValue = orderContactInput ? orderContactInput.value.trim() : "";

    const data = {
      from_name: orderForm.querySelector('[name="from_name"]').value.trim(),
      contact_method: methodLabel,
      contact: contactValue,
      // reply_to нужен письму как Reply-To: ставим email только если способ — Email
      reply_to: method === "email" ? contactValue : "",
      // Читаемый ярлык типа работы для письма (например «Скетчи»), а не машинный ключ
      work_type: orderTypeSelect && orderTypeSelect.value
        ? (orderTypeSelect.options[orderTypeSelect.selectedIndex]?.textContent || "")
        : (getText("order_form_type_any") || ""),
      budget: orderForm.querySelector('[name="budget"]').value.trim() || "—",
      deadline: orderForm.querySelector('[name="deadline"]').value || "—",
      message: orderForm.querySelector('[name="message"]').value.trim(),
      at: new Date().toISOString(),
    };

    if (orderSubmit) {
      orderSubmit.disabled = true;
      orderForm.setAttribute("aria-busy", "true");
    }
    setOrderStatus("order_form_sending", "info");

    const finish = (key, kind, reset) => {
      setOrderStatus(key, kind);
      if (orderSubmit) {
        orderSubmit.disabled = false;
        orderForm.removeAttribute("aria-busy");
      }
      if (reset) {
        orderForm.reset();
      }
    };

    if (isEmailjsConfigured()) {
      const cfg = loadEmailjsConfig();
      window.emailjs
        .sendForm(cfg.serviceId, cfg.templateId, orderForm, { publicKey: cfg.publicKey })
        .then(() => finish("order_form_success", "success", true))
        .catch((err) => {
          console.warn("EmailJS send failed", err);
          saveOrderLocally(data);
          finish("order_form_error", "error", false);
        });
    } else {
      // EmailJS не настроен — сохраняем локально и честно сообщаем
      saveOrderLocally(data);
      finish("order_form_saved", "info", true);
    }
  }

  /* =====================================================================
   * АДМИНКА: настройки EmailJS + просмотр локальных заявок
   * ===================================================================== */
  const adminEmailjsPublicKey = document.getElementById("adminEmailjsPublicKey");
  const adminEmailjsServiceId = document.getElementById("adminEmailjsServiceId");
  const adminEmailjsTemplateId = document.getElementById("adminEmailjsTemplateId");
  const adminOrdersList = document.getElementById("adminOrdersList");
  const adminClearOrders = document.getElementById("adminClearOrders");
  const adminWatermarkEnabled = document.getElementById("adminWatermarkEnabled");
  const adminWatermarkText = document.getElementById("adminWatermarkText");

  function populateWatermarkFields() {
    const wm = loadWatermarkSettings();
    if (adminWatermarkEnabled) adminWatermarkEnabled.checked = wm.enabled;
    if (adminWatermarkText) adminWatermarkText.value = wm.text;
  }
  function saveWatermarkSettings() {
    const wm = {
      enabled: adminWatermarkEnabled ? adminWatermarkEnabled.checked : false,
      text: adminWatermarkText ? adminWatermarkText.value.trim() : "",
    };
    localStorage.setItem("watermark", JSON.stringify(wm));
  }

  function populateEmailjsFields() {
    const cfg = loadEmailjsConfig();
    if (adminEmailjsPublicKey) adminEmailjsPublicKey.value = cfg.publicKey;
    if (adminEmailjsServiceId) adminEmailjsServiceId.value = cfg.serviceId;
    if (adminEmailjsTemplateId) adminEmailjsTemplateId.value = cfg.templateId;
  }
  function saveEmailjsConfig() {
    const cfg = {
      publicKey: adminEmailjsPublicKey ? adminEmailjsPublicKey.value.trim() : "",
      serviceId: adminEmailjsServiceId ? adminEmailjsServiceId.value.trim() : "",
      templateId: adminEmailjsTemplateId ? adminEmailjsTemplateId.value.trim() : "",
    };
    localStorage.setItem("emailjsConfig", JSON.stringify(cfg));
  }
  function renderAdminOrders() {
    if (!adminOrdersList) return;
    let orders = [];
    try { orders = JSON.parse(localStorage.getItem("orders") || "[]"); } catch (e) {}
    adminOrdersList.innerHTML = "";
    if (!orders.length) {
      const empty = document.createElement("div");
      empty.className = "admin-orders-empty";
      empty.textContent = "Заявок пока нет.";
      adminOrdersList.appendChild(empty);
      return;
    }
    orders.forEach((o) => {
      const row = document.createElement("div");
      row.className = "admin-order";
      const head = document.createElement("div");
      head.className = "admin-order__head";
      const who = document.createElement("span");
      who.textContent = o.from_name || "—"; // textContent — без XSS
      const when = document.createElement("span");
      when.className = "admin-order__meta";
      when.textContent = o.at ? new Date(o.at).toLocaleString() : "";
      head.appendChild(who);
      head.appendChild(when);

      const meta = document.createElement("div");
      meta.className = "admin-order__meta";
      // Контакт: «Способ: значение» (для старых заявок — поле reply_to)
      const contactStr = o.contact
        ? ((o.contact_method ? o.contact_method + ": " : "") + o.contact)
        : (o.reply_to || null);
      meta.textContent = [contactStr, o.work_type, o.budget && o.budget !== "—" ? o.budget : null, o.deadline && o.deadline !== "—" ? o.deadline : null]
        .filter(Boolean).join(" · ");

      const msg = document.createElement("div");
      msg.textContent = o.message || "";

      row.appendChild(head);
      row.appendChild(meta);
      row.appendChild(msg);
      adminOrdersList.appendChild(row);
    });
  }

  // Event listeners
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      setLanguage(lang);
    });
  });

  // Тема
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Переключатель языка
  if (langToggle) {
    langToggle.addEventListener("click", (ev) => {
      ev.stopPropagation();
      toggleLangMenu();
    });
  }
  if (langMenu) {
    langMenu.querySelectorAll("li[data-lang]").forEach((li) => {
      li.addEventListener("click", () => {
        setLanguage(li.dataset.lang);
        closeLangMenu();
      });
    });
  }
  // Закрытие меню по клику вне и по Esc
  document.addEventListener("click", (ev) => {
    if (langSwitcher && !langSwitcher.contains(ev.target)) closeLangMenu();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeLangMenu();
  });

  // Тулбар фильтров: режим AND/OR + очистка
  filterModeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterMatchMode = btn.dataset.mode === "all" ? "all" : "any";
      localStorage.setItem("filterMatchMode", filterMatchMode);
      filterModeBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      updateFilterToolbar();
      resetGalleryRotation();
    });
  });
  if (filterClearBtn) {
    filterClearBtn.addEventListener("click", clearAllFilters);
  }

  // Форма заказа
  if (orderForm) {
    orderForm.addEventListener("submit", handleOrderSubmit);
  }
  // Способ связи: меняем тип/подсказку поля контакта и синхронизируем reply_to
  if (orderContactMethod) {
    orderContactMethod.addEventListener("change", () => {
      updateContactFieldUI();
      syncContactField();
    });
  }
  if (orderContactInput) {
    orderContactInput.addEventListener("input", syncContactField);
  }
  updateContactFieldUI();

  // Админка: заявки
  if (adminClearOrders) {
    adminClearOrders.addEventListener("click", () => {
      localStorage.removeItem("orders");
      renderAdminOrders();
    });
  }

  if (adminHeaderImageBtn) {
    adminHeaderImageBtn.addEventListener("click", () => {
      if (adminHeaderImageInput) adminHeaderImageInput.click();
    });
  }

  if (adminHeaderImageInput) {
    adminHeaderImageInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, 'header', 'adminHeaderImagePreview', 'adminHeaderImage');
      }
    });
  }

  if (adminLeftSidebarImageBtn) {
    adminLeftSidebarImageBtn.addEventListener("click", () => {
      if (adminLeftSidebarImageInput) adminLeftSidebarImageInput.click();
    });
  }

  if (adminLeftSidebarImageInput) {
    adminLeftSidebarImageInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, 'left', 'adminLeftSidebarImagePreview', 'adminLeftSidebar');
      }
    });
  }

  if (adminRightSidebarImageBtn) {
    adminRightSidebarImageBtn.addEventListener("click", () => {
      if (adminRightSidebarImageInput) adminRightSidebarImageInput.click();
    });
  }

  if (adminRightSidebarImageInput) {
    adminRightSidebarImageInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, 'right', 'adminRightSidebarImagePreview', 'adminRightSidebar');
      }
    });
  }

  if (adminAddPrimaryFilter) {
    adminAddPrimaryFilter.addEventListener("click", () => addAdminFilter(true));
  }

  if (adminAddSecondaryFilter) {
    adminAddSecondaryFilter.addEventListener("click", () => addAdminFilter(false));
  }

  if (adminAddGalleryItem) {
    adminAddGalleryItem.addEventListener("click", addAdminGalleryItem);
  }

  if (adminGalleryFileInput) {
    adminGalleryFileInput.addEventListener('change', handleAdminGalleryFileSelect);
  }

  if (adminAddSocialLink) {
    adminAddSocialLink.addEventListener("click", () => {
      const label = prompt('Введите название кнопки социальной сети:');
      if (!label) return;
      const url = prompt('Введите ссылку для этой кнопки:');
      if (!url) return;
      const links = loadSocialLinks();
      const keyBase = slugifyFilterLabel(label) || 'social';
      let key = `social_${keyBase}`;
      let index = 1;
      while (links[key]) {
        key = `social_${keyBase}_${index}`;
        index += 1;
      }
      links[key] = { label: label.trim(), url: normalizeUrl(url.trim()) };
      localStorage.setItem('socialLinks', JSON.stringify(links));
      renderAdminSocialList();
      renderSocialLinks();
    });
  }

  try {
    buildFilterButtons();
  } catch (e) {
    console.warn("Filter initialization error", e);
  }

  if (adminUnlock) {
    adminUnlock.addEventListener("click", openAdminPanel);
  }

  if (passwordSubmit) {
    passwordSubmit.addEventListener("click", () => {
      const input = adminPasswordInput?.value || "";
      const stored = localStorage.getItem("adminPassword") || "";
      if (input === stored) {
        passwordModal?.classList.add("hidden");
        adminPanel?.classList.remove("hidden");
        populateAdminForm();
        renderAdminTextList();
        if (adminPasswordInput) adminPasswordInput.value = "";
      } else {
        passwordError?.classList.remove("hidden");
      }
    });
  }

  if (passwordCancel) {
    passwordCancel.addEventListener("click", () => {
      passwordModal.classList.add("hidden");
      if (adminPasswordInput) adminPasswordInput.value = "";
      if (passwordError) passwordError.classList.add("hidden");
    });
  }

  if (adminClose) {
    adminClose.addEventListener("click", closeAdminPanel);
  }

  if (adminSave) {
    adminSave.addEventListener("click", saveAdminSettings);
  }

  if (adminApply) {
    adminApply.addEventListener("click", saveAdminSettings);
  }

  if (adminReset) {
    adminReset.addEventListener("click", () => {
      localStorage.removeItem("galleryItems");
      galleryItems = loadGalleryItems();
      resetGalleryRotation();
    });
  }

  // Initialize
  applyTheme(getStoredTheme());
  initContentProtection();
  document.documentElement.lang = currentLanguage;
  ensureScriptFont(currentLanguage);
  // Восстановить выбранный режим фильтра (any/all) в тулбаре
  filterModeBtns.forEach((b) => {
    const active = b.dataset.mode === filterMatchMode;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });

  galleryItems = loadGalleryItems();
  resetGalleryRotation();
  applyTranslations();
  applyAdminImages();
  populateOrderTypeSelect();
  updateLangSwitcher();
  // Плашку выбора языка показываем при КАЖДОЙ загрузке/перезагрузке страницы.
  // Это просьба владельца сайта — приветственный выбор языка как в прошлой версии.
  showLanguageModal();
});
