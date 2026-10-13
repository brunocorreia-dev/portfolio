// Única fonte de dados da página. Para adicionar um projeto, você só edita este arquivo.
//
// Campos:
//   title        string   nome do projeto
//   description  string   1 ou 2 frases: qual problema resolve
//   category     string   "Web" | "API" | "CLI" (tem que bater com o data-category dos botões)
//   stack        string[] tecnologias usadas
//   image        string   caminho do print/GIF dentro de /img
//   github       string   link do repositório
//   demo         string?  OPCIONAL: se não existir, o botão de Demo não aparece

export const projects = [
  {
    title: "Time Tracker API",
    description: "[escreva aqui o problema que a API resolve]",
    category: "API",
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    image: "img/time-tracker.png",
    github: "https://github.com/brunocorreia-dev/[repositorio]",
    demo: "https://[sua-api]/swagger-ui.html"
  },
  {
    title: "DocGen",
    description: "[escreva aqui o problema que a ferramenta resolve]",
    category: "CLI",
    stack: ["Java", "LLM"],
    image: "img/docgen.gif",
    github: "https://github.com/brunocorreia-dev/Docgen"
    // sem "demo" de propósito: serve para testar o caso do campo ausente
  }
];
