const filters = [...document.querySelectorAll(".filter")];
const projects = [...document.querySelectorAll(".project-row")];
const languageButtons = [...document.querySelectorAll(".language-option")];
const dialog = document.querySelector("#project-dialog");
const selectors = [
  ".nav-interfaces", ".nav-projects", ".nav-cta", ".hero-role", ".hero-intro", ".button-primary", ".text-link", ".hero-tools-label", ".hero-apps-label", ".index-label",
  ".hero-index li:nth-child(1)", ".hero-index li:nth-child(2)", ".hero-index li:nth-child(3)", ".hero-index li:nth-child(4)",
  ".interfaces-heading .eyebrow", ".interfaces-heading > p:last-child", ".design-styles-heading .eyebrow", "#design-styles-title", ".design-styles-heading > p:last-child",
  ".style-skeuo .style-label", ".style-flat .mock-button", ".style-skeuo .mock-button", ".style-glass .mock-button", ".projects-heading .eyebrow", "#projects-title",
  ".filter[data-filter='all']", ".filter[data-filter='mobile']", ".filter[data-filter='web']", ".filter[data-filter='hardware']",
  "#github-link", ".dialog-footer span:last-child", "footer div p", "footer > a"
];
const spanishStatic = Object.fromEntries(selectors.map((selector) => [selector, document.querySelector(selector).innerHTML]));
const englishStatic = {
  ".nav-interfaces": "Interfaces",
  ".nav-projects": "Projects",
  ".nav-cta": "View CV <i class='fa-solid fa-arrow-up-right-from-square' aria-hidden='true'></i>",
  ".hero-role": "I build digital products from end to end.",
  ".hero-intro": "I'm Federico D'Andrea, a developer focused on product and design. I work across iOS, macOS, Windows, web and IoT, connecting interfaces with data, streaming, Bluetooth and hardware. I care about animation, attention to detail and making every visual decision serve a purpose. I take projects from prototype to a version ready for real use.",
  ".button-primary": "Explore projects <i class='fa-solid fa-arrow-down' aria-hidden='true'></i>",
  ".text-link": "View interfaces <i class='fa-solid fa-arrow-right' aria-hidden='true'></i>",
  ".hero-tools-label": "Platforms & stack",
  ".hero-apps-label": "My apps",
  ".index-label": "Expertise",
  ".hero-index li:nth-child(1)": "<span>01</span> Apple, Windows/.NET & mobile",
  ".hero-index li:nth-child(2)": "<span>02</span> Full-stack web & product",
  ".hero-index li:nth-child(3)": "<span>03</span> Real-time, IoT & hardware",
  ".hero-index li:nth-child(4)": "<span>04</span> Flat, glass, skeuomorphism & motion",
  ".interfaces-heading .eyebrow": "Visual selection",
  ".interfaces-heading > p:last-child": "A selection of the applications and experiences I have built.",
  ".design-styles-heading .eyebrow": "Visual language",
  "#design-styles-title": "Design styles",
  ".design-styles-heading > p:last-child": "The same elements, a button and two status badges, interpreted through three different visual approaches.",
  ".style-skeuo .style-label": "Skeuomorphic",
  ".style-flat .mock-button": "Add",
  ".style-skeuo .mock-button": "+ Add",
  ".style-glass .mock-button": "Add",
  ".projects-heading .eyebrow": "Selected archive / 2017—2026",
  "#projects-title": "Projects",
  ".filter[data-filter='all']": "All",
  ".filter[data-filter='mobile']": "Mobile",
  ".filter[data-filter='web']": "Web",
  ".filter[data-filter='hardware']": "IoT",
  "#github-link": "<i class='fa-brands fa-github' aria-hidden='true'></i> View repository <i class='fa-solid fa-arrow-up-right-from-square' aria-hidden='true'></i>",
  ".dialog-footer span:last-child": "Use ← → to browse",
  "footer div p": "Design, code and product.",
  "footer > a": "View full portfolio <i class='fa-solid fa-arrow-up-right-from-square' aria-hidden='true'></i>"
};

const englishCards = {
  "AutoArtist": "A web platform for creating and managing visual experiences with a modern, scalable architecture.",
  "Booming · Dinesys": "An iOS app for the Dinesys ecosystem, supporting field sales across customers, routes, orders, collections and activities.",
  "OBS Cam iOS & macOS": "A solution that turns Apple devices into real-time streaming camera sources.",
  "LED Pants · iOS & macOS": "An Apple Watch, iOS and macOS app that controls an ESP32 connected to two LED strips over Wi-Fi, supporting static modes and audio-synchronized sequences.",
  "iFeedeBook": "A retro social-network website with feeds, profiles, pages, games and real-time chat, paired with a native iOS 6 client.",
  "MSN Fun App": "A chat app inspired by MSN, featuring real-time conversations and presence.",
  "Laboratorio de Edafología": "A project developed with the ADINI team for the University of Buenos Aires (UBA), where I worked as designer and front-end developer.",
  "Virtual Wallet": "A full-stack digital wallet with transactions, persistent data and a clarity-focused interface.",
  "Retro Video Game Reservation": "A Digital House first-track project. As Front-end Tech Lead, I guided the team, shaped a distinctive visual identity and added animation.",
  "Events & Invitations App": "An iOS app for creating and managing events, from personalized invitations to experiences for bars and nightclubs.",
  "Cámara Slider": "My final high-school project: I led the iOS and Android apps controlling a motorized camera slider via Bluetooth, with joysticks, profiles, speed and tilt controls, point tracking, loops and timelapse.",
  "Neonatal Incubator": "A team-built neonatal incubator. I developed the Windows app to monitor sensors and actuators, display real-time data and charts, store history and configure alarms.",
  "Página Kassin": "I designed and developed Kassin's website from a visual concept created in Illustrator. The project grew through two versions, adding galleries, animation and multimedia content.",
  "Home Automation IoT": "A continuously evolving home automation ecosystem."
};

const projectData = {
  "AutoArtist": ["mac", ["Canvas creativo","Biblioteca","Resultado"], ["Canvas","Library","Output"], "Experiencia web orientada a la creación visual, con gestión de datos y una interfaz rápida construida sobre un stack moderno.", "A visual-creation web experience with data management and a fast interface built on a modern stack."],
  "Booming · Dinesys": ["iphone", ["Inicio","Clientes"], ["Home","Customers"], "Proyecto de Dinesys para acompañar la actividad comercial desde iOS. La galería muestra una selección acotada de sus interfaces junto al resto de los trabajos.", "A Dinesys project supporting field sales activity on iOS. The gallery presents a focused selection of its interfaces alongside the rest of the work.", null, ["assets/booming/01-dashboard.png","assets/booming/02-customers.png"], ["iphone","iphone"]],
  "OBS Cam iOS & macOS": ["mac", ["Hub de cámara en macOS","Cámara iOS"], ["macOS camera hub","iOS camera"], "Sistema de cámara y streaming entre dispositivos Apple mediante conexión cableada o Wi-Fi en tiempo real.", "A real-time camera and streaming system connecting Apple devices over cable or Wi-Fi.", "https://github.com/feededandrea/OBSPhoneCam", ["assets/obs/01-macos.png","assets/obs/02-ios.png"], ["mac","iphone-landscape"]],
  "LED Pants · iOS & macOS": ["mac", ["Editor de timeline en macOS","Control desde iOS"], ["macOS timeline editor","iOS controller"], "iSyncro es una aplicación para Apple Watch, iOS y macOS que controla por Wi-Fi un ESP32 conectado a dos tiras LED instaladas en un pantalón. Permite usar colores y efectos estáticos o programar secuencias sincronizadas con una pista de audio mediante timeline y keyframes. Incluye importación y exportación de archivos programados sobre canciones, caché automática, playlists y un control remoto para Apple Watch que permite manejar la reproducción en vivo.", "iSyncro is an Apple Watch, iOS and macOS app that controls an ESP32 connected to two LED strips installed in a pair of pants over Wi-Fi. It supports static colors and effects as well as timeline and keyframe sequences synchronized to an audio track. It includes import and export of song-based sequence files, automatic caching, playlists and an Apple Watch remote for controlling live playback.", "https://github.com/feededandrea/iSyncro.git", ["assets/led-pants/01-macos.png","assets/led-pants/02-ios.png"], ["mac","iphone"]],
  "iFeedeBook": ["browser", ["Feed web","Madre e hija"], ["Web feed","Mother and daughter"], "iFeedeBook recrea la experiencia de las redes sociales clásicas como un producto web retro completo: publicaciones, comentarios, perfiles, amistades, páginas temáticas, juegos y chat con distintos modos visuales. El ecosistema también incluye un cliente nativo desarrollado para iOS 6.", "iFeedeBook recreates the classic social-network experience as a complete retro web product with posts, comments, profiles, friendships, themed pages, games and chat with multiple visual modes. The ecosystem also includes a native client built for iOS 6.", null, ["assets/ifeedebook/01-web-feed.png","assets/ifeedebook/02-ios-post.png"], ["browser","ipod"], "ifeedebook.local"],
  "MSN Fun App": ["ipod", ["Contactos"], ["Contacts"], "Reinterpretación de MSN para iOS 6, con chat y presencia en tiempo real.", "A reinterpretation of MSN for iOS 6, with real-time chat and presence.", null, ["assets/msn/01-contacts.webp"], ["ipod"]],
  "Laboratorio de Edafología": ["mac", ["Panel","Muestras","Resultados"], ["Dashboard","Samples","Results"], "Trabajo realizado junto al equipo de ADINI para la Universidad de Buenos Aires. Estuve a cargo del diseño de la experiencia y del desarrollo front-end del producto para digitalizar procesos y resultados del laboratorio de edafología.", "A project developed with the ADINI team for the University of Buenos Aires. I was responsible for experience design and front-end development of the product used to digitize processes and results for the soil science laboratory."],
  "Virtual Wallet": ["browser", ["Panel principal"], ["Main dashboard"], "Billetera virtual full-stack con autenticación, saldo disponible, actividad, carga de dinero, pago de servicios, tarjetas y datos de cuenta, respaldada por persistencia relacional.", "A full-stack virtual wallet featuring authentication, available balance, activity, deposits, service payments, cards and account details, backed by relational persistence.", "https://github.com/feededandrea/digital-money", ["assets/virtual-wallet/01-dashboard.png"], ["browser"], "digital-money.local"],
  "Retro Video Game Reservation": ["browser", ["Portada","Catálogo","Favoritos","Mis reservas","Detalle de experiencia","Selección de fechas"], ["Home","Catalog","Favorites","My reservations","Experience details","Date selection"], "Pixel Replay fue el proyecto del primer track de Digital House. Trabajé como Front-end Tech Lead, guiando al equipo y definiendo una experiencia retro completa para explorar packs de consolas y juegos, guardar favoritos y reservar por fechas.", "Pixel Replay was our Digital House first-track project. I served as Front-end Tech Lead, guiding the team and shaping a complete retro experience for browsing console and game packs, saving favorites and booking by date.", null, ["assets/pixel-replay/01-home.webp","assets/pixel-replay/02-catalog.webp","assets/pixel-replay/03-favorites.webp","assets/pixel-replay/04-reservations.webp","assets/pixel-replay/05-detail.webp","assets/pixel-replay/06-booking.webp"], ["browser","browser","browser","browser","browser","browser"], "pixelreplay.com"],
  "Events & Invitations App": ["iphone", ["Descubrir eventos","Detalle del boliche","Ubicación y alrededores","Música del evento","Evento personalizado"], ["Discover events","Venue details","Location and nearby places","Event music","Custom event"], "Plataforma social para descubrir bares y boliches, consultar el lugar, ubicación y música, y crear invitaciones personalizadas.", "A social platform for discovering bars and nightclubs, viewing venue details, location and music, and creating custom invitations.", null, ["assets/events/01-discover.png","assets/events/02-venue.png","assets/events/03-location.png","assets/events/04-music.png","assets/events/05-custom-event.png"]],
  "Cámara Slider": ["iphone", ["3D Touch · Accesos rápidos","Joysticks","Modo avanzado","Inclinación y timelapse","Configuración","Parámetros","Perfiles"], ["3D Touch · Quick actions","Joysticks","Advanced mode","Tilt and timelapse","Settings","Parameters","Profiles"], "Proyecto grupal de sexto año. Estuve a cargo de las apps iOS y Android para controlar un slider motorizado con Bluetooth, perfiles y automatizaciones.", "A sixth-year team project. I led the iOS and Android apps controlling a motorized camera slider with Bluetooth, profiles and automation.", "https://github.com/feededandrea/SlideAway-Camera-Slider-App-iOS-", ["assets/slideaway/07-shortcuts.png","assets/slideaway/01-joystick.png","assets/slideaway/02-advanced.png","assets/slideaway/03-advanced-scroll.png","assets/slideaway/04-settings.png","assets/slideaway/05-settings-scroll.png","assets/slideaway/06-profiles.png"]],
  "Neonatal Incubator": ["windows", ["Monitoreo","Historial","Alarmas"], ["Monitoring","History","Alarms"], "Proyecto grupal para controlar una incubadora mediante sensores y actuadores. Desarrollé la app Windows en C# con datos en tiempo real, gráficos y alarmas.", "A team project controlling an incubator with sensors and actuators. I built the C# Windows app with real-time data, charts and alarms."],
  "Página Kassin": ["browser", ["Portada y fotografía","Galería general","Retratos","Sección de videos","Galería de videos","Detalle de galería","Presentación del sitio","Portfolio fotográfico","Portfolio de video y motion"], ["Home and photography","Main gallery","Portraits","Video section","Video gallery","Gallery detail","Website presentation","Photography portfolio","Video and motion portfolio"], "Sitio realizado entre 2018 y 2019. Convertí el diseño final de Illustrator a HTML, CSS y JavaScript, construyendo galerías, categorías, animaciones, efectos hover y contenido multimedia.", "A website built between 2018 and 2019. I translated the final Illustrator design into HTML, CSS and JavaScript, building galleries, categories, animations, hover effects and multimedia content.", null, ["assets/kassin/01-home.webp","assets/kassin/03-gallery.webp","assets/kassin/04-portraits.webp","assets/kassin/05-videos-header.webp","assets/kassin/06-videos-grid.webp","assets/kassin/07-gallery-detail.webp","assets/kassin/08-portfolio-overview.webp","assets/kassin/09-portfolio-photos.webp","assets/kassin/10-portfolio-videos.webp"], ["browser","browser","browser","browser","browser","browser","image","image","image"], "kassin.team"],
  "Home Automation IoT": ["browser", ["Panel Homebridge"], ["Homebridge dashboard"], "Ecosistema de automatización doméstica construido desde 2017 con ESP8266, Raspberry Pi, HomeKit, Homebridge y Debian.", "A home automation ecosystem built since 2017 with ESP8266, Raspberry Pi, HomeKit, Homebridge and Debian.", "https://github.com/feededandrea/esp-homekit-demo", ["assets/iot/01-homebridge-dashboard.png"], ["browser"], "homebridge.local"]
};

const originalCards = Object.fromEntries(projects.map(p => [p.querySelector("h3").textContent, p.querySelector("p").textContent]));
const ui = {
  title: document.querySelector("#dialog-title"), index: document.querySelector("#dialog-index"), year: document.querySelector("#dialog-year"),
  description: document.querySelector("#dialog-description"), detail: document.querySelector("#dialog-detail"), tech: document.querySelector("#dialog-tech"),
  canvas: document.querySelector("#device-canvas"), device: document.querySelector("#device-label"), count: document.querySelector("#screen-count"),
  label: document.querySelector("#screen-label"), github: document.querySelector("#github-link"), image: document.querySelector("#screen-image"), art: document.querySelector("#screen-art"), browserUrl: document.querySelector("#browser-url")
};
let language = localStorage.getItem("portfolio-language") === "en" ? "en" : "es";
let slides = [], images = [], slideDevices = [], slide = 0, activeProject = null, activeIndex = 0;

function titleOf(project) { return project.dataset.projectTitle || project.querySelector("h3").textContent; }
function fitBrowserToImage() {
  if (ui.canvas.dataset.device !== "browser" || !ui.image.naturalWidth || !ui.image.naturalHeight) {
    ui.canvas.style.removeProperty("--browser-ratio");
    return;
  }
  const imageRatio = ui.image.naturalWidth / ui.image.naturalHeight;
  const chromeHeightAsWidth = 50 / 760;
  ui.canvas.style.setProperty("--browser-ratio", String(imageRatio / (1 + imageRatio * chromeHeightAsWidth)));
}
function renderSlide() {
  const currentDevice = slideDevices[slide] || ui.canvas.dataset.baseDevice || "generic";
  ui.canvas.dataset.device = currentDevice;
  const activeTitle = activeProject ? titleOf(activeProject) : "";
  ui.canvas.dataset.project = activeTitle;
  const shouldCover = activeTitle === "iFeedeBook" || (activeTitle === "LED Pants · iOS & macOS" && currentDevice === "mac");
  ui.canvas.dataset.fit = shouldCover ? "cover" : "contain";
  ui.device.textContent = `${currentDevice.replace("-landscape","").toUpperCase()} CANVAS`;
  ui.count.textContent = `${String(slide + 1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  ui.label.textContent = slides[slide];
  const image = images[slide];
  ui.image.classList.toggle("is-visible", Boolean(image));
  ui.art.hidden = ui.label.hidden = ui.count.hidden = Boolean(image);
  if (image) {
    ui.image.src = image;
    ui.image.alt = `${ui.title.textContent}: ${slides[slide]}`;
    if (ui.image.complete) fitBrowserToImage();
  }
  else { ui.image.removeAttribute("src"); ui.image.alt = ""; fitBrowserToImage(); }
}
function moveSlide(direction) { slide = (slide + direction + slides.length) % slides.length; renderSlide(); }
function openProject(project, index, preserveSlide = false) {
  const title = titleOf(project);
  const [device, esSlides, enSlides, esDetail, enDetail, github, projectImages, projectDevices, browserUrl] = projectData[title];
  activeProject = project; activeIndex = index;
  ui.title.textContent = title;
  ui.index.textContent = `PROJECT / ${String(index + 1).padStart(2,"0")}`;
  ui.year.textContent = project.querySelector(".project-meta > span").textContent;
  ui.description.textContent = language === "es" ? originalCards[title] : englishCards[title];
  ui.detail.textContent = language === "es" ? esDetail : enDetail;
  ui.tech.replaceChildren(...project.querySelector(".project-meta small").textContent.split(" · ").map(text => Object.assign(document.createElement("span"), {textContent:text})));
  ui.canvas.dataset.baseDevice = device;
  ui.browserUrl.textContent = browserUrl || "portfolio.local";
  ui.github.classList.toggle("is-visible", Boolean(github)); if (github) ui.github.href = github;
  slides = language === "es" ? esSlides : enSlides; images = projectImages || []; slideDevices = projectDevices || slides.map(() => device); if (!preserveSlide) slide = 0;
  renderSlide(); if (!dialog.open) dialog.showModal();
}
function applyLanguage(next) {
  language = next; localStorage.setItem("portfolio-language", language); document.documentElement.lang = language;
  document.title = language === "es" ? "Federico D'Andrea | Portfolio de desarrollo" : "Federico D'Andrea | Developer Portfolio";
  document.querySelector("meta[name='description']").content = language === "es" ? "Portfolio de desarrollo de producto, mobile, web e IoT." : "Product development portfolio spanning mobile, web and IoT.";
  const copy = language === "es" ? spanishStatic : englishStatic;
  Object.entries(copy).forEach(([selector, html]) => document.querySelector(selector).innerHTML = html);
  document.querySelector("nav").ariaLabel = language === "es" ? "Navegación principal" : "Main navigation";
  document.querySelector(".wordmark").ariaLabel = language === "es" ? "Volver al inicio" : "Back to top";
  document.querySelector(".language-switch").ariaLabel = language === "es" ? "Idioma del sitio" : "Site language";
  document.querySelector(".hero-apps").ariaLabel = language === "es" ? "Aplicaciones destacadas" : "Featured applications";
  document.querySelector(".hero-tools").ariaLabel = language === "es" ? "Plataformas y tecnologías" : "Platforms and technologies";
  document.querySelector(".hero-index").ariaLabel = language === "es" ? "Áreas de experiencia" : "Areas of expertise";
  document.querySelectorAll("[data-app-project]").forEach(button => {
    button.ariaLabel = `${language === "es" ? "Abrir" : "Open"} ${button.dataset.appProject}`;
  });
  document.querySelector(".filters").ariaLabel = language === "es" ? "Filtrar proyectos" : "Filter projects";
  document.querySelector(".interface-viewer").ariaLabel = language === "es" ? "Galería de interfaces de aplicaciones" : "Application interface gallery";
  document.querySelector(".dialog-close").ariaLabel = language === "es" ? "Cerrar detalle" : "Close project details";
  document.querySelector(".carousel-prev").ariaLabel = language === "es" ? "Imagen anterior" : "Previous image";
  document.querySelector(".carousel-next").ariaLabel = language === "es" ? "Imagen siguiente" : "Next image";
  const languageSwitch = document.querySelector(".language-switch");
  languageSwitch.classList.remove("is-changing");
  void languageSwitch.offsetWidth;
  languageSwitch.classList.add("is-changing");
  languageButtons.forEach(button => { const on = button.dataset.language === language; button.classList.toggle("is-active", on); button.setAttribute("aria-pressed", on); });
  projects.forEach(project => {
    const title = titleOf(project), year = project.querySelector(".project-meta > span");
    project.querySelector("p").textContent = language === "es" ? originalCards[title] : englishCards[title];
    if (!year.dataset.original) year.dataset.original = year.textContent;
    year.textContent = title === "Home Automation IoT" && language === "en" ? "Since 2017" : year.dataset.original;
    project.ariaLabel = `${language === "es" ? "Abrir detalle de" : "Open details for"} ${title}`;
  });
  if (dialog.open && activeProject) openProject(activeProject, activeIndex, true);
}

filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("is-active", item === filter));
  projects.forEach(project => project.hidden = filter.dataset.filter !== "all" && !project.dataset.category.split(" ").includes(filter.dataset.filter));
}));
projects.forEach((project,index) => {
  project.tabIndex = 0; project.setAttribute("role","button");
  const heading = project.querySelector("h3");
  project.dataset.projectTitle = heading.textContent;
  project.addEventListener("click", () => openProject(project,index));
  project.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProject(project,index); } });
});
languageButtons.forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.language)));
document.querySelectorAll("[data-app-project]").forEach(button => button.addEventListener("click", () => {
  const index = projects.findIndex(project => titleOf(project) === button.dataset.appProject);
  if (index >= 0) openProject(projects[index], index);
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".carousel-prev").addEventListener("click", () => moveSlide(-1));
document.querySelector(".carousel-next").addEventListener("click", () => moveSlide(1));
ui.image.addEventListener("load", fitBrowserToImage);
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", event => { if (event.key === "ArrowLeft") moveSlide(-1); if (event.key === "ArrowRight") moveSlide(1); });
applyLanguage(language);
