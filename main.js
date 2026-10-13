import { projects } from "./projects.js";

// Scripts type="module" só executam depois que o HTML foi analisado,
// então os elementos abaixo já existem quando este arquivo roda.
const grid = document.querySelector("#projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

// Valor do data-category que significa "sem filtro". Não é uma categoria de projeto.
const ALL_CATEGORY = "All";

// Trechos entre colchetes em projects.js (ex.: "[repositorio]") são placeholders, não endereços reais.
const PLACEHOLDER_PATTERN = /\[[^\]]*\]/;

// ---------------------------------------------------------------
// Apoio aos cards
// ---------------------------------------------------------------

// Cria um elemento com texto via textContent: o conteúdo nunca é interpretado como HTML.
function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

// Devolve o valor original se ele puder virar um link real (http/https, sem placeholder).
// Caso contrário, devolve null.
function getUsableUrl(value) {
  if (typeof value !== "string" || value.trim() === "" || PLACEHOLDER_PATTERN.test(value)) {
    return null;
  }
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}

// Bloco neutro que substitui a imagem quebrada. Ele não carrega nenhum arquivo,
// então não existe uma segunda falha possível (sem loop de erro).
function createImageFallback(project) {
  const fallback = createTextElement("div", "card-image-fallback", "Imagem indisponível");
  fallback.setAttribute("role", "img");
  fallback.setAttribute("aria-label", `Imagem de prévia do projeto ${project.title} indisponível`);
  return fallback;
}

function createProjectImage(project) {
  if (typeof project.image !== "string" || project.image.trim() === "") {
    return createImageFallback(project);
  }

  const image = document.createElement("img");
  image.alt = `Imagem de prévia do projeto ${project.title}`;
  image.loading = "lazy";
  // { once: true }: o listener roda uma única vez, mesmo que algo volte a falhar.
  image.addEventListener("error", () => image.replaceWith(createImageFallback(project)), { once: true });
  image.src = project.image;
  return image;
}

// O texto visível ("GitHub", "Demo") vem primeiro no nome acessível;
// o contexto extra fica disponível só para leitores de tela.
function createExternalLink(href, label, context, className) {
  const link = createTextElement("a", className, label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(createTextElement("span", "visually-hidden", `: ${context} (abre em nova aba)`));
  return link;
}

// ---------------------------------------------------------------
// ETAPA 2: transformar UM projeto em UM card
// ---------------------------------------------------------------
// Recebe um objeto de projects.js e devolve um elemento DOM (<article>).
function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  const media = document.createElement("div");
  media.className = "card-media";
  const category = createTextElement("span", "card-category", project.category);
  category.prepend(createTextElement("span", "visually-hidden", "Categoria: "));
  media.append(createProjectImage(project), category);

  const body = document.createElement("div");
  body.className = "card-body";
  body.append(
    createTextElement("h3", "card-title", project.title),
    createTextElement("p", "card-description", project.description)
  );

  const stack = Array.isArray(project.stack) ? project.stack : [];
  if (stack.length > 0) {
    const tags = document.createElement("ul");
    tags.className = "tags";
    tags.setAttribute("aria-label", "Tecnologias utilizadas");
    stack.forEach((tech) => tags.append(createTextElement("li", "tag", tech)));
    body.append(tags);
  }

  const links = document.createElement("div");
  links.className = "links";

  const githubUrl = getUsableUrl(project.github);
  if (githubUrl) {
    links.append(createExternalLink(githubUrl, "GitHub", `repositório de ${project.title}`, "btn btn-outline"));
  } else {
    // Link ainda é placeholder: o botão aparece, mas sem destino, para não levar a um endereço fictício.
    const pending = createTextElement("span", "btn btn-outline is-pending", "GitHub (link pendente)");
    pending.append(createTextElement("span", "visually-hidden", `: repositório de ${project.title}`));
    links.append(pending);
  }

  const demoUrl = getUsableUrl(project.demo);
  if (demoUrl) {
    links.append(createExternalLink(demoUrl, "Demo", `demonstração de ${project.title}`, "btn btn-primary"));
  }

  body.append(links);
  card.append(media, body);
  return card;
}

// ---------------------------------------------------------------
// ETAPA 3: desenhar uma lista de projetos na página
// ---------------------------------------------------------------
// Limpa o grid e adiciona um card para cada projeto da lista recebida.
function renderProjects(list) {
  if (!grid) {
    console.error('[portfolio] Elemento "#projects-grid" não encontrado no HTML; os projetos não podem ser exibidos.');
    return;
  }
  if (!Array.isArray(list)) {
    console.error("[portfolio] renderProjects() esperava um array de projetos e recebeu:", list);
  }

  // Remove só o que esta função desenhou (cards e aviso de lista vazia).
  grid.querySelectorAll(":scope > .card, :scope > .empty-state").forEach((element) => element.remove());

  const items = Array.isArray(list) ? list : [];
  if (items.length === 0) {
    grid.append(createTextElement("p", "empty-state", "Nenhum projeto encontrado para o filtro selecionado."));
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((project) => fragment.append(createProjectCard(project)));
  grid.append(fragment);
}

// ---------------------------------------------------------------
// ETAPA 4: filtro por categoria
// ---------------------------------------------------------------
// Ao clicar num botão: lê o data-category, filtra (ou mostra tudo em "All")
// e marca apenas esse botão como ativo.
function handleFilterClick(event) {
  const button = event.target instanceof Element ? event.target.closest(".filter-btn") : null;
  const category = button?.dataset.category;
  if (!category || ![...filterButtons].includes(button)) return;

  const filtered = category === ALL_CATEGORY
    ? projects
    : projects.filter((project) => project.category === category);

  setActiveFilter(button);
  renderProjects(filtered);
}

// ---------------------------------------------------------------
// Apoio aos filtros
// ---------------------------------------------------------------

function setActiveFilter(activeButton) {
  filterButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

// Avisa (uma vez, na carga) sobre projetos cuja categoria não tem botão de filtro.
function warnAboutUnknownCategories(list) {
  const knownCategories = new Set(
    [...filterButtons]
      .map((button) => button.dataset.category)
      .filter((category) => category && category !== ALL_CATEGORY)
  );

  list.forEach((project) => {
    if (!knownCategories.has(project.category)) {
      console.warn(
        `[portfolio] O projeto "${project.title}" usa a categoria "${project.category}", ` +
          `que não tem botão de filtro correspondente. Ele só aparece em "${ALL_CATEGORY}".`
      );
    }
  });
}

// ---------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------
if (filterButtons.length === 0) {
  console.warn('[portfolio] Nenhum botão ".filter-btn" encontrado; os filtros ficarão indisponíveis.');
} else {
  const allButton = [...filterButtons].find((button) => button.dataset.category === ALL_CATEGORY);
  if (!allButton) {
    console.warn(`[portfolio] Nenhum botão com data-category="${ALL_CATEGORY}"; nenhum filtro começa ativo.`);
  }
  setActiveFilter(allButton);
  warnAboutUnknownCategories(projects);
  filterButtons.forEach((button) => button.addEventListener("click", handleFilterClick));
}

renderProjects(projects);
