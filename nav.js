// Marca no menu (aria-current) o link da seção que está na tela.
// Sem JavaScript, o menu continua funcionando: só o indicador fica fixo em "Início".

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map((link) => document.getElementById(link.hash.slice(1)));

function updateCurrentLink() {
  // Uma seção é a "atual" quando o topo dela passa de 40% da altura da tela.
  const marker = window.innerHeight * 0.4;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  let current = 0;
  sections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= marker) current = index;
  });
  // A última seção pode ser curta demais para alcançar o marcador.
  if (atBottom) current = sections.length - 1;

  navLinks.forEach((link, index) => {
    if (index === current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if (navLinks.length === 0) {
  console.warn('[portfolio] Nenhum link ".site-nav" encontrado; o indicador de seção ativa foi desativado.');
} else {
  sections.forEach((section, index) => {
    if (!section) console.warn(`[portfolio] O link "${navLinks[index].hash}" do menu não aponta para nenhuma seção.`);
  });

  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateCurrentLink();
    });
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updateCurrentLink();
}
