import { projects } from "./projects.js";

const grid = document.querySelector("#projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------------------------------------------------------------
// ETAPA 2: transformar UM projeto em UM card
// ---------------------------------------------------------------
// Recebe um objeto de projects.js e devolve um elemento DOM (<article>).
//
// Perguntas para decidir antes de codar:
//  - O botão de Demo só pode existir quando project.demo existir. Como tratar?
//  - O texto vem dos seus dados. innerHTML ou textContent para o título e a descrição? Por quê?
//  - Links com target="_blank" precisam de qual atributo de segurança?
//  - A <img> precisa de qual atributo para acessibilidade?
function createProjectCard(project) {
  // TODO
}

// ---------------------------------------------------------------
// ETAPA 3: desenhar uma lista de projetos na página
// ---------------------------------------------------------------
// Limpa o grid e adiciona um card para cada projeto da lista recebida.
// Dica: ela recebe a lista como parâmetro (não usa "projects" direto).
// Por que isso vai facilitar a etapa 4?
function renderProjects(list) {
  // TODO
}

// ---------------------------------------------------------------
// ETAPA 4: filtro por categoria
// ---------------------------------------------------------------
// Ao clicar num botão:
//  - ler o data-category dele
//  - "All" mostra tudo; qualquer outro valor filtra por project.category
//  - atualizar qual botão tem a classe "active"
function handleFilterClick(event) {
  // TODO
}

// ---------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------
// TODO: ligar o handleFilterClick em cada botão (filterButtons)
// TODO: renderizar todos os projetos na carga da página
